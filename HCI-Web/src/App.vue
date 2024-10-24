<script setup>
import { onMounted, ref } from 'vue';
import { useTheme } from 'vuetify';

const isDarkMode = ref(false);
const theme = useTheme();

onMounted(() => {

  //localStorage.clear();

  const storedTheme = localStorage.getItem('isDarkMode');
  if (storedTheme !== null) {
    isDarkMode.value = storedTheme === 'true';
    theme.global.name.value = isDarkMode.value ? 'dark' : 'light';
  }
  else {
    localStorage.setItem('isDarkMode', false);
  }

  // Available Balance set in local storage
  if ( localStorage.getItem('availableBalance') === null ){
    localStorage.setItem('availableBalance', 91220.18);
  }

  // Transactions set in local storage
  if ( localStorage.getItem('transactions') === null ){
    localStorage.setItem(
      'transactions', JSON.stringify([
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
      ])
    );
  }

});
</script>

<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<style>
  * {
    transition: background-color 0.8s ease, color 0.8s ease;
  }
</style>
