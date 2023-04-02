<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref, reactive, computed } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, minLength, maxLength, email, numeric, alpha } from '@vuelidate/validators';
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

const route = useRoute();
const router = useRouter();

//Get customer data
const typeData = reactive({
  type: "",
  price: "",
  statusID: "",
});

const getType = async () => {
  try {
    const response = await cakeTypeAPI.getTypeById(route.params.id);
    for (const key in typeData) {
      typeData[key] = response.data[key];
    }
  } catch(err) {
    console.log(err);
  }
};
getType();

// Set form validation rules
const rules = computed(() => {
  return {
    typeData: {
      type: { required, alpha, maxLength: maxLength(40) },
      price: { required, numeric },
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
    alert("Form not submitted, please check your inputs.");
    return
  }

  cakeTypeAPI.updateTypeById(route.params.id, typeData)
    .then(() => {
      alert("Type updated successfully.");
    })
    .catch(err => console.log(err));
};

</script>

<template>

  <h1>Flavor</h1>
</template>