<script setup>


</script>


<template>
    <main>
        <div class="px-10 pt-20">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        <h3 class="text-2xl font-bold">Monthly Orders Chart</h3>
        
        <div class="flex flex-col col-span-2">
          <OrdersBar
            v-if="!loading && !error"
            :label="labels"
            :chart-data="count"
          ></OrdersBar>
        </div>

        <!-- Start of loading animation -->
        <div class="mt-40" v-if="loading">
          <p class="text-6xl font-bold text-center text-gray-500 animate-pulse">
            Loading...
          </p>
        </div>
        <!-- End of loading animation -->

        <!-- Start of error alert -->
        <div class="mt-12 bg-red-50" v-if="error">
          <h3 class="px-4 py-1 text-4xl font-bold text-white bg-red-800">
            {{ error.title }}
          </h3>
          <p class="p-4 text-lg font-bold text-red-900">
            {{ error.message }}
          </p>
        </div>

      </div>
    </div>

    </main>
<!-- Chart.js -> doughnut or pie? -> displays amount of each referrals for all orders

Chart.js -> barchart -> displays number of orders every month from Jan - Dec. -->

</template>


<script>
import axios from "axios";
import OrdersBar from "@/components/Admin/BarChartComponent.vue";
export default {
  components: {
    OrdersBar
  },
  data() {
    return {
      queryData: [],
      labels: [],
      count: [],
      loading: false,
      error: null,
    };
  },
  methods: {
    routePush(routeName) {
      this.$router.push({ name: routeName });
    },
    async fetchData() {
      try {
        this.error = null;
        this.loading = true;
        const url = import.meta.env.VITE_ROOT_API + `/dashboard`;
        const response = await axios.get(url);
        //"re-organizing" - mapping json from the response
        this.queryData = response.data;
        this.labels = response.data.map((item) => item.Order_Month);
        this.count = response.data.map((item) => item.Order_count);
      } catch (err) {
        if (err.response) {
          // client received an error response (5xx, 4xx)
          this.error = {
            title: "Server Response",
            message: err.message,
          };
        } else if (err.request) {
          // client never received a response, or request never left
          this.error = {
            title: "Unable to Reach Server",
            message: err.message,
          };
        } else {
          // There's probably an error in your code
          this.error = {
            title: "Application Error",
            message: err.message,
          };
        }
      }
      this.loading = false;
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>