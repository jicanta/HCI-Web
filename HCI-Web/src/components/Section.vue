<template>
    <v-container class="section bg-tertiary rounded-lg elevation-2" cols="12">
      <slot></slot>
    </v-container>
  </template>
  
  <script setup>
  //
  </script>
  
  <style scoped>
  .section {
    color: black;
    padding: 16px;
    display: flex;
    flex-grow: 1; /* Asegura que la sección ocupe todo el alto */
    width: 100%; /* Asegura que la sección ocupe todo el ancho */
    align-items: center;
    justify-content: center;
  }
  </style>
  