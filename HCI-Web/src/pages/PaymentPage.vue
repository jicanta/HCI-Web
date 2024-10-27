<script setup lang="js">
import { ref } from 'vue';
import AppDivision from '@/components/AppDivision.vue';
import AppHeaderSecondaryScreen from '@/components/AppHeaderSecondaryScreen.vue';
import BodyGrid from '@/components/BodyGrid.vue';
import Section from '@/components/Section.vue';
import AppHeaderPrimaryScreen from '@/components/AppHeaderPrimaryScreen.vue';
import ButtonsNavBarWithBack from '@/components/ButtonsNavBarWithBack.vue';
import router from '@/router';
import { useAppStore } from '@/stores/store';

const goToRoute = (route) => {
  router.push(route);
};

const appStore = useAppStore();

const pesos = 25761;
const centavos = 57;

const sections = [
      {text: "Inicio", icon: "mdi-home", selected: false, route: "home"}, 
      {text: "Movimientos", icon: "mdi-history", selected: false, route: "movements"}, 
      {text: "Medios de pago", icon: "mdi-credit-card-outline", selected: false, route: "paymentMethods"}, 
      {text: "Invertir", icon: "mdi-cash-plus", selected: false, route: "invest"}
    ]

const monto = ref('');
const CBU = ref('');
const descripcion = ref('');
const showVerifyTransactionDialog = ref(false);
const paymentLink = ref('');
const copySuccess = ref(false);
const selectedCard = ref('');
const selectedPaymentOption = ref('cuenta');



const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(paymentLink.value);
    copySuccess.value = true;
    setTimeout(() => {
      copySuccess.value = false;
    }, 2000);
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
};
const availableCards = ref([
  { text: 'Visa - 1234', value: 'visa1234' },
  { text: 'MasterCard - 5678', value: 'master5678' },
  { text: 'Amex - 9012', value: 'amex9012' }
]);
  
</script>

<template>
  <template v-if="appStore.getId() >= 0">
    <ButtonsNavBarWithBack link_back="/"/>
    <v-row class="w-100 h-100 d-flex justify-center" style="margin-top: 106px;" fluid>
      <v-col cols="11" sm="11" md="5" lg="4" xl="4" class="d-flex flex-column align-center justify-start">


        <v-card 
            class="bg-tertiary elevation-7 w-100 mb-2 pa-2"
            flat
            elevation="0"
          >
            <div class="d-flex flex-column align-center">
              <h1 class="text-h5 font-weight-medium mb-1">Transferir</h1>
              <v-divider class="primary" width="32" thickness="2"></v-divider>
            </div>
          </v-card>

        <v-card 
          class="bg-tertiary elevation-7 w-100 my-4 pa-4 rounded-lg elevation-2"
        >
          <v-container class="d-flex align-center justify-center pa-4" style="height: 100%;">
            <v-row class="align-center justify-space-between" no-gutters>
              <v-col class="d-flex flex-column align-center justify-center w-100">
                <p class="text-caption text-medium-emphasis mb-1">Saldo actual:</p>
                <p class="text-h6 font-weight-bold mb-4">${{ pesos }}.{{ centavos }}</p>
                <v-text-field
                  v-model="monto"
                  label="Ingrese monto"
                  prefix="$"
                  type="number"
                  variant="outlined"
                  class="mb-4 w-100"
                  dense
                ></v-text-field>
                <v-text-field
                  v-model="CBU"
                  label="CBU o alias"
                  type="number text"
                  variant="outlined"
                  class="mb-4 w-100"
                  dense
                ></v-text-field>
                <v-text-field
                  v-model="descripcion"
                  label="Agregar descripción"
                  variant="outlined"
                  class="mb-4 w-100"
                  dense
                ></v-text-field>
                <v-btn-toggle v-model="selectedPaymentOption" class="mb-4" mandatory>
                  <v-btn :value="'cuenta'" color="primary" outlined>Dinero en cuenta</v-btn>
                  <v-btn :value="'tarjeta'" color="primary" outlined>Pagar con Tarjeta</v-btn>
                </v-btn-toggle>
                <v-container v-if="selectedPaymentOption === 'tarjeta'" class="bg-tertiary w-100 ">
                  <v-select
                    v-model="selectedCard"
                    :items="cards"
                    label="Seleccione una tarjeta"
                    class="mb-4 w-100"
                    dense
                  ></v-select>
                </v-container>
                <v-btn
                  color="primary"
                  block
                  x-large
                  class="mt-2"
                  style="height: 50px; text-transform: none;"
                  @click="showVerifyTransactionDialog = true"
                >
                  Continuar
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card>



        
      </v-col>
    </v-row>

    <!-- Payment Link Dialog -->
    <v-dialog v-model="showVerifyTransactionDialog" max-width="400px">
      <v-card class="elevation-7">
        <v-card-title class="text-h5">
          Esta seguro que desea transferir a:
        </v-card-title>
        <v-card-actions>
          <v-btn color="colortext" text @click="showVerifyTransactionDialog = false">Cancelar</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="colortext" @click="verify = true ; showVerifyTransactionDialog = false">Transferir</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  <template v-else-if="goToRoute({ name: 'signIn' })"/>
</template>
  

<style scoped>
.v-text-field {
  width: 100%;
}

.v-btn {
  text-transform: none;
  font-weight: bold;
  font-size: 1rem;
  letter-spacing: normal;
}
</style>
