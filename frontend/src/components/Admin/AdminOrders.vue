<script setup>
import { ref, reactive, computed } from 'vue';
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

  <div class="searchbox" style="text-align: left">
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

.set-table-layout {
  table-layout: fixed;
  word-wrap: break-word;
}

.searchbox {
  margin-top: 20px;
}

.searchbox label {
  font-weight: bold;
  margin-right: 5px;
}

.overlay {
  position: absolute;
  width: 83%;
  height: 75%;
  background-color: rgba(0, 0, 0, 0.77);
  z-index: 10;
  display: grid;
  place-items: start center;
}

.modal {
  max-width: 825px;
  max-height: 650px;
  background-color: #e2e8f0;
  border-radius: 10px;
  margin-top: 5px;
  padding: 15px;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: auto;
  
}

.modal h5 {
  color: #2563eb;
  align-self: center;
  font-weight: bolder;
}
.modal select {
  width: auto;
  align-self: center;
}

.modal .order-modal-submit {
  padding: 10px 20px;
  font-size: 16px;
  width: 50%;
  background-color: green;
  border: none;
  color: white;
  cursor: pointer;
  margin-top: 15px;
  align-self: center;
  border-radius: 20px;
}

.modal table {
  margin-top: 10px;
}

.modal .top-row {
  display: flex;
  /* justify-content: center; */
}

.top-row h5 {
  margin-left: 330px;
}
.top-row button {
  margin-left: auto;
}

.modal .order-modal-close {
  background-color: red;
  border-radius: 50%;
  padding: 9px -9px 0px 9px;
}

.pickup-title {
  margin-top: 15px;
}

textarea {
  min-height: 100px;
}

</style>