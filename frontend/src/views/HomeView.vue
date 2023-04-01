<script setup>
/* Import Homepage components */
import HomeFooter from '../components/HomeFooter.vue';
import HomeCarousel from '../components/HomeCarousel.vue';
import HomeAbout from '../components/HomeAbout.vue';
import HomeMenu from '../components/HomeMenu.vue';
import OrderForm from '../components/OrderForm.vue';
import HomeGallery from '../components/HomeGallery.vue';
import HomeLinks from '../components/HomeLinks.vue';
import HomeTopbar from '../components/HomeTopbar.vue';


/* Import dependencies */
import { ref } from 'vue';
import productMenuAPI from '../services/productMenuAPI';

/* Get Product Menu data -> pass to child props */
const cakeTypes = ref([]);
const getCakeTypes = async () => {
  try {
    const response = await productMenuAPI.getActiveCakeTypes();
    cakeTypes.value = response.data;
  } catch(err) {
    console.log(err);
  }
}
getCakeTypes();

const cakeFlavors = ref([]);
const getCakeFlavors = async () => {
  try {
    const response = await productMenuAPI.getActiveMenuFlavors();
    cakeFlavors.value = response.data;
  } catch(err) {
    console.log(err)
  }
}
getCakeFlavors();

</script>


<template>
<div id="body">
  <!-- ======= Top Bar ======= -->
  <HomeTopbar />


  <!-- ======= Hero ======= -->
  <HomeCarousel />


  <!-- ======= Main body ======= -->
  <main id="main">
    <HomeAbout />
    <HomeMenu :cake-types="cakeTypes" :cake-flavors="cakeFlavors" />
    <OrderForm />
    <HomeGallery />
    <HomeLinks />
  </main>

  <!-- ======= Footer ======= -->
  <HomeFooter />

</div>
</template>



<style scoped>
/* @import "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"; */
@import "../assets/css/home.css";
</style>