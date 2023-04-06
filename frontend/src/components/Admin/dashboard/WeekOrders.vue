<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import OrderAPI from '../../../services/OrderAPI';
import VueTableLite from 'vue3-table-lite';

const router = useRouter();

// Get Order View
const ordersThisWeek = ref([]);
const getOrdersThisWeek = async () => {
  try {
    const response = await OrderAPI.getOrdersThisWeek();
    ordersThisWeek.value = response.data;
  } catch(err) {
    console.log(err);
  }
}
getOrdersThisWeek();

const orderCount = computed(() => ordersThisWeek.value.length);

// Get Status Descriptions from Order_Status
const orderStatuses = ref([{statusID: 0, description: 'All'}]);
const getOrderStatuses = async () => {
  try {
    const response = await OrderAPI.getStatusDescriptions();
    //orderStatuses.value = response.data;
    response.data.forEach((item) => orderStatuses.value.push(item));
  } catch(err) {
    console.log(err);
  }
}
getOrderStatuses();

// Show 'status' filter
const selectedStatus = ref(0);
const filteredStatuses = computed(() => {
  if (selectedStatus.value == 0) return ordersThisWeek.value;
  
  return ordersThisWeek.value.filter((order) => order.statusID == selectedStatus.value);
})

// TableLite Setup
const searchTerm = ref("");

//Table config
const table = ref({
  columns: [
    {
      label: "#",
      field: "orderID",
      width: "1%",
      isKey: true,
    },
    {
      label: "Order Date",
      field: "order_date",
      width: "3%",
      sortable: true,
    },
    {
      label: "Customer",
      field: "Customer",
      width: "5%",
      sortable: true,
    },
    /* {
      label: "Phone",
      field: "phone",
      width: "5%",
      display: (row) => {
        return (
          row.phone.replace(/\D+/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
        )
      }
    }, */
    {
      label: "Type",
      field: "type",
      width: "8%",
      sortable: true,
    },
    {
      label: "Flavor",
      field: "flavor",
      width: "4%",
    },
    {
      label: "Status",
      field: "description",
      width: "1%",
      sortable: true,
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
    return filteredStatuses.value.filter(
      (x) =>
        x.order_date.includes(searchTerm.value) ||
        x.Customer.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        x.phone.includes(searchTerm.value) ||
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
    order: "order_date",
    sort: "asc",
  },
})


const rowClicked = (row) => {
  router.push({ name: 'update-order', params: { id: row.orderID } });
}

</script>


<template>
<div class="searchbox">
  <label>Show:
    <select v-model="selectedStatus">
      <option v-for="status in orderStatuses" :key="status.statusID" :value="status.statusID" >
        {{ status.description }}
      </option>
    </select>Orders
  </label>

  <label class="search-by-label">Search By:</label> <input v-model="searchTerm" />

</div>
<!-- Admin Order Table -->
<VueTableLite
  id="week-order-table"
  :is-static-mode="true"
  :columns="table.columns"
  :rows="table.rows"
  :total="table.totalRecordCount"
  :sortable="table.sortable"
  @row-clicked="rowClicked"
></VueTableLite>

</template>


<style scoped>
#week-order-table {
  font-size: 14px;
}

.searchbox {
  margin-bottom: 10px;
  text-align: left;
}

label.search-by-label {
  margin-left: 10px;
}

select {
  max-width: max-content;
  height: 32px;
  margin-right: 5px;
}

.searchbox label {
  font-weight: bold;
  margin-right: 5px;
}

</style>