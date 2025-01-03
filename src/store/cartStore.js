import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    products: [],
  }),
  actions: {
    addProduct(product) {
      const existingProduct = this.products.find(p => p.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += product.quantity;
      } else {
        this.products.push({ ...product, quantity: product.quantity });
      }
    },
    removeProduct(productId) {
        debugger
        var s=this.products.filter(product => product.id !== productId);
        console.log(s)
      this.products = this.products.filter(product => product.id !== productId);
    },
    clearCart() {
      this.products = [];
    },
  },
  getters: {
    totalItems() {
      return this.products.reduce((sum, product) => sum + product.quantity, 0);
    },
    totalPrice() {
      return this.products.reduce((sum, product) => sum + product.price * product.quantity, 0);
    },
  },
});
