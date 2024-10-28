<script setup>
import { ref } from 'vue';
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
const cvu = ref('');
const descripcion = ref('');
const showVerifyTransactionDialog = ref(false);
const paymentLink = ref('');
const copySuccess = ref(false);
const selectedCard = ref('');
const selectedPaymentOption = ref('cuenta');
const selectedCBUOption = ref('alias'); // Inicializar con 'alias'
const cvuOrAlias = ref('');
const selectedCategory = ref('');
const showErrorDialog = ref(false); // Nuevo ref para el diálogo de error
const errorMessages = ref([]); // Array para almacenar mensajes de error

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
  
const maskCardNumber = (cardNumber) => {
  if (!cardNumber) return '';
  const cleanNumber = cardNumber.toString().replace(/\D/g, '');
  if (cleanNumber.length !== 16) return cleanNumber;
  return '•••• '.repeat(3) + cleanNumber.slice(-4);
};

const validateFields = () => {
  errorMessages.value = [];
  
  if (!monto.value || monto.value <= 0) {
    errorMessages.value.push("Debe ingresar un monto válido");
  }
  
  if (!cvuOrAlias.value) {
    errorMessages.value.push(`Debe ingresar un ${selectedCBUOption.value === 'cbu' ? 'CBU' : 'Alias'}`);
  }
  
  if (!selectedCategory.value) {
    errorMessages.value.push("Debe seleccionar una categoría");
  }
  
  if (selectedPaymentOption.value === 'tarjeta' && !selectedCard.value) {
    errorMessages.value.push("Debe seleccionar una tarjeta");
  }

  if (monto.value > appStore.getBalance() && selectedPaymentOption.value === 'cuenta') {
    errorMessages.value.push("Saldo insuficiente");
  }

  if (errorMessages.value.length > 0) {
    showErrorDialog.value = true;
    return false;
  }
  return true;
};

</script>

<template>
  <template v-if="appStore.getId() >= 0">
    <ButtonsNavBarWithBack />
    <v-row class="w-100 h-100 d-flex justify-center" style="margin-top: 106px;" fluid>
      <v-col cols="11" sm="11" md="5" lg="4" xl="4" class="d-flex flex-column align-center justify-start">


        <v-card 
            class="bg-tertiary elevation-7 w-100 mb-2 pa-2"
            flat
            elevation="0"
          >
            <div class="d-flex flex-column align-center">
              <h1 class="text-h5 font-weight-medium mb-1">Pagar</h1>
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
                <p class="text-h6 font-weight-bold mb-4">${{ Math.trunc(appStore.getBalance()).toLocaleString('es-ES') }}</p>
                <v-text-field
                  v-model="monto"
                  label="Ingrese monto"
                  prefix="$"
                  type="number"
                  variant="outlined"
                  class="mb-4 w-100"
                  dense
                ></v-text-field>

                <v-btn-toggle v-model="selectedCBUOption" class="mb-4" mandatory>
                  <v-btn :value="'cbu'" color="primary" outlined>CBU</v-btn>
                  <v-btn :value="'alias'" color="primary" outlined>Alias</v-btn>
                </v-btn-toggle>

                <v-text-field
                  v-model="cvuOrAlias"
                  :label="selectedCBUOption === 'cbu' ? 'CBU' : 'Alias'"
                  type="text"
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
                <v-select
                  v-model="selectedCategory"
                  :items="appStore.getSpendingCategories()"
                  label="Seleccione una categoria"
                  class="mb-4 w-100"
                  variant="outlined"
                  dense
                ></v-select>
                <v-btn-toggle v-model="selectedPaymentOption" class="mb-4" mandatory>
                  <v-btn :value="'cuenta'" color="primary" outlined>Dinero en cuenta</v-btn>
                  <v-btn :value="'tarjeta'" color="primary" outlined>Pagar con Tarjeta</v-btn>
                </v-btn-toggle>
                <v-select
                  v-if="selectedPaymentOption === 'tarjeta'"
                  v-model="selectedCard"
                  :items="appStore.getCreditCards()"
                  :item-title="item => item ? `${maskCardNumber(item.number)} - ${item.type}` : ''"
                  :item-value="item => item ? `${item.number} ${item.type}` : ''"
                  label="Seleccione una tarjeta"
                  class="mb-4 w-100"
                  variant="outlined"
                  dense
                ></v-select>
                <v-btn
                  color="primary"
                  block
                  x-large
                  class="mt-2"
                  style="height: 50px; text-transform: none;"
                  @click="validateFields() && (showVerifyTransactionDialog = true)"
                >
                  Continuar
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card>



        
      </v-col>
    </v-row>

    <v-dialog v-model="showVerifyTransactionDialog" max-width="600px">
      <v-card class="elevation-7">
        <v-card-title class="text-h5">
            ¿Está seguro de que desea pagar?
          </v-card-title>
        <template v-if="appStore.getUserByAlias(cvuOrAlias) || appStore.getUserByCVU(cvuOrAlias)">
          <v-card-text>
            <p class="text-body-1">Nombre y Apellido: {{ appStore.getNameByAliasOrCVU(selectedCBUOption === 'cbu' ? null : cvuOrAlias, selectedCBUOption === 'cbu' ? cvuOrAlias : null) }}</p>
            <p class="text-body-1" v-if="selectedCBUOption === 'alias'">Alias: {{ cvuOrAlias }}</p>
            <p class="text-body-1" v-if="selectedCBUOption === 'cbu'">CBU: {{ cvuOrAlias }}</p> 
            <p class="text-body-1" v-if="selectedPaymentOption === 'tarjeta'">Tarjeta: {{ maskCardNumber(selectedCard) }}</p>
          </v-card-text>
        </template>
        <template v-else>
          <v-card-title class="text-body-1">
            <p class="text-body-1">Usuario desconocido.</p>
            <p class="text-body-1" v-if="selectedPaymentOption === 'tarjeta'">Tarjeta: {{ maskCardNumber(selectedCard) }}</p>
          </v-card-title>
        </template>
        <v-card-actions>
          <v-btn color="colortext" text @click="showVerifyTransactionDialog = false">Cancelar</v-btn>
          <v-btn color="colortext" @click="appStore.addPayment(
            -monto, 
            new Date(),  
            selectedCBUOption === 'cbu' ? null : cvuOrAlias, 
            selectedCBUOption === 'cbu' ? cvuOrAlias : null, 
            selectedPaymentOption === 'tarjeta',
            selectedCategory
          ); verify = true ; showVerifyTransactionDialog = false">Pagar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="showErrorDialog" max-width="400px">
      <v-card class="elevation-7">
        <v-card-title class="text-h5 text-center">
          Error en el pago.
        </v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item v-for="(error, index) in errorMessages" :key="index" class="text-error">
              • {{ error }}
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn color="primary" @click="showErrorDialog = false">
            Entendido
          </v-btn>
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

