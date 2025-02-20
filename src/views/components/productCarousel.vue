<template>
    <div class="product-carousel">
      <button class="carousel-btn prev" @click="prevSlide">&lt;</button>
      <div class="carousel-wrapper">
        <div
          class="carousel-track"
          :style="{ transform: `translateX(-${currentIndex * itemWidth}px)` }"
        >
          <ProductItem
            v-for="(product, index) in products"
            :key="index"
            :product="product"
          />
        </div>
      </div>
      <button class="carousel-btn next" @click="nextSlide">&gt;</button>
    </div>
  </template>
  
  <script>
  import ProductItem from './productItem.vue';
  
  export default {
    name: 'ProductCarousel',
    components: { ProductItem },
    props: {
      products: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        currentIndex: 0,
        itemWidth: 220,
      };
    },
    methods: {
      nextSlide() {
        if (this.currentIndex < this.products.length - 1) {
          this.currentIndex++;
        }
      },
      prevSlide() {
        if (this.currentIndex > 0) {
          this.currentIndex--;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .product-carousel {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    overflow: hidden;
  }
  .carousel-wrapper {
    overflow: hidden;
    width: 100%;
  }
  .carousel-track {
    display: flex;
    transition: transform 0.3s ease-in-out;
  }
  .carousel-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    cursor: pointer;
    padding: 10px;
    z-index: 1;
  }
  .carousel-btn.prev {
    left: 10px;
  }
  .carousel-btn.next {
    right: 10px;
  }
  </style>
  