<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import OrderAPI from '../../../services/OrderAPI';

// Get Order View
const ordersReadyToday = ref([]);
const getOrdersReadyToday = async () => {
  try {
    let today = new Date().toLocaleDateString('fr-CA');
    const response = await OrderAPI.getOrdersReadyToday(today);
    ordersReadyToday.value = response.data;
  } catch(err) {
    console.log(err);
  }
}
getOrdersReadyToday();

const orderCount = computed(() => ordersReadyToday.value.length);


const router = useRouter();

const viewClicked = (orderID) => {
  router.push({ name: 'update-order', params: { id: orderID } });
}

</script>


<template>
<h6 class="mt-2 today-title">Ready for Pickup ({{ orderCount }})</h6>

<table class="table table-sm table-striped table-hover">
  <thead class="table-dark">
    <tr>
      <th>#</th>
      <th>Customer</th>
      <th>Phone</th>
      <th>Amount</th>
      <th>Status</th>
      <th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="order in ordersReadyToday" :key="order.orderID">
      <th>{{ order.orderID }}</th>
      <td>{{ order.Customer }}</td>
      <td>{{ order.phone.replace(/\D+/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3') }}</td>
      <td>${{ order.final_price }}</td>
      <td>{{ order.description }}</td>
      <td>
        <button @click="viewClicked(order.orderID)" type="button" class="btn btn-primary btn-sm">View</button>
      </td>
    </tr>
  </tbody>
</table>

</template>


<style scoped>
#ready-table {
  font-size: 12px;
}
</style>