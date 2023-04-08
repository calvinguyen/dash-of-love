<script setup>
import { ref } from 'vue';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import ReportAPI from '../../../services/ReportAPI';

const report = ref([]);
const getReport = async () => {
  try {
    const response = await ReportAPI.getOrderStatuses();
    report.value = response.data;
  } catch (error) {
    console.error(error);
  }
}
getReport();

function generateReport() {
  const doc = new jsPDF();
  autoTable(doc, {
    startY: 50,
    html: '#report-table3',
    didDrawPage: function (data) {
      // Header
      doc.setFontSize(20);
      doc.setTextColor(40);
      doc.text("Monthly Order Statuses Report", data.settings.margin.left, 22);
      // data before table
      doc.setFontSize(10)
      doc.text("This report shows a count of each status for the current month's orders", data.settings.margin.left, 30);
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
  }); 
  doc.save('monthly_order_status_report.pdf');
}

</script>


<template>
<section class="report-container">
  <div class="heading-container">
    <h1> Monthly Order Status Report </h1>
    <button @click="generateReport" type="button" class="btn btn-danger">
      <i class="bi bi-filetype-pdf" style="font-size: 17px;"></i>
      Download Report
    </button>
  </div>
  <p>This report shows a count of each status for the current month's orders.</p>
  
  <table id="report-table3" class="table table-sm table-striped table-hover">
    <thead class="table-primary">
      <tr>
        <th>Order Status</th>
        <th>Total Count</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in report" :key="row.Order_Status">
        <th>{{ row.Order_Status }}</th>
        <td>{{ row.Status_count }}</td>
      </tr>
    </tbody>
  </table>

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
  min-width: 1000px;
}

#report-table3 {
  max-width: 700px;
  text-align: center;
}

</style>