<script setup>
import { ref, computed } from 'vue';
import VueMultiselect from 'vue-multiselect'
import FlavorAPI from '../../services/FlavorAPI';
import productMenuAPI from '../../services/productMenuAPI';

const props = defineProps({
  id: String,
})

//Get Type offered for cake type
const types = ref([]);
const getTypes = async () => {
  try {
    const response = await productMenuAPI.getCakeTypesForFlavor(props.id);
    types.value = response.data;
  } catch(err) {
    console.log(err);
  }
};
getTypes();

const updateStatus = async (cakesID, statusID) => {
  try {
    let data = { statusID: statusID };
    const response = await productMenuAPI.updateMenuItemStatusByID(cakesID, data);
  } catch(err) {
    console.log(err);
  }
}

//Get unassigned Types for flavor for multi select
const selectedTypes = ref([]); 
const unassignedTypes = ref([]);
const getUnassignedTypes = async () => {
  try {
    const response = await FlavorAPI.getTypesNotAssigned(props.id);
    unassignedTypes.value = response.data;
  } catch(err) {
    console.log(err);
  }
};
getUnassignedTypes();

const assignType = () => {
  selectedTypes.value.forEach((type) => {
    let data = {
      typeID: type.typeID, 
      flavorID: props.id
    }
    productMenuAPI.createMenuItem(data)
      .then(() => { 
        getTypes();
        getUnassignedTypes();
      })
      .catch((err) => console.log(err));
  });
  selectedTypes.value = [];
};

const searchTerm = ref("");

const filteredData = computed(() => {
  let data = types.value;

  return data.filter((item) => 
    item.type.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
});

</script>


<template>
<section id="flavor-types">
  
  <!-- table with type assignments -->
  <div class="container">
    <div class="row">

      <div class="col-6 type-table">
        <h3>Set Status of Cake Type - Flavor</h3>

        <div class="searchbox">
          <label>Search By:</label> <input v-model="searchTerm" />
        </div>

        <table class="table table-bordered table-sm">
          <thead class="table-info">
            <tr>
              <th scope="col" class="col-9">Cake Type</th>
              <th scope="col" class="col-auto">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredData" :key="item.cakesID">
              <td>
                {{ item.type }}
              </td>
              <td>
                <input
                  class="form-check-input"
                  type="checkbox"
                  v-model="item.statusID"
                  true-value="1"
                  false-value="2"
                  @change="updateStatus(item.cakesID, item.statusID)"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="col-5 assign-container">
        <h3>Assign a Cake Type</h3>
          <div class="multi-select-container">
          
            <VueMultiselect
            class="multi-select-dropdown"
            :max-height="300"
            v-model="selectedTypes"
            :options="unassignedTypes"
            :multiple="true"
            :close-on-select="false"
            placeholder="Select a Type"
            label="type"
            track-by="typeID">
            </VueMultiselect>
            <button @click="assignType" type="button">+ Cake Type</button>
         
          </div>
      </div>

    </div>
  </div>

</section>
</template>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style scoped>
#flavor-types * {
  font-family: "Poppins", sans-serif;
}

.assign-container {
  margin-left: auto;
}

.type-table, .assign-container {
  text-align: center;
  padding: 30px 20px;
}
.type-table h3, .assign-container h3 {
  text-decoration: underline;
  margin-bottom: 20px;
}

.multi-select-container {
  display: flex;
  align-items: center;
  gap: 20px;
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

table {
  margin-top: 10px;
}

table tr {
  font-size: 18px;
}

tr th {
  font-weight: 600;
}

.searchbox {
  text-align: left;
}

.searchbox label {
  font-weight: bold;
  margin-right: 5px;
}

</style>