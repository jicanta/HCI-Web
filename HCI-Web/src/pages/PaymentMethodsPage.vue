<script setup>
import { useRouter } from 'vue-router';
import AppHeaderSecondaryScreen from '@/components/AppHeaderSecondaryScreen.vue';
import BodyGrid from '@/components/BodyGrid.vue';
import AppDivision from '@/components/AppDivision.vue';
import Section from '@/components/Section.vue';
import ButtonsNavBarWithBack from '@/components/ButtonsNavBarWithBack.vue';
import { usePaymentMethodsStore } from '@/stores/paymentMethodsStore';
import { ref } from 'vue';
import { computed } from 'vue';
import { useAppStore } from '@/stores/store';
const appStore = useAppStore();

const router = useRouter();
const paymentMethodsStore = usePaymentMethodsStore();

const removePaymentMethod = (id) => {
  paymentMethodsStore.removePaymentMethod(id);
  if(paymentMethodsStore.paymentMethods.length == 0){
    editState.value = false;
  }
};

const addPaymentMethod = () => {
  router.push({ name: 'addPaymentMethod' });
};
// const removePaymentMethod = (id) => {
//   router.push({ name: 'removePaymentMethod' });
// };

const sections = [
  {text: "Inicio", icon: "mdi-home", selected: false, route: "home"}, 
  {text: "Movimientos", icon: "mdi-history", selected: false, route: "movements"}, 
  {text: "Medios de pago", icon: "mdi-credit-card-outline", selected: true, route: "paymentMethods"}, 
  {text: "Invertir", icon: "mdi-cash-plus", selected: false, route: "invest"}
]
const editState = ref(false);

function formattedCardNumber(cardNumber) {
  if (!cardNumber || typeof cardNumber !== 'string') {
    return '';
  }
  const groups = cardNumber.match(/\d{1,4}/g) || [];
  return groups.join(' ');
}

</script>


<template>
  <v-main class="main-container bg-background">
    <ButtonsNavBar :sections="sections"/>
    
    <BodyGrid>
      <AppDivision class="ma-4" cols="12" sm="10" md="10" lg="4">
        <v-card 
          class="bg-tertiary w-100 h-40 my-4 pa-2"
            >
          <v-container class="d-flex align-center justify-center pa-6" style="height: 100%;">
            <v-row class="align-center justify-space-between" no-gutters>
              <v-col class="mr-2 text-h4 d-flex align-center justify-center">
                Medios de pago
              </v-col>
            </v-row>
          </v-container>
        </v-card>
        <Section class="ma-3 d-flex align-start" height="auto">
          <v-container class="inside-section mb-auto fill-height d-flex flex-column">
            <div class="d-flex justify-end">
              <v-btn 
                v-if="appStore.getCreditCards().length > 0"
                class="rounded-xl mb-1"
                @click="editState = !editState"
              >
              {{ editState ? 'Cancelar' : 'Editar' }}
              </v-btn>          
            </div>
            <div>
            <v-list class="bg-tertiary">
              <v-list-item v-for="card in appStore.getCreditCards()" :key="card.id" class=" mt-2 mb-2">
                <v-card 
                :key="card.id"
                class="rounded-card pa-0"  
                width="100%" 
                :color="card.color">
                  <v-card-text class="d-flex justify-space-between align-center ">
                    <v-container class="card-container">
                      <v-row class="card-content">
                        <v-col cols="12">
                          <div class="d-flex flex-column">  
                            <div class="normal-view">
                              <div class="text-subtitle-1">{{ card.type }}</div>
                              <div>{{ formattedCardNumber(card.number) }}</div>
                            </div>
                            <div class="hovered-view">
                              <div>
                                <v-img
                                  src="../assets/smart-chip.png"
                                  max-width="40"
                                  class="mb-4 mt-2"
                                ></v-img>
                              </div>
                              <div class="pt-2">{{ formattedCardNumber(card.number) }}</div>
                              <div class="pt-2">{{ card.name }}</div>
                            </div>
                          </div>
                        </v-col>
                      </v-row>
                      <v-row class="card-logo-row">
                        <v-col cols="12" class="d-flex justify-end align-end">
                          <v-img 
                            :src="paymentMethodsStore.cardLogo(card.type)"
                            max-width="50"
                            contain
                            class="card-logo"
                          ></v-img>
                        </v-col>
                      </v-row>
                    </v-container>
                    <div class="pr-2">
                      <v-btn
                      v-if="editState"
                      icon
                      small
                      @click="removePaymentMethod(card.id)"
                      class="remove-btn"
                      >
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </div>
                  </v-card-text>
                </v-card>
              </v-list-item>
            </v-list>
              <v-btn 
                color="primary"
                block
                class="mt-auto"
                @click="addPaymentMethod"
              >
                Agregar método de pago
              </v-btn>
            </div>
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

.card-logo {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.rounded-card {
  border-radius: 15px;
  height: 75px;
  transition: 0.4s;
}

.card-content {
  position: relative;
  height: 100%;
}

.normal-view, .hovered-view {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  transition: opacity 0.4s, transform 0.4s;
}

.hovered-view {
  opacity: 0;
  transform: translateY(20px);
}

.rounded-card:hover {
  height: 150px;
}

.rounded-card:hover .normal-view {
  opacity: 0;
  transform: translateY(-20px);
}

.rounded-card:hover .hovered-view {
  opacity: 1;
  transform: translateY(0);
}
</style>
