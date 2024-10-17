<script setup>
  import AppDivision from '@/components/AppDivision.vue';
  import { ref, computed } from 'vue';
  import BodyGrid from '@/components/BodyGrid.vue';
  import Section from '@/components/Section.vue';
  import ListItem from '@/components/ListItem.vue';
  import ButtonsNavBar from '@/components/ButtonsNavBar.vue';

  const sections = [
    { text: "Inicio", icon: "mdi-home", selected: false, route: "/" },
    { text: "Movimientos", icon: "mdi-history", selected: true, route: "/movements" },
    { text: "Medios de pago", icon: "mdi-credit-card-outline", selected: false, route: "/payment-methods" },
    { text: "Invertir", icon: "mdi-cash-plus", selected: false, route: "/invest" }
  ];

  const recentTransactions = ref([
    { id: 1, description: 'Salary Deposit', amount: 2000.00, category: 'Income', date: { day: 1, month: 9, year: 2024 } },
    { id: 2, description: 'UnitedHealth Group Incorporated', amount: -75.50, category: 'Food', date: { day: 24, month: 9, year: 2024 } },
    { id: 3, description: 'Electric Bill', amount: -120.00, category: 'Utilities', date: { day: 27, month: 9, year: 2024 } },
    { id: 4, description: 'Online Purchase', amount: -50.25, category: 'Shopping', date: { day: 27, month: 9, year: 2024 } },
    { id: 5, description: 'Restaurant Dinner', amount: -85.00, category: 'Food', date: { day: 29, month: 9, year: 2024 } },
    { id: 6, description: 'Salary Deposit', amount: 2000.00, category: 'Income', date: { day: 1, month: 10, year: 2024 } },
    { id: 7, description: 'Public Transport', amount: -1.50, category: 'Transport', date: { day: 2, month: 10, year: 2024 } },
    { id: 8, description: 'Uber', amount: -4.25, category: 'Transport', date: { day: 4, month: 10, year: 2024 } },
    { id: 9, description: 'Uber', amount: -4.25, category: 'Transport', date: { day: 7, month: 10, year: 2024 } },
    { id: 10, description: 'Uber', amount: -4.25, category: 'Transport', date: { day: 8, month: 10, year: 2024 } },
    { id: 11, description: 'Uber', amount: -4.25, category: 'Transport', date: { day: 8, month: 10, year: 2024 } },
    { id: 12, description: 'Online Purchase', amount: -16.50, category: 'Transport', date: { day: 10, month: 10, year: 2024 } },
    { id: 13, description: 'Uber', amount: -4.25, category: 'Transport', date: { day: 12, month: 10, year: 2024 } },
    { id: 14, description: 'Uber', amount: -4.25, category: 'Transport', date: { day: 16, month: 10, year: 2024 } },
    { id: 15, description: 'Online Purchase', amount: -10.00, category: 'Transport', date: { day: 17, month: 10, year: 2024 } },
    { id: 16, description: 'Restaurant Dinner', amount: -85.00, category: 'Food', date: { day: 17, month: 10, year: 2024 } },
  ].reverse());

  const itemsPerPage = 7;
  const currentPage = ref(1);

  // Calcular el número total de páginas
  const totalPages = computed(() => {
    return Math.ceil(recentTransactions.value.length / itemsPerPage);
  });

  // Obtener los elementos para la página actual
  const paginatedTransactions = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return recentTransactions.value.slice(start, end);
  });

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
  <v-main class="bg-background d-flex flex-column align-center w-100" fluid>
    <ButtonsNavBar :sections="sections" />
    <BodyGrid>
      <v-container fluid>
      <v-btn
        color="secondary"
        icon="mdi-arrow-left"
        class="top-left-button"
        @click="handleClick"
        >
      </v-btn>
    </v-container>
      <AppDivision class="ma-4" cols="12" sm="10" md="10" lg="4">
        <Section class="list d-flex flex-column justify-start h-100 ma-3">
          <ListItem
            v-for="transaction in paginatedTransactions"
            :key="transaction.id"
            :icon="transaction.amount > 0 ? 'mdi-cash-check' : 'mdi-cart'"
            :top="formatTransactionDate(transaction.date)"
            :title="transaction.description"
            :text="transaction.category"
            :right="transaction.amount.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })"
          />
        </Section>

        <v-pagination
          v-model="currentPage"
          :length="totalPages"
          :total-visible="6"
          color="primary"
          class="my-4"
        />
      </AppDivision>
    </BodyGrid>
  </v-main>
</template>

<style scoped>
  .pagination-controls {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  .list {
    min-height: 78vh;
  }

  button {
    padding: 8px 16px;
    background-color: #1976D2;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:disabled {
    background-color: #aaa;
  }

  .top-left-button {
  position: fixed; 
  top: 150px; 
  left: 55px; 
  z-index: 100; 
}
  </style>
