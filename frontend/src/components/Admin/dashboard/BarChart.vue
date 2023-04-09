<script setup>
import { ref, watch } from 'vue';
import { Bar } from 'vue-chartjs';
import { 
  Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale 
} from 'chart.js';
import VueDatePicker from '@vuepic/vue-datepicker';
import ReportAPI from '../../../services/ReportAPI';

const props = defineProps({
  display: Boolean,
});

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const chartData = ref({
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  datasets: [
    {
      label: "Total Orders This Year",
      data: [],
      backgroundColor: "red",
    },
    {
      label: "Total Orders Last Year",
      data: [],
      backgroundColor: "blue",
    },
  ]
});
const chartOptions = {
  // responsive: true,
  scales: {
    y: { 
      suggestedMin: 0,
      suggestedMax: 20,
      title: {
        display: true,
        text: 'Total Orders'
      }
    }
  }
}

const loaded = ref(false);

const initialYear = ref(new Date().getFullYear());

const getChartData = async (year) => {
  try {
    loaded.value = false;
    let thisYear = year.value;
    let lastYear = parseInt(thisYear) - 1;

    chartData.value.datasets[0].label = `Total Orders in ${thisYear}`;
    chartData.value.datasets[1].label = `Total Orders in ${lastYear}`;

    const response = await ReportAPI.getMonthlyOrdersByYear(thisYear);
    const responseTwo = await ReportAPI.getMonthlyOrdersByYear(lastYear);

    chartData.value.labels.forEach(month => {
      let thisYearRow = response.data.find(item => item.Order_Month == month);
      let lastYearRow = responseTwo.data.find(item => item.Order_Month == month);

      if (thisYearRow) {
        chartData.value.datasets[0].data.push(thisYearRow.Order_Count);
      } else chartData.value.datasets[0].data.push(0);
      
      if (lastYearRow) {
        chartData.value.datasets[1].data.push(lastYearRow.Order_Count);
      } else chartData.value.datasets[1].data.push(0);
    });

    loaded.value = true;
  } catch (err) {
    console.error(err);
  }
}
getChartData(initialYear);

watch(initialYear, async (newYear, oldYear) => {
  try {
    chartData.value.datasets[0].data = [];
    chartData.value.datasets[1].data = [];
    await getChartData(initialYear);

  } catch(err) {
    console.error(err);
  }
});

</script>


<template>
  <div :class="{'show': props.display}" class="select-container">
    <label>Select Year:</label>
    <VueDatePicker 
      class="year-input" 
      v-model="initialYear" 
      year-picker 
      :clearable="false" 
      mode-height="60"
      :year-range="[2000, new Date().getFullYear()]" 
    />
  </div>
  
  <Bar id="barchart" v-if="loaded" :data="chartData" :options="chartOptions" />

</template>


<style scoped>
.select-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.show {
  display: none;
}

.select-container label {
  margin-right: 10px;
  font-size: 16px;
  font-weight: 600;
}
.select-container .year-input {
  max-width: max-content;
}

</style>