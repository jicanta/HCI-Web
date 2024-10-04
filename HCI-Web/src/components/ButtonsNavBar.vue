<template>
    <v-container class="buttons-nav-bar bg-primary px-16" fluid>
      <SectionNav
        :selected="true"
        icon="mdi-home"
        text="Inicio"
        class="mx-1"
        @click="goToRoute('/')"
      />
      <SectionNav
        :selected="false"
        icon="mdi-history"
        text="Movimientos"
        class="mx-1"
        @click="goToRoute('/movements')"
      />
      <SectionNav
        :selected="false"
        icon="mdi-credit-card-outline"
        text="Métodos de pago"
        class="mx-1"
        @click="goToRoute('/payment-methods')"
      />
      <SectionNav
        :selected="false"
        icon="mdi-dots-horizontal-circle-outline"
        text="Más"
        class="mx-1"
        @click="goToRoute('/more')"
      />
    </v-container>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  import SectionNav from './SectionNav.vue';
  
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
  