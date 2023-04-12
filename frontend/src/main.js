// import 'mdb-vue-ui-kit/css/mdb.min.css';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5hutn4VkaktWITNNFTdTXG-nD783LW4U",
  authDomain: "dashoflove-6d678.firebaseapp.com",
  projectId: "dashoflove-6d678",
  storageBucket: "dashoflove-6d678.appspot.com",
  messagingSenderId: "810979565784",
  appId: "1:810979565784:web:7bc9616d429ef391b5b7ad"
};

initializeApp(firebaseConfig);

const app = createApp(App)

app.use(router)

app.mount('#app')