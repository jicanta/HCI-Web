<script setup lang="ts">
import AppDivision from '@/components/AppDivision.vue';
import AppHeaderPrimaryScreen from '@/components/AppHeaderPrimaryScreen.vue';
import BodyGrid from '@/components/BodyGrid.vue';
import ButtonsNavBar from '@/components/ButtonsNavBar.vue';
import Section from '@/components/Section.vue';
import VChart from 'vue-echarts';
import { ref, computed } from 'vue';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components';

use([CanvasRenderer, PieChart, TitleComponent, TooltipComponent, LegendComponent]);

const pesos = 25.761;
const centavos = 57;

const showMoney = ref(true);

const toggleMoneyVisibility = () => {
  showMoney.value = !showMoney.value;
};

const recentTransactions = ref([
  { id: 1, description: 'Grocery Shopping', amount: -75.50, category: 'Food' },
  { id: 2, description: 'Salary Deposit', amount: 2000.00, category: 'Income' },
  { id: 3, description: 'Electric Bill', amount: -120.00, category: 'Utilities' },
  { id: 4, description: 'Online Purchase', amount: -50.25, category: 'Shopping' },
  { id: 5, description: 'Restaurant Dinner', amount: -85.00, category: 'Food' },
]);

// Agrupa los gastos por categoría
const spendingByCategory = computed(() => {
  const categories = {};
  recentTransactions.value.forEach(transaction => {
    if (transaction.amount < 0) {
      categories[transaction.category] = (categories[transaction.category] || 0) + Math.abs(transaction.amount);
    }
  });
  return Object.entries(categories).map(([name, value]) => ({ name, value }));
});

// Opciones para el gráfico
const chartOption = computed(() => ({
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: ${c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: 'Spending',
      type: 'pie',
      radius: ['50%', '70%'],
      avoidLabelOverlap: false,
      label: { show: false, position: 'center' },
      emphasis: {
        label: { show: true, fontSize: '18', fontWeight: 'bold' }
      },
      labelLine: { show: false },
      data: spendingByCategory.value
    }
  ]
}));
</script>

<template>
  <AppHeaderPrimaryScreen />
  <v-main class="main-container" fluid>
    <ButtonsNavBar />
    <BodyGrid>
      <AppDivision class="ma-4" cols="12" sm="6" md="4">
        <Section class="ma-3">
          <v-container class="inside-section">
            <h2 class="text-colortext2">Hola, Nombre de usuario</h2>
            <v-divider class="my-2" />
            <p class="text-weight-light text-colortext2">Dinero disponible</p>
            <v-container class="money-container">
              <h1 class="text-weight-bold text-colortext2">
                {{ showMoney ? '$' + pesos : '*******' }}
              </h1>
              <v-container class="cents-container">
                <p class="text-colortext2">{{ showMoney ? centavos : '**' }}</p>
              </v-container>
              <v-icon size="32" class="text-colortext2 mr-2" @click="toggleMoneyVisibility">
                {{ showMoney ? 'mdi-eye' : 'mdi-eye-off' }}
              </v-icon>
            </v-container>
            <v-divider class="my-2" />
            <v-container class="functions-container">
              <v-container class="function">
                <v-btn size="x-large" icon="mdi-cash-fast" color="primary" elevation="4" />
                <p class="text-primary pa-1">Ingresar</p>
              </v-container>
              <v-container class="function">
                <v-btn size="x-large" icon="mdi-file-document" color="primary" elevation="4" />
                <p class="text-primary pa-1">Tus datos</p>
              </v-container>
              <v-container class="function">
                <v-btn size="x-large" icon="mdi-history" color="primary" elevation="4" />
                <p class="text-primary pa-1">Movimientos</p>
              </v-container>
            </v-container>
            <v-divider class="my-2" />
          </v-container>
        </Section>
        <Section class="ma-3">
          <v-container class="inside-section">
            <p class="text-weight-light text-colortext2 mb-4">Medios de pago</p>
            <v-container class="card bg-lime-darken-4 rounded">
              <p> •••• •••• •••• 4444 </p>
            </v-container>
          </v-container>
        </Section>
      </AppDivision>

      <AppDivision class="ma-6" cols="12" sm="6" md="4">
        <Section class="ma-3">
          <v-container class="inside-section">
            <p class="text-weight-light text-colortext2 mb-4">Últimos movimientos</p>
            <v-chart class="chart my-5" :option="chartOption" />
            <v-divider />
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
}

.inside-section {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: flex-start;
}

.money-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
}

.cents-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0px;
  margin: 0px;
  height: 100%;
}

.functions-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 12%;
  padding-right: 12%;
}

.function {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.chart {
  width: 100%;
  height: 40%;
}
</style>
