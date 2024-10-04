<script setup lang="ts">
import AppDivision from '@/components/AppDivision.vue';
import AppHeaderSecondaryScreen from '@/components/AppHeaderSecondaryScreen.vue';
import BodyGrid from '@/components/BodyGrid.vue';
import Section from '@/components/Section.vue';

const pesos = 25761;
const centavos = 57;

</script>

<template>
  <AppHeaderSecondaryScreen title="Ingresar dinero" />

  <v-main class="main-container bg-background">

    <BodyGrid>
      <AppDivision class="ma-4" cols="12" sm="10" md="10" lg="4">
        <Section class="ma-3">
          <v-container class="inside-section">
              <h1 class="text-colortext2">Generar link de pago</h1>
              <v-container class="input border rounded-lg my-6">

                <p class="text-colortext2 font-weight-light">Monto</p>
                <v-text-field type="number"/>
                
                <v-container class="pa-0">
                  <v-spacer/>
                  <p class="text-colortext2 font-weight-light">Descripción</p>
                  <v-text-field type="text"/>
                </v-container>
                
              </v-container>
              <v-btn class="bg-primary text-textcolor font-weight-bold pa-7 w-25 d-flex">
                <p>Generar</p>
              </v-btn>
          </v-container>
        </Section>
        <p class="text-textcolor"> Tambien podés transferir dinero desde otra cuenta bancaria. Encontrarás tus datos <span class="text-decoration-underline text-secondary cursor-pointer">acá</span>.</p>
      </AppDivision>
    </BodyGrid>
  </v-main>
</template>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.inside-section {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: flex-start;
  align-items: center;
}

.input {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: flex-start;
}

</style>
