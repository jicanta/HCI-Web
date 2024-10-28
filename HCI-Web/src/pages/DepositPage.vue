<script setup lang="js">
import { ref } from 'vue';
import ButtonsNavBarWithBack from '@/components/ButtonsNavBarWithBack.vue';
import router from '@/router';
import { useAppStore } from '@/stores/store';

const goToRoute = (route) => {
  router.push(route);
};

const appStore = useAppStore();

const monto = ref('');
const selectedCard = ref('');
const showVerifyTransactionDialog = ref(false);
const showErrorDialog = ref(false);
const errorMessages = ref([]);
const selectedCategory = ref('');

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
  
  if (!selectedCard.value) {
    errorMessages.value.push("Debe seleccionar una tarjeta");
  }

  if (!selectedCategory.value) {
    errorMessages.value.push("Debe seleccionar una categoría");
  }

  if (errorMessages.value.length > 0) {
    showErrorDialog.value = true;
    return false;
  }
  return true;
};

const handleDeposit = () => {
    showVerifyTransactionDialog.value = false;
    appStore.addDeposit(monto.value, new Date(), selectedCategory.value);
    monto.value = '';
    selectedCard.value = '';
    selectedCategory.value = '';
}
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
                <h1 class="text-h5 font-weight-medium mb-1">Ingresar</h1>
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
                <v-select
                    v-model="selectedCategory"
                    :items="appStore.getEarningCategories()"
                    label="Seleccione una categoría"
                    class="mb-4 w-100"
                    variant="outlined"
                    dense
                />
                <v-select
                    v-model="selectedCard"
                    :items="appStore.getCreditCards()"
                    :item-title="item => item ? `${maskCardNumber(item.number)} - ${item.type}` : ''"
                    :item-value="item => item ? `${item.number} ${item.type}` : ''"
                    label="Seleccione una tarjeta"
                    class="mb-4 w-100"
                    variant="outlined"
                    dense
                />
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
          ¿Está seguro que desea depositar?
        </v-card-title>
        <v-card-text>
          <p class="text-body-1">Monto: ${{ monto }}</p>
          <p class="text-body-1">Tarjeta: {{ maskCardNumber(selectedCard) }}</p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="colortext" text @click="showVerifyTransactionDialog = false">Cancelar</v-btn>
          <v-btn color="colortext" @click="handleDeposit">Depositar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="showErrorDialog" max-width="400px">
      <v-card class="elevation-7">
        <v-card-title class="text-h5 text-center">
          Error en el depósito
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
