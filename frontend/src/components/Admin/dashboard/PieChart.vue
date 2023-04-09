<script setup>
import { ref } from 'vue';
import { Pie } from 'vue-chartjs';
import { 
  Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale 
} from 'chart.js';
import ReportAPI from '../../../services/ReportAPI';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

const chartData = ref({
  labels: [],
  datasets: [
    {
      label: "Order Referrals",
      data: [],
      backgroundColor: [
        '#41B883', 
        '#fb923c', 
        '#00D8FF', 
        '#DD1B16',
        '#facc15',
        '#a855f7'
      ],
      hoverOffset: 8,
    }
  ]
});
const chartOptions = {

}

const loaded = ref(false);

const getChartData = async () => {
  try {
    loaded.value = false;
    const response = await ReportAPI.getReferralOrders();

    chartData.value.labels = response.data.map(item => item.referralID);
    chartData.value.datasets[0].data = response.data.map(item => item.referralID_count);

    loaded.value = true;
  } catch(err) {
    console.error(err);
  }
}

getChartData();

</script>


<template>
<div class="pie-container">
  <Pie id="piechart" v-if="loaded" :data="chartData" :options="chartOptions" />
</div>
</template>


<style scoped>
.pie-container {
  width: 80%;
  margin: 0 auto;
}
</style>