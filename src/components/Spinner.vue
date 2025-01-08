<template>
  <div id="overlay" v-if="isLoading" >
    <div class="spinner">
      <div class="dot" style="background-color: #e74c3c;"></div>
      <div class="dot" style="background-color: #f1c40f;"></div>
      <div class="dot" style="background-color: #2ecc71;"></div>
    </div>
  </div>
</template>

<script setup>
import { isLoading } from "@/untils/axiosInstance";
</script>

<style scoped>
 #overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
  }

.spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  height: 40px;
  margin-top: 300px;
}

.dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  animation: bounce 1.5s infinite ease-in-out;
}

.dot:nth-child(1) {
  animation-delay: 0s;
}

.dot:nth-child(2) {
  animation-delay: 0.3s;
}

.dot:nth-child(3) {
  animation-delay: 0.6s;
}

@keyframes bounce {

  0%,
  80%,
  100% {
    transform: scale(0);
  }

  40% {
    transform: scale(1);
  }
}
</style>
