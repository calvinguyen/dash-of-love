<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref, reactive, computed, onBeforeMount } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, maxLength, numeric, helpers } from '@vuelidate/validators';
import OrderAPI from '../../services/OrderAPI';
import CustomerAPI from '../../services/CustomerAPI';
import ReferralAPI from '../../services/ReferralAPI';
import productMenuAPI from '../../services/productMenuAPI';
import Swal from 'sweetalert2';

const props = defineProps({
  id: String,
})

const route = useRoute();
const router = useRouter();

// Get customer details
const customer = ref({
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
});
const getCustomer = async (custID) => {
  try {
    const response = await CustomerAPI.getCustomerById(custID);
    customer.value = response.data;
  } catch(err) {
    console.log(err);
  }
};

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
// Get referrals
const referrals = ref([]);
const loadReferrals = async () => {
  try {
    const response = await ReferralAPI.getReferrals();
    referrals.value = response.data;
  } catch(err) {
    console.log(err);
  }
}
loadReferrals();
// Get cake types and flavors
const cakeTypes = ref([]);
const selectedCakeType = ref({ typeID: "" });
const getCakeTypes = async () => {
  try {
    const response = await productMenuAPI.getActiveCakeTypes();
    cakeTypes.value = response.data;
  } catch(err) {
    console.log(err);
  }
}
getCakeTypes();
// Get all flavor options
const flavors = ref([]);
const getFlavors = async () => {
  try {
    const response = await productMenuAPI.getActiveMenuFlavors();
    flavors.value = response.data.filter(item => item.typeID == selectedCakeType.value.typeID)
  } catch(err) {
    console.log(err);
  }
}
// Get today's date to set minimum date input
// const currentDate = computed(() => new Date().toLocaleDateString('fr-CA'));

// order form data
const formData = reactive({
  cakesID: "",
  referralID: "",
  cake_details: "",
  statusID: "",
  desired_date: "",
  pick_up_details: "",
  final_price: "",
});

// get order
const order = ref({ order_date: "" });
const getOrder = async () => {
  try {
    const response = await OrderAPI.getFullOrderDetailsById(route.params.id);
    order.value = response.data;

    for (const key in formData) {
      formData[key] = response.data[key];
    };
    return order.value;
  } catch(err) {
    console.log(err);
  }
};

// Set form validation rules
const usCurrency = helpers.regex(/^[0-9]\d{0,9}(\.\d{1,2})?%?$/);

const rules = computed(() => {
  return {
    formData: {
      cakesID: { required },
      referralID: { required },
      cake_details: { required, maxLength: maxLength(750) },
      statusID: { required },
      desired_date: { required },
      pick_up_details: { maxLength: maxLength(750) },
      final_price: { 
        usCurrency: helpers.withMessage('Value must be a US currency', usCurrency)
      },
    },
    selectedCakeType: {
      typeID: { required }
    }
  }
});
const v$ = useVuelidate(rules, { formData, selectedCakeType }, { $autoDirty: true });

// Form submission
const handleOrderUpdate = async () => {
  const isValid = await v$.value.$validate();
  //notify user form is invalid
  if (!isValid) {
    Swal.fire({
      icon: 'error',
      title: '<h3 style="font-family: Poppins, sans-serif"> Order Update Failed </h3>',
      text: 'Please check your inputs!',
    });
    return
  }
  OrderAPI.updateOrderById(route.params.id, formData)
    .then(() => {
      Swal.fire({
      icon: 'success',
      title: '<h3 style="font-family: Poppins, sans-serif"> Order Update Success! </h3>',
      text: 'Order changes were saved!',
    });
    })
    .catch(err => console.log(err));
};

onBeforeMount(() => {
  getOrder()
    .then((res) => {
      selectedCakeType.value.typeID = res.typeID;
      getCustomer(res.customerID);
    })
    .then(() => getFlavors())
});
</script>


