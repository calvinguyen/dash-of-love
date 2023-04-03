<script setup>
import { reactive, computed, ref } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, minLength, maxLength, email, numeric, alpha } from '@vuelidate/validators';
import emailjs from '@emailjs/browser';
import ReferralAPI from '../services/ReferralAPI';
import productMenuAPI from '../services/productMenuAPI';
import CustomerAPI from '../services/CustomerAPI';
import OrderAPI from '../services/OrderAPI';

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

// Get today's date to set minimum date input
const currentDate = computed(() => new Date().toLocaleDateString('fr-CA'));


/* FORM VALIDATION LOGIC */
const customerData = reactive({
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
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
      phone: { required, numeric, minLength: minLength(10), maxLength: maxLength(10) }
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
    alert("Form not submitted, please check your inputs.");
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
      alert("Your request was received, please wait 2-3 days for a response.");
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
    <p>Please allow 2-3 days response time.</p>
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
        <input v-model="orderData.desired_date" type="date" class="form-control" id="desiredDate" :min="currentDate">
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