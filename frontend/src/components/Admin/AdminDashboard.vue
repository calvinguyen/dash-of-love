<script setup>
</script>


<template>
    <main>



        <div>
            <p><button @click="downloadONE" class="Reports">Download Monthly Customer Report</button></p>
            <p><button @click="downloadTWO" class="Reports">Download Reference Report</button></p>
            <p><button @click="downloadTHREE" class="Reports">Download Order Status Report</button></p>
        </div>
        <div class="px-10 pt-20">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
                <h3 class="text-2xl font-bold">Monthly Orders Chart</h3>

                <div class="flex flex-col col-span-2">
                    <OrdersBar v-if="!loading && !error" :label="labels" :chart-data="count"></OrdersBar>
                    <ReferralsPie v-if="!loading && !error" :label="labels2" :chart-data="count2"></ReferralsPie>
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
import ReferralsPie from "@/components/Admin/PieChartComponent.vue";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
export default {
    components: {
        OrdersBar,
        ReferralsPie
    },
    data() {
        return {
            queryData: [],
            labels: [],
            count: [],
            labels2: [],
            count2: [],
            loading: false,
            error: null,
        };
    },



    methods: {



        downloadONE() {
            const doc = new jsPDF();

            let bodyData = [];
            for (let i = 0; i < this.labels2.length; i++) {
                let rowData = [];
                for (let j = 0; j < this.labels2.length; j++) {
                    rowData.push(this.labels2[i][j]);
                }
                bodyData.push(rowData);
            }




            autoTable(doc, { html: '#my-table' })

            // Or use javascript directly:
            autoTable(doc, {
                head: ['Referal ID', 'Referral Count'],
                body: bodyData
            })

            doc.save("sample.pdf");
        },

        downloadTWO() {
            var input = this.labels2
            var result = Object
                .entries(input.search)
                .reduce(function (result, entry) {

                    const key = entry[0]
                    const value = entry[1]

                    if (key === 'referralID') {

                        // When the 'name' key is encountered, handle the value
                        // differently, by addting the items of this value array
                        // to the result
                        value.forEach(function (item) {
                            result.push('%' + item.tag + '%')
                        })
                    }
                    else {

                        // Append values for other keys directly to the result
                        result.push(value)
                    }

                    return result

                }, [])

            console.log(result)

            const doc = new jsPDF();

            let bodyData = [];
            for (let i = 0; i < this.labels2.length; i++) {
                let rowData = [];
                for (let j = 0; j < this.labels2.length; j++) {
                    rowData.push(this.labels2[i][j]);
                }
                bodyData.push(rowData);
            }

            autoTable(doc, { html: '#my-table' })

            // Or use javascript directly:
            autoTable(doc, {
                head: ['Referal ID', 'Referral Count'],
                body: result
            })

            doc.save("sample.pdf");
        },

        routePush(routeName) {
            this.$router.push({ name: routeName });
        },
        async fetchData() {
            try {
                this.error = null;
                this.loading = true;
                const url = import.meta.env.VITE_ROOT_API + `/reports/monthly-order`;
                const response = await axios.get(url);
                //"re-organizing" - mapping json from the response
                this.queryData = response.data;
                this.labels = response.data.map((item) => item.Order_Month);
                this.count = response.data.map((item) => item.Order_count);
                return {
                    props: {
                        response
                    }
                }

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
            try {
                this.error = null;
                this.loading = true;
                const url = import.meta.env.VITE_ROOT_API + `/reports/referrals`;
                const response = await axios.get(url);
                //"re-organizing" - mapping json from the response
                this.queryData = response.data;
                this.labels2 = response.data.map((item) => item.referralID);
                this.count2 = response.data.map((item) => item.referralID_count);

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

<style scoped>
.Reports {
    background-color: #ce0d0d;
    border: 5px;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 12px;
    margin-left: 10px;
    margin-bottom: 10px;
    margin-top: 10px;
    margin-right: 10px;
}

.Reports:hover {
    background-color: #ea8d8d;
    color: white;
}
</style>