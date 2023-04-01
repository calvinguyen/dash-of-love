<script setup>
import { ref, reactive } from 'vue';
import OrderAPI from '../../services/OrderAPI';

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

// Get Status Descriptions from Order_Status
const orderStatuses = ref([]);
const getOrderStatuses = async () => {
  try {
    const response = await OrderAPI.getStatusDescriptions();
    orderStatuses.value = response.data;
  } catch(err) {
    console.log(err);
  }
}
getOrderStatuses();

const orderModal = reactive({
  orderID: "",
  order_date: "",
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  type: "",
  flavor: "",
  cake_details: "",
  statusID: "",
  description: "",
  desired_date: "",
  pick_up_details: "",
})

const showModal = ref(false);

const toggleModal = (order, callback) => {
  for (const key in orderModal) {
    orderModal[key] = order[key]
  }
  orderModal.order_date = new Date(order.order_date).toLocaleDateString('fr-CA');
  orderModal.desired_date = new Date(order.desired_date).toLocaleDateString('fr-CA');

  showModal.value = true;
}

const updateAdminOrder = async () => {
  try {
    let data = {
      statusID: orderModal.statusID,
      pick_up_details: orderModal.pick_up_details
    }
    const response = await OrderAPI.updateOrder(orderModal.orderID, data);
    return response.data;
  } catch(err) {
    console.log(err);
  }
}

const saveChanges = () => {
  updateAdminOrder()
    .then((res) => {
      let index = adminOrders.value.findIndex(order => order.orderID == res.orderID);
      adminOrders.value[index].statusID = res.statusID;
      // find orderstatus that matches new res.statusID 
      let orderStatus = orderStatuses.value.find(status => status.statusID == res.statusID);
      adminOrders.value[index].description = orderStatus.description;
      adminOrders.value[index].pick_up_details = res.pick_up_details;
    })
    .then(() => showModal.value = false)
}

</script>


<template>
<section id="admin-orders">
  <h1>Orders</h1>
  <h4>*Click on an order to update or see details*</h4>
  <!-- !Maybe move Order Modal into its own components -->
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
      <table class="table table-sm table-bordered">
        <thead>
          <tr>
            <th scope="col">Cake Design</th>
            <th scope="col">Pick Up Details</th>
          </tr>
        </thead>
        <tbody>
          <tr class="table-light">
            <td>{{ orderModal.cake_details }}</td>
            <td>{{ orderModal.pick_up_details }}</td>
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

  <!-- Admin Order Table -->
  <table id="admin-order-table" class="table table-hover table-striped">
    <thead>
      <tr>
        <!-- 11 columns -->
        <th scope="col">ID</th>
        <th scope="col">Order Date</th>
        <th scope="col">First</th>
        <th scope="col">Last</th>
        <th scope="col">Email</th>
        <th scope="col">Phone</th>
        <th scope="col">Type</th>
        <th scope="col">Flavor</th>
        <th scope="col">Details</th>
        <th scope="col">Status</th>
        <th scope="col">Desired Date</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="order in adminOrders" :key="order.orderID" @click="toggleModal(order)">
        <th scope="row">{{ order.orderID }}</th>
        <td>{{ new Date(order.order_date).toLocaleDateString('fr-CA') }}</td>
        <td>{{ order.first_name }}</td>
        <td>{{ order.last_name }}</td>
        <td>{{ order.email }}</td>
        <td>{{ order.phone }}</td>
        <td>{{ order.type }}</td>
        <td>{{ order.flavor }}</td>
        <td>{{ order.cake_details }}</td>
        <td>{{ order.description }}</td>
        <td>{{ new Date(order.desired_date).toLocaleDateString('fr-CA') }}</td>
      </tr>
    </tbody>
  </table>

</section>
</template>


<style scoped>
#admin-orders * {
  font-family: "Poppins", sans-serif;
}
#admin-orders h4 {
  font-style: italic;
  color: #be123c;
  font-size: 18px;
}

#admin-order-table {
  margin-top: 20px;
}

.overlay {
  position: absolute;
  width: 84%;
  height: 75%;
  background-color: rgba(0, 0, 0, 0.77);
  z-index: 10;
  display: grid;
  place-items: start center;
}

.modal {
  width: max-content;
  max-height: 600px;
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
}

.top-row h5 {
  margin-left: 250px;
}
.top-row button {
  margin-left: auto;
}

.modal .order-modal-close {
  background-color: red;
  /* margin-top: 7px; */
  /* max-width: fit-content; */
  border-radius: 50%;
  padding: 5px 7px 5px 4px;
}

.pickup-title {
  margin-top: 15px;
}

</style>