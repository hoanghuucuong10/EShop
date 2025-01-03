<template>
    <div class="cart-container shadow">
      <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">Your Cart</h6>
            </div>
      <div v-if="cartItems.length === 0">
        <p>Your cart is empty</p>
      </div>
      <div v-else>
        <div class="table-responsive">
            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in cartItems">
                        <td>{{ product.name }}</td>
                        <td>{{ product.type }}</td>
                        <td>{{ product.price }}</td>
                        <td>{{ product.description }}</td>
                        <td>{{ product.quantity }}</td>
                        <td>
                            <button class="btn btn-primary btn-icon-split" @click="removeItem(product.id)">
                                <span class="text">Delete</span>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
        <div class="cart-summary">
          <p>Total Items: {{ totalItems }}</p>
          <p>Total Price: ${{ totalPrice }}</p>
        </div>
    </div>
</template>
  
<script setup>
    import '@/assets/vendor/datatables/jquery.dataTables'
    import '@/assets/vendor/datatables/dataTables.bootstrap4'
    import '@/assets/js/demo/datatables-demo'

    import { useCartStore } from '@/store/cartStore';
    import { computed } from 'vue';
  
  const cartStore = useCartStore();
  
  const cartItems = computed(() => cartStore.products);
  const totalItems = computed(() => cartStore.totalItems);
  const totalPrice = computed(() => cartStore.totalPrice);

  const removeItem = (productId) => {
    cartStore.removeProduct(productId);
  };
  </script>
  
<style scoped>
  .cart-container {
    padding: 20px;
  }
  .cart-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0;
  }
  .cart-summary {
    margin-top: 20px;
    font-size: 18px;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
}

h6 {
    margin: 0;
}

.btn {
    margin-left: auto;
}
</style>
