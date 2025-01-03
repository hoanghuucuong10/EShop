<template>
  <div class="container">
    <div class="row">
      <div
        class="item-container col-md-3"
        v-for="product in products"
        :key="product.id"
      >
        <productItem :product="product" :add-to-cart="addToCart" ></productItem>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { onBeforeMount, ref } from 'vue';
  import axios from 'axios';
  import { useCartStore } from '@/store/cartStore';
  import productItem from './components/productItem.vue';

  const cartStore = useCartStore();

  const products = ref([]);

  onBeforeMount(async () => {
      try {
          const response = await axios.get('http://localhost:3000/products');
          products.value = response.data;
        } catch (error) {
          console.error('Failed to load products');
          console.error(error);
        } finally {

      }
  });

  const addToCart = (product) => {
    cartStore.addProduct({ ...product, quantity: 1 });
    console.log(`${product.name} added to cart`);
  };
</script>

<style scoped>
.container {
  margin-top: 20px;
}

.item-container {
  padding: 10px;
}

.item {
  background: #fff;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  transition: transform 0.2s ease-in-out;
}

/* .item:hover {
  transform: translateY(-5px);
} */

.scaleUp:hover {
  transform: translateY(-5px);
}

.product-image {
  width: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.product-name {
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0 5px;
}

.product-price {
  font-size: 14px;
  color: #007bff;
  margin: 5px 0 15px;
}

.add-to-cart {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
}

.add-to-cart:hover {
  background-color: #0056b3;
}
</style>

