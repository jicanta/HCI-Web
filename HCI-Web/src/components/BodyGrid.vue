<template>
    <v-row class="body-grid bg-background px-0 py-12" dense>

      <slot>

      </slot>
      
    </v-row>
  </template>
  
  <script setup>
  import Section from './Section.vue';
  import AppDivision from './AppDivision.vue';
  </script>
  
  <style scoped>
  .body-grid {
    color: white;
    display: flex;
    justify-content: center;
    flex-grow: 1;
    height: 100%;
    width: 100%;
}
  </style>
  