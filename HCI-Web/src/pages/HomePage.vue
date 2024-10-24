<template>
    <ButtonsNavBar :sections="sections"/>

    <v-row class="w-100 h-100 d-flex justify-center" style="margin-top: 106px;" fluid>
      <v-col cols="11" sm="11" md="5" lg="4" xl="4" class="d-flex flex-column align-center justify-start">
        <!-- Available balance -->
        <v-card 
          title="Dinero disponible" 
          class="bg-tertiary w-100 my-4 pa-2"
        >
          <v-container class="d-flex flex-column align-center justify-center pa-6">
            <!-- Money info -->
            <v-container class="d-flex flex-row align-center pa-0">

            <h1 class="font-weight-bold text-colortext2">
              {{ showMoney ? '$' + Math.trunc(availableBalance).toLocaleString('es-ES') : '*******' }}
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
                  <v-btn class="text-capitalize ma-2 w-100" rounded="lg" size="x-large" width="200px" append-icon="mdi-arrow-down" color="primary" elevation="4" @click="goToRoute('/deposit')" >Ingresar</v-btn>
                  <v-btn class="text-capitalize ma-2 w-100" rounded="lg" size="x-large" width="200px" append-icon="mdi-pencil" color="primary"  elevation="4" @click="goToRoute('/mydata')">Tus datos</v-btn>
                </v-col>
                <v-col cols="6" class="d-flex flex-column justify-center align-center w-100">
                  <v-btn class="text-capitalize ma-2 w-100" rounded="lg" size="x-large" width="200px" append-icon="mdi-cash-fast" color="primary" elevation="4">Transferir</v-btn>
                  <v-btn class="text-capitalize ma-2 w-100" rounded="lg" size="x-large" width="200px" append-icon="mdi-history" color="primary" elevation="4" >Link de pago</v-btn>
                </v-col>
              </v-row>
            </v-col>
            
          </v-container>

        </v-card>
        <!-- Payment methods preview -->
        <v-card 
          title="Medios de pago" 
          class="bg-tertiary w-100 my-4 pa-2"
        >
          <v-container class="d-flex flex-column align-center justify-center pa-6">
            <v-container class="bg-lime-darken-4 my-1 rounded">
              <p> •••• •••• •••• 4444 </p>
            </v-container>
            <v-container class="bg-shades-black my-1 rounded">
              <p> •••• •••• •••• 4444 </p>
            </v-container>
            <v-container class="bg-blue-grey-lighten-3 my-1 rounded">
              <p> •••• •••• •••• 4444 </p>
            </v-container>
          
          </v-container>
          <v-card-actions>
            <v-btn class="bg-primary w-100" @click="goToRoute('/payment-methods')">Ver medios de pago</v-btn>
          </v-card-actions>

        </v-card>

      </v-col>

      <v-col cols="11" sm="11" md="5" lg="4" xl="4" class="d-flex flex-column align-center justify-start">
        <!-- Movements preview -->
        <v-card 
          title="Última actividad"
          class="bg-tertiary w-100 my-4 pa-2"
        >
          <v-container class="d-flex flex-column justify-center align-center pa-1 mb-4 mt-0 border rounded">
            <template v-if="transactions === null || transactions.length === 0">
              <p class="text-muted text-center">No hay movimientos.</p>
            </template>

            <template v-else>
              <ListItem
                v-for="transaction in transactions.slice(-3)"
                :key="transaction.id"
                :icon="transaction.amount > 0 ? 'mdi-cash-check' : 'mdi-cart'"
                :top="formatTransactionDate(transaction.date)"
                :title="transaction.description"
                :text="transaction.category"
                :right="transaction.amount.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })"
              />
            </template>
          </v-container>
          <v-card-actions>
            <v-btn class="bg-primary w-100" @click="goToRoute('/movements')">Ver movimientos</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

</template>

<script setup>
  import ButtonsNavBar from '@/components/ButtonsNavBar.vue';
import ListItem from '@/components/ListItem.vue';
  import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

  /*
  const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  theme.global.name.value = isDarkMode.value ? 'dark' : 'light';
  localStorage.setItem('isDarkMode', isDarkMode.value.toString()); // Guardar el estado en localStorage
  };
  */

  var availableBalance = ref(0);
  var transactions = ref([]);

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
    {text: "Inicio", icon: "mdi-home", selected: true, route: "/"}, 
    {text: "Movimientos", icon: "mdi-history", selected: false, route: "/movements"}, 
    {text: "Medios de pago", icon: "mdi-credit-card-outline", selected: false, route: "/payment-methods"}, 
    {text: "Invertir", icon: "mdi-cash-plus", selected: false, route: "/invest"}
  ]

  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();

  const formatTransactionDate = (transactionDate) => {
    const { day, month, year } = transactionDate;
    
    if (day === currentDay && month === currentMonth && year === currentYear) {
      return "Hoy";
    }

    const monthNames = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    return `${day} de ${monthNames[month - 1]}`;
  };

</script>

<style>

</style>