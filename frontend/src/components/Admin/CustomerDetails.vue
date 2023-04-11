<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import {
  MDBTabs,
  MDBTabNav,
  MDBTabContent,
  MDBTabItem,
  MDBTabPane,
} from 'mdb-vue-ui-kit';
import UpdateCustomer from './UpdateCustomer.vue';
import CustomerOrders from './CustomerOrders.vue';
import OrderForm from './OrderForm.vue';

const props = defineProps({
  id: String,
})

const router = useRouter();

const activeTabId = ref('update-customer');

</script>


<template>
<section id="customer-details">

  <div class="section-title d-flex justify-content-between">
    <button @click="router.go(-1)" class="go-back-btn" type="button">Go Back</button>
    <h2>Customer Details</h2>
    <div></div>
  </div>

  <MDBTabs v-model="activeTabId">
    <!-- Tabs navs -->
    <MDBTabNav justify tabsClasses="mb-3 tab-nav">
      <MDBTabItem tabId="update-customer" href="update-customer"><span class="menu-tab"> Edit Customer Details </span></MDBTabItem>
      <MDBTabItem tabId="order-form" href="order-form"><span class="menu-tab"> Add New Order </span></MDBTabItem>
      <MDBTabItem tabId="order-history" href="order-history"><span class="menu-tab"> Order History </span></MDBTabItem>
    </MDBTabNav>
    <!-- Tabs content -->
    <MDBTabContent>

      <MDBTabPane tabId="update-customer">
        <UpdateCustomer :id="props.id" />
      </MDBTabPane>

      <MDBTabPane tabId="order-form">
        <OrderForm :customer-id="props.id" />
      </MDBTabPane>

      <MDBTabPane tabId="order-history">
        <CustomerOrders :customer-id="props.id" />
      </MDBTabPane>

    </MDBTabContent>

  </MDBTabs>

</section>
</template>


<style scoped>
#customer-details * {
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

.section-title h2 {
  text-align: center;
  color: #262626;
  margin-right: 5rem;
}

.go-back-btn {
  background: #e11d48;
  border: 0;
  padding: 10px 24px;
  color: #fff;
  transition: 0.4s;
  border-radius: 10px;
  align-self: center;
  max-width: max-content;
}
.go-back-btn:hover {
  background: #be123c;
}
</style>