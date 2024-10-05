<template>
    <v-container class="buttons-nav-bar bg-primary px-4 py-2" fluid>

      <v-container class="left-container">
        <h1 class="font-weight-bold text-colortext"> Logo </h1>
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
        <v-icon icon="mdi-help-circle-outline text-colortext cursor-pointer"></v-icon>
      </v-container>
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
  