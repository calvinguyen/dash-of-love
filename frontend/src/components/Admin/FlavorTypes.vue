<script setup>
import { ref } from 'vue';
import VueMultiselect from 'vue-multiselect'
import cakeTypeAPI from '../../services/cakeTypeAPI';
import productMenuAPI from '../../services/productMenuAPI';

const props = defineProps({
  id: String,
})

/* //Get flavors offered for cake type
const flavors = ref([]);
const getFlavors = async () => {
  try {
    const response = await productMenuAPI.getFlavorsForCakeType(props.id);
    flavors.value = response.data;
  } catch(err) {
    console.log(err);
  }
};
getFlavors();

//Get unassigned flavors for a cake type for multi select
const selectedFlavors = ref([]); 
const unassignedFlavors = ref([]);
const getUnassignedFlavors = async () => {
  try {
    const response = await cakeTypeAPI.getFlavorsNotAssigned(props.id);
    unassignedFlavors.value = response.data;
  } catch(err) {
    console.log(err);
  }
};
getUnassignedFlavors();

const updateStatus = async (cakesID, statusID) => {
  try {
    let data = { statusID: statusID };
    const response = await productMenuAPI.updateMenuItemStatusByID(cakesID, data);
  } catch(err) {
    console.log(err);
  }
}

const assignFlavor = () => {
  selectedFlavors.value.forEach((flavor) => {
    let data = {
      typeID: props.id, 
      flavorID: flavor.flavorID
    }
    productMenuAPI.createMenuItem(data)
      .then(() => { 
        getFlavors();
        getUnassignedFlavors();
      })
      .catch((err) => console.log(err));
  });
  selectedFlavors.value = [];
} */

</script>


<template>
<section id="type-flavors">
  <h1> Type Assingment</h1>
  <!-- table with flavor assignments -->
</section>
</template>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style scoped>
#type-flavors * {
  font-family: "Poppins", sans-serif;
}

.assign-container {
  margin-left: auto;
}

.flavor-table, .assign-container {
  text-align: center;
  padding: 30px 50px;
}
.flavor-table h3, .assign-container h3 {
  text-decoration: underline;
  margin-bottom: 20px;
}

.multi-select-container {
  display: flex;
  align-items: center;
  gap: 30px;
}

.multi-select-dropdown {
  flex: 3;
  border: 1px solid gray;
  border-radius: 5px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.12);
}

.assign-container button {
  background: #22c55e;
  border: 0;
  padding: 10px 24px;
  color: #fff;
  transition: 0.4s;
  border-radius: 50px;
  font-weight: 600;
}
.assign-container button:hover {
  background: #16a34a;
}

table tr {
  font-size: 18px;
}

tr th {
  font-weight: 600;
}

</style>