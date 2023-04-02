<script setup>
import { ref, computed } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import VueTableLite from 'vue3-table-lite';
import FlavorAPI from '../../services/FlavorAPI';

// Get Flavor View
const flavors = ref([]);
const getFlavors = async () => {
  try {
    const response = await FlavorAPI.getAdminFlavorView();
    flavors.value = response.data;
  } catch(err) {
    console.log(err);
  }
}
getFlavors();

// TableLite Setup
const searchTerm = ref("");

// Table config
const table = ref({
  columns: [
    {
      label: "ID",
      field: "flavorID",
      width: "1%",
      sortable: true,
      isKey: true,
    },
    {
      label: "Flavor",
      field: "flavor",
      width: "10%",
      sortable: true,
    },
    {
      label: "Status",
      field: "description",
      width: "10%",
      sortable: true,
    },
  ],
  rows: computed(() => {
    return flavors.value.filter(
      (x) =>
        x.flavor.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        x.description.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
  }),
  totalRecordCount: computed(() => {
    return table.value.rows.length;
  }),
  sortable: {
    order: "flavorID",
    sort: "asc",
  },
})

// Route to updateFlavor Component
const router = useRouter();

const rowClicked = (row) => {
  router.push({ name: 'flavor-details', params: { id: row.flavorID } });
}

</script>


<template>
<section id="cake-flavors">

<div class="flavor-container">
  <h4>*Click on a Flavor to update*</h4>

  <div class="input-container">
    <div class="searchbox">
      <label>Search By:</label> <input v-model="searchTerm" />
    </div>
    <RouterLink to="/admin/flavor-form">
      <button type="button" class="btn btn-primary">+ Add Flavor</button>
    </RouterLink>
  </div>

  <VueTableLite
    id="cake-flavor-table"
    :is-static-mode="true"
    :columns="table.columns"
    :rows="table.rows"
    :total="table.totalRecordCount"
    :sortable="table.sortable"
    @row-clicked="rowClicked"
  ></VueTableLite>
</div>

</section>
</template>


<style scoped>
#cake-flavors {
  display: flex;
  justify-content: center;
}

.flavor-container {
  min-width: 800px;
}

#cake-flavors * {
  font-family: "Poppins", sans-serif;
}
#cake-flavors button {
  font-family: "Poppins", sans-serif;
  font-size: 16px;
}

#cake-flavors h4 {
  font-style: italic;
  color: #be123c;
  font-size: 18px;
  font-weight: 600;
}

#cake-flavor-table {
  margin-top: 14px;
  font-size: 16px;
}

.searchbox {
  text-align: left;
}

.searchbox label {
  font-weight: bold;
  margin-right: 5px;
}

.input-container {
  display: flex;
  align-items: center;
  margin-top: 12px;
  justify-content: space-between;
  padding-right: 20px;
}
</style>