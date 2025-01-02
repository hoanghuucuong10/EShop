<template>
  <div v-if="loading" class="spinner">
    <div class="dot" style="background-color: #e74c3c;"></div>
    <div class="dot" style="background-color: #f1c40f;"></div>
    <div class="dot" style="background-color: #2ecc71;"></div>
  </div>
</template>

<script setup>
defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  height: 40px;
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
