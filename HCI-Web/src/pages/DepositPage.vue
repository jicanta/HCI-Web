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

const maskCardNumber = (cardNumber) => {
  if (!cardNumber) return '';
  const cleanNumber = cardNumber.toString().replace(/\D/g, '');
  if (cleanNumber.length !== 16) return cleanNumber;
  return '•••• '.repeat(3) + cleanNumber.slice(-4);
};

const handleDeposit = () => {
    appStore.addBalance(monto.value);
    monto.value = '';
    selectedCard.value = '';
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
                <p class="text-h6 font-weight-bold mb-4">${{ appStore.getBalance() }}</p>
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
                    v-model="selectedCard"
                    :items="appStore.getCreditCards()"
                    :item-title="item => item ? `${maskCardNumber(item.number)} - ${item.type}` : ''"
                    :item-value="item => item ? `${item.number} ${item.type}` : ''"
                    label="Seleccione una tarjeta"
                    class="mb-4 w-100"
                    dense
                />
                <v-btn
                  color="primary"
                  block
                  x-large
                  class="mt-2"
                  style="height: 50px; text-transform: none;"
                  @click="handleDeposit()"
                >
                  Continuar
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card>

      </v-col>
    </v-row>
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
