<script setup>
  import AppDivision from '@/components/AppDivision.vue';
  import { ref, computed, onMounted } from 'vue';
  import BodyGrid from '@/components/BodyGrid.vue';
  import Section from '@/components/Section.vue';
  import ListItem from '@/components/ListItem.vue';
  import ButtonsNavBar from '@/components/ButtonsNavBar.vue';

  const sections = [
    { text: "Inicio", icon: "mdi-home", selected: false, route: "home" },
    { text: "Movimientos", icon: "mdi-history", selected: true, route: "movements" },
    { text: "Medios de pago", icon: "mdi-credit-card-outline", selected: false, route: "paymentMethods" },
    { text: "Invertir", icon: "mdi-cash-plus", selected: false, route: "invest" }
  ];

  const transactions = ref([]);

  onMounted(
    () => {
      transactions.value = JSON.parse(localStorage.getItem("transactions")).reverse();
    }
  );

  const itemsPerPage = 7;
  const currentPage = ref(1);

  const totalPages = computed(() => {
    return Math.ceil(transactions.value.length / itemsPerPage);
  });

  const paginatedTransactions = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return transactions.value.slice(start, end);
  });

  import { formatTransactionDate } from '@/back-libs/date';
</script>

<template>
  <v-main class="bg-background d-flex flex-column align-center w-100" fluid>
    <ButtonsNavBar :sections="sections" />
    <BodyGrid>
      <AppDivision class="ma-4" cols="12" sm="10" md="10" lg="4">
        <Section class="list d-flex flex-column justify-start h-100 ma-3">
          <template v-if="transactions === null || transactions.length === 0">
            <p class="text-muted text-center">No hay movimientos.</p>
          </template>

          <template v-else>
            <h2 class="text-h3 mb-4">Movimientos</h2>
            <ListItem
            v-for="transaction in paginatedTransactions"
            :key="transaction.id"
            :icon="transaction.amount > 0 ? 'mdi-cash-check' : 'mdi-cart'"
            :top="formatTransactionDate(transaction.date)"
            :title="transaction.description"
            :text="transaction.category"
            :right="transaction.amount.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })"
          />
          </template>
          
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

  </style>
