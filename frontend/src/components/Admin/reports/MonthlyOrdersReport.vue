<script setup>
import BarChart from '../dashboard/BarChart2.vue';
import { ref } from 'vue';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import ReportAPI from '../../../services/ReportAPI';


// Download chart report Function converts canvas data into image URL -------------------------------
function downloadchart5(){
const imageLink = document.createElement('a');
imageLink.download = 'canvas.png';
imageLink.href = barchart.toDataURL('image/png', 1);
// window.open(imagelink)
// document.write('<img src=" '+imageLink+' "/>')
console.log(imageLink.href);
imageLink.click();
}




// Table Report Generation---------------------------------------
const report = ref([]);
const getReport = async () => {
  try {
    const response = await ReportAPI.getMonthlyOrders();
    report.value = response.data;
  } catch (error) {
    console.error(error);
  }
}
getReport();

function generateReport() {
  const doc = new jsPDF();


  //Table
  autoTable(doc, {



    startY: 50,
    html: '#report-table',


    didDrawPage: function (data) {

      // Header

      doc.setFontSize(20);
      doc.setTextColor(40);
      doc.text("Monthly Order Report", data.settings.margin.left, 22);


      // data before table
      doc.setFontSize(10)
      doc.text("This report shows the tottal amount of clients placing orders per month through the application. ", data.settings.margin.left, 30);
      doc.text("Assigned Objectives: Incoming Social Media order messages are reduced by 80%", data.settings.margin.left, 36);
      doc.text("& Potential audience reached is increased by 50%", data.settings.margin.left, 40);
      doc.text("Previous Monthly Order Average: 120", data.settings.margin.left, 46);

      // data after table



      // Footer
      var str = "Page " + doc.internal.getNumberOfPages();

      doc.setFontSize(10);

      // jsPDF 1.4+ uses getWidth, <1.4 uses .width
      var pageSize = doc.internal.pageSize;
      var pageHeight = pageSize.height
        ? pageSize.height
        : pageSize.getHeight();
      doc.text(str, data.settings.margin.left, pageHeight - 10);
    },

  }


  );


  doc.save('report.pdf');
}

</script>


<template>
  <h1> Monthly Order Report </h1>
  <p>This report shows the tottal amount of clients placing orders per month through the application.</p>
  <p>Assigned Objectives: Incoming Social Media order messages are reduced by 80% & Potential audience reached is
    increased by 50%</p>
  <p>Previous Monthly Order Average: 120</p>
 
  <!-- TABLE  ----------------------------------------------->

  <table id="report-table" class="table table-sm table-striped table-hover">
    <thead class="table-primary">
      <tr>
        <th style="width:300px">Month</th>
        <th>Total Count</th>
        <th>Mothly Avg Change (+/-)</th>
        <th>Total: Not Insta</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in report" :key="row.Order_Month">
        <td>{{ row.Order_Month }}</td>
        <td>{{ row.Order_Count }}</td>
        <td>{{ row.Total_Minus_Old_Average }}</td>
        <td>{{ row.Not_Insta }}</td>
      </tr>
    </tbody>
  </table>
  <!-- BUTTON------------------------------------------------------->
  <button @click="generateReport" type="button" class="btn btn-primary btn-lg mb-4">Download Report</button>

<!-- CHART --------------------------->  
    
<BarChart id="myChart" style="display:inline-block"/> 
    
    
    <canvas ref="barchart" width="5" height="5"></canvas>
    
 <!---CHART Button----------------------->
    <button @click="downloadchart5()" type="button"  class="btn btn-primary btn-lg mb-4">Download Chart </button>





</template>


<style scoped>
* {
  font-family: 'Poppins', sans-serif;
}

#report-table {
  max-width: 1200px;
  text-align: center; 
}
</style>