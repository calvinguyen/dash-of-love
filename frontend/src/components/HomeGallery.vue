<script setup>
import { onMounted } from 'vue';
import 'glightbox/dist/css/glightbox.css';
import 'glightbox/dist/js/glightbox.js';
import GLightbox from 'glightbox';

// let lightbox;
onMounted(() => {
  // lightbox = GLightbox({ selector: ".gallery-lightbox"});
  GLightbox({ selector: ".gallery-lightbox"});
})

</script>


<template>
<section id="gallery" class="gallery">
<div class="container-fluid">
  
  <div class="section-title">
    <h2>My featured <span>Cake Orders</span></h2>
  </div>

  <div class="row g-0">

    <div class="col-lg-3 col-md-4">
      <div class="gallery-item">
        <a href="src/assets/img/gallery/gallery-1.jpg" class="gallery-lightbox">
          <img src="../assets/img/gallery/gallery-1.jpg" alt="" class="img-fluid">
        </a>
      </div>
    </div>
    <div class="col-lg-3 col-md-4">
      <div class="gallery-item">
        <a href="src/assets/img/gallery/gallery-2.jpg" class="gallery-lightbox">
          <img src="../assets/img/gallery/gallery-2.jpg" alt="" class="img-fluid">
        </a>
      </div>
    </div>
    <div class="col-lg-3 col-md-4">
      <div class="gallery-item">
        <a href="src/assets/img/gallery/gallery-3.jpg" class="gallery-lightbox">
          <img src="../assets/img/gallery/gallery-3.jpg" alt="" class="img-fluid">
        </a>
      </div>
    </div>
    <div class="col-lg-3 col-md-4">
      <div class="gallery-item">
        <a href="src/assets/img/gallery/gallery-4.jpg" class="gallery-lightbox">
          <img src="../assets/img/gallery/gallery-4.jpg" alt="" class="img-fluid">
        </a>
      </div>
    </div>
    <div class="col-lg-3 col-md-4">
      <div class="gallery-item">
        <a href="src/assets/img/gallery/gallery-5.jpg" class="gallery-lightbox">
          <img src="../assets/img/gallery/gallery-5.jpg" alt="" class="img-fluid">
        </a>
      </div>
    </div>
    <div class="col-lg-3 col-md-4">
      <div class="gallery-item">
        <a href="src/assets/img/gallery/gallery-6.jpg" class="gallery-lightbox">
          <img src="../assets/img/gallery/gallery-6.jpg" alt="" class="img-fluid">
        </a>
      </div>
    </div>
    <div class="col-lg-3 col-md-4">
      <div class="gallery-item">
        <a href="src/assets/img/gallery/gallery-7.jpg" class="gallery-lightbox">
          <img src="../assets/img/gallery/gallery-7.jpg" alt="" class="img-fluid">
        </a>
      </div>
    </div>
    <div class="col-lg-3 col-md-4">
      <div class="gallery-item">
        <a href="src/assets/img/gallery/gallery-8.jpg" class="gallery-lightbox">
          <img src="../assets/img/gallery/gallery-8.jpg" alt="" class="img-fluid">
        </a>
      </div>
    </div>

  </div>

</div>
</section>
</template>


<style>
/* @import "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"; */
@import "../assets/css/home.css";

.gallery {
  padding-bottom: 0;
}

.gallery .gallery-item {
  overflow: hidden;
  border-right: 3px solid #fff;
  border-bottom: 3px solid #fff;
}

.gallery .gallery-item img {
  transition: all ease-in-out 0.4s;
}

.gallery .gallery-item:hover img {
  transform: scale(1.1);
}
</style>