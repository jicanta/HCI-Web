<script setup lang="ts">
  import AppDivision from '@/components/AppDivision.vue';
  import AppHeaderPrimaryScreen from '@/components/AppHeaderPrimaryScreen.vue';
  import BodyGrid from '@/components/BodyGrid.vue';
  import ButtonsNavBar from '@/components/ButtonsNavBar.vue';
  import Section from '@/components/Section.vue';
  import VChart from 'vue-echarts';
  import { ref, computed, onMounted } from 'vue';
  import { use } from 'echarts/core';
  import { CanvasRenderer } from 'echarts/renderers';
  import { PieChart } from 'echarts/charts';
  import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components';
  import { useRouter } from 'vue-router';
  import ListItem from '@/components/ListItem.vue';

  use([CanvasRenderer, PieChart, TitleComponent, TooltipComponent, LegendComponent]);

  const pesos = 25.761;
  const centavos = 57;

  // Recupera el estado de showMoney desde localStorage o establece el valor predeterminado
  const showMoney = ref(localStorage.getItem('showMoney') !== 'false');

  const toggleMoneyVisibility = () => {
    showMoney.value = !showMoney.value;
    // Guarda el estado actual en localStorage
    localStorage.setItem('showMoney', JSON.stringify(showMoney.value));
  };

  const recentTransactions = ref([
    { id: 1, description: 'Grocery Shopping', amount: -75.50, category: 'Food', date: { day: 4, month: 10, year: 2024 } },
    { id: 2, description: 'Salary Deposit', amount: 2000.00, category: 'Income', date: { day: 4, month: 10, year: 2024 }  },
    { id: 3, description: 'Electric Bill', amount: -120.00, category: 'Utilities', date: { day: 2, month: 10, year: 2024 }  },
    { id: 4, description: 'Online Purchase', amount: -50.25, category: 'Shopping', date: { day: 1, month: 10, year: 2024 }  },
    { id: 5, description: 'Restaurant Dinner', amount: -85.00, category: 'Food', date: { day: 25, month: 9, year: 2024 }  },
    { id: 6, description: 'Public Transport', amount: -1.50, category: 'Transport', date: { day: 17, month: 9, year: 2024 }  },
    { id: 7, description: 'Uber', amount: -4.25, category: 'Transport', date: { day: 20, month: 9, year: 2024 }  },
  ]);

  const spendingByCategory = computed(() => {
    const categories = {};
    recentTransactions.value.forEach(transaction => {
      if (transaction.amount < 0) {
        categories[transaction.category] = (categories[transaction.category] || 0) + Math.abs(transaction.amount);
      }
    });
    return Object.entries(categories).map(([name, value]) => ({ name, value }));
  });

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

  // Obtener la fecha actual
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();

  const formatTransactionDate = (transactionDate) => {
    const { day, month, year } = transactionDate;
    
    if (day === currentDay && month === currentMonth && year === currentYear) {
      return "Hoy";
    }

    // Formato "DD de 'Nombre del mes'"
    const monthNames = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    return `${day} de ${monthNames[month - 1]}`;
  };

  // Filtrar las transacciones que pertenecen al mes actual
  const transactionsThisMonth = computed(() => {
    return recentTransactions.value.filter(transaction => {
      return transaction.date.month === currentMonth && transaction.date.year === currentYear;
    });
  });


  const router = useRouter();
  
  const goToRoute = (route) => {
    router.push(route);
  };
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
            <p class="font-weight-light text-colortext2">Dinero disponible</p>
            <v-container class="money-container">
              <h1 class="font-weight-bold text-colortext2">
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
                <v-btn size="x-large" icon="mdi-cash-fast" color="primary" elevation="4" @click="goToRoute('/deposit')" />
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
            <p class="font-weight-light text-colortext2 mb-4">Medios de pago</p>
            <v-container class="card bg-lime-darken-4 my-1 rounded">
              <p> •••• •••• •••• 4444 </p>
            </v-container>
            <v-container class="card bg-shades-black my-1 rounded">
              <p> •••• •••• •••• 4444 </p>
            </v-container>
            <v-container class="card bg-blue-grey-lighten-3 my-1 rounded">
              <p> •••• •••• •••• 4444 </p>
            </v-container>
          </v-container>
        </Section>
      </AppDivision>

      <AppDivision class="ma-6" cols="12" sm="6" md="4">
        <Section class="ma-3">

          <v-container class="inside-section">
            <p class="font-weight-light text-colortext2 mb-4">Últimos movimientos</p>
            <v-chart class="chart my-8 w-100 h-50" :option="chartOption" />
            
            <v-divider calss="my-2"/>
            
            <h3 class="text-textcolor2 font-weight-light mt-8">Movimientos este mes</h3>

            <v-container class="scrollable-container pa-1 h-50 mb-8 mt-1 border rounded">
              <ListItem
                v-for="transaction in transactionsThisMonth"
                :key="transaction.id"
                :icon="transaction.amount > 0 ? 'mdi-cash-check' : 'mdi-cart' "
                :top="formatTransactionDate(transaction.date)"
                :title="transaction.description"
                :text="transaction.category"
                :right="transaction.amount.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })"
              />
            </v-container>

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

.scrollable-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: auto;
}

</style>
