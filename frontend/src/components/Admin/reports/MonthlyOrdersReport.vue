<script setup>
import { ref } from 'vue';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import ReportAPI from '../../../services/ReportAPI';
import BarChart from '../dashboard/BarChart.vue';

const report = ref([]);
const getReport = async () => {
  try {
    const response = await ReportAPI.getMonthlyOrdersByYear( new Date().getFullYear() );
    report.value = response.data;
  } catch (error) {
    console.error(error);
  }
}
getReport();

/* function generateReport() {
  const doc = new jsPDF();
  autoTable(doc, { html: '#report-table' });

  doc.save('report.pdf');
} */
function generateReport() {
  const doc = new jsPDF();
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
      var img = barchart.toDataURL('image/png', 1);
      doc.addImage(img, 'png', data.settings.margin.left, 100, 170,100);
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
  });
  doc.save('monthly_orders_report.pdf');
}

</script>


<template>
<section class="report-container">
  <div class="heading-container">
    <h1> Monthly Order Report </h1> 
    <button @click="generateReport" type="button" class="btn btn-danger">
      <i class="bi bi-filetype-pdf" style="font-size: 17px;"></i>
      Download Report
    </button>
  </div>
  <p>This report shows the total amount of clients placing orders per month through the application.</p>
  <p>
    Assigned Objectives: Incoming Social Media order messages are reduced by 80% & Potential audience reached is
    increased by 50%
  </p>
  <p>Previous Monthly Order Average: 120</p>

  <table id="report-table" class="table table-sm table-striped table-hover mb-5">
    <thead class="table-primary">
      <tr>
        <th style="width:300px">Month</th>
        <th>Total Count</th>
        <th>Monthly Avg Change (+/-)</th>
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

  <BarChart :display="true" />
  <canvas ref="barchart"></canvas>

</section>
</template>


<style scoped>
* {
  font-family: 'Poppins', sans-serif;
}

.heading-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.report-container {
  max-width: 1000px;
}

#report-table {
  max-width: 1200px;
  text-align: center; 
}

</style>