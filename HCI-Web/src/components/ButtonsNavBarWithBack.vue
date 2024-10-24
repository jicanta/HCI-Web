<template>
    <ButtonsNavBar :sections="sections"/>
    <v-btn @click="goBack()" class="top-left-button bg-primary" icon="mdi-arrow-left" width="48px" height="48px">

    </v-btn>
</template>
  
<script setup>
  import { useRouter } from 'vue-router';

  const sections = [
    {text: "Inicio", icon: "mdi-home", selected: false, route: "/"}, 
    {text: "Movimientos", icon: "mdi-history", selected: false, route: "/movements"}, 
    {text: "Medios de pago", icon: "mdi-credit-card-outline", selected: false, route: "/payment-methods"}, 
    {text: "Invertir", icon: "mdi-cash-plus", selected: false, route: "/invest"}
  ]

  const router = useRouter();

  const goBack = () => {
    router.back();
  };
  
</script>
  
<style>
  .top-left-button {
    position: fixed;
    top: 106px;
    left: 12px;
    z-index: 999;
  }
</style>
