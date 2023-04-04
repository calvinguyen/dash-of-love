<template>
<section id="links" class="links">
<div class="container">

  <div class="section-title">
    <h2>Useful <span>Links</span></h2>
  </div>

  <div class="link-container">
    <div class="col-lg-4">
      <div class="member">
        <div class="pic"><img src="../assets/img/logo.png.jpeg" class="img-fluid" alt=""></div>
        <div class="member-info">
          <h4>Jessica Ramos</h4>
          <div class="social">
            <a href="https://www.instagram.com/dashoflovetx/"><i class="bi bi-instagram"></i></a>
          </div>
        </div>
      </div>
    </div>
  </div>

</div>
</section>
</template>


<style scoped>
/* @import "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"; */
@import "../assets/css/home.css";

.links {
  background: url("../assets/img/cake-gallery-bg.jpg") center center no-repeat;
  background-size: cover;
  padding: 60px 0;
  position: relative;
}

.links::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.6);
  z-index: 9;
}

.links .container {
  position: relative;
  z-index: 10;
}

.links .member {
  text-align: center;
  margin-bottom: 80px;
  position: relative;
}

.links .member .member-info {
  position: absolute;
  bottom: -80px;
  left: 20px;
  right: 20px;
  background: #fff;
  padding: 20px 0;
  color: #433f39;
  box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: max-height 0.5s ease-in-out;
}

.links .member h4 {
  font-weight: 500;
  margin-bottom: 10px;
  font-size: 16px;
  color: #6c665c;
  position: relative;
  padding-bottom: 10px;
  font-family: "Poppins", sans-serif;
}

.links .member h4::after {
  content: "";
  position: absolute;
  display: block;
  width: 50px;
  height: 1px;
  background: #ffcf88;
  bottom: 0;
  left: calc(50% - 25px);
}

.links .member span {
  font-style: italic;
  display: block;
  font-size: 13px;
}

.links .member .social {
  margin-top: 15px;
}

.links .member .social a {
  transition: color 0.3s;
  color: #7a7368;
}

.links .member .social a:hover {
  color: #ffb03b;
}

.links .member .social i {
  font-size: 16px;
  margin: 0 2px;
}

.link-container {
  display: grid;
  place-items: center;
}

@media (max-width: 992px) {
  .links .member {
    margin-bottom: 110px;
  }
}

@media (min-width: 1024px) {
  .links {
    background-attachment: fixed;
  }
}

</style>