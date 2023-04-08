<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import OrderAPI from '../../../services/OrderAPI';

// Get Order View
const ordersNewToday = ref([]);
const getOrdersNewToday = async () => {
  try {
    let today = new Date().toLocaleDateString('fr-CA');
    const response = await OrderAPI.getOrdersNewToday(today);
    ordersNewToday.value = response.data;
  } catch(err) {
    console.log(err);
  }
}
getOrdersNewToday();

const orderCount = computed(() => ordersNewToday.value.length);


const router = useRouter();

const viewClicked = (orderID) => {
  router.push({ name: 'update-order', params: { id: orderID } });
}

</script>


<template>
<h6 class="mt-2 today-title">New Orders ({{ orderCount }})</h6>

<table class="table table-sm table-striped table-hover">
  <thead class="table-dark">
    <tr>
      <th>#</th>
      <th>Customer</th>
      <th>Cake</th>
      <th>flavor</th>
      <th>Status</th>
      <th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="order in ordersNewToday" :key="order.orderID">
      <th>{{ order.orderID }}</th>
      <td>{{ order.Customer }}</td>
      <td>{{ order.type }}</td>
      <td>{{ order.flavor }}</td>
      <td>{{ order.description }}</td>
      <td>
        <button @click="viewClicked(order.orderID)" type="button" class="btn btn-primary btn-sm">View</button>
      </td>
    </tr>
  </tbody>
</table>

</template>


<style scoped>
#new-table {
  font-size: 12px;
}
</style>