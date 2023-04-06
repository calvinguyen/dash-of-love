<script setup>
import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import useVuelidate from '@vuelidate/core';
import { required, maxLength, numeric, helpers } from '@vuelidate/validators';
import Swal from 'sweetalert2';
import cakeTypeAPI from '../../services/cakeTypeAPI';

const router = useRouter();

//Get Type Status descriptions for drop down list
const typeStatuses = ref([]);
const getTypeStatuses = async () => {
  try {
    const response = await cakeTypeAPI.getStatusDescriptions();
    typeStatuses.value = response.data;
  } catch(err) {
    console.log(err);
  }
};
getTypeStatuses();

// setup type Ref
const typeData = reactive({
  type: "",
  price: "",
  statusID: 1,
});

// Set form validation rules
const alphaWithSpaces = helpers.regex(/^[a-z0-9_ ]*$/i);
const usCurrency = helpers.regex(/^[0-9]\d{0,9}(\.\d{1,2})?%?$/);

const rules = computed(() => {
  return {
    typeData: {
      type: { 
        required, 
        maxLength: maxLength(40), 
        alphaWithSpaces: helpers.withMessage('This field must be alphanumeric', alphaWithSpaces) 
      },
      price: { 
        required, 
        usCurrency: helpers.withMessage('Value must be a US currency', usCurrency)
      },
      statusID: { required },
    },
  }
});
const v$ = useVuelidate(rules, { typeData }, { $autoDirty: true });

// Form submission
const submitForm = async () => {
  const isValid = await v$.value.$validate();
  //notify user form is invalid
  if (!isValid) {
    Swal.fire({
      icon: 'error',
      title: '<h3 style="font-family: Poppins, sans-serif"> Add New Cake Type Failed </h3>',
      text: 'Please check your inputs!',
    });
    return
  }
  
  cakeTypeAPI.createCakeType(typeData)
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: '<h3 style="font-family: Poppins, sans-serif"> Add New Cake Type Success! </h3>',
        text: 'A new Cake Type was created!',
      });
      router.push({ name: 'type-details', params: { id: res.data.typeID } })
    })
    .catch(err => console.log(err));
};

</script>


<template>
<section id="type-form">
<div class="container">

  <div class="section-title d-flex justify-content-between">
    <button @click="router.go(-1)" class="go-back-btn" type="button">Go Back</button>
    <h2>Add a Cake Type</h2>
    <div></div>
  </div>

  <form @submit.prevent="submitForm">
    <div class="row">
      <!-- Type Name Field -->
      <div class="col-md-8 form-group">
        <label for="type" class="form-label">Cake Type*</label>
        <span
          v-for="error of v$.typeData.type.$errors"
          :key="error.$uid"
          class="error-container"
        >
          *{{ error.$message }}
        </span>
        <input v-model="typeData.type" type="text" class="form-control" placeholder="Cake Type Name" />
      </div>
      <!-- Price Field -->
      <div class="col-md-4 form-group price-container">
        <label for="price" class="form-label">Price*</label>
        <span 
          v-for="error of v$.typeData.price.$errors"
          :key="error.$uid"
          class="error-container"
        >
          *{{ error.$message }}
        </span>
        <!-- <input v-model="typeData.price" type="number" step="0.01" class="form-control" id="price" placeholder="Price"> -->
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">$</span>
          </div>
          <input v-model="typeData.price" type="number" step="0.01" class="form-control" id="price" placeholder="Price">
        </div>
      </div>
      <!-- Status Field  -->
      <div class="col-lg-4 col-md-6 form-group mt-3">
        <label for="status" class="form-label">Status</label>
        <span 
          v-for="error of v$.typeData.statusID.$errors"
          :key="error.$uid"
          class="error-container"
        >
          *{{ error.$message }}
        </span>
        <select v-model="typeData.statusID" class="form-select" id="status">
          <!-- <option disabled value="">Please select one</option> -->
          <option v-for="status in typeStatuses" :key="status.statusID" :value="status.statusID" >
            {{ status.description }}
          </option>
        </select>
      </div>
    </div>
    <div class="text-center"><button type="submit">Add Cake Type</button></div>
  </form>

</div>
</section>
</template>


<style scoped>
#type-form * {
  font-family: "Poppins", sans-serif;
}



.section-title h2 {
  text-align: center;
  color: #262626;
  margin-right: 5rem;
}

#type-form form {
  max-width: 60%;
  box-shadow: 0 0 24px 0 rgba(0, 0, 0, 0.12);
  padding: 30px;
  background: #fff;
  margin: 0 auto;
  font-size: 18px;
}

form label {
  font-weight: 600;
}

#type-form form .form-group {
  margin-bottom: 8px;
}

#type-form form input {
  border-radius: 0;
  box-shadow: none;
  font-size: 14px;
  height: 44px;
}

#type-form form button[type=submit] {
  background: #22c55e;
  border: 0;
  padding: 10px 24px;
  color: #fff;
  transition: 0.4s;
  border-radius: 50px;
  margin-top: 8px;
}

#type-form form button[type=submit]:hover {
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

.price-container input {
  text-align: right;
  max-width: 150px;
}

.price-container span {
  height: 44px;
}

</style>