<script setup>
import ButtonsNavBar from '@/components/ButtonsNavBar.vue';
import ListItem from '@/components/ListItem.vue';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { usePaymentMethodsStore } from '@/stores/paymentMethodsStore';
import { formatTransactionDate } from '@/back-libs/date';

const paymentMethodsStore = usePaymentMethodsStore();

const maskCardNumber = (number) => {
  return '•••• '.repeat(3) + number.slice(-4);
};  

  /*
  const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  theme.global.name.value = isDarkMode.value ? 'dark' : 'light';
  localStorage.setItem('isDarkMode', isDarkMode.value.toString()); // Guardar el estado en localStorage
  };
  */

  var availableBalance = ref(0);
  //var transactions = ref([]);

  onMounted(
    () => {
      availableBalance.value = localStorage.getItem("availableBalance");
      transactions.value = JSON.parse(localStorage.getItem("transactions"));
    }
    
  );
  
  const getCents = (balance) => {
    return ( Math.abs(balance) - Math.floor(Math.abs(balance)) ).toFixed(2) * 100;
  }

  const showMoney = ref(localStorage.getItem('showMoney') !== 'false');

  const toggleMoneyVisibility = () => {
    showMoney.value = !showMoney.value;
    localStorage.setItem('showMoney', JSON.stringify(showMoney.value));
  };

  const router = useRouter();
  
  const goToRoute = (route) => {
    router.push(route);
  };

  const sections = [
    {text: "Inicio", icon: "mdi-home", selected: true, route: "home"}, 
    {text: "Movimientos", icon: "mdi-history", selected: false, route: "movements"}, 
    {text: "Medios de pago", icon: "mdi-credit-card-outline", selected: false, route: "paymentMethods"}, 
    {text: "Invertir", icon: "mdi-cash-plus", selected: false, route: "invest"}
  ]

  import VChart from 'vue-echarts';
  import { use } from 'echarts/core';
  import { CanvasRenderer } from 'echarts/renderers';
  import { PieChart } from 'echarts/charts';
  import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components'
  import { useAppStore } from '@/stores/store';
  import { useTheme } from 'vuetify';

  const appStore = useAppStore();
  const theme = useTheme();

  // Usar computed para acceder al usuario actual de manera reactiva
  const currentUser = computed(() => appStore.getCurrentUser());

  // Usar computed para las transacciones
  const transactions = computed(() => currentUser.value ? currentUser.value.payments : []);

  use([CanvasRenderer, PieChart, TitleComponent, TooltipComponent, LegendComponent]);

  const spendingByCategory = computed(() => {
    const categories = {};
    transactions.value.forEach(transaction => {
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
      left: 'left',
      textStyle: { color: theme.current.value.colors.colortext2 } // Cambia 'blue' por el color deseado
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
    <ButtonsNavBar :sections="sections"/>

    <v-row class="w-100 h-100 d-flex justify-center" style="margin-top: 106px;" fluid>
      <v-col cols="11" sm="11" md="5" lg="4" xl="4" class="d-flex flex-column align-center justify-start">
        <v-card 
          title="Dinero disponible" 
          class="bg-tertiary w-100 my-4 pa-2"
        >
          <v-container class="d-flex flex-column align-center justify-center pa-6">
            <v-container class="d-flex flex-row align-center pa-0">

            <h1 class="font-weight-bold text-colortext2">
              {{ showMoney ? '$' + Math.trunc(appStore.getBalance()).toLocaleString('es-ES') : '*******' }}
            </h1>

            <v-container class="d-flex flex-columns pa-0 ma-0 h-100">
              <p class="text-colortext2">{{ showMoney ? getCents(availableBalance) : '**' }}</p>
            </v-container>

            <v-icon size="32" class="text-colortext2 mr-2" @click="toggleMoneyVisibility">
              {{ showMoney ? 'mdi-eye' : 'mdi-eye-off' }}
            </v-icon>

            </v-container>

            <v-divider class="my-2 w-100"/>

            <!-- Actions -->

            <v-col class="w-100 d-flex">
              <v-row class="d-flex flex-row align-center justify-center w-100">
                <v-col cols="6" class="d-flex flex-column justify-center align-center w-100">
                  <v-btn class="text-capitalize ma-2 w-100" rounded="lg" size="x-large" width="200px" append-icon="mdi-arrow-down" color="primary" elevation="4">Ingresar</v-btn>
                  <v-btn class="text-capitalize ma-2 w-100" rounded="lg" size="x-large" width="200px" append-icon="mdi-account" color="primary"  elevation="4" @click="goToRoute({ name: 'account' })">Tus datos</v-btn>
                </v-col>
                <v-col cols="6" class="d-flex flex-column justify-center align-center w-100">
                  <v-btn class="text-capitalize ma-2 w-100" rounded="lg" size="x-large" width="200px" append-icon="mdi-cash-fast" color="primary" elevation="4">Transferir</v-btn>
                  <v-btn class="text-capitalize ma-2 w-100" rounded="lg" size="x-large" width="200px" append-icon="mdi-history" color="primary" elevation="4" @click="goToRoute({ name: 'paymentLink' })">Link de pago</v-btn>
                </v-col>
              </v-row>
            </v-col>
            
          </v-container>

        </v-card>
        <v-card 
          title="Medios de pago" 
          class="bg-tertiary w-100 my-4 pa-2"
        >
          <v-container class="d-flex flex-column align-center justify-center pa-6 height-60">
            <v-container v-for="card in appStore.getCreditCards().slice(0, 3)" 
                         :key="card.id"
                         class="rounded mb-2 d-flex align-center"
                         :class="`bg-${card.color}`"
                         style="height: 50px;">
              <v-row class="d-flex justify-space-between align-center">
                <v-col>
                  {{ maskCardNumber(card.number) }}
                </v-col>
                <v-col cols="3">
                  <v-img :src="paymentMethodsStore.cardLogo(card.type)" width="50"/>
                </v-col>
              </v-row>
            </v-container> 
          </v-container>
          <v-card-actions>
            <v-btn class="bg-primary w-100" @click="router.push({name: 'paymentMethods'})">Ver medios de pago</v-btn>
          </v-card-actions>

        </v-card>

      </v-col>

      <v-col cols="11" sm="11" md="5" lg="4" xl="4" class="d-flex flex-column align-center justify-start">
        <v-card 
          title="Última actividad"
          class="bg-tertiary w-100 my-4 pa-2"
        >
          <v-chart class="chart mt-8 mb-2 pa-1 w-100 border-1 text-colorText2 d-flex align-center justify-center border rounded" :option="chartOption" style="height: 250px; width: 200px;"/>
          
          <v-card-text>
            <template v-if="transactions.length === 0">
              <p class="text-muted text-center">No hay movimientos.</p>
            </template>

            <template v-else>
              <v-list class="pa-0">
                <ListItem
                  v-for="transaction in transactions.slice(-3).reverse()"
                  class="bg-tertiary"
                  :key="transaction.id"
                  :icon="transaction.amount > 0 ? 'mdi-cash-check' : 'mdi-cart'"
                  :top="appStore.formatTransactionDate(transaction.date)"
                  :title="transaction.name"
                  :text="transaction.category"
                  :right="transaction.amount.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })"
                />
              </v-list>
            </template>
          </v-card-text>
          <v-card-actions>
            <v-btn class="bg-primary w-100" @click="router.push({ name:'movements' })">Ver movimientos</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

</template>
