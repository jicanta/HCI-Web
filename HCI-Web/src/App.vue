<template>
  <v-app class="app bg-background">
    <router-view />
  </v-app>
</template>

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

<style scoped>
.app {
  display: flex;
  flex-direction: row;
  height: 100vh;
}
</style>
