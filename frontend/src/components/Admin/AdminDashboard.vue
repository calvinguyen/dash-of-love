<script setup>
import OrdersReady from './dashboard/TodayOrdersReady.vue';
import OrdersNew from './dashboard/TodayOrdersNew.vue';
import BarChart from './dashboard/BarChart.vue';
import PieChart from './dashboard/PieChart.vue';
import WeekOrders from './dashboard/WeekOrders.vue';

</script>


<template>
<section id="admin-dashboard">

<div class="container container-custom">
  <div class="row">

    <div class="col p-0 border-helper-right">
      <div class="container">
        <h5>Today's Orders</h5>
        <div class="row row-cols-1">
          <div class="col">
            <!-- !TODO: Make Dynamic -->
            <OrdersReady />
            <hr />
          </div>
          <div class="col">
            <!-- !TODO: Make Dynamic -->
            <OrdersNew />
            <hr />
          </div>
        </div>
      </div>
    </div>

    <div class="col-7">
      <h5 class="mb-2">Monthly Orders</h5>
      <BarChart />
    </div>

  </div>
</div>

<div class="container mt-3 container-custom">
  <div class="row">

    <div class="col border-helper-right">
      <h5 class="mb-4">This Week's Orders</h5>
      <!-- !TODO: Make Dynamic -->
      <WeekOrders />
    </div>

    <div class="col-4">
      <h5>Referrals</h5>
      <PieChart />
    </div>

  </div>
</div>

</section>
</template>


<style>
#admin-dashboard {
  background-color: white;
}
#admin-dashboard * {
  font-family: 'Poppins', sans-serif;
}

h5 {
  text-align: center;
  background-color: #292524;
  color: white;
  padding: 5px;
}

.container-custom {
  margin: 0;
  min-width: 100%;
}

.border-helper {
  border:1px solid purple;
}
.border-helper-right {
  border-right: 1px solid black;
}

hr {
  border: 0;
  height: 2px;
  background: #333;
  background-image: linear-gradient(to right, #ccc, black, #ccc);
}

</style>