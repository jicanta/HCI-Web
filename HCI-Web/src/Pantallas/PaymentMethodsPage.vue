<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AppHeaderSecondaryScreen from '@/components/AppHeaderSecondaryScreen.vue';
import BodyGrid from '@/components/BodyGrid.vue';
import AppDivision from '@/components/AppDivision.vue';
import Section from '@/components/Section.vue';
import ButtonsNavBarWithBack from '@/components/ButtonsNavBarWithBack.vue';

const router = useRouter();

const paymentMethods = ref([
  { id: 1, type: 'Visa', lastFour: '4444', color: 'green darken-3' },
  { id: 2, type: 'Mastercard', lastFour: '5555', color: 'orange darken-3' },
  { id: 3, type: 'American Express', lastFour: '1234', color: 'blue-grey darken-3' },
]);

const removePaymentMethod = (id) => {
  const index = paymentMethods.value.findIndex(method => method.id === id);
  if (index !== -1) {
    paymentMethods.value.splice(index, 1);
  }
};

const addPaymentMethod = () => {
  router.push('/add-payment-method');
};

const sections = [
    {text: "Inicio", icon: "mdi-home", selected: false, route: "/"}, 
    {text: "Movimientos", icon: "mdi-history", selected: false, route: "/movements"}, 
    {text: "Medios de pago", icon: "mdi-credit-card-outline", selected: true, route: "/payment-methods"}, 
    {text: "Invertir", icon: "mdi-cash-plus", selected: false, route: "/invest"}
  ]


</script>


<template>
  <v-main class="main-container bg-background">
    <ButtonsNavBar :sections="sections"/>
    
    <BodyGrid>
      <AppDivision class="ma-4" cols="12" sm="10" md="10" lg="4">
        <Section class="ma-3">
          <v-container class="inside-section">
            <h2 class="text-h5 mb-4">Tus Medios de Pago</h2>
            <v-list>
              <v-list-item v-for="card in paymentMethods" :key="card.id" class="mb-2">
                <v-card width="100%" :color="card.color" dark>
                  <v-card-text class="d-flex justify-space-between align-center">
                    <div>
                      <div class="text-h6">{{ card.type }}</div>
                      <div>•••• •••• •••• {{ card.lastFour }}</div>
                    </div>
                    <v-btn
                      icon
                      small
                      @click="removePaymentMethod(card.id)"
                      class="remove-btn"
                    >
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </v-card-text>
                </v-card>
              </v-list-item>
            </v-list>
            <v-btn
              color="primary"
              block
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

.v-list-item {
  padding: 0;
}

.remove-btn {
  background-color: rgba(255, 255, 255, 0.2);
}
</style>