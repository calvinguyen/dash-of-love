<script setup>
/* GET ACTIVE CAKE TYPES & FLAVORS */
const props = defineProps({
  cakeTypes: [Object],
  cakeFlavors: [Object],
});

const getFlavorsOfferedByType = (typeID) => {
  // returns a filtered array of strings (flavors)
  const typeFlavors = props.cakeFlavors.filter(flavor => (
    flavor.typeID == typeID
  )).map(( item => item.flavor ));

  return typeFlavors.join(', ');
};

</script>


<template>
<section id="menu" class="menu">
<div class="container">
  
  <div class="section-title">
    <h2>Cake <span>Menu</span></h2>
  </div>

  <div class="row menu-container">
    <div 
      class="col-lg-6 menu-item"
      v-for="cake in props.cakeTypes"
      :key="cake.typeID"
    >
      <div class="menu-content">
        <a>{{ cake.type }}</a><span>Starting Price: ${{ cake.price }}</span>
      </div>
      <div class="menu-ingredients">
        Flavors: {{ getFlavorsOfferedByType(cake.typeID) }}
      </div>
    </div>
  </div>

</div>
</section>
</template>


<style scoped>
/* @import "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"; */
@import "../assets/css/home.css";

.menu .menu-content {
  margin-top: 30px;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  position: relative;
}

.menu .menu-content::after {
  content: "......................................................................""....................................................................""....................................................................";
  position: absolute;
  left: 20px;
  right: 0;
  top: -4px;
  z-index: 1;
  color: #dad8d4;
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
}

.menu .menu-content a {
  padding-right: 10px;
  background: #fff;
  position: relative;
  z-index: 3;
  font-weight: 700;
  color: #ff9b08;
}

.menu .menu-content span {
  background: #fff;
  position: relative;
  z-index: 3;
  padding: 0 10px;
  font-weight: 600;
}

.menu .menu-ingredients {
  font-style: italic;
  font-size: 14px;
  font-family: "Comic Neue", sans-serif;
  color: #948c81;
}

</style>