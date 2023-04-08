<script setup>
import { ref, computed } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import CustomerAPI from '../../services/CustomerAPI';
import VueTableLite from 'vue3-table-lite';

// Get Customer View
const adminCustomers = ref([]);
const getAdminCustomers = async () => {
  try {
    const response = await CustomerAPI.getAdminCustomerView();
    adminCustomers.value = response.data;
  } catch(err) {
    console.log(err);
  }
}
getAdminCustomers();

// Get Status Descriptions from Customer_Status
const customerStatuses = ref([{statusID: 0, description: 'All'}]);
const getCustomerStatuses = async () => {
  try {
    const response = await CustomerAPI.getStatusDescriptions();
    //orderStatuses.value = response.data;
    response.data.forEach((item) => customerStatuses.value.push(item));
  } catch(err) {
    console.log(err);
  }
}
getCustomerStatuses();
// Show 'status' filter
const selectedStatus = ref(0);
const filteredStatuses = computed(() => {
  if (selectedStatus.value == 0) return adminCustomers.value;
  
  return adminCustomers.value.filter((customer) => customer.statusID == selectedStatus.value);
})

// TableLite Setup
const searchTerm = ref("");

// Table config
const table = ref({
  columns: [
    {
      label: "ID",
      field: "customerID",
      width: "1%",
      sortable: true,
      isKey: true,
    },
    {
      label: "First",
      field: "first_name",
      width: "10%",
      sortable: true,
    },
    {
      label: "Last",
      field: "last_name",
      width: "10%",
      sortable: true,
    },
    {
      label: "Email",
      field: "email",
      width: "10%",
      sortable: true,
    },
    {
      label: "Phone",
      field: "phone",
      width: "5%",
      display: (row) => {
        return (
          row.phone.replace(/\D+/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
        )
      }
    },
    {
      label: "Status",
      field: "description",
      width: "5%",
      sortable: true,
    },
  ],
  rows: computed(() => {
    return filteredStatuses.value.filter(
      (x) =>
        x.first_name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        x.last_name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        x.email.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        x.phone.includes(searchTerm.value) ||
        x.description.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
  }),
  totalRecordCount: computed(() => {
    return table.value.rows.length;
  }),
  sortable: {
    order: "last_name",
    sort: "asc",
  },
})

// Route to updateCustomer Component
const router = useRouter();

const rowClicked = (row) => {
  //router.push({ name: 'update-customer', params: { id: row.customerID } });
  router.push({ name: 'customer-details', params: { id: row.customerID } });
}

</script>


<template>
<section id="admin-customers">
  <h1>Customers</h1>
  <h4>*Click on a Customer to update or see details*</h4>

  <div class="input-container">
    <div class="searchbox">
      <label>Show:
        <select v-model="selectedStatus">
          <option v-for="status in customerStatuses" :key="status.statusID" :value="status.statusID" >
            {{ status.description }}
          </option>
        </select>Customers
      </label>

      <label class="search-by-label">Search By:</label> <input v-model="searchTerm" />
    </div>
    <RouterLink to="/admin/customer-form">
      <button type="button" class="btn btn-primary">+ Add Customer</button>
    </RouterLink>
  </div>

  <VueTableLite
    id="admin-customer-table"
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
#admin-customers {
  padding: 10px 40px;
}
#admin-customers * {
  font-family: "Poppins", sans-serif;
}

#admin-customers h1 {
  font-size: 28px;
  font-weight: 600;
}

#admin-customers h4 {
  font-style: italic;
  color: #be123c;
  font-size: 18px;
}
#admin-customers button {
  font-size: 16px;
}

#admin-customer-table {
  margin-top: 14px;
  font-size: 16px;
}

.searchbox {
  text-align: left;
  padding-top: 10px;
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

.input-container {
  display: flex;
  align-items: center;
  margin-top: 12px;
  justify-content: space-between;
  padding-right: 20px;
}

</style>