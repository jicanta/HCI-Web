<script setup>
  import AppDivision from '@/components/AppDivision.vue';
  import AppHeaderSecondaryScreen from '@/components/AppHeaderSecondaryScreen.vue';
  import BodyGrid from '@/components/BodyGrid.vue';
  import Section from '@/components/Section.vue';

  const sections = [
      {text: "Inicio", icon: "mdi-home", selected: false, route: "/"}, 
      {text: "Movimientos", icon: "mdi-history", selected: true, route: "/movements"}, 
      {text: "Medios de pago", icon: "mdi-credit-card-outline", selected: false, route: "/payment-methods"}, 
      {text: "Más", icon: "mdi-dots-horizontal-circle-outline", selected: false, route: "/more"}
    ]

</script>

<template>
  <v-main class="main-container bg-background" fluid>
    <ButtonsNavBar :sections="sections"/>

    <BodyGrid>
      <AppDivision class="ma-4" cols="12" sm="10" md="10" lg="4">
        <Section class="ma-3">
          
        </Section>
      </AppDivision>
    </BodyGrid>
  </v-main>
</template>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
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
</style>
