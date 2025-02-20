<template>
  <body class="bg-gradient-primary">
    <div class="container">
      <!-- Outer Row -->
      <div class="row justify-content-center">
        <div class="col-xl-10 col-lg-12 col-md-9">
          <div class="card o-hidden border-0 shadow-lg my-5">
            <div class="card-body p-0">
              <!-- Nested Row within Card Body -->
              <div class="row">
                <div class="col-lg-6 d-none d-lg-block"></div>
                <div class="col-lg-6">
                  <div class="p-5">
                    <div class="text-center">
                      <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                    </div>
                    <Form 
                      @submit="onSubmit" 
                      v-slot="{ values }"
                      :validation-schema="schema">
                      <div class="form-group">
                        <Field
                          name="email"
                          as="input"
                          type="email"
                          class="form-control form-control-user"
                          placeholder="Enter Email Address..."
                        />
                        <ErrorMessage name="email" class="text-danger small" />
                      </div>
                      <div class="form-group">
                        <Field
                          name="password"
                          as="input"
                          type="password"
                          class="form-control form-control-user"
                          placeholder="Password"
                        />
                        <ErrorMessage name="password" class="text-danger small" />
                      </div>
                      <div class="form-group">
                        <div class="custom-control custom-checkbox small">
                          <Field
                            name="remember"
                            type="checkbox"
                            class="custom-control-input"
                            id="customCheck"
                          />
                          <label class="custom-control-label" for="customCheck">
                            Remember Me
                          </label>
                        </div>
                      </div>
                      <button
                        type="submit"
                        class="btn btn-primary btn-user btn-block"
                        :disabled="loading"
                      >
                        <span v-if="loading">Loading...</span>
                        <span v-else>Login</span>
                      </button>
                    </Form>
                    <hr />
                    <div class="text-center">
                      <a class="small" href="forgot-password.html">Forgot Password?</a>
                    </div>
                    <div class="text-center">
                      <a class="small" href="register.html">Create an Account!</a>
                    </div>
                  </div>
                  <div v-if="error" class="alert alert-danger mt-3">
                    {{ error }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<script setup>
import axios from "axios";
import { defineRule, Field, ErrorMessage } from "vee-validate";
import { Form } from 'vee-validate';
import { object, string, boolean } from "yup";
import { useForm } from "vee-validate";
import { ref } from "vue";

// Define rules for VeeValidate
defineRule("required", (value) => (value ? true : "This field is required"));
defineRule("email", (value) =>
  /^\S+@\S+\.\S+$/.test(value) ? true : "Please enter a valid email"
);

// Validation schema
const schema = object({
  email: string().email("Invalid email").required("Email is required"),
  password: string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  remember: boolean(),
});

// State for loading and error
const loading = ref(false);
const error = ref(null);

// Submit handler
const onSubmit = async (values) => {
  loading.value = true;
  error.value = null;

  try {
    const response = await axios.post("http://localhost:3000/login", {
      email: values.email,
      password: values.password,
    });

    // Save tokens to localStorage
    const { accessToken, refreshToken, role } = response.data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("role", role);

    if (role === 'admin') {
      router.push('/admin/dashboard');
    } else {
      router.push('/member/home');
    }
    
  } catch (err) {
    error.value = err.response?.data?.message || "An error occurred during login";
  } finally {
    loading.value = false;
  }
};
</script>
