<script setup>
import { ref, reactive, computed } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, maxLength, helpers } from '@vuelidate/validators';
import Swal from 'sweetalert2';
import FlavorAPI from '../../services/FlavorAPI';

const props = defineProps({
  id: String,
})

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
  statusID: "",
});

const getFlavor = async () => {
  try {
    const response = await FlavorAPI.getFlavorById(props.id);
    for (const key in flavorData) {
      flavorData[key] = response.data[key];
    }
  } catch(err) {
    console.log(err);
  }
};
getFlavor();

// Set form validation rules
const alphaWithSpaces = helpers.regex(/^[a-z_/'/& ]*$/i);

const rules = computed(() => {
  return {
    flavorData: {
      flavor: { 
        required, 
        maxLength: maxLength(40),
        alphaWithSpaces: helpers.withMessage('This field must be alphanumeric', alphaWithSpaces)
      },
      statusID: { required },
    },
  }
});
const v$ = useVuelidate(rules, { flavorData }, { $autoDirty: true });

// Form submission
const handleFlavorUpdate = async () => {
  const isValid = await v$.value.$validate();
  //notify user form is invalid
  if (!isValid) {
    Swal.fire({
      icon: 'error',
      title: '<h3 style="font-family: Poppins, sans-serif"> Flavor Update Failed </h3>',
      text: 'Please check your inputs!',
    });
    return
  }

  FlavorAPI.updateFlavorById(props.id, flavorData)
    .then(() => {
      Swal.fire({
        icon: 'success',
        title: '<h3 style="font-family: Poppins, sans-serif"> Flavor Update Success! </h3>',
        text: 'Flavor changes were saved!',
      });
    })
    .catch(err => console.log(err));
};
 
</script>

<template>
<section id="update-flavor">

<div class="container">
  <form @submit.prevent="handleFlavorUpdate">
    <h3>Edit Flavor</h3>
    <div class="row">
      <!-- Flavor Name Field -->
      <div class="col-md-12 form-group">
        <label for="type" class="form-label">Flavor*</label>
        <span
          v-for="error of v$.flavorData.flavor.$errors"
          :key="error.$uid"
          class="error-container"
        >
          *{{ error.$message }}
        </span>
        <input v-model="flavorData.flavor" type="text" class="form-control" placeholder="Flavor" />
      </div>
      <!-- Status Field  -->
      <div class="col-md-6 form-group">
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
    <div class="text-center"><button type="submit">Save Changes</button></div>
  </form>
</div>

</section>
</template>


<style scoped>
#update-flavor * {
  font-family: "Poppins", sans-serif;
}

.container {
  display: flex;
  justify-content: center;
}

#update-flavor form {
  max-width: 50%;
  box-shadow: 0 0 24px 0 rgba(0, 0, 0, 0.12);
  padding: 30px;
  background: #fff;
  font-size: 20px;
  margin-top: 30px;
}

form h3 {
  text-align: center;
  font-weight: 600;
  text-decoration: underline;
  margin-bottom: 20px;
}

#update-flavor form .form-group {
  margin-bottom: 8px;
}

#update-flavor form input {
  border-radius: 0;
  box-shadow: none;
  font-size: 16px;
  height: 44px;
}

#update-flavor form button[type=submit] {
  background: #22c55e;
  border: 0;
  padding: 10px 24px;
  color: #fff;
  transition: 0.4s;
  border-radius: 50px;
  margin-top: 8px;
}

#update-flavor form button[type=submit]:hover {
  background: #16a34a;
}

.error-container {
  color: red;
  font-size: small;
}

form label {
  font-weight: 600;
}
</style>