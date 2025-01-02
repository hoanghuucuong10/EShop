<template>
  <teleport to="body">
    <div v-if="showForm" class="modal">
      <div class="modal-content">
        <h3 class="mb-4">{{ formTitle }}</h3>
        <form @submit.prevent="submitForm">
        <!-- Product Name -->
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
  
        <!-- Product Type -->
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
  
        <!-- Price -->
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
        <!-- Submit Button -->
        <button type="submit" class="btn btn-primary">Add Product</button>
      </form>
      </div>
    </div>
  </teleport>
</template>
  
  <script setup>
    import {ref, onMounted } from 'vue';
    import axios from 'axios';
    import { useRoute } from 'vue-router';

    const route = useRoute();
    const productId = route.params.id;
    const formTitle = productId == 0 ? "Add new product" : "Update product"

    const showForm = ref(false);

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
      
    async function submitForm() {
      if (productId) {
        await axios.put(`http://localhost:3000/products/${productId}`, product.value)
          .then(response => {
            console.log('Product updated successfully:', response.data);
            this.closeForm();
          })
          .catch(error => {
            console.error('Error updating product:', error);
            this.closeForm();
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

        await axios.post("http://localhost:3000/products", productData) .then(response => {
            console.log('Product created successfully:', response.data);
            this.closeForm();
          })
          .catch(error => {
            console.error('Error updating product:', error);
            this.closeForm();
          });
      }
    }

    function openForm() {
      this.showForm = true;
    }

    function closeForm() {
      this.showForm = false;
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

  .modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 400px;
}
  </style>
  