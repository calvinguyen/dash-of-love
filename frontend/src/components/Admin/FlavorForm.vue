<script setup>
import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import useVuelidate from '@vuelidate/core';
import { required, maxLength, helpers } from '@vuelidate/validators';
import Swal from 'sweetalert2';
import FlavorAPI from '../../services/FlavorAPI';

const router = useRouter();

//Get flavor Status descriptions for drop down list
const flavorStatuses = ref([]);
const getFlavorStatuses = async () => {
  try {
    const response = await FlavorAPI.getStatusDescriptions();
    flavorStatuses.value = response.data;
  } catch(err) {
    console.log(err);
  }
};
getFlavorStatuses();


//Get flavor data
const flavorData = reactive({
  flavor: "",
  statusID: 1,
});

// Set form validation rules
const alphaWithSpaces = helpers.regex(/^[a-z_/'/& ]*$/i);

const rules = computed(() => {
  return {
    flavorData: {
      flavor: { 
        required, 
        maxLength: maxLength(40),
        alphaWithSpaces: helpers.withMessage('This field must be alphabetic', alphaWithSpaces)
      },
      statusID: { required },
    },
  }
});
const v$ = useVuelidate(rules, { flavorData }, { $autoDirty: true });

//check if flavor already exists
const checkIfNewFlavor = async (flavor) => {
  try {
    const response = await FlavorAPI.getFlavors();
    let result = response.data.find(item => item.flavor.toLowerCase().trim() == flavor.toLowerCase().trim());
    return result;
  } catch(err) {
    console.log(err);
  }
}

// Form submission
const submitForm = async () => {
  const isValid = await v$.value.$validate();
  //notify user form is invalid
  if (!isValid) {
    Swal.fire({
      icon: 'error',
      title: '<h3 style="font-family: Poppins, sans-serif"> Add New Flavor Failed </h3>',
      text: 'Please check your inputs!',
    });
    return
  }

  //notify user that flavor already exists
  let result = await checkIfNewFlavor(flavorData.flavor);
  if (result) {
    Swal.fire({
        icon: 'error',
        title: '<h3 style="font-family: Poppins, sans-serif"> Add New Flavor Failed </h3>',
        text: 'A flavor with this name already exists!',
    });
    return
  }

  FlavorAPI.createFlavor(flavorData)
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: '<h3 style="font-family: Poppins, sans-serif"> Add New Flavor Success! </h3>',
        text: 'A new Flavor was created!',
      });
      router.push({ name: 'flavor-details', params: { id: res.data.flavorID } })
    })
    .catch(err => console.log(err));
};
</script>


<template>
<section id="flavor-form">
<div class="container">

  <div class="section-title d-flex justify-content-between">
    <button @click="router.go(-1)" class="go-back-btn" type="button">Go Back</button>
    <h2>Add a Flavor</h2>
    <div></div>
  </div>

  <form @submit.prevent="submitForm">
    <div class="row">
      <!-- flavor Name Field -->
      <div class="col-md-8 form-group">
        <label for="type" class="form-label">Flavor*</label>
        <span
          v-for="error of v$.flavorData.flavor.$errors"
          :key="error.$uid"
          class="error-container"
        >
          *{{ error.$message }}
        </span>
        <input v-model="flavorData.flavor" type="text" class="form-control" placeholder="Flavor Name" />
      </div>
      <!-- Status Field  -->
      <div class="col-md-4 form-group">
        <label for="status" class="form-label">Status</label>
        <span 
          v-for="error of v$.flavorData.statusID.$errors"
          :key="error.$uid"
          class="error-container"
        >
          *{{ error.$message }}
        </span>
        <select v-model="flavorData.statusID" class="form-select" id="status">
          <!-- <option disabled value="">Please select one</option> -->
          <option v-for="status in flavorStatuses" :key="status.statusID" :value="status.statusID" >
            {{ status.description }}
          </option>
        </select>
      </div>
    </div>
    <div class="text-center"><button type="submit">Add Flavor</button></div>
  </form>

</div>
</section>
</template>


<style scoped>
#flavor-form * {
  font-family: "Poppins", sans-serif;
}



.section-title h2 {
  text-align: center;
  color: #262626;
  margin-right: 5rem;
}

#flavor-form form {
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

#flavor-form form .form-group {
  margin-bottom: 8px;
}

#flavor-form form input {
  border-radius: 0;
  box-shadow: none;
  font-size: 14px;
  height: 44px;
}

#flavor-form form button[type=submit] {
  background: #22c55e;
  border: 0;
  padding: 10px 24px;
  color: #fff;
  transition: 0.4s;
  border-radius: 50px;
  margin-top: 8px;
}

#flavor-form form button[type=submit]:hover {
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