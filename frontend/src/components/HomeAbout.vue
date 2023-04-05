<template>
<section id="about" class="about">
<div class="container-fluid">
<div class="row">

  <div class="col-lg-5 align-items-stretch image-box"></div>
  <div class="col-lg-7 d-flex flex-column justify-content-center align-items-stretch">
    <div class="content">
      <h3><strong style="color:rgb(250, 9, 9);">Hello Everyone !</strong> Welcome to my page </h3>
      <p class="fst-italic">A few things to keep in mind for orders:</p>
      <ul>
        <li><i class="bx bx-check-double"> </i> Feminine style cakes only (See gallery below for examples)</li>
        <li><i class="bx bx-check-double"></i> Please describe your custom cake clearly and attach an example image</li>
        <li><i class="bx bx-check-double"></i> Please allow a few business days for your order to be accepted</li>
        <li><i class="bx bx-check-double"></i> If custom order does not match my style, I will not accept your order</li>
      </ul>
    </div>
  </div>

</div>
</div>
</section>
</template>


<style scoped>
/* @import "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"; */
@import "../assets/css/home.css";
.about {
  background: #fffaf3;
}

.about .content {
  padding: 0 80px;
}

.about .content h3 {
  font-weight: 400;
  font-size: 34px;
  color: #5f5950;
}

.about .content p {
  font-size: 15px;
  color: #848484;
}

.about .content ul {
  list-style: none;
  padding: 0;
}

.about .content ul li+li {
  margin-top: 15px;
}

.about .content ul li {
  position: relative;
  padding-left: 26px;
}

.about .content ul i {
  font-size: 20px;
  color: #fa0909;
  position: absolute;
  left: 0;
  top: 2px;
}

.about .image-box {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  min-height: 400px;
  position: relative;
  background-image: url("../assets/img/logo.png.jpeg");
}

</style>