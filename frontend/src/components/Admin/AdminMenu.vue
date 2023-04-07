<script setup>
import {
  MDBTabs,
  MDBTabNav,
  MDBTabContent,
  MDBTabItem,
  MDBTabPane,
} from 'mdb-vue-ui-kit';
import { ref } from 'vue';
import productMenuAPI from '../../services/productMenuAPI';
import HomeMenu from '../HomeMenu.vue';
import MenuTypes from './MenuTypes.vue';
import MenuFlavors from './MenuFlavors.vue';

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

const activeTabId = ref('menu');

</script>


<template>
<section id="admin-menu">
  <!-- NavBar with CakeType and Flavor Tab -->

  <MDBTabs v-model="activeTabId">
    <!-- Tabs navs -->
    <MDBTabNav justify tabsClasses="mb-3 tab-nav">
      <MDBTabItem tabId="menu" href="menu"><span class="menu-tab"> Menu </span></MDBTabItem>
      <MDBTabItem tabId="types" href="types"><span class="menu-tab"> Cake Types </span></MDBTabItem>
      <MDBTabItem tabId="flavors" href="flavors"><span class="menu-tab"> Flavors </span></MDBTabItem>
    </MDBTabNav>
    <!-- Tabs content -->
    <MDBTabContent>

      <MDBTabPane tabId="menu">
        <HomeMenu :cake-types="cakeTypes" :cake-flavors="cakeFlavors" />
      </MDBTabPane>

      <MDBTabPane tabId="types">
        <MenuTypes />
      </MDBTabPane>

      <MDBTabPane tabId="flavors">
        <MenuFlavors />
      </MDBTabPane>

    </MDBTabContent>

  </MDBTabs>

</section>
</template>


<style scoped>
#admin-menu * {
  font-family: "Poppins", sans-serif;
}

section {
  padding: 30px 0;
}

.menu-tab {
  font-size: 20px;
  font-weight: 600;
}

.tab-nav {
  box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.12);
}

</style>