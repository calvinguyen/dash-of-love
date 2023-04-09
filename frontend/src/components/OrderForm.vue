<script setup>
import { reactive, computed, ref } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, minLength, maxLength, email, numeric, alpha } from '@vuelidate/validators';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import ReferralAPI from '../services/ReferralAPI';
import productMenuAPI from '../services/productMenuAPI';
import CustomerAPI from '../services/CustomerAPI';
import OrderAPI from '../services/OrderAPI';
import PublicAPI from '../services/PublicAPI';

/* GET DATA FOR FORM DROP DOWN LISTS --> CAKE TYPES, FLAVORS, REFERRALS */
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

// Get Country, state, city
const getAddress = async (zip) => {
  try {
    const response = await PublicAPI.getAddressByZip(zip);
    Object.assign(customerData, response.data);
  } catch (error) {
    console.error(error);
  }
}

/* FORM VALIDATION LOGIC */
const customerData = reactive({
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  address: "",
  zip: "",
  country: "",
  state: "",
  city: "",
});

const orderData = reactive({
  customerID: "",
  cakesID: "",
  referralID: "",
  cake_details: "",
  desired_date: "",
});

// Set form validation rules
const rules = computed(() => {
  return {
    customerData: {
      first_name: { required, alpha, maxLength: maxLength(40) },
      last_name: { required, alpha, maxLength: maxLength(40) },
      email: { required, email, maxLength: maxLength(100) },
      phone: { required, numeric, minLength: minLength(10), maxLength: maxLength(10) },
      address: { required, maxLength: maxLength(100) },
      zip: { required, numeric, minLength: minLength(5), maxLength: maxLength(5) },
      country: { required },
      state: { required },
      city: { required },
    },
    orderData: {
      cakesID: { required },
      referralID: { required },
      cake_details: { required, maxLength: maxLength(750) },
      desired_date: { required }
    },
    selectedCakeType: {
      typeID: { required }
    }
  }
});

const v$ = useVuelidate(rules, { customerData, orderData, selectedCakeType }, { $autoDirty: true });


/* FORM SUBMISSION LOGIC */
const postCustomer = async (data) => {
  try {
    const response = await CustomerAPI.createCustomer(data);
    orderData.customerID = response.data.customerID;
    return orderData;
  } catch(err) {
    console.log(err);
  }
}

const checkIfNewCustomer = async (email, custData) => {
  try {
    const response = await CustomerAPI.getCustomerByEmail(email.toLowerCase());
    if (response.data) {
      orderData.customerID = response.data.customerID;
      return orderData;
    }
    // ELSE Create a new customer
    return postCustomer(custData);
  } catch(err) {
    console.log(err);
  }
}

const postOrder = async (data) => {
  try {
    const response = await OrderAPI.createOrder(data);
    return response.data;
  } catch(err) {
    console.log(err);
  }
}

const submitForm = async () => {
  const isValid = await v$.value.$validate();
  //notify user form is invalid
  if (!isValid) {
    Swal.fire({
      icon: 'error',
      title: '<h3 style="font-family: Poppins, sans-serif"> Order Request Failed </h3>',
      text: 'Please check your inputs!',
    });
    return
  }
  
  checkIfNewCustomer(customerData.email, customerData)
    .then((res) => postOrder(res))
    .then((res) => {
      // Send Order Request to Email
      let { type } = cakeTypes.value.find(item => item.typeID == selectedCakeType.value.typeID);
      let { flavor } = flavors.value.find(item => item.typeID == selectedCakeType.value.typeID);
      let params = {
        order_date: res.order_date,
        orderID: res.orderID,
        first_name: customerData.first_name,
        last_name: customerData.last_name,
        email: customerData.email,
        phone: customerData.phone,
        desired_date: res.desired_date,
        type: type,
        flavor: flavor,
        cake_details: res.cake_details,
      };
      emailjs.send("service_dmhu8pj", "template_3wt4u27", params, "vJVgKmCSgWnkyxBUU")
        .then(
          (res) => {console.log('Email send', res.status, res.text)},
          (err) => {console.log('Failed to send email', err)}
        )
    })
    .then(() => {
      resetFormData(customerData);
      resetFormData(orderData);
      resetFormData(selectedCakeType.value);
      Swal.fire({
        icon: 'success',
        title: '<h3 style="font-family: Poppins, sans-serif"> Order Request Received! </h3>',
        text: "I'll get back to you if your order is accepted, but if you don't hear from me, I didn't accept",
      });
    })
    .catch(err => console.log(err));
};

