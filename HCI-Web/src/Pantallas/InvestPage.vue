<script setup>
  import { ref, computed } from 'vue';
  import AppHeaderSecondaryScreen from '@/components/AppHeaderSecondaryScreen.vue';
  import BodyGrid from '@/components/BodyGrid.vue';
  import AppDivision from '@/components/AppDivision.vue';
  import Section from '@/components/Section.vue';
  
  
  const availableBalance = ref(10000);
  const currentInvestment = ref(5000);
  const interestRate = 0.05;
  
  const investmentAmount = ref('');
  const withdrawAmount = ref('');
  
  const dailyReturn = computed(() => currentInvestment.value * interestRate);
  
  const rules = {
    required: value => !!value || 'Campo requerido',
    positive: value => value > 0 || 'El monto debe ser positivo',
    maxAmount: value => value <= availableBalance.value || `No puede exceder su saldo disponible de $${availableBalance.value}`,
    maxWithdraw: value => value <= currentInvestment.value || `No puede retirar más de su inversión actual de $${currentInvestment.value}`,
  };
  
  const isValidInvestment = computed(() => {
    return investmentAmount.value > 0 && investmentAmount.value <= availableBalance.value;
  });
  
  const isValidWithdrawal = computed(() => {
    return withdrawAmount.value > 0 && withdrawAmount.value <= currentInvestment.value;
  });
  
  const investAll = () => {
    investmentAmount.value = availableBalance.value.toString();
  };
  
  const withdrawAll = () => {
    withdrawAmount.value = currentInvestment.value.toString();
  };
  
  const invest = () => {
    if (isValidInvestment.value) {
      const amount = Number(investmentAmount.value);
      currentInvestment.value += amount;
      availableBalance.value -= amount;
      investmentAmount.value = '';
      alert('Inversión realizada con éxito');
    }
  };
  
  const withdraw = () => {
    if (isValidWithdrawal.value) {
      const amount = Number(withdrawAmount.value);
      currentInvestment.value -= amount;
      availableBalance.value += amount;
      withdrawAmount.value = '';
      alert('Retiro realizado con éxito');
    }
  };
</script>
  

<template>
    <v-main class="main-container bg-background">
    <ButtonsNavBarWithBack link_back="/payment-methods"/>
      <BodyGrid>
        <AppDivision class="ma-4" cols="12" sm="10" md="10" lg="4">
          <Section class="ma-3">
            <v-container class="inside-section">
              <h2 class="text-h5 mb-4">Inversión Actual</h2>
              <v-card class="mb-4 pa-4">
                <v-row>
                  <v-col cols="6">
                    <p class="text-subtitle-1">Monto invertido:</p>
                    <p class="text-h6">${{ currentInvestment.toFixed(2) }}</p>
                  </v-col>
                  <v-col cols="6">
                    <p class="text-subtitle-1">Retorno diario:</p>
                    <p class="text-h6">${{ dailyReturn.toFixed(2) }}</p>
                  </v-col>
                </v-row>
              </v-card>
  
              <h2 class="text-h5 mb-4">Nueva Inversión</h2>
              <v-form @submit.prevent="invest">
                <v-text-field
                  v-model="investmentAmount"
                  label="Monto a invertir"
                  type="number"
                  prefix="$"
                  :rules="[rules.required, rules.positive, rules.maxAmount]"
                  class="mb-2"
                ></v-text-field>
                <v-btn
                  color="primary"
                  block
                  class="mb-2"
                  @click="investAll"
                >
                  Invertir todo el saldo disponible
                </v-btn>
                <v-btn
                  type="submit"
                  color="primary"
                  block
                  :disabled="!isValidInvestment"
                >
                  Invertir
                </v-btn>
              </v-form>
  
              <v-divider class="my-6"></v-divider>
  
              <h2 class="text-h5 mb-4">Retirar Inversión</h2>
              <v-form @submit.prevent="withdraw">
                <v-text-field
                  v-model="withdrawAmount"
                  label="Monto a retirar"
                  type="number"
                  prefix="$"
                  :rules="[rules.required, rules.positive, rules.maxWithdraw]"
                  class="mb-2"
                ></v-text-field>
                <v-btn
                  color="secondary"
                  block
                  class="mb-2"
                  @click="withdrawAll"
                >
                  Retirar toda la inversión
                </v-btn>
                <v-btn
                  type="submit"
                  color="secondary"
                  block
                  :disabled="!isValidWithdrawal"
                >
                  Retirar
                </v-btn>
              </v-form>
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