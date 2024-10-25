<script setup lang="ts">
  import AppDivision from '@/components/AppDivision.vue';
  import AppHeaderPrimaryScreen from '@/components/AppHeaderPrimaryScreen.vue';
  import BodyGrid from '@/components/BodyGrid.vue';
  import ButtonsNavBar from '@/components/ButtonsNavBar.vue';
  import Section from '@/components/Section.vue';
  import { ref, computed } from 'vue';
  import VChart from 'vue-echarts';
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
    { id: 1, description: 'UnitedHealth Group Incorporated', amount: -75.50, category: 'Food', date: { day: 4, month: 10, year: 2024 } },
    { id: 2, description: 'Salary Deposit', amount: 2000.00, category: 'Income', date: { day: 4, month: 10, year: 2024 }  },
    { id: 3, description: 'Electric Bill', amount: -120.00, category: 'Utilities', date: { day: 2, month: 10, year: 2024 }  },
    { id: 4, description: 'Online Purchase', amount: -50.25, category: 'Shopping', date: { day: 1, month: 10, year: 2024 }  },
    { id: 5, description: 'Restaurant Dinner', amount: -85.00, category: 'Food', date: { day: 25, month: 9, year: 2024 }  },
    { id: 6, description: 'Public Transport', amount: -1.50, category: 'Transport', date: { day: 17, month: 9, year: 2024 }  },
    { id: 7, description: 'Uber', amount: -4.25, category: 'Transport', date: { day: 20, month: 9, year: 2024 }  },
  ]);

  const spendingByCategory = computed(() => {
    const categories = {};
    transactionsThisMonth.value.forEach(transaction => {
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

  const sections = [
    {text: "Inicio", icon: "mdi-home", selected: true, route: "/"}, 
    {text: "Movimientos", icon: "mdi-history", selected: false, route: "/movements"}, 
    {text: "Medios de pago", icon: "mdi-credit-card-outline", selected: false, route: "/payment-methods"}, 
    {text: "Invertir", icon: "mdi-cash-plus", selected: false, route: "/invest"}
  ]

  const router = useRouter();
  
  const goToRoute = (route) => {
    router.push(route);
  };
</script>


<template>
  <!--<AppHeaderPrimaryScreen />-->
  <v-main class="bg-background d-flex flex-column" fluid>
    <ButtonsNavBar :sections="sections"/>
    <BodyGrid>
      <AppDivision class="ma-4" cols="12" sm="10" md="10" lg="4">
        <Section class="ma-3">
          <v-container class="d-flex flex-column w-100 h-100">
            <h2 class="text-colortext2">Hola, Nombre de usuario</h2>
            <v-divider class="my-2" />
            <p class="font-weight-light text-colortext2">Dinero disponible</p>
            <v-container class="d-flex flex-row align-center pa-0">
              <h1 class="font-weight-bold text-colortext2">
                {{ showMoney ? '$' + pesos : '*******' }}
              </h1>
              <v-container class="d-flex flex-columns pa-0 ma-0 h-100">
                <p class="text-colortext2">{{ showMoney ? centavos : '**' }}</p>
              </v-container>
              <v-icon size="32" class="text-colortext2 mr-2" @click="toggleMoneyVisibility">
                {{ showMoney ? 'mdi-eye' : 'mdi-eye-off' }}
              </v-icon>
            </v-container>
            <v-divider class="my-2" />
            <v-container class="d-flex flex-row align-center justify-center pa-0">
              <v-container class="w-50 d-flex flex-column align-center justify-center">
                    <v-btn class="text-capitalize ma-4 mx-4" rounded="lg" size="x-large" width="200px" append-icon="mdi-arrow-down" color="primary" elevation="4" @click="goToRoute('/deposit')" >Ingresar</v-btn>
                    <v-btn class="text-capitalize ma-4 mx-4" rounded="lg" size="x-large" width="200px" append-icon="mdi-pencil" color="primary"  elevation="4" @click="goToRoute('/mydata')">Tus datos</v-btn>
              </v-container>
  	          <v-container class="w-50 d-flex flex-column align-center justify-center">
                    <v-btn class="text-capitalize ma-4 mx-4" rounded="lg" size="x-large" width="200px" append-icon="mdi-cash-fast" color="primary" elevation="4">Transferir</v-btn>
                    <v-btn class="text-capitalize ma-4 mx-4" rounded="lg" size="x-large" width="200px" append-icon="mdi-history" color="primary" elevation="4" >Link de pago</v-btn>
              </v-container>
            </v-container>
            <v-divider class="my-2" />
          </v-container>
        </Section>
        <Section class="ma-3">
          <v-container>
            <p class="font-weight-bold text-colortext2 mb-4">Medios de pago</p>
            <v-container class="bg-lime-darken-4 my-1 rounded">
              <p> •••• •••• •••• 4444 </p>
            </v-container>
            <v-container class="bg-shades-black my-1 rounded">
              <p> •••• •••• •••• 4444 </p>
            </v-container>
            <v-container class="bg-blue-grey-lighten-3 my-1 rounded">
              <p> •••• •••• •••• 4444 </p>
            </v-container>
            <v-container class="d-flex flex-column justify-end mt-4">
              <v-btn variant="tonal" class="w-100" @click="goToRoute('/payment-methods')">Ver Todos mis medios de pago</v-btn>
            </v-container>
          </v-container>
        </Section>
      </AppDivision>

      <AppDivision class="ma-4" cols="12" sm="10" md="10" lg="4">
        <Section class="ma-3">

          <v-container>
            <h2 class="font-weight-bold text-colortext2 mb-4">Este mes</h2>

            <h3 class="text-textcolor2 font-weight-light">Categorías</h3>

            <v-chart class="chart mt-8 mb-2 pa-1 w-100 border-1 d-flex align-center justify-center border rounded" :option="chartOption"/>
            
            <v-divider class="my-4"/>
            
            <h3 class="text-textcolor2 font-weight-bold mt-2">Movimientos</h3>

            <v-container class="pa-1 mb-4 mt-0 border rounded">
              <!-- Si no hay transacciones este mes -->
              <template v-if="transactionsThisMonth.length === 0">
                <p class="text-muted text-center">No hay movimientos este mes.</p>
              </template>

              <!-- Si hay transacciones-->
              <template v-else>
                <ListItem
                  v-for="transaction in transactionsThisMonth.slice(-3)"
                  :key="transaction.id"
                  :icon="transaction.amount > 0 ? 'mdi-cash-check' : 'mdi-cart'"
                  :top="formatTransactionDate(transaction.date)"
                  :title="transaction.description"
                  :text="transaction.category"
                  :right="transaction.amount.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })"
                />
              </template>
            </v-container>

            <v-btn variant="tonal" class="w-100" @click="goToRoute('/movements')">Ver todos mis movimientos</v-btn>
          </v-container>
        </Section>
      </AppDivision>
    </BodyGrid>
  </v-main>
</template>

<style scoped>
  .chart{
    height: 180px;
  }
</style>

