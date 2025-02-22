<template>
    <div class="container mt-4">
      <h3 class="mb-4">{{ formTitle }}</h3>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="productName">Product Name</label>
          <input
            type="text"
            class="form-control"
            id="productName"
            v-model="product.name"
            placeholder="Enter product name"
            required
          />
        </div>
        <div class="form-group">
          <label for="productType">Product Type</label>
          <select
            class="form-control"
            id="productType"
            v-model="product.type"
            required
          >
            <option value="">-- Select product type --</option>
            <option value="electronic">Electronic</option>
            <option value="fashion">Fashion</option>
            <option value="food">Food</option>
          </select>
        </div>
        <div class="form-group">
          <label for="price">Price</label>
          <input
            type="number"
            class="form-control"
            id="price"
            v-model="product.price"
            placeholder="Enter product price"
            required
          />
        </div>
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
        <div class="form-group">
          <label for="quantity">Quantity</label>
          <input
            type="number"
            class="form-control"
            id="quantity"
            v-model="product.quantity"
            placeholder="Enter quantity"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary">{{ productId == undefined ? "Add" : "Update" }}</button>
      </form>
    </div>
  </template>
  
  <script setup>
    import {ref, onMounted } from 'vue';
    import axiosInstance from '@/untils/axiosInstance';
    import { useRoute } from 'vue-router';
    import router from "@/router";

    const route = useRoute();
    const productId = route.params.id;
    const formTitle = productId == undefined ? "Add new product" : "Update product"

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
          axiosInstance.get(`products/${productId}`)
            .then(response => {
              product.value = response.data;
            })
            .catch(error => {
              console.error("Error fetching product:", error);
            });
        }
      }
    });
      
    async function submitForm() {
      if (productId) {
        await axiosInstance.put(`${productId}`, product.value)
          .then(response => {
            console.log('Product updated successfully:', response.data);
            router.push('/admin/products/list');
          })
          .catch(error => {
            console.error('Error updating product:', error);
          });
      } else {
        console.log("Product data:", product);
        const productData = {
          name: product.value.name,
          type: product.value.type,
          price: product.value.price,
          description: product.value.description,
          quantity: product.value.quantity,
        };

        await axiosInstance.post("products", productData) .then(response => {
            console.log('Product created successfully:', response.data);
            router.push('/admin/products/list');
          })
          .catch(error => {
            console.error('Error updating product:', error);
          });
      }
    }
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
  