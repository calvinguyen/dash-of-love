<script setup>
import { ref } from 'vue';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import ReportAPI from '../../../services/ReportAPI';
import PieChart from '../dashboard/PieChart.vue';

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
  autoTable(doc, { 
    startY: 50,
    html: '#report-table2',
    didDrawPage: function (data) {
      // Header
      doc.setFontSize(20);
      doc.setTextColor(40);
      doc.text("Referral Source Report", data.settings.margin.left, 22);
      // data before table
      doc.setFontSize(10)
      doc.text("This report shows clients and their 'referral source' whether it be instagram or an outside source.", data.settings.margin.left, 30);
      doc.text("This makes it possible to quantify how many clients are being reached outside of instagram.", data.settings.margin.left, 36);
      doc.text("Assigned Objective: Potential audience reached is increased by 50% ", data.settings.margin.left, 40);
      doc.text("& Client use of social media for information is reduced by 90%", data.settings.margin.left, 46);
      // data after table
      var img = piechart.toDataURL('image/png', 1);
      doc.addImage(img, 'png', data.settings.margin.left, 120, 100,100);
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
  doc.save('referral_source_report.pdf');
}

</script>


<template>
<section class="report-container">
  <div class="heading-container">
    <h1> Referral Source Report </h1>
    <button @click="generateReport" type="button" class="btn btn-danger">
      <i class="bi bi-filetype-pdf" style="font-size: 17px;"></i>
      Download Report
    </button>
  </div>
  <p>
    This report shows clients and their "referral source" whether it be instagram or an outside source.
    This makes it possible to quantify how many clients are being reached outside of instagram.
  </p>
  <p>
    Assigned Objective: Potential audience reached is increased by 50% & Client use of social media 
    for information is reduced by 90%.
  </p>

  <div class="container mt-4">
    <div class="row">

      <div class="col-6">
        <table id="report-table2" class="table table-sm table-striped table-hover">
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
      </div>

      <div class="col">
        <PieChart class="pie-container" />
      </div>

    </div>
  </div>

  <canvas ref="piechart"></canvas>
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

#report-table2 {
  max-width: 700px;
  text-align: center; 
}

.pie-container {
  max-width: 500px;
}

</style>