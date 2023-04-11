<script setup>
import { reactive, computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import useVuelidate from '@vuelidate/core';
import { required, maxLength, helpers } from '@vuelidate/validators';
import Swal from 'sweetalert2';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import ReferralAPI from '../../services/ReferralAPI';
import productMenuAPI from '../../services/productMenuAPI';
import OrderAPI from '../../services/OrderAPI';

const props = defineProps({
  customerId: String,
});

const router = useRouter();

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
// Get Payment Types from Payment_Type
const paymentTypes = ref([]);
const getPaymentTypes = async () => {
  try {
    const response = await OrderAPI.getPaymentTypes();
    paymentTypes.value = response.data;
  } catch(err) {
    console.log(err);
  }
}
getPaymentTypes();
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

const orderData = reactive({
  customerID: props.customerId,
  cakesID: "",
  referralID: "",
  cake_details: "",
  desired_date: "",
  image: "",
  pick_up_details: "",
  final_price: "",
  paymentID: null,
});

// Set form validation rules
const usCurrency = helpers.regex(/^[0-9]\d{0,9}(\.\d{1,2})?%?$/);
const rules = computed(() => {
  return {
    orderData: {
      cakesID: { required },
      referralID: { required },
      cake_details: { required, maxLength: maxLength(750) },
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
const v$ = useVuelidate(rules, { orderData, selectedCakeType }, { $autoDirty: true });

// Form submission logic
const formFile = ref(null);
const upload = async () => {
  try {
    const formData = new FormData();
    formData.append("file", formFile.value);
    const res = await OrderAPI.uploadImage(formData);
    return res.data;
  } catch(err) {
    console.error(err);
  }
}
const submitForm = async () => {
  const isValid = await v$.value.$validate();
  //notify user form is invalid
  if (!isValid) {
    Swal.fire({
      icon: 'error',
      title: '<h3 style="font-family: Poppins, sans-serif"> Order Submission Failed </h3>',
      text: 'Please check your inputs!',
    });
    return
  }
  if (formFile.value) orderData.image = await upload();
  
  OrderAPI.createAdminOrder(orderData)
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: '<h3 style="font-family: Poppins, sans-serif"> Order Submission Success! </h3>',
        text: 'New Order was created!',
      });
      router.push({ name: 'update-order', params: { id: res.data.orderID } })
    })
    .catch(err => console.log(err));
  
};
</script>


<template>
<section id="custom-order" class="custom-order">
<div class="container">

  <form @submit.prevent="submitForm" class="request-form">
    <div class="row">
      <!-- Cake Type Field  -->
      <div class="col-lg-4 col-md-6 form-group mt-3">
        <label for="cakeType" class="form-label">Cake Type*</label>
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
        <label for="cakeFlavor" class="form-label">Cake Flavor*</label>
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
      <!-- Available Date Field -->
      <div class="col-lg-4 col-md-6 form-group mt-3">
        <label for="desiredDate" class="form-label">Desired Date*</label>
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
          :enable-time-picker="false" 
          :min-date="new Date()" 
        />
      </div>
      <!-- Referral Field -->
      <div class="col-lg-3 col-md-6 form-group mt-3">
        <label for="referral" class="form-label">Referral*</label>
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
      <!-- Image Upload field -->
      <div class="col-lg-4 col-md-6 form-group mt-3">
        <label for="file" class="form-label">Upload a Inspiration Photo</label>
        <input 
          @change="$event => formFile = $event.target.files[0]" 
          class="form-control" 
          type="file" 
          name="file" 
          id="file"
          accept="image/*,.pdf"
        >
      </div>
      <!-- Final Price Field -->
      <div class="col-2 form-group mt-3 final-price-container">
        <label for="final_price" class="form-label">Final Price</label>
        <span 
          v-for="error of v$.orderData.final_price.$errors"
          :key="error.$uid"
          class="error-container"
        >
          *{{ error.$message }}
        </span>
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">$</span>
          </div>
          <input v-model.number="orderData.final_price" type="number" step="0.01" class="form-control" id="final_price">
        </div>
      </div>
      <!-- Payment Type Field -->
      <div class="col-3 form-group mt-3">
        <label for="paymentType" class="form-label">Payment Type</label>
        <select v-model="orderData.paymentID" class="form-select" id="paymentType">
          <option disabled value="">Please select one</option>
          <option v-for="payment in paymentTypes" :value="payment.paymentID" >
            {{ payment.type }}
          </option>
        </select>
      </div>
    </div>

    <div class="row">
      <!-- Design Description Field -->
      <div class="form-group col-md-6">
        <label for="cake_details" class="form-label">Cake Design Details:*</label>
        <span 
          v-for="error of v$.orderData.cake_details.$errors"
          :key="error.$uid"
          class="error-container"
        >
          *{{ error.$message }}
        </span>
        <textarea v-model="orderData.cake_details" class="form-control" id="cake_details" rows="5" ></textarea>
      </div>
      <!-- Pick Up Details Field -->
      <div class="form-group col-md-6">
        <label for="pick_up_details" class="form-label">Pick Up Details:</label>
        <span 
          v-for="error of v$.orderData.pick_up_details.$errors"
          :key="error.$uid"
          class="error-container"
        >
          *{{ error.$message }}
        </span>
        <textarea v-model="orderData.pick_up_details" class="form-control" id="pick_up_details" rows="5" ></textarea>
      </div>
    </div>

    <div class="text-center"><button type="submit">Create Order</button></div>
  </form>

</div>
</section>

</template>


<style scoped>
.custom-order .request-form {
  width: 100%;
  box-shadow: 0 0 24px 0 rgba(0, 0, 0, 0.12);
  padding: 30px;
  background: #fff;
}
.custom-order .request-form .form-group {
  padding-bottom: 8px;
}
form input[type='file'] {
  max-width: max-content;
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
  background: #22c55e;
  border: 0;
  padding: 10px 24px;
  color: #ffffff;
  transition: 0.4s;
  border-radius: 50px;
}
.custom-order .request-form button[type=submit]:hover {
  background: #16a34a;
}
.error-container {
  color: red;
  font-size: small;
}
.final-price-container input {
  text-align: right;
  /* max-width: 150px; */
}
.final-price-container span {
  height: 44px;
}

form label {
  font-weight: 600;
}

</style>