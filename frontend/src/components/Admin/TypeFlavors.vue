<script setup>
import { ref, computed } from 'vue';
import VueMultiselect from 'vue-multiselect'
import cakeTypeAPI from '../../services/cakeTypeAPI';
import productMenuAPI from '../../services/productMenuAPI';

const props = defineProps({
  id: String,
})

//Get flavors offered for cake type
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
};

const searchTerm = ref("");

const filteredData = computed(() => {
  let data = flavors.value;

  return data.filter((item) => 
    item.flavor.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
});

</script>


<template>
<section id="type-flavors">

  <!-- table with flavor assignments -->
  <div class="container">
    <div class="row">

      <div class="col-6 flavor-table">
        <h3>Set Status Flavor - Cake Type</h3>

        <div class="searchbox">
          <label>Search By:</label> <input v-model="searchTerm" />
        </div>

        <table class="table table-bordered table-sm">
          <thead class="table-info">
            <tr>
              <th scope="col" class="col-9">Flavor</th>
              <th scope="col" class="col-auto">Status</th>
            </tr>
          </thead>
          <tbody>
            <!-- <tr v-for="item in flavors" :key="item.cakesID"> -->
            <tr v-for="item in filteredData" :key="item.cakesID">
              <td>
                {{ item.flavor }}
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
        <h3>Assign a Flavor</h3>
          <div class="multi-select-container">
          
            <VueMultiselect
            class="multi-select-dropdown"
            :max-height="200"
            v-model="selectedFlavors"
            :options="unassignedFlavors"
            :multiple="true"
            :close-on-select="false"
            placeholder="Select a Flavor"
            label="flavor"
            track-by="flavorID">
            </VueMultiselect>
            <button @click="assignFlavor" type="button">+ Flavor</button>
         
          </div>
      </div>

    </div>
  </div>

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
  padding: 10px 50px;

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