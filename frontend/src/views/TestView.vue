<script setup>
import { ref, computed } from 'vue';
import CustomerAPI from '../../services/CustomerAPI';

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

// Get Status Descriptions from Order_Status
/* const customerStatuses = ref([]);
const getCustomerStatuses = async () => {
  try {
    const response = await CustomerAPI.getStatusDescriptions();
    customerStatuses.value = response.data;
  } catch(err) {
    console.log(err);
  }
}
getCustomerStatuses(); */

/* Implement Computed Sorted Table */
// const statusFilter = {
//   all: (customers) => customers,
//   active: (customers) => customers.filter((cust) => cust.statusID == 1),
//   inactive: (customers) => customers.filter((cust) => cust.statusID == 2),
//   new: (customers) => customers.filter((cust) => cust.statusID == 3),
// }
// const visibility = ref('all')

// const filteredCustomers = computed(() => statusFilter[visibility.value](adminCustomers.value));

</script>


<template>
<section id="admin-customers">

  <!-- !Maybe move Order Modal into its own component -->
  <div v-if="showModal" class="overlay">
    <div class="modal">
      <!-- Modal Header -->
      <div class="top-row">
        <h5>Order Details</h5>
        <button @click="showModal = false" type="button" class="order-modal-close btn-close" aria-label="Close"></button>
      </div>

      <!-- Table Row for Customer Details -->
      <table class="table table-sm table-bordered customer-details">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
          </tr>
        </thead>
        <tbody>
          <tr class="table-light">
            <th scope="row">Customer</th>
            <td>{{ orderModal.first_name }}</td>
            <td>{{ orderModal.last_name }}</td>
            <td>{{ orderModal.email }}</td>
            <td>{{ orderModal.phone }}</td>
          </tr>
        </tbody>
      </table>

      <!-- Table Row for Order Details -->
      <table class="table table-bordered order-details">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Order Date</th>
            <th scope="col">Cake Type</th>
            <th scope="col">Flavor</th>
            <th scope="col">Status</th>
            <th scope="col">Desired Date</th>
          </tr>
        </thead>
        <tbody>
          <tr class="table-light">
            <th scope="row">{{ orderModal.orderID }}</th>
            <td>{{ orderModal.order_date }}</td>
            <td>{{ orderModal.type }}</td>
            <td>{{ orderModal.flavor }}</td>
            <td>{{ orderModal.description }}</td>
            <td>{{ orderModal.desired_date }}</td>
          </tr>
        </tbody>
      </table>
      <table class="table table-bordered set-table-layout">
        <thead>
          <tr class="d-flex">
            <th scope="col" class="col-6">Cake Design</th>
            <th scope="col" class="col-6">Pick Up Details</th>
          </tr>
        </thead>
        <tbody>
          <tr class="table-light d-flex">
            <td class="col-6">{{ orderModal.cake_details }}</td>
            <td class="col-6">{{ orderModal.pick_up_details }}</td>
          </tr>
        </tbody>
      </table>

      <!-- Edit Form -->
      <h5>Update Status</h5>
      <!-- Status Selection Input Field -->
      <select v-model="orderModal.statusID" class="form-select form-select-sm" aria-label=".form-select-sm">
        <option disabled value="">Select a Status</option>
        <option v-for="status in orderStatuses" :value="status.statusID" >
            {{ status.description }}
        </option>
      </select>

      <h5 class="pickup-title">Update Pick Up Details</h5>
      <textarea v-model="orderModal.pick_up_details" class="form-control" rows="3"></textarea>
      <!-- Form Submissions -->
      <button class="order-modal-submit" @click="saveChanges">Save Changes</button>
    </div>
  </div>

</section>
</template>


<style scoped>
#admin-customers * {
  font-family: "Poppins", sans-serif;
}
#admin-customers h4 {
  font-style: italic;
  color: #be123c;
  font-size: 18px;
}

#admin-customer-table {
  margin-top: 20px;
}

</style>