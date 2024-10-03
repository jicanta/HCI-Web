<template>
    <v-app-bar color="primary">
      <template v-slot:prepend>
        <v-btn icon @click="$router.back()">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </template>
  
      <v-app-bar-title>{{ title }}</v-app-bar-title>
  
      <template v-slot:append>
        <v-btn icon="mdi-help-circle-outline text-colortext"></v-btn>
      </template>
    </v-app-bar>
  </template>
  
  <script setup>
  const props = defineProps({
    title: {
      type: String,
      default: 'Nombre Pantalla', // El título por defecto del app bar
    }
  });
  </script>