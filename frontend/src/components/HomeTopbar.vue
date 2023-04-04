<script setup>
import { onMounted, onBeforeUnmount, ref, reactive } from 'vue';

/* Declare reactive variables */
const scrolledNav = ref(false);

const navBarLinks = reactive([
  { active: true, href: '#hero', name: 'Home' },
  { active: false, href: '#about', name: 'About' },
  { active: false, href: '#menu', name: 'Menu' },
  { active: false, href: '#gallery', name: 'Gallery' },
]);

/* Methods */
const updateScroll = () => {
  const scrollPosition = window.scrollY;
  if (scrollPosition > 100) {
    scrolledNav.value = true;
    return;
  }
  scrolledNav.value = false;
};

function navBarLinkActive() {
  let position = window.scrollY + 200;
  navBarLinks.forEach(navLink => {
    let section = document.querySelector(navLink.href);
    if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
      navLink.active = true;
    } else {
      navLink.active = false;
    }
  })
}

onMounted(() => {
  window.addEventListener("scroll", updateScroll);
  window.addEventListener("scroll", navBarLinkActive);
})
onBeforeUnmount(() => {
  window.removeEventListener("scroll", updateScroll);
  window.removeEventListener("scroll", navBarLinkActive);
})

</script>


<template>

<section id="topbar" class="d-flex align-items-center fixed-top" :class="{ 'topbar-scrolled': scrolledNav }">
    <div class="container-fluid container-xl d-flex align-items-center justify-content-center justify-content-lg-start">
      <i class="bi bi-mail d-flex align-items-center"><span>dashoflovetx@gmail.com</span></i>
      <i class="bi bi-clock ms-4 d-none d-lg-flex align-items-center"><span>Thurs-Sat: 12:00 PM - 4:00 PM</span></i>
    </div>
</section>

<header id="header" class="fixed-top d-flex align-items-center" :class="{ 'header-scrolled': scrolledNav }">
    <div class="container-fluid container-xl d-flex align-items-center justify-content-between">
      <div class="logo me-auto">
        <RouterLink to="/admin">
          <h1><a>DashofLove</a></h1>
        </RouterLink>
      </div>
 
      <nav id="navbar" class="navbar order-last order-lg-0">
        <ul>
          <li v-for="navLink in navBarLinks" :key="navLink.name">
            <a class="nav-link scrollto" :href="navLink.href" :class="{ 'active': navLink.active }" >{{ navLink.name }}</a>
          </li>
        </ul>
        <!-- <i class="bi bi-list mobile-nav-toggle"></i> -->
      </nav>

      <a href="#custom-order" class="custom-order-btn scrollto">Custom Order</a>
    </div>
</header>

</template>


<style scoped>
/* @import "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"; */
@import "../assets/css/home.css";


#topbar {
    padding: 0;
    font-size: 15px;
    height: 50px;
    transition: all 0.5s;
    z-index: 996;
}
/* ====TOGGLE==== */
#topbar.topbar-scrolled {
    top: -50px;
}
#topbar i {
    color: #ffb03b;
    line-height: 0;
}
#topbar i span {
    color: #fff;
    font-style: normal;
    padding-left: 5px;
}


#header {
    top: 50px;
    height: 70px;
    z-index: 997;
    transition: all 0.5s;
    padding: 10px 0;
}

/* ====TOGGLE===== */
#header.header-scrolled {
 top: 0;
 background: rgba(26, 24, 22, 0.85);
}
#header .logo h1 {
    font-size: 28px;
    margin: 0;
    line-height: 1;
    font-weight: 400;
    letter-spacing: 3px;
}
#header .logo h1 a,
#header .logo h1 a:hover {
    color: #fff;
    text-decoration: none;
}
#header .logo img {
    padding: 0;
    margin: 0;
    max-height: 40px;
}

.custom-order-btn {
    background: #ffb03b;
    color: #fff;
    border-radius: 50px;
    margin: 0 0 0 20px;
    padding: 10px 25px;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 1px;
    transition: 0.3s;
    white-space: nowrap;
}
.custom-order-btn:hover {
    background: #ffa012;
    color: #fff;
}
@media (max-width: 992px) {
  .custom-order-btn {
    margin: 0 15px 0 0;
    padding: 8px 20px;
    letter-spacing: 1px;
  }
}

.navbar {
    padding: 0;
    box-shadow: none;
}
.navbar ul {
    margin: 0;
    padding: 0;
    display: flex;
    list-style: none;
    align-items: center;
}
.navbar li {
    position: relative;
}
.navbar a,
.navbar a:focus {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0 10px 24px;
    font-size: 15px;
    font-weight: 500;
    color: white;
    white-space: nowrap;
    transition: 0.3s;
}
.navbar a i,
.navbar a:focus i {
    font-size: 12px;
    line-height: 0;
    margin-left: 5px;
}
.navbar a:hover,
.navbar .active,
.navbar .active:focus,
.navbar li:hover>a {
    color: #ffb03b;
}

</style>