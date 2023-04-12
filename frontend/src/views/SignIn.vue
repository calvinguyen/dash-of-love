<script setup>
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { useRouter } from 'vue-router';


const router = useRouter();

const email = ref('');
const password = ref('');
const errMsg = ref();

const pwMsg = ref();

const login = () => {
  const auth = getAuth();

  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log("Successfully Signed In!");
      router.push('/admin');
    })
    .catch((error) => {
      console.log(error.code);
      switch (error.code) {
        case "auth/invalid-email":
          errMsg.value = "Invalid email";
          break;
        case "auth/user-not-found":
          errMsg.value = "No account with that email was found";
          break;
        case "auth/wrong-password":
          errMsg.value = "Incorrect password";
          break;
        default:
          errMsg.value = "Email or Password was incorrect";
          break;
      }
    });
}

const resetPassword = () => {
  const auth = getAuth();

  sendPasswordResetEmail(auth, email.value)
  .then(() => {
    pwMsg.value = 'Password reset link sent to email!'
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    errMsg.value = 'A user with this email does not exist!';
  });
}

</script>

<template>
<section id="login-page">

  <div class="logo">
    <img src="../assets/img/logo.png.jpeg" alt="">
  </div>

  <div class="right-container">
    <div class="text-container">
      <h1 class="mb-5">Sign In</h1>

      <label for="email" class="form-label">Email Address</label>
      <input v-model="email" class="form-control mb-3" type="text" placeholder="Email">

      <label for="password" class="form-label">Password</label>
      <input v-model="password" class="form-control mb-4" type="password" placeholder="Password">

      <p v-if="errMsg" style="color: red">{{ errMsg }}</p>

      <button @click="login">Login</button>
      <hr>
      <button @click="resetPassword" class="reset mb-2">Forgot Password?</button>
      <p v-if="pwMsg" style="color: blue; font-weight: bold;">{{ pwMsg }}</p>
    </div>
  </div>

</section>
</template>



<style scoped>
* {
  font-family: "Poppins", sans-serif;
}

#login-page {
  display: flex;
  height: 100vh;
  padding: 0;
  width: 100%;
}
#login-page h1 {
  font-weight: 900;
}

#login-page label {
  font-weight: 500;
  font-size: 20px;
}

.logo {
  flex: 4;
  display: grid;
  place-items: center;
  background-color: rgba(253, 213, 220, 0.74);
}

.logo img {
  max-width: 50%;
  border-radius: 50%;
  border: 1px solid white;
}

.right-container {
  flex: 3;
  background-color: #fffaf3;
}

.text-container {
  padding: 150px;
  padding-top: 250px;
}

.text-container button {
  background: #fc8484;
  width: 100%;
  border: 0;
  padding: 10px 24px;
  color: #ffffff;
  transition: 0.4s;
  border-radius: 5px;
  font-size: 20px;
}

button.reset {
  background: blue;
  width: 100%;
  font-size: 15px;
}

.text-container button:hover {
  background: #ff9898;
}

button.reset:hover {
  background-color: royalblue;
}

</style>