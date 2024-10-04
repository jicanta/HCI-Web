<template>
    <v-container class="buttons-nav-bar bg-primary px-16" fluid>

      <SectionNav
        v-for="section in sections"
        :key="section.route"
        :selected="section.selected"
        :icon="section.icon"
        :text="section.text"
        @click="goToRoute(section.route)"
        class="mx-1"
      />
      
    </v-container>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  import SectionNav from './SectionNav.vue';
  
  const props = defineProps({
    sections: {
        type: Array,
        required: false,
    }
  });
  

  const router = useRouter();
  
  // Función para manejar la navegación
  const goToRoute = (route) => {
    router.push(route);
  };
  </script>
  
  <style scoped>
  .buttons-nav-bar {
    color: black;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: row;
  }
  </style>
  