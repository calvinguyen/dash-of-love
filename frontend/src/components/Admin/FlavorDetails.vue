<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import {
  MDBTabs,
  MDBTabNav,
  MDBTabContent,
  MDBTabItem,
  MDBTabPane,
} from 'mdb-vue-ui-kit';
import UpdateFlavor from './UpdateFlavor.vue';
import FlavorTypes from './FlavorTypes.vue';

const props = defineProps({
  id: String,
})

const router = useRouter();

const activeTabId = ref('update-flavor');

</script>

<template>
<section id="flavor-details">

  <div class="section-title d-flex justify-content-between">
    <button @click="router.go(-1)" class="go-back-btn" type="button">Go Back</button>
    <h2>Flavor Details</h2>
    <div></div>
  </div>

  <MDBTabs v-model="activeTabId">
    <!-- Tabs navs -->
    <MDBTabNav justify tabsClasses="mb-3 tab-nav">
      <MDBTabItem tabId="update-flavor" href="update-flavor"><span class="menu-tab"> Update Flavor Details </span></MDBTabItem>
      <MDBTabItem tabId="flavor-types" href="flavor-types"><span class="menu-tab"> Edit Cake Type Assignments</span></MDBTabItem>
    </MDBTabNav>
    <!-- Tabs content -->
    <MDBTabContent>

      <MDBTabPane tabId="update-flavor">
        <UpdateFlavor :id="props.id" />
      </MDBTabPane>

      <MDBTabPane tabId="flavor-types">
        <FlavorTypes :id="props.id" />
      </MDBTabPane>

    </MDBTabContent>

  </MDBTabs>

</section>
</template>

<style scoped>
#flavor-details * {
  font-family: "Poppins", sans-serif;
}

section {
  padding: 30px 0;
}

.menu-tab {
  font-size: 20px;
  font-weight: 600;
}

.tab-nav {
  box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.12);
}

.section-title h2 {
  text-align: center;
  color: #262626;
  margin-right: 5rem;
}

.go-back-btn {
  background: #e11d48;
  border: 0;
  padding: 10px 24px;
  color: #fff;
  transition: 0.4s;
  border-radius: 10px;
  align-self: center;
  max-width: max-content;
}
.go-back-btn:hover {
  background: #be123c;
}

</style>