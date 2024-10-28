<script setup>
import { useRouter } from 'vue-router';
import BodyGrid from '@/components/BodyGrid.vue';
import AppDivision from '@/components/AppDivision.vue';
import Section from '@/components/Section.vue';
import { ref } from 'vue';
import { useAppStore } from '@/stores/store';

const goToRoute = (route) => {
  router.push(route);
};

const appStore = useAppStore();
 
const router = useRouter();
const showRemoveVerification = ref(false);
const toRemoveNumber = ref(-1);
 
const removePaymentMethod = (number) => {
  appStore.removeCard(number);
  if (appStore.getCreditCards().length === 0) {
    editState.value = false;
  }
};
 
const setToRemoveNumber = (number) => {
  toRemoveNumber.value = number;
}
 
const removeAndClose = () => {
  removePaymentMethod(toRemoveNumber.value);
  showRemoveVerification.value = false;
}
 
 
const addPaymentMethod = () => {
  router.push({ name: 'addPaymentMethod' });
};
 
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
  <template v-if="appStore.getId() >= 0">
    <v-main class="main-container bg-background" role="main" aria-label="Medios de pago">
    <ButtonsNavBar :sections="sections" role="navigation" aria-label="Navegación principal"/>
 
    <BodyGrid>
      <AppDivision class="ma-4" cols="12" sm="10" md="8" lg="5">
        <v-card 
          class="bg-tertiary elevation-7 w-100 mb-2 pa-2"
          flat
          elevation="0"
        >
          <div class="d-flex flex-column align-center">
            <h1 class="text-h5 font-weight-medium mb-1">Medios de pago</h1>
            <v-divider class="primary" width="32" thickness="2"></v-divider>
          </div>
        </v-card>
 
        <Section class="ma-3 d-flex align-start justify-center" height="auto">
          <v-container class="inside-section mb-auto fill-height d-flex flex-column" style="max-width: 800px">
            <div class="d-flex justify-end">
              <v-btn 
                v-if="appStore.getCreditCards().length > 0"
                color="primary"
                class="mb-1 px-4"
                @click="editState = !editState"
              >
                {{ editState ? 'Cancelar' : 'Editar' }}
              </v-btn>          
            </div>
            <div>
            <v-list class="bg-tertiary" style="width: 100%">
              <v-list-item v-for="card in appStore.getCreditCards()" 
                          :key="card.id" 
                          class="mt-2 mb-2"
                          style="width: 100%"
              >
                <v-card 
                  :key="card.id"
                  class="rounded-card elevation-7 pa-0"  
                  style="width: 100%; min-width: 350px" 
                  :color="card.color"
                >
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
                            :src="appStore.getCardLogo(card.type)"
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
                      @click="setToRemoveNumber(card.number); showRemoveVerification = true;"
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
                Agregar medio de pago
              </v-btn>
            </div>
          </v-container>
        </Section>
      </AppDivision>
    </BodyGrid>
  </v-main>
  <v-dialog v-model="showRemoveVerification" max-width="400px">
      <v-card class="elevation-7">
        <v-card-title class="text-h5">
          Esta seguro que desea eliminar el metodo de pago:
        </v-card-title>
        <v-card-actions>
          <v-btn color="colortext" text @click="showRemoveVerification = false">Cancelar</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="colortext" @click="removeAndClose()">Eliminar</v-btn>
        </v-card-actions>
      </v-card>
  </v-dialog>
  </template>
  <template v-else-if="goToRoute({ name: 'signIn' })"/>
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
  border-radius: 12px;
  width: 100%;
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
