<script setup>
import { ref, reactive, computed } from 'vue';
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

const updateStatus = async (cakesID, statusID) => {
  try {
    let data = { statusID: statusID };
    const response = await productMenuAPI.updateMenuItemStatusByID(cakesID, data);
  } catch(err) {
    console.log(err);
  }
}

</script>


<template>
<section id="type-flavors">

  <!-- <h1>type flavors</h1> -->
  <!-- table with flavor assignments -->
  <div class="container border-helper">
    <div class="row">

      <div class="col-7 border-helper flavor-table">
        <h3>Flavors</h3>
        <table class="table table-bordered table-sm">
          <thead>
            <tr class="table-primary">
              <th scope="col" class="col-9">Flavor</th>
              <th scope="col" class="col-auto">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in flavors" :key="item.cakesID">
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

      <div class="col-5 border-helper assign-container">
        <h3>Assign a Flavor</h3>
        multiselect goes here
      </div>

    </div>
  </div>

</section>
</template>


<style scoped>
#type-flavors * {
  font-family: "Poppins", sans-serif;
}
.border-helper {
  border: 1px solid black;
}

.flavor-table, .assign-container {
  text-align: center;
  padding: 30px 60px;
}
.flavor-table h3, .assign-container h3 {
  text-decoration: underline;
}

table tr {
  font-size: 18px;
}

</style>