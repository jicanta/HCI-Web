<script setup>
import { onMounted, ref } from 'vue';
import { useTheme } from 'vuetify';

const isDarkMode = ref(false);
const theme = useTheme();

// Cargar el estado del modo oscuro desde localStorage al montar el componente
onMounted(() => {
  const storedTheme = localStorage.getItem('isDarkMode');
  if (storedTheme !== null) {
    isDarkMode.value = storedTheme === 'true';
    theme.global.name.value = isDarkMode.value ? 'dark' : 'light';
  }
});
</script>

<template>
  <v-app class="bg-background d-flex flex-row h-screen">
    <router-view />
  </v-app>
</template>

<style>
  * {
    transition: background-color 0.8s ease, color 0.8s ease;
  }
</style>
