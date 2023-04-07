<script setup>
import { ref } from 'vue';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import ReportAPI from '../../../services/ReportAPI';

const report = ref([]);
const getReport = async () => {
  try {
    const response = await ReportAPI.getReferralOrders();
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
        <th>Referral Source</th>
        <th>Total Count</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="referral in report" :key="referral.referralID">
        <th>{{ referral.referralID }}</th>
        <td>{{ referral.referralID_count }}</td>
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