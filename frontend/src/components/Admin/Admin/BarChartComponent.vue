<template>


<div style= "aspect-ratio: 1.75;">
    <canvas ref="myChart"></canvas>
    </div>
  </template>
  
  <script>
  import { Chart, registerables } from 'chart.js';
  Chart.register(...registerables);





  var barColors = [
  "#FCA3b7",
  "#F987C5",
  "#EC5578",
  "#FE5BAC",
  "#FC0FC0",
  "#F81894"
   ];


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
        type: "bar",
        data: {
          labels: this.label,
          datasets: [
            {
              label: "Orders by Month",
              backgroundColor: barColors,
              data: this.chartData,
            },
          ],
        },
        
        options: {
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
      });
    },
  };
  </script>