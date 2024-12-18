<script setup>
  import { ref, computed, onMounted } from 'vue';
  import { Line as LineChart } from 'vue-chartjs';
  import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
  import BodyGrid from '@/components/BodyGrid.vue';
  import AppDivision from '@/components/AppDivision.vue';
  import Section from '@/components/Section.vue';
  import ButtonsNavBar from '@/components/ButtonsNavBar.vue';
  import router from '@/router';
  import { useAppStore } from '@/stores/store';
  
  const appStore = useAppStore();

  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

  const availableBalance = ref(appStore.getBalance());
  const currentInvestment = ref(appStore.getInvested());
  const interestRate = 0.05;
  
  const investmentAmount = ref('');
  const withdrawAmount = ref('');
  
  const handleInvest = () => {
    appStore.addInvested(investmentAmount.value);
  }

  const handleWithdraw = () => {
    appStore.addInvested(-1 * withdrawAmount.value);
  }
  
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

  const sections = [
    {text: "Inicio", icon: "mdi-home", selected: false, route: "home"}, 
    {text: "Movimientos", icon: "mdi-history", selected: false, route: "movements"}, 
    {text: "Medios de pago", icon: "mdi-credit-card-outline", selected: false, route: "paymentMethods"}, 
    {text: "Invertir", icon: "mdi-cash-plus", selected: true, route: "invest"}
  ]

  const chartData = ref({
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'Mar', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    datasets: [{
      label: 'Ganancia',
      data: [1000, 1500, 2000, 1800, 2200, 2600, 2400, 2800, 3000, 3200, 3500, 3800],
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  });

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Ganancia ($)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Mes'
        }
      }
    }
  };

  const goToRoute = (route) => {
    router.push(route);
  };

</script>

<template>
  <v-main v-if="appStore.getId() >= 0" class="main-container" fluid>
    
    <ButtonsNavBar :sections="sections" />
    <BodyGrid>
      <AppDivision class="ma-4" cols="12" sm="10" md="8" lg="6">
        <v-card 
          class="bg-tertiary elevation-7 w-100 mb-2 pa-2"
          flat
          elevation="0"
        >
          <div class="d-flex flex-column align-center">
            <h1 class="text-h5 font-weight-medium mb-1">Invertir</h1>
            <v-divider class="primary" width="32" thickness="2"></v-divider>
          </div>
        </v-card>
        <Section class="ma-3">
          <v-container class="inside-section">
            <h2 class="text-h5 mb-4">Inversión actual</h2>
            <v-card class="elevation-7 mb-4 pa-4">
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
  
            <h2 class="text-h5 mb-4">Nueva inversión</h2>
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
                @click="handleInvest()"
                type="submit"
                color="primary"
                block
                :disabled="!isValidInvestment"
              >
                Invertir
              </v-btn>
            </v-form>
  
            <v-divider class="my-6"></v-divider>
  
            <h2 class="text-h5 mb-4">Retirar inversión</h2>
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
                @click="handleWithdraw()"
                type="submit"
                color="secondary"
                block
                :disabled="!isValidWithdrawal"
              >
                Retirar
              </v-btn>
            </v-form>
            
            <!-- Chart added at the bottom -->
            <v-card class="elevation-7 pa-4 mt-6">
              <v-card-title class="text-h5 mb-2">Ganancia por mes</v-card-title>
              <v-card-text>
                <div class="chart-container">
                  <LineChart v-if="chartData" :data="chartData" :options="chartOptions" />
                </div>
              </v-card-text>
            </v-card>
            
          </v-container>
        </Section>
      </AppDivision>
    </BodyGrid>
  </v-main>
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
  
  .chart-container {
    height: 300px;
    margin-bottom: 20px;
  }
</style>

