<template>
    <div
        class="item-container col-md-3"
        v-for="product in products"
        :key="product.id"
      >
        <div class="item shadow">
          <img :src="product.image" alt="Product Image" class="product-image" />
          <h5 class="product-name">{{ product.name }}</h5>
          <p class="product-price">${{ product.price }}</p>
          <button class="btn btn-primary add-to-cart" @click="addToCart(product)">
            Add to Cart
          </button>
        </div>
      </div>
</template>