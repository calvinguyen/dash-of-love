<script setup>
import { ref, computed } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import VueTableLite from 'vue3-table-lite';
import cakeTypeAPI from '../../services/cakeTypeAPI';

// Get Customer View
const cakeTypes = ref([]);
const getCakeTypes = async () => {
  try {
    const response = await cakeTypeAPI.getAdminTypeView();
    cakeTypes.value = response.data;
  } catch(err) {
    console.log(err);
  }
}
getCakeTypes();

// TableLite Setup
const searchTerm = ref("");

// Table config
const table = ref({
  columns: [
    {
      label: "ID",
      field: "typeID",
      width: "1%",
      sortable: true,
      isKey: true,
    },
    {
      label: "Type",
      field: "type",
      width: "10%",
      sortable: true,
    },
    {
      label: "Price",
      field: "price",
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
    return cakeTypes.value.filter(
      (x) =>
        x.type.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        x.price.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        x.description.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
  }),
  totalRecordCount: computed(() => {
    return table.value.rows.length;
  }),
  sortable: {
    order: "typeID",
    sort: "asc",
  },
})

// Route to updateCustomer Component
const router = useRouter();

const rowClicked = (row) => {
  console.log(row)
  // router.push({ name: 'update-customer', params: { id: row.customerID } });
}

</script>


<template>
<section id="cake-types">

<div class="type-container">
  <!-- <h1>Cake Types</h1> -->
  <h4>*Click on a Type to update*</h4>

  <div class="input-container">
    <div class="searchbox">
      <label>Search By:</label> <input v-model="searchTerm" />
    </div>
    <RouterLink to="/admin/menu">
      <button type="button" class="btn btn-primary">+ Add Cake Type</button>
    </RouterLink>
  </div>

  <VueTableLite
    id="cake-type-table"
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
#cake-types {
  display: flex;
  justify-content: center;
}

.type-container {
  min-width: 900px;
}

#cake-types * {
  font-family: "Poppins", sans-serif;
}
#cake-types button {
  font-family: "Poppins", sans-serif;
  font-size: 16px;
}

#cake-types h1 {
  font-size: 27px;
  font-weight: 600;
}

#cake-types h4 {
  font-style: italic;
  color: #be123c;
  font-size: 18px;
}

#cake-type-table {
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