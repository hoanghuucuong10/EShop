<template>
    <div class="table-responsive">
        <table class="table table-bordered" id="dataTable" cellspacing="0">
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
                <tr v-for="product in products">
                    <td>{{ product.name }}</td>
                    <td>{{ product.type }}</td>
                    <td>{{ product.price }}</td>
                    <td>{{ product.description }}</td>
                    <td>{{ product.quantity }}</td>
                    <td>
                        <router-link :to="{ name: 'ProductDetails', params: { id: product.id } }" class="btn btn-success btn-icon-split" title="Nested routing view (detail)">
                            <span class="text">Details</span>
                        </router-link>
                        <router-link :to="{ name: 'UpdateProduct', params: { id: product.id } }" class="btn btn-info btn-icon-split" title="Nested routing edit (form)">
                            <span class="text" >Edit</span>
                        </router-link>
                        <button class="btn btn-primary btn-icon-split" @click="deleteProduct(product.id)">
                            <span class="text">Delete</span>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="col-md-5">
        <router-view :key="$route.params.id"></router-view>
    </div>
</template>

<style scoped>
    .btn-icon-split {
        margin: 5px;
    }
</style>

<script setup>
    import '@/assets/vendor/datatables/jquery.dataTables'
    import '@/assets/vendor/datatables/dataTables.bootstrap4'
    import '@/assets/js/demo/datatables-demo'

    import { onBeforeMount, ref } from 'vue';

    import axiosInstance from '@/untils/axiosInstance';

    const products = ref([]);

    onBeforeMount(async () => {
        try {
            const response = await axiosInstance.get('products');
            products.value = response.data;
        } catch (error) {
            console.error('Failed to load products');
            console.error(error);
        }
    });

    async function  deleteProduct(productId) {
      try {
        const confirmed = confirm("Are you sure you want to delete this product?");
        if (!confirmed) return;
        
        await axiosInstance.delete(`http://localhost:3000/products/${productId}`);

        alert("Product deleted successfully!");
      } catch (error) {
        console.error("Failed to delete product:", error);
        alert("Failed to delete product.");
      }
    }
</script>