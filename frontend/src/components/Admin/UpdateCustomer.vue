<script setup>
import { useRoute } from 'vue-router';
import { ref, reactive, computed } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, minLength, maxLength, email, numeric, alpha } from '@vuelidate/validators';
import CustomerAPI from '../../services/CustomerAPI';
import Swal from 'sweetalert2';
import PublicAPI from '../../services/PublicAPI';

const props = defineProps({
  id: String,
})

const route = useRoute();

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

// Get Country, state, city
const getAddress = async (zip) => {
  try {
    const response = await PublicAPI.getAddressByZip(zip);
    Object.assign(customerData, response.data);
  } catch (error) {
    console.error(error);
  }
}

//Get customer data
const customerData = reactive({
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  statusID: "",
  address: "",
  zip: "",
  country: "",
  state: "",
  city: "",
});
// get initial email
const initialEmail = ref({ email: "" });
const getCustomer = async () => {
  try {
    const response = await CustomerAPI.getCustomerById(route.params.id);
    initialEmail.value.email = response.data.email;

    for (const key in customerData) {
      customerData[key] = response.data[key];
    }
  } catch(err) {
    console.log(err);
  }
};
getCustomer();

// Set form validation rules
const rules = computed(() => {
  return {
    customerData: {
      first_name: { required, alpha, maxLength: maxLength(40) },
      last_name: { required, alpha, maxLength: maxLength(40) },
      email: { required, email, maxLength: maxLength(100) },
      phone: { required, numeric, minLength: minLength(10), maxLength: maxLength(10) },
      statusID: { required },
      address: { required, maxLength: maxLength(100) },
      zip: { required, numeric, minLength: minLength(5), maxLength: maxLength(5) },
      country: { required },
      state: { required },
      city: { required },
    },
  }
});
const v$ = useVuelidate(rules, { customerData }, { $autoDirty: true });

// Form submission

//Check if email already exists
const checkIfNewCustomer = async (email) => {
  try {
    const response = await CustomerAPI.getCustomerByEmail(email.toLowerCase());
    return response.data;
  } catch(err) {
    console.log(err);
  }
}

const handleCustomerUpdate = async () => {
  const isValid = await v$.value.$validate();
  //notify user form is invalid
  if (!isValid) {
    Swal.fire({
      icon: 'error',
      title: '<h3 style="font-family: Poppins, sans-serif"> Customer Update Failed </h3>',
      text: 'Please check your inputs!',
    });
    return
  }

  if (initialEmail.value.email != customerData.email) {
    let result = await checkIfNewCustomer(customerData.email);
    if (result) {
      Swal.fire({
        icon: 'error',
        title: '<h3 style="font-family: Poppins, sans-serif"> Customer Update Failed </h3>',
        text: 'A customer with this email already exists!',
      });
      return
    }
  }

  CustomerAPI.updateCustomerById(route.params.id, customerData)
    .then(() => {
      Swal.fire({
        icon: 'success',
        title: '<h3 style="font-family: Poppins, sans-serif"> Customer Update Success! </h3>',
        text: 'Customer changes were saved!',
      });
    })
    .catch(err => console.log(err));
};

</script>


<template>
<section id="update-customer">
<div class="container">

  <form @submit.prevent="handleCustomerUpdate">
    <h2>Update Customer</h2>
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
          <option v-for="status in customerStatuses" :key="status.statusID" :value="status.statusID" >
            {{ status.description }}
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

    <div class="text-center"><button type="submit">Save Changes</button></div>
  </form>

</div>
</section>
</template>


<style scoped>
#update-customer * {
  font-family: "Poppins", sans-serif;
}

form h2 {
  text-align: center;
  color: #262626;
  /* margin-right: 5rem; */
}

#update-customer form {
  width: 100%;
  box-shadow: 0 0 24px 0 rgba(0, 0, 0, 0.12);
  padding: 30px;
  background: #fff;
}

#update-customer form .form-group {
  margin-bottom: 8px;
}

#update-customer form input {
  border-radius: 0;
  box-shadow: none;
  font-size: 14px;
  height: 44px;
}

#update-customer form button[type=submit] {
  background: #22c55e;
  border: 0;
  padding: 10px 24px;
  color: #fff;
  transition: 0.4s;
  border-radius: 50px;
  margin-top: 8px;
}

#update-customer form button[type=submit]:hover {
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

</style>