<script setup>
import { useRouter } from 'vue-router';
import AppHeaderSecondaryScreen from '@/components/AppHeaderSecondaryScreen.vue';
import BodyGrid from '@/components/BodyGrid.vue';
import AppDivision from '@/components/AppDivision.vue';
import Section from '@/components/Section.vue';
import ButtonsNavBarWithBack from '@/components/ButtonsNavBarWithBack.vue';
import { usePaymentMethodsStore } from '@/stores/paymentMethodsStore';
import { ref } from 'vue';

const router = useRouter();
const paymentMethodsStore = usePaymentMethodsStore();

const removePaymentMethod = (id) => {
  paymentMethodsStore.removePaymentMethod(id);
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
const editState = ref(false);
</script>


<template>
  <v-main class="main-container bg-background">
    <ButtonsNavBar :sections="sections"/>
    
    <BodyGrid>
      <AppDivision class="ma-4" cols="12" sm="10" md="10" lg="4">
        <Section class="ma-3">
          <v-container class="inside-section">
            <V-row>
              <v-col cols="7">
                <h2 class="text-h5 mb-4">Tus Medios de Pago</h2>
              </v-col>
              <v-col cols="5">
                <div class="d-flex justify-end">
                  <v-btn 
                    class="rounded-xl"
                    @click="editState = !editState"
                  >
                  {{ editState ? 'Cancelar' : 'Editar' }}
                  </v-btn>          
                </div>
              </v-col>            
            </V-row>
            <v-list>
              <v-list-item v-for="card in paymentMethodsStore.paymentMethods" :key="card.id" class="mb-2">
                <v-card width="100%" :color="card.color" dark>
                  <v-card-text class="d-flex justify-space-between align-center">
                    <div>
                      <div class="text-h6">{{ card.type }}</div>
                      <div>•••• •••• •••• {{ card.lastFour }}</div>
                    </div>
                    <v-btn
                      v-if="editState"
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
