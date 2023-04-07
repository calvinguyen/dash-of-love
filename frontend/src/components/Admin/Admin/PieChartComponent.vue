<template>


    <canvas ref="myChart" style="height:100%; max-height:750px"></canvas>

</template>
  
  <script>
  import { Chart, registerables } from 'chart.js';
  
  var barColors = [
  "#FCA3b7",
  "#F987C5",
  "#EC5578",
  "#FE5BAC",
  "#FC0FC0",
  "#F81894"
   ];





  Chart.register(...registerables);
  export default {
    props: {
      label: {
        type: Array,
      },
      chartData: {
        type: Array,
      },
    },
    async mounted() {
      console.log(this.chartData);
      await new Chart(this.$refs.myChart, {
        type: "pie",
        data: {
          labels: this.label,
          datasets: [
            {
              label: "Referral Type",
              backgroundColor: barColors,
              data: this.chartData,
            },
          ],
        },
        
        // options: {
        //     scales: {
        //       y: { 
        //           suggestedMin: 0,
        //           suggestedMax: 20
        //       }
        //     }
        // }
      });
    },
  };
  </script>