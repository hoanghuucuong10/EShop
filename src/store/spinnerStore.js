import { defineStore } from 'pinia';

export const useSpinnerStore = defineStore('spinner', {
  state: () => ({
    isLoading: false,
  }),
  actions: {
    showSpinner() {
      this.isLoading = true;
    },
    hideSpinner() {
      this.isLoading = false;
    },
    toggleSpinner() {
      this.isLoading = !this.isLoading;
    },
  },
});
