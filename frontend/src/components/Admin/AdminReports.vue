<script setup>
import {
  MDBTabs,
  MDBTabNav,
  MDBTabContent,
  MDBTabItem,
  MDBTabPane,
} from 'mdb-vue-ui-kit';
import { ref } from 'vue';
import MonthlyOrdersReport from './reports/MonthlyOrdersReport.vue';
import ReferenceReport from './reports/ReferenceReport.vue';
import OrderStatusReport from './reports/OrderStatusReport.vue';
import CompletedOrdersReport from './reports/CompletedOrdersReport.vue';
import OrderPickupsReport from './reports/OrderPickupsReport.vue';
const activeTabId = ref('monthly-orders');
</script>


<template>
<section id="admin-reports">
  <h1>Reports</h1>

  <MDBTabs v-model="activeTabId">
    <!-- Tabs navs -->
    <MDBTabNav justify tabsClasses="mb-3 tab-nav">
      <MDBTabItem tabId="monthly-orders" href="monthly-orders"><span class="menu-tab"> Monthly Orders </span></MDBTabItem>
      <MDBTabItem tabId="referral-count" href="referral-count"><span class="menu-tab"> References </span></MDBTabItem>
      <MDBTabItem tabId="completed-orders" href="completed-orders"><span class="menu-tab"> Completed Orders </span></MDBTabItem>
      <MDBTabItem tabId="order-status" href="order-status"><span class="menu-tab"> Order Statuses </span></MDBTabItem>
      <MDBTabItem tabId="order-pickups" href="order-pickups"><span class="menu-tab"> Order Pickups </span></MDBTabItem>
    </MDBTabNav>
    <!-- Tabs content -->
    <MDBTabContent>

      <MDBTabPane class="tab-container" tabId="monthly-orders">
        <MonthlyOrdersReport />
      </MDBTabPane>

      <MDBTabPane class="tab-container" tabId="referral-count">
        <ReferenceReport />
      </MDBTabPane>

      <MDBTabPane class="tab-container" tabId="completed-orders">
        <CompletedOrdersReport />
      </MDBTabPane>

      <MDBTabPane class="tab-container" tabId="order-status">
        <OrderStatusReport />
      </MDBTabPane>

      <MDBTabPane class="tab-container" tabId="order-pickups">
        <OrderPickupsReport />
      </MDBTabPane>

    </MDBTabContent>

  </MDBTabs>

</section>
</template>


<style scoped>
#admin-reports * {
  font-family: 'Poppins', sans-serif;
}
#referral-table {
  max-width: 600px;
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
.tab-container{
  display: grid;
  place-items: center;
}
</style>