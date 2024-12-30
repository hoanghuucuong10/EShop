<template>
    <div>
        <Header />
        <Sidebar />
        <main>
            <router-view /> <!-- Nội dung của từng trang sẽ được hiển thị ở đây -->
        </main>
        <Footer />
    </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Sidebar from '@/components/Sidebar.vue';

export default {
    components: {
        Header,
        Footer,
        Sidebar,
    },
};
</script>