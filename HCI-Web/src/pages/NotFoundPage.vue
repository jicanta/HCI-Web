<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="text-center pa-6">
          <v-card-item>
            <v-card-title class="text-h4 mb-2">404</v-card-title>
            <v-card-subtitle class="text-h6">Página no encontrada</v-card-subtitle>
          </v-card-item>
          <v-card-text>
            <p class="mb-4">Oops! No encontramos la página que estaba buscando</p>
            <v-btn color="primary" to="/" class="mt-4">
              Volver
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
// por ahora no tiene setup
</script>
