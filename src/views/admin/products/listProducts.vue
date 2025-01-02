<template>
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
            <!-- <tfoot>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Quantity</th>
                </tr>
            </tfoot> -->
            <tbody>
                <tr v-for="product in products">
                    <td>{{ product.name }}</td>
                    <td>{{ product.type }}</td>
                    <td>{{ product.price }}</td>
                    <td>{{ product.description }}</td>
                    <td>{{ product.quantity }}</td>
                    <td>
                        <router-link :to="{ name: 'ProductDetails', params: { id: product.id } }" class="btn btn-success btn-icon-split">Details</router-link>
                        <router-link :to="{ name: 'UpdateProduct', params: { id: product.id } }" class="btn btn-info btn-icon-split">
                            <span class="text">Edit</span>
                        </router-link>
                        <button class="btn btn-primary btn-icon-split" @click="deleteProduct(product.id)">
                            <span class="text">Delete</span>
                        </button>

                    </td>
                </tr>
            </tbody>
        </table>

        <router-view></router-view>
    </div>
</template>

<script setup>
import '@/assets/vendor/datatables/jquery.dataTables'
import '@/assets/vendor/datatables/dataTables.bootstrap4'
import '@/assets/js/demo/datatables-demo'

import axios from 'axios';

import { onBeforeMount, ref } from 'vue';

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

    async function  deleteProduct(productId) {
      try {
        const confirmed = confirm("Are you sure you want to delete this product?");
        if (!confirmed) return;

        await axios.delete(`http://localhost:3000/products/${productId}`);

        alert("Product deleted successfully!");
      } catch (error) {
        console.error("Failed to delete product:", error);
        alert("Failed to delete product.");
      }
    }
</script>