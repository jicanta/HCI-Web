<template>
  <v-app class="app bg-background">
    <PantallaInicio/>
    <!--<PantallaMas />-->

    <!--<AppFooter />-->
  </v-app>
</template>

<script setup>
  import PantallaInicio from './Pantallas/PantallaInicio.vue';
import PantallaMas from './Pantallas/PantallaMas.vue';
</script>

<style scoped>
.app{
  flex-direction: column;
}

</style>