function resetFormData(object) {
  for (const property in object) {
    object[property] = "";
  }
}
</script>


<template>
<section id="custom-order" class="custom-order">
<div class="container">

  <div class="section-title">
    <h2>Custom<span>Order</span></h2>
    <p>Please allow 3-5 days response time.</p>
  </div>

  <form @submit.prevent="submitForm" class="request-form">
    <div class="row">
      <!-- First Name Field -->
      <div class="col-md-6 form-group">
        <label for="firstName" class="form-label">First Name</label>
        <span 
          v-for="error of v$.customerData.first_name.$errors"
          :key="error.$uid"
          class="error-container"
        >
          *{{ error.$message }}
        </span>
        <input v-model="customerData.first_name" type="text" class="form-control" placeholder="Your First Name" />
      </div>
      <!-- Last Name Field -->
      <div class="col-md-6 form-group">
        <label for="lastName" class="form-label">Last Name</label>
        <span 
          v-for="error of v$.customerData.last_name.$errors"
          :key="error.$uid"
          class="error-container"
        >
          *{{ error.$message }}
        </span>
        <input v-model="customerData.last_name" type="text" class="form-control" id="lastName" placeholder="Your Last Name">
      </div>
      <!-- Email Field -->
      <div class="col-lg-4 col-md-6 form-group mt-3">
        <label for="email" class="form-label">Email</label>
        <span 
          v-for="error of v$.customerData.email.$errors"
          :key="error.$uid"
          class="error-container"
        >
          *{{ error.$message }}
        </span>
        <input v-model="customerData.email" type="email" class="form-control" id="email" placeholder="Your Email" />
      </div>
      <!-- Phone Field -->
      <div class="col-lg-4 col-md-6 form-group mt-3">
        <label for="phone" class="form-label">Phone</label>
        <span 
          v-for="error of v$.customerData.phone.$errors"
          :key="error.$uid"
          class="error-container"
        >
          *{{ error.$message }}
        </span>
        <input v-model="customerData.phone" type="tel" class="form-control" id="phone" placeholder="Ex: 2220007777">
      </div>
      <!-- Available Date Field -->
      <div class="col-lg-4 col-md-6 form-group mt-3">
        <label for="desiredDate" class="form-label">Desired Date</label>
        <span 
          v-for="error of v$.orderData.desired_date.$errors"
          :key="error.$uid"
          class="error-container"
        >
          *{{ error.$message }}
        </span>
        <VueDatePicker 
          v-model="orderData.desired_date"
          model-type="yyyy-MM-dd"
          :disabled-week-days="[1, 2, 3]" 
          :enable-time-picker="false" 
          :min-date="new Date()" 
        />
      </div>
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
          v-for="error of v$.orderData.cakesID.$errors"
          :key="error.$uid"
          class="error-container"
        >
          *{{ error.$message }}
        </span>
        <select v-model="orderData.cakesID" class="form-select" id="cakeFlavor">
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
          v-for="error of v$.orderData.referralID.$errors"
          :key="error.$uid"
          class="error-container"
        >
          *{{ error.$message }}
        </span>
        <select v-model="orderData.referralID" class="form-select" id="referral">
          <option disabled value="">Please select one</option>
          <option v-for="ref in referrals" :value="ref.referralID" >
            {{ ref.type }}
          </option>
        </select>
      </div>
      <!-- ================ ADDRESS FIELDS ================ -->
      <!-- Address Line Field -->
      <div class="col-md-6 form-group mt-3">
        <label for="address" class="form-label">Address</label>
        <span 
          v-for="error of v$.customerData.address.$errors"
          :key="error.$uid"
          class="error-container"
        >
          *{{ error.$message }}
        </span>
        <input v-model="customerData.address" type="text" class="form-control" placeholder="1234 Main St" />
      </div>
      <!-- ZIP Field -->
      <div class="col-lg-4 col-md-6 form-group mt-3">
        <label for="zip" class="form-label">Zip</label>
        <span 
          v-for="error of v$.customerData.zip.$errors"
          :key="error.$uid"
          class="error-container"
        >
          *{{ error.$message }}
        </span>
        <div class="d-flex">
          <input v-model="customerData.zip" type="text" class="form-control" id="zip">
          <button @click="getAddress(customerData.zip)" type="button" class="btn btn-primary btn-sm">Autofill Address</button>
        </div>
      </div>
      <!-- Country Field -->
      <div class="col-lg-auto col-md-auto form-group mt-3">
        <label for="country" class="form-label">Country</label>
        <span 
          v-for="error of v$.customerData.country.$errors"
          :key="error.$uid"
          class="error-container"
        >
          *{{ error.$message }}
        </span>
        <input v-model="customerData.country" type="text" class="form-control" placeholder="Enter Zip to autofill" disabled />
      </div>
      <!-- State Field -->
      <div class="col-lg-auto col-md-auto form-group mt-3">
        <label for="state" class="form-label">State</label>
        <span 
          v-for="error of v$.customerData.state.$errors"
          :key="error.$uid"
          class="error-container"
        >
          *{{ error.$message }}
        </span>
        <input v-model="customerData.state" type="text" class="form-control" placeholder="Enter Zip to autofill" disabled />
      </div>
      <!-- City Field -->
      <div class="col-lg-auto col-md-auto form-group mt-3">
        <label for="city" class="form-label">City</label>
        <span 
          v-for="error of v$.customerData.city.$errors"
          :key="error.$uid"
          class="error-container"
        >
          *{{ error.$message }}
        </span>
        <input v-model="customerData.city" type="text" class="form-control" placeholder="Enter Zip to autofill" disabled />
      </div>

    </div>

    <!-- Design Description Field -->
    <div class="form-group mt-3">
      <label for="details" class="form-label">Please give a description for desired design:</label>
      <span 
        v-for="error of v$.orderData.cake_details.$errors"
        :key="error.$uid"
        class="error-container"
      >
        *{{ error.$message }}
      </span>
      <textarea v-model="orderData.cake_details" class="form-control" id="details" rows="5" ></textarea>
    </div>

    <div class="text-center"><button type="submit">Send Message</button></div>
  </form>

</div>
</section>
</template>


<style scoped>
/* @import "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"; */
@import "../assets/css/home.css";

.custom-order .request-form {
  width: 100%;
  box-shadow: 0 0 24px 0 rgba(0, 0, 0, 0.12);
  padding: 30px;
  background: #fff;
}

.custom-order .request-form .form-group {
  padding-bottom: 8px;
}

.custom-order .request-form input,
.custom-order .request-form textarea {
  border-radius: 0;
  box-shadow: none;
  font-size: 14px;
}

.custom-order .request-form input {
  height: 44px;
}

.custom-order .request-form textarea {
  padding: 10px 12px;
}

.custom-order .request-form button[type=submit] {
  background: #ffb03b;
  border: 0;
  padding: 10px 24px;
  color: #fff;
  transition: 0.4s;
  border-radius: 50px;
}

.custom-order .request-form button[type=submit]:hover {
  background: #ffa012;
}

.error-container {
  color: red;
  font-size: small;
}

</style>