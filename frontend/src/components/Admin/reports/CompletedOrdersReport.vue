<script setup>
import { ref } from 'vue';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import ReportAPI from '../../../services/ReportAPI';

const report = ref([]);
const getReport = async () => {
  try {
    const response = await ReportAPI.getCompletedOrders();
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
    html: '#report-table4',

    didDrawPage: function (data) {
      // Header
      doc.setFontSize(20);
      doc.setTextColor(40);
      doc.text(" All-time Order Status Report", data.settings.margin.left, 22);
      // data before table
      doc.setFontSize(10)
      doc.text("This report shows a count of each status for all existing orders", data.settings.margin.left, 30);
      
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
  doc.save('all-time_order_status_report.pdf');
}

</script>


<template>
<section class="report-container">
  <div class="heading-container">
    <h1> All-Time Order Status Report</h1>
    <button @click="generateReport" type="button" class="btn btn-danger">
      <i class="bi bi-filetype-pdf" style="font-size: 17px;"></i>
      Download Report
    </button>
  </div>
  <p>
    This report shows a count of each status for all existing orders, which 
    helps give an idea how many orders in total are being missed/completed/paid for...etc.
  </p>

  <table id="report-table4" class="table table-sm table-striped table-hover">
    <thead class="table-primary">
      <tr>
        <th>Order Status</th>
        <th>Status Count</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in report" :key="row.Order_Status">
        <td>{{ row.Order_Status }}</td>
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
  max-width: 1000px;
}

#report-table4 {
  max-width: 700px;
  text-align: center;
}

</style>