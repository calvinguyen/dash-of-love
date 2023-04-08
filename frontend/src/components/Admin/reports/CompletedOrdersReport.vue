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
  autoTable(doc, { html: '#report-table' });

  doc.save('report.pdf');
}

</script>


<template>

  <button @click="generateReport" type="button" class="btn btn-primary btn-lg mb-4">Save Report</button>
  <table id="report-table" class="table table-sm table-striped table-hover">
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

</template>


<style scoped>
* {
  font-family: 'Poppins', sans-serif;
}

#report-table {
  max-width: 600px;
}

</style>