<template>
<section id="update-order">
<div class="container">

  <div class="section-title d-flex justify-content-between">
    <button @click="router.go(-1)" class="go-back-btn" type="button">Go Back</button>
    <h2>Update Order</h2>
    <div></div>
  </div>

  <div class="customer-details">
    <h5>Customer Details</h5>
    <table class="table table-sm table-bordered">
      <thead class="table-dark">
        <tr>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
          </tr>
      </thead>
      <tbody>
        <tr>
            <td>{{ customer.first_name }}</td>
            <td>{{ customer.last_name }}</td>
            <td>{{ customer.email }}</td>
            <td>
              {{ customer.phone.replace(/\D+/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3') }}
            </td>
        </tr>
      </tbody>
    </table>
  </div>

  <form @submit.prevent="handleOrderUpdate" class="request-form">
    <div class="row">
      <h5>Order Date: {{ order.order_date }}</h5>

      <!-- Cake Type Field  -->
      <div class="col-lg-4 col-md-6 form-group mt-3">
        <label for="cakeType" class="form-label">Cake Type</label>
        <span 
          v-for="error of v$.selectedCakeType.typeID.$errors"
          :key="error.$uid"
          class="error-container"
        >
          *{{ error.$message }}
        </span>
        <select v-model="selectedCakeType.typeID" @change="getFlavors" class="form-select" id="cakeType">
          <option disabled value="">Please select one</option>
          <option v-for="cake in cakeTypes" :key="cake.typeID" :value="cake.typeID" >
            {{ cake.type }}
          </option>
        </select>
      </div>
      
      <!-- Cake Flavor Field -->
      <div class="col-lg-4 col-md-6 form-group mt-3">
        <label for="cakeFlavor" class="form-label">Cake Flavor</label>
        <span 
          v-for="error of v$.formData.cakesID.$errors"
          :key="error.$uid"
          class="error-container"
        >
          *{{ error.$message }}
        </span>
        <select v-model="formData.cakesID" class="form-select" id="cakeFlavor">
          <option disabled value="">Select a Cake Type First</option>
          <option v-for="flavor in flavors" :key="flavor.cakesID" :value="flavor.cakesID" >
            {{ flavor.flavor }}
          </option>
        </select>
      </div>
      <!-- Referral Field -->
      <div class="col-lg-4 col-md-6 form-group mt-3">
        <label for="referral" class="form-label">Referral</label>
        <span 
          v-for="error of v$.formData.referralID.$errors"
          :key="error.$uid"
          class="error-container"
        >
          *{{ error.$message }}
        </span>
        <select v-model="formData.referralID" class="form-select" id="referral">
          <option disabled value="">Please select one</option>
          <option v-for="ref in referrals" :value="ref.referralID" >
            {{ ref.type }}
          </option>
        </select>
      </div>
      <!-- Status Field  -->
      <div class="col-lg-4 col-md-6 form-group mt-3">
        <label for="status" class="form-label">Status</label>
        <span 
          v-for="error of v$.formData.statusID.$errors"
          :key="error.$uid"
          class="error-container"
        >
          *{{ error.$message }}
        </span>
        <select v-model="formData.statusID" class="form-select" id="status">
          <!-- <option disabled value="">Please select one</option> -->
          <option v-for="status in orderStatuses" :key="status.statusID" :value="status.statusID" >
            {{ status.description }}
          </option>
        </select>
      </div>
      <!-- Available Date Field -->
      <div class="col-lg-4 col-md-6 form-group mt-3">
        <label for="desiredDate" class="form-label">Desired Date</label>
        <span 
          v-for="error of v$.formData.desired_date.$errors"
          :key="error.$uid"
          class="error-container"
        >
          *{{ error.$message }}
        </span>
        <input v-model="formData.desired_date" type="date" class="form-control" id="desiredDate" :min="order.order_date">
      </div>
      <!-- Final Price Field -->
      <div class="col-lg-4 col-md-6 form-group mt-3 final-price-container">
        <label for="final_price" class="form-label">Final Price</label>
        <span 
          v-for="error of v$.formData.final_price.$errors"
          :key="error.$uid"
          class="error-container"
        >
          *{{ error.$message }}
        </span>
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">$</span>
          </div>
          <input v-model.number="formData.final_price" type="number" step="0.01" class="form-control" id="final_price">
        </div>
      </div>

    </div>

    <div class="row">
      <!-- Design Description Field -->
      <div class="form-group col-md-6">
        <label for="cake_details" class="form-label">Cake Design Details:</label>
        <span 
          v-for="error of v$.formData.cake_details.$errors"
          :key="error.$uid"
          class="error-container"
        >
          *{{ error.$message }}
        </span>
        <textarea v-model="formData.cake_details" class="form-control" id="cake_details" rows="5" ></textarea>
      </div>
      <!-- Pick Up Details Field -->
      <div class="form-group col-md-6">
        <label for="pick_up_details" class="form-label">Pick Up Details:</label>
        <span 
          v-for="error of v$.formData.pick_up_details.$errors"
          :key="error.$uid"
          class="error-container"
        >
          *{{ error.$message }}
        </span>
        <textarea v-model="formData.pick_up_details" class="form-control" id="pick_up_details" rows="5" ></textarea>
      </div>
    </div>

    <div class="text-center"><button type="submit">Save Changes</button></div>
  </form>

</div>
</section>
</template>


<style scoped>
#update-order * {
  font-family: "Poppins", sans-serif;
}
#update-order h5 {
  font-weight: bold;
}

.section-title h2 {
  text-align: center;
  color: #262626;
  margin-right: 5rem;
}

.customer-details {
  width: 60%;
  box-shadow: 0 0 24px 0 rgba(0, 0, 0, 0.12);
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
}

#update-order form {
  width: 100%;
  box-shadow: 0 0 24px 0 rgba(0, 0, 0, 0.12);
  padding: 30px;
  background: #fff;
}

#update-order form .form-group {
  margin-bottom: 8px;
}

#update-order form input {
  border-radius: 0;
  box-shadow: none;
  font-size: 14px;
  height: 44px;
}

#update-order form button[type=submit] {
  background: #22c55e;
  border: 0;
  padding: 10px 24px;
  color: #fff;
  transition: 0.4s;
  border-radius: 50px;
  margin-top: 8px;
}

#update-order form button[type=submit]:hover {
  background: #16a34a;
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

.error-container {
  color: red;
  font-size: small;
}

form label {
  font-weight: 600;
}

.final-price-container input {
  text-align: right;
  max-width: 150px;
}
.final-price-container span {
  height: 44px;
}

</style>