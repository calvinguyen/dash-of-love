<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref, computed } from 'vue';
import OrderAPI from '../../services/OrderAPI';
import VueTableLite from 'vue3-table-lite';

const props = defineProps({
  customerId: String,
});

// Get order history
const orderHistory = ref([]);
const getOrderHistory = async () => {
  try {
    const response = await OrderAPI.getCustomerOrders(props.customerId);
    orderHistory.value = response.data;
  } catch(err) {
    console.log(err);
  }
};
getOrderHistory();

// Table Setup
const searchTerm = ref("");

const table = ref({
  columns: [
    {
      label: "ID",
      field: "orderID",
      width: "1%",
      sortable: true,
      isKey: true,
    },
    {
      label: "Order Date",
      field: "order_date",
      width: "5%",
      sortable: true,
    },
    {
      label: "Type",
      field: "type",
      width: "8%",
      sortable: true,
    },
    {
      label: "Flavor",
      field: "flavor",
      width: "6%",
      sortable: true,
    },
    {
      label: "Status",
      field: "description",
      width: "5%",
      sortable: true,
    },
    {
      label: "Desired Date",
      field: "desired_date",
      width: "5%",
      sortable: true,
    },
  ],
  rows: computed(() => {
    return orderHistory.value.filter(
      (x) =>
        x.order_date.includes(searchTerm.value) ||
        x.type.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        x.flavor.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        x.description.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        x.desired_date.includes(searchTerm.value)
    );
  }),
  totalRecordCount: computed(() => {
    return table.value.rows.length;
  }),
  sortable: {
    order: "orderID",
    sort: "desc",
  },
})

const router = useRouter();

const rowClicked = (row) => {
  router.push({ name: 'update-order', params: { id: row.orderID } });
}

</script>


<template>
<section id="order-history">
<div class="container">

  <div class="section-title">
    <h2>Order History</h2>
  </div>
  <h4>*Click on an Order to update or see details*</h4>

  <div class="searchbox" style="text-align: left">
    <label>Search By:</label> <input v-model="searchTerm" />
  </div>
  <!-- Order History Table -->
  <VueTableLite
    id="customer-order-table"
    :is-static-mode="true"
    :columns="table.columns"
    :rows="table.rows"
    :total="table.totalRecordCount"
    :sortable="table.sortable"
    @row-clicked="rowClicked"
  ></VueTableLite>

</div>
</section>
</template>


<style scoped>
#order-history * {
  font-family: "Poppins", sans-serif;
}

#order-history h4 {
  font-style: italic;
  color: #be123c;
  font-size: 18px;
}

.section-title h2 {
  text-align: center;
  color: #262626;
}

#customer-order-table {
  margin-top: 10px;
}

.searchbox label {
  font-weight: bold;
  margin-right: 5px;
}

</style>