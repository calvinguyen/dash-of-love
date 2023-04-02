<script setup>

</script>


<template>

<table class="table table-bordered table-sm">
          <thead class="table-info">
            <tr>
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
                <!-- @change="${updateStatus(row.cakesID, row.statusID)}" -->
                <!-- @change="updateStatus(${row.cakesID}, ${row.statusID})" -->
              </td>
            </tr>
          </tbody>
        </table>

</template>


<style scoped>

</style>