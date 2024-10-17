<script setup>
  import AppDivision from '@/components/AppDivision.vue';
  import { ref } from 'vue';
  import BodyGrid from '@/components/BodyGrid.vue';
  import Section from '@/components/Section.vue';
  import ListItem from '@/components/ListItem.vue';
  import ButtonsNavBar from '@/components/ButtonsNavBar.vue';

  const sections = [
      {text: "Inicio", icon: "mdi-home", selected: false, route: "/"}, 
      {text: "Movimientos", icon: "mdi-history", selected: true, route: "/movements"}, 
      {text: "Medios de pago", icon: "mdi-credit-card-outline", selected: false, route: "/payment-methods"}, 
      {text: "Invertir", icon: "mdi-cash-plus", selected: false, route: "/invest"}
    ]

    const recentTransactions = ref([
    { id: 1, description: 'UnitedHealth Group Incorporated', amount: -75.50, category: 'Food', date: { day: 4, month: 10, year: 2024 } },
    { id: 2, description: 'Salary Deposit', amount: 2000.00, category: 'Income', date: { day: 4, month: 10, year: 2024 }  },
    { id: 3, description: 'Electric Bill', amount: -120.00, category: 'Utilities', date: { day: 2, month: 10, year: 2024 }  },
    { id: 4, description: 'Online Purchase', amount: -50.25, category: 'Shopping', date: { day: 1, month: 10, year: 2024 }  },
    { id: 5, description: 'Restaurant Dinner', amount: -85.00, category: 'Food', date: { day: 25, month: 9, year: 2024 }  },
    { id: 6, description: 'Public Transport', amount: -1.50, category: 'Transport', date: { day: 17, month: 9, year: 2024 }  },
    { id: 7, description: 'Uber', amount: -4.25, category: 'Transport', date: { day: 20, month: 9, year: 2024 }  },
  ]);

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

</script>

<template>
  <v-main class="main-container bg-background" fluid>
    <ButtonsNavBar :sections="sections"/>

    <BodyGrid>
      <AppDivision class="ma-4" cols="12" sm="10" md="10" lg="4">
        <Section class="ma-3">
          <ListItem
                  v-for="transaction in recentTransactions"
                  :key="transaction.id"
                  :icon="transaction.amount > 0 ? 'mdi-cash-check' : 'mdi-cart'"
                  :top="formatTransactionDate(transaction.date)"
                  :title="transaction.description"
                  :text="transaction.category"
                  :right="transaction.amount.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })"
                />
          
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
  height: 100%;
  justify-content: flex-start;
  align-items: center;
}
</style>
