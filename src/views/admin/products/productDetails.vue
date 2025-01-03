<template>
    <div class="container mt-4">
      <h3 class="mb-4">{{ formTitle }}</h3>
      <form @submit.prevent="submitForm">
        <!-- Product Name -->
        <div class="form-group">
          <label for="productName">Product Name: {{ product.name }}</label>
        </div>
        <!-- Product Type -->
        <div class="form-group">
          <label for="productType">Product Type: {{ product.type }}</label>
        </div>
  
        <!-- Price -->
        <div class="form-group">
          <label for="price">Price: {{ product.price }}</label>
        </div>
  
        <!-- Description -->
        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            class="form-control"
            id="description"
            v-model="product.description"
            rows="4"
            placeholder="Enter product description"
          ></textarea>
        </div>
  
        <!-- Quantity -->
        <div class="form-group">
          <label for="quantity">Quantity: {{ product.quantity }}</label>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
    import {ref, onMounted } from 'vue';
    import axios from 'axios';
    import { useRoute } from 'vue-router';

    const route = useRoute();
    const productId = route.params.id;
    const formTitle = "Detail"

    const product = ref({
          id: 0,
          name: '',
          type: '',
          price: null,
          description: '',
          quantity: null
        })

    onMounted(() => {
      if (productId) {
        if (productId) {
          axios.get(`http://localhost:3000/products/${productId}`)
            .then(response => {
              product.value = response.data;
            })
            .catch(error => {
              console.error("Error fetching product:", error);
            });
        }
      }
    });
  </script>
  
  <style scoped>
  .container {
    max-width: 600px;
    margin: auto;
    background: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  h3 {
    text-align: center;
    color: #007bff;
  }
  </style>
  