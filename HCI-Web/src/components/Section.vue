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
    padding: 16px;
    display: flex;
    flex-grow: 1;
    width: 100%;
    align-items: center;
    justify-content: center;
  }
  </style>
  