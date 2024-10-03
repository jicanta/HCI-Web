<template>
    <v-col class="contenedor" cols="12" sm="6" md="4">
      <slot></slot> <!-- Aquí irá el contenido que pases desde el componente padre -->
    </v-col>
  </template>
  
  <script setup>
  //
  </script>
  
  <style scoped>
  .contenedor {
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
  </style>
  