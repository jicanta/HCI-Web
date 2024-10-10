<script setup>
  import { useRouter } from 'vue-router';
  import ButtonsNavBar from '@/components/ButtonsNavBar.vue';
  import BodyGrid from '@/components/BodyGrid.vue';
  import AppDivision from '@/components/AppDivision.vue';
  import Section from '@/components/Section.vue';

  const router = useRouter();

  const sections = [
    {text: "Inicio", icon: "mdi-home", selected: false, route: "/"}, 
    {text: "Movimientos", icon: "mdi-history", selected: false, route: "/movements"}, 
    {text: "Medios de pago", icon: "mdi-credit-card-outline", selected: true, route: "/payment-methods"}, 
    {text: "Invertir", icon: "mdi-cash-plus", selected: false, route: "/more"}
  ];

  const addPaymentMethod = () => {
    router.replace('/add-payment-method');
  };
</script>

<template>
  <v-main class="main-container bg-background" fluid>
    <ButtonsNavBar :sections="sections"/>

    <BodyGrid>
      <AppDivision class="ma-4" cols="12" sm="10" md="10" lg="4">
        <Section class="ma-3">
          <v-container class="inside-section">
            <h1 class="text-h4 mb-6">Medios de pago</h1>
            
            <!-- List of payment methods would go here -->
            
            <v-btn
              color="primary"
              block
              size="large"
              class="mt-4"
              @click="addPaymentMethod"
            >
              Agregar método de pago
            </v-btn>
          </v-container>
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
    justify-content: flex-start;
    align-items: stretch;
  }
</style>