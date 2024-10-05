<template>
    <v-col class="contenedor pa-0 my-12" cols="12" sm="6" md="4">
      <slot></slot>
    </v-col>
</template>
  
<script setup>
  //
 </script>
  
<style scoped>
  .contenedor {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
</style>
  