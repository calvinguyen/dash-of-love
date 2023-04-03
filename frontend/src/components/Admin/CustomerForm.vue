<script setup>
import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import useVuelidate from '@vuelidate/core';
import { required, minLength, maxLength, email, numeric, alpha } from '@vuelidate/validators';
import CustomerAPI from '../../services/CustomerAPI';

const router = useRouter();

//Get customer Status descriptions for drop down list
const customerStatuses = ref([]);
const getCustomerStatuses = async () => {
  try {
    const response = await CustomerAPI.getStatusDescriptions();
    customerStatuses.value = response.data;
  } catch(err) {
    console.log(err);
  }
};
getCustomerStatuses();

// setup customer Ref
const customerData = reactive({
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  statusID: 3,
});

// Set form validation rules
const rules = computed(() => {
  return {
    customerData: {
      first_name: { required, alpha, maxLength: maxLength(40) },
      last_name: { required, alpha, maxLength: maxLength(40) },
      email: { required, email, maxLength: maxLength(100) },
      phone: { required, numeric, minLength: minLength(10), maxLength: maxLength(10) },
      statusID: { required },
    },
  }
});

const v$ = useVuelidate(rules, { customerData }, { $autoDirty: true });

//Check if email already exists
const checkIfNewCustomer = async (email) => {
  try {
    const response = await CustomerAPI.getCustomerByEmail(email.toLowerCase());
    return response.data;
  } catch(err) {
    console.log(err);
  }
}

// Form submission
const submitForm = async () => {
  const isValid = await v$.value.$validate();
  //notify user form is invalid
  if (!isValid) {
    alert("Form not submitted, please check your inputs.");
    return
  }
  //notify user that email already exists
  let result = await checkIfNewCustomer(customerData.email);
  if (result) {
    alert("Form submission failed, a Customer with this email already exists!");
    return
  }
  
  CustomerAPI.createCustomer(customerData)
    .then(() => {
      alert("Customer has been succesfully added.");
      router.push("customers")
    })
    .catch(err => console.log(err));
};

</script>


<template>
<section id="customer-form">
<div class="container">

  <div class="section-title d-flex justify-content-between">
    <button @click="router.go(-1)" class="go-back-btn" type="button">Go Back</button>
    <h2>Add a Customer</h2>
    <div></div>
  </div>
  
  <form @submit.prevent="submitForm">
    <div class="row">
      <!-- First Name Field -->
      <div class="col-md-6 form-group">
        <label for="firstName" class="form-label">First Name*</label>
        <span
          v-for="error of v$.customerData.first_name.$errors"
          :key="error.$uid"
          class="error-container"
        >
          *{{ error.$message }}
        </span>
        <input v-model="customerData.first_name" type="text" class="form-control" placeholder="First Name" />
      </div>

      <!-- Last Name Field -->
      <div class="col-md-6 form-group">
        <label for="lastName" class="form-label">Last Name*</label>
        <span 
          v-for="error of v$.customerData.last_name.$errors"
          :key="error.$uid"
          class="error-container"
        >
          *{{ error.$message }}
        </span>
        <input v-model="customerData.last_name" type="text" class="form-control" id="lastName" placeholder="Last Name">
      </div>

      <!-- Email Field -->
      <div class="col-lg-4 col-md-6 form-group mt-3">
        <label for="email" class="form-label">Email*</label>
        <span 
          v-for="error of v$.customerData.email.$errors"
          :key="error.$uid"
          class="error-container"
        >
          *{{ error.$message }}
        </span>
        <input v-model.trim="customerData.email" type="email" class="form-control" id="email" placeholder="Email" />
      </div>

      <!-- Phone Field -->
      <div class="col-lg-4 col-md-6 form-group mt-3">
        <label for="phone" class="form-label">Phone*</label>
        <span 
          v-for="error of v$.customerData.phone.$errors"
          :key="error.$uid"
          class="error-container"
        >
          *{{ error.$message }}
        </span>
        <input v-model="customerData.phone" type="tel" class="form-control" id="phone" placeholder="Ex: 2220007777">
      </div>

      <!-- Status Field  -->
      <div class="col-lg-4 col-md-6 form-group mt-3">
        <label for="status" class="form-label">Status</label>
        <span 
          v-for="error of v$.customerData.statusID.$errors"
          :key="error.$uid"
          class="error-container"
        >
          *{{ error.$message }}
        </span>
        <select v-model="customerData.statusID" class="form-select" id="status">
          <!-- <option disabled value="">Please select one</option> -->
          <option v-for="status of customerStatuses" :key="status.statusID" :value="status.statusID" >
            {{ status.description }}
          </option>
        </select>
      </div>
    </div>

    <div class="text-center"><button type="submit">Add Customer</button></div>
  </form>

</div>
</section>
</template>


<style scoped>
#customer-form * {
  font-family: "Poppins", sans-serif;
}

.section-title h2 {
  text-align: center;
  color: #262626;
  margin-right: 5rem;
}

#customer-form form {
  width: 100%;
  box-shadow: 0 0 24px 0 rgba(0, 0, 0, 0.12);
  padding: 30px;
  background: #fff;
}

#customer-form form .form-group {
  margin-bottom: 8px;
}

#customer-form form input {
  border-radius: 0;
  box-shadow: none;
  font-size: 14px;
  height: 44px;
}

#customer-form form button[type=submit] {
  background: #22c55e;
  border: 0;
  padding: 10px 24px;
  color: #fff;
  transition: 0.4s;
  border-radius: 50px;
  margin-top: 8px;
}

#customer-form form button[type=submit]:hover {
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

</style>