<script setup>
import { RouterLink, RouterView } from 'vue-router';

</script>


<template>

<div id="admin">
  <!--==== Top Header ====-->
  <section id="admin-topbar">
    <img class="header-logo" src="@/assets/img/logo.png.jpeg" />
    <h1>DashofLove</h1>
  </section>
  <!--==== Sidebar ====-->

  <nav id="admin-sidebar">
    <!-- Top Side Navlinks -->
    <ul class="top-navlinks">
      <li>
        <RouterLink to="/admin" class="navlink-container">
          <i class='bx bxs-dashboard bx-md'></i>
          <span>Dashboard</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/admin/orders" class="navlink-container">
          <i class='bx bxs-inbox bx-md'></i>
          <span>Orders</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/admin/customers" class="navlink-container">
          <i class='bx bx-group bx-md'></i>
          <span>Customers</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/admin/menu" class="navlink-container">
          <i class='bx bxs-food-menu bx-md'></i>
          <span>Menu</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/admin/reports" class="navlink-container">
          <i class='bx bxs-report bx-md'></i>
          <span>Reports</span>
        </RouterLink>
      </li>
    </ul>
    <!-- Bottom Side Navlinks -->
    <ul class="bottom-navlinks">
      <li>
        <RouterLink to="/" class="navlink-container">
          <i class='bx bx-log-out bx-md'></i>
          <span>Logout</span>
        </RouterLink>
      </li>
    </ul>
  </nav>
  
  <main id="admin-main">
    <RouterView></RouterView>
  </main>

</div>
</template>


<style scoped>
/*==== General ====*/
#admin {
  display: grid;
  grid-template-rows: auto 1fr;
  /* grid-template-columns: 1fr 6fr; */
  grid-template-columns: auto 1fr;
  height: 100vh;
}

#admin * {
  margin: 0;
  padding: 0;
}

#admin a:hover {
  color: #b91c1c;
}

ul {
  list-style: none;
  padding: 0;
}

#admin-topbar {
  background-color: #fecdd3;
  grid-column: 1 / 3;
  display: flex;
  max-height: 125px;
  padding: 10px 30px;
  justify-content: space-between;
  align-items: center;
}
#admin-topbar img {
  max-height: 100px;
  border-radius: 50%;
  border: 1px solid white;
}
#admin-topbar h1 {
  color: #dc2626;
}

#admin-sidebar {
  grid-column: 1 / 2;
  min-height: 807px;
  background-color: #f8fafc;
  padding: 18px;
  box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

#admin-sidebar li {
  border-left: 6px groove;
  margin: 10px;
}

.navlink-container {
  /* color: #b91c1c; */
  color: #262626;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 22px;
  font-family: "Poppins", sans-serif;
}

/* .bottom-navlinks {
} */

#admin-main {
  /* background-color: #fafafa; */
  min-height: 807px;
  overflow: auto;
  padding: 25px;
  box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
}
</style>