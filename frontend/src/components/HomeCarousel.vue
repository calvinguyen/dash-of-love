<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Autoplay, EffectFade } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const slides = [
  {
    img: "slide-1.jpg",
    wordOne: "Delicious",
    wordTwo: "Cakes",
  },
  {
    img: "slide-2.jpg",
    wordOne: "Custom",
    wordTwo: "Options",
  },
  {
    img: "slide-3.jpg",
    wordOne: "Vintage",
    wordTwo: "Touch",
  },
];

</script>


<template>
<section id="hero">

  <Swiper 
    :navigation="true" 
    :modules="[Navigation, Autoplay, EffectFade]" 
    :loop="true" 
    :autoplay="{ delay: 5000, disableOnInteraction: false, }" 
    effect="fade"
    id="mySlider"
  >
    <SwiperSlide v-for="slide in slides" :key="slide.img">
      <div :style="{ backgroundImage: `url(src/assets/img/slide/${slide.img})` }">
        <div class="carousel-container">
            <div class="carousel-content">
              <h2 class="animate__animated animate__fadeInDown"><span>{{slide.wordOne}}</span> {{slide.wordTwo}}</h2>
              <p class="animate__animated animate__fadeInUp"></p>
              <div>
                <a href="#menu" class="btn-menu animate__animated animate__fadeInUp scrollto">Flavor Menu</a>
                <a href="#custom-order" class="btn-book animate__animated animate__fadeInUp scrollto">Custom Order</a>
              </div>
            </div>
          </div>
      </div>
    </SwiperSlide>
  </Swiper>

</section>
</template>


<style>
/* @import "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"; */
@import "../assets/css/home.css";

.carousel-content a {
  text-decoration: none;
}

#hero {
  width: 100%;
  height: 100vh;
  background-color: rgba(39, 37, 34, 0.8);
  overflow: hidden;
  padding: 0;
}

.swiper-slide > div {
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.swiper-slide > div::before {
  content: "";
  background-color: rgba(12, 11, 10, 0.5);
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}

div[style='background-image: url("src/assets/img/slide/slide-3.jpg");'] {
  background-position: center top;
}

#hero .carousel-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
}

#hero .carousel-content {
  text-align: center;
}

#hero h2 {
  color: #fff;
  margin-bottom: 30px;
  font-size: 48px;
  font-weight: 700;
}

#hero h2 span {
  color: #fa0909;
}

#hero p {
  width: 80%;
  -webkit-animation-delay: 0.4s;
  animation-delay: 0.4s;
  margin: 0 auto 30px auto;
  color: #fff;
}

#hero .btn-menu,
#hero .btn-book {
  font-weight: 600;
  font-size: 13px;
  letter-spacing: 1px;
  text-transform: uppercase;
  display: inline-block;
  padding: 12px 30px;
  border-radius: 50px;
  transition: 0.5s;
  line-height: 1;
  margin: 0 10px;
  -webkit-animation-delay: 0.8s;
  animation-delay: 0.8s;
  color: #fff;
  border: 2px solid #ff2323;
}

#hero .btn-menu:hover,
#hero .btn-book:hover {
  background: #ff2323;
  color: #fff;
}

#mySlider .swiper-button-prev,
#mySlider .swiper-button-next {
  background: none;
  line-height: 0;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50px;
  transition: 0.3s;
  color: rgba(255, 255, 255, 0.5);
  width: 54px;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
}

#mySlider .swiper-button-prev::after,
#mySlider .swiper-button-next::after {
  font-size: 25px;
}

#mySlider .swiper-button-prev:hover,
#mySlider .swiper-button-next:hover {
  background: rgba(255, 255, 255, 0.3);
  color: rgba(255, 255, 255, 0.8);
}

@media (max-width: 768px) {
  #hero h2 {
    font-size: 28px;
  }
}

@media (max-width: 1024px) {
  #hero p {
    width: 50%;
  }

  #hero .swiper-button-prev,
  #hero .swiper-button-next {
    width: 5%;
  }
}
</style>