<script setup>
import { RouterView, useRouter } from "vue-router";
import Navigation from './components/Navigation.vue'
import Footer from './components/Footer.vue'
import { ref, watchEffect } from "vue";

const router = useRouter();
const shouldNotRenderNavigationAndFooter = ref(false);

watchEffect(() => {
  shouldNotRenderNavigationAndFooter.value = ['/admin', '/controlpanel',].includes(router.currentRoute.value.path);
});
</script>

<template>
  <template v-if="!shouldNotRenderNavigationAndFooter">
    <Navigation />
    <RouterView />
    <Footer />
  </template>

  <template v-else>
    <RouterView />
  </template>
</template>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>
