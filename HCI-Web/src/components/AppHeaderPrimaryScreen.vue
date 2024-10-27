<template>
  <v-app-bar :elevation="0" color="primary">
    <v-app-bar-title class="d-flex align-center">
      <v-img
        src="@/assets/PayGoIcon.png"
        width="100"
        height="100"
      />
    </v-app-bar-title>

    <template v-slot:append>
      <v-btn icon="mdi-help-circle-outline text-colortext"></v-btn>
    </template>
  </v-app-bar>
</template>

<script setup>
//
</script>

