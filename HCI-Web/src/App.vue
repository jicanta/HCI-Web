<script setup>
import { onMounted, ref } from 'vue';
import { useTheme } from 'vuetify';

const isDarkMode = ref(false);
const theme = useTheme();

onMounted(() => {

  const storedTheme = localStorage.getItem('isDarkMode');
  if (storedTheme !== null) {
    isDarkMode.value = storedTheme === 'true';
    theme.global.name.value = isDarkMode.value ? 'dark' : 'light';
  }
  else {
    localStorage.setItem('isDarkMode', false);
  }

  // Available Balance set in local storage
  if ( localStorage.getItem('availableBalance') === null ){
    localStorage.setItem('availableBalance', 91220.18);
  }


});
</script>

<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<style>
  * {
    transition: background-color 0.8s ease, color 0.8s ease;
  }
</style>
