<template>
    <v-container class="buttons-nav-bar bg-primary px-4 py-1" fluid>

      <v-container class="left-container">
          <v-icon icon="mdi-arrow-left" @click="goToRoute(link_back)" class="rounded-circle bg-tertiary"/>
      </v-container>

      <v-container class="center-container">
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

      <v-container class="right-container">
        <v-menu transition="slide-y-transition">
          <template v-slot:activator="{ props }">
            <SectionNav v-bind="props"
            :selected="profile.selected"
            :icon="profile.icon"
            :text="profile.text"
            />
          </template>
          <SectionNav 
          v-for="profile in profileOptions"
          :selected="profile.selected"
          :icon="profile.icon"
          :text="profile.text"
          @click="goToRoute(profile.route)"
          class="my-1"
          />
        </v-menu>
      </v-container>
    </v-container>
</template>
  
<script setup>
  import { useRouter } from 'vue-router';
  import SectionNav from './SectionNav.vue';

  const profile = {text: "Tu Perfil", icon: "mdi-account", selected: false, route: ""}

  const profileOptions = [
    {text: "Tus Datos", icon: "mdi-pencil", selected: false, route: ""},
    {text: "Más", icon: "mdi-dots-horizontal-circle-outline", selected: false, route: "/more"},
    {text: "Cerrar Sesion", icon: "mdi-logout", selected: false, route: ""}
  ]

  const sections = [
    {text: "Inicio", icon: "mdi-home", selected: false, route: "/"}, 
    {text: "Movimientos", icon: "mdi-history", selected: false, route: "/movements"}, 
    {text: "Medios de pago", icon: "mdi-credit-card-outline", selected: false, route: "/payment-methods"}, 
    {text: "Invertir", icon: "mdi-cash-plus", selected: false, route: "/invest"}
  ]
  
  const props = defineProps({
    link_back: {
        type: String,
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
    align-items: center;
    justify-content: space-between;
    display: flex;
    flex-direction: row;
    position: fixed;
    z-index: 100;
  }
  .left-container{
    height: 100%;
    width: 12.5%;

    align-items: center;
    justify-content: left;
    display: flex;
    flex-direction: row;
  }
  .center-container{
    height: 100%;
    width: 75%;

    align-items: center;
    justify-content: space-around;
    display: flex;
    flex-direction: row;
  }
  .right-container{
    height: 100%;
    width: 12.5%;

    align-items: center;
    justify-content: right;
    display: flex;
    flex-direction: row;
  }
</style>
  