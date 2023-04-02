<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import OrderAPI from '../../services/OrderAPI';
import VueTableLite from 'vue3-table-lite';

// Get Order View
const adminOrders = ref([]);
const getAdminOrders = async () => {
  try {
    const response = await OrderAPI.getAdminOrderView();
    adminOrders.value = response.data;
  } catch(err) {
    console.log(err);
  }
}
getAdminOrders();

// TableLite Setup
const searchTerm = ref("");

//Table config
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
      label: "First",
      field: "first_name",
      width: "6%",
      sortable: true,
    },
    {
      label: "Last",
      field: "last_name",
      width: "7%",
      sortable: true,
    },
    {
      label: "Email",
      field: "email",
      width: "10%",
      sortable: true,
    },
    // {
    //   label: "Phone",
    //   field: "phone",
    //   width: "2%",
    // },
    {
      label: "Type",
      field: "type",
      width: "8%",
    },
    {
      label: "Flavor",
      field: "flavor",
      width: "6%",
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
    return adminOrders.value.filter(
      (x) =>
        x.order_date.includes(searchTerm.value) ||
        x.first_name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        x.last_name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        x.email.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
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
<section id="admin-orders">
  <h1>Orders</h1>
  <h4>*Click on an Order to update or see details*</h4>

  <div class="searchbox">
    <label>Search By:</label> <input v-model="searchTerm" />
  </div>
  <!-- Admin Order Table -->
  <VueTableLite
    id="admin-order-table"
    :is-static-mode="true"
    :columns="table.columns"
    :rows="table.rows"
    :total="table.totalRecordCount"
    :sortable="table.sortable"
    @row-clicked="rowClicked"
  ></VueTableLite>

</section>
</template>


<style scoped>
#admin-orders * {
  font-family: "Poppins", sans-serif;
}
#admin-orders h1 {
  font-size: 27px;
  font-weight: 600;
}
#admin-orders h4 {
  font-style: italic;
  color: #be123c;
  font-size: 18px;
}

#admin-order-table {
  margin-top: 10px;
  font-size: 15px;
}

.searchbox {
  margin-top: 20px;
  text-align: left;
}

.searchbox label {
  font-weight: bold;
  margin-right: 5px;
}

textarea {
  min-height: 100px;
}

</style>