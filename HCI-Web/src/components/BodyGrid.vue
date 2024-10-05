<template>
    <v-row class="body-grid bg-background px-0 py-16" dense>

      <slot>

      </slot>
      
    </v-row>
  </template>
  
  <script setup>

  </script>
  
  <style scoped>
  .body-grid {
    display: flex;
    justify-content: center;
    flex-grow: 1;
    height: 100%;
    width: 100%;
}
  </style>
  