<script setup>
import { ref, reactive, computed } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, maxLength, numeric, helpers } from '@vuelidate/validators';
import Swal from 'sweetalert2';
import cakeTypeAPI from '../../services/cakeTypeAPI';

const props = defineProps({
  id: String,
})

//Get type Status descriptions for drop down list
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

//Get cake type data
const typeData = reactive({
  type: "",
  price: "",
  statusID: "",
});

const getType = async () => {
  try {
    const response = await cakeTypeAPI.getTypeById(props.id);
    for (const key in typeData) {
      typeData[key] = response.data[key];
    }
  } catch(err) {
    console.log(err);
  }
};
getType();

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
const handleTypeUpdate = async () => {
  const isValid = await v$.value.$validate();
  //notify user form is invalid
  if (!isValid) {
    Swal.fire({
        icon: 'error',
        title: '<h3 style="font-family: Poppins, sans-serif"> Cake Type Update Failed </h3>',
        text: 'Please check your inputs!!',
      });
    return
  }

  cakeTypeAPI.updateTypeById(props.id, typeData)
    .then(() => {
      Swal.fire({
        icon: 'success',
        title: '<h3 style="font-family: Poppins, sans-serif"> Cake Type Update Success! </h3>',
        text: 'Cake Type changes were saved!',
      });
    })
    .catch(err => console.log(err));
};

</script>

<template>
<section id="update-type">

  <div class="container">
    <form @submit.prevent="handleTypeUpdate">
      <h3>Edit Cake Type</h3>
      <div class="row">
        <!-- Type Name Field -->
        <div class="col-md-7 form-group">
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
        <div class="col-md-5 form-group">
          <label for="price" class="form-label">Price*</label>
          <span 
            v-for="error of v$.typeData.price.$errors"
            :key="error.$uid"
            class="error-container"
          >
            *{{ error.$message }}
          </span>
          <input v-model="typeData.price" type="number" step="0.01" class="form-control" id="price" placeholder="Price">
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
      <div class="text-center"><button type="submit">Save Changes</button></div>
    </form>
  </div>

</section>
</template>


<style scoped>
#update-type * {
  font-family: "Poppins", sans-serif;
}

.container {
  display: flex;
  justify-content: center;
}

#update-type form {
  max-width: 60%;
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

#update-type form .form-group {
  margin-bottom: 8px;
}

#update-type form input {
  border-radius: 0;
  box-shadow: none;
  font-size: 16px;
  height: 44px;
}

#update-type form button[type=submit] {
  background: #22c55e;
  border: 0;
  padding: 10px 24px;
  color: #fff;
  transition: 0.4s;
  border-radius: 50px;
  margin-top: 8px;
}

#update-type form button[type=submit]:hover {
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