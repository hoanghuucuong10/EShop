<template>
    <div>
        <!-- DataTales Example -->
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">Products</h6>
                <router-link :to="{ name: 'CreateProduct'}" class="btn btn-primary btn-icon-split">
                    <span class="icon text-white-50">
                        <i class="fas fa-plus"></i>
                    </span>
                    <span class="text">New Product</span>
                </router-link>

                
                <button @click="openForm">Add Product</button>
                <AddProductForm ref="addProductForm" />
            </div>
            <div class="card-body">
                <tableProduct></tableProduct>
            </div>
        </div>
    </div>
</template>

<script setup>
import tableProduct from './listProducts.vue'
import { ref } from 'vue';
import AddProductForm from './teleportFormProduct.vue';

const addProductForm = ref(null);

function openForm() {
    addProductForm.value.openForm(); 
}
</script>

<style>
.card-header {
    display: flex;
    justify-content: space-between; /* Đặt khoảng cách giữa các phần tử */
    align-items: center; /* Căn giữa theo trục dọc */
    padding: 1rem; /* Tuỳ chỉnh khoảng cách padding nếu cần */
}

h6 {
    margin: 0; /* Đảm bảo thẻ h6 không có khoảng cách thừa */
}

.btn {
    margin-left: auto; /* Đẩy nút sang bên phải */
}
</style>