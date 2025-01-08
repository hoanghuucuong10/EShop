import axios from "axios";
import { ref } from "vue";

// Biến trạng thái loading
export const isLoading = ref(false);

// Tạo một instance của axios
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/", // Đặt URL gốc của API
  timeout: 10000, // Timeout sau 10 giây
});

// Biến kiểm tra trạng thái làm mới token
let isRefreshing = false;
let failedQueue = [];

// Hàng đợi xử lý các request chờ khi làm mới token
const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Interceptor trước khi gửi request
axiosInstance.interceptors.request.use(
  (config) => {
    isLoading.value = true;
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Thêm token vào header
    }
    return config;
  },
  (error) => {
    isLoading.value = false;
    return Promise.reject(error);
  }
);

// Interceptor sau khi nhận response
axiosInstance.interceptors.response.use(
  (response) => {
    isLoading.value = false;
    return response;
  },
  async (error) => {
    isLoading.value = false;

    const originalRequest = error.config;

    // Xử lý lỗi 401 - Token hết hạn
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Nếu đang làm mới token, đợi token mới
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      // Đặt cờ đang làm mới token
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Gửi request làm mới token
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        const { data } = await axiosInstance.post("/auth/refresh-token", {
          refreshToken,
        });

        const newAccessToken = data.accessToken;

        // Lưu token mới vào localStorage
        localStorage.setItem("accessToken", newAccessToken);

        // Gửi lại các request chờ
        processQueue(null, newAccessToken);

        // Gửi lại request ban đầu
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(err, null);

        // Xóa token khỏi localStorage nếu làm mới thất bại
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        // Điều hướng đến trang đăng nhập
        window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error); // Trả về lỗi khác
  }
);

export default axiosInstance;
