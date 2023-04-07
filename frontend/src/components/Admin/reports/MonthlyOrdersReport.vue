<script setup>
import { ref } from 'vue';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import ReportAPI from '../../../services/ReportAPI';

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
  autoTable(doc, { html: '#report-table' });

  doc.save('report.pdf');
}

</script>


<template>

  <button @click="generateReport" type="button" class="btn btn-primary btn-lg mb-4">Save Report</button>
  <table id="report-table" class="table table-sm table-striped table-hover">
    <thead class="table-primary">
      <tr>
        <th>Month</th>
        <th>Total Count</th>
        <th>Total - Old Average</th>
        <th>Not Insta</th>
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

</template>


<style scoped>
* {
  font-family: 'Poppins', sans-serif;
}

#report-table {
  max-width: 600px;
}

</style>