<script setup>
  import { ref, computed, onMounted } from 'vue';
  import ListItem from '@/components/ListItem.vue';
  import ButtonsNavBar from '@/components/ButtonsNavBar.vue';
  import { useAppStore } from '@/stores/store';

  const appStore = useAppStore();

  const sections = [
    { text: "Inicio", icon: "mdi-home", selected: false, route: "home" },
    { text: "Movimientos", icon: "mdi-history", selected: true, route: "movements" },
    { text: "Medios de pago", icon: "mdi-credit-card-outline", selected: false, route: "paymentMethods" },
    { text: "Invertir", icon: "mdi-cash-plus", selected: false, route: "invest" }
  ];

  const transactions = ref([]);

  onMounted(
    () => {
      transactions.value = appStore.getCurrentUser().payments
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
  <ButtonsNavBar :sections="sections" />
  <v-row class="w-100 h-100 d-flex justify-center" style="margin-top: 106px;" fluid>
    <v-col cols="11" sm="11" md="5" lg="4" xl="4" class="d-flex flex-column align-center justify-start">


      <v-card 
          class="bg-tertiary elevation-7 w-100 mb-2 pa-2"
          flat
          elevation="0"
        >
          <div class="d-flex flex-column align-center">
            <h1 class="text-h5 font-weight-medium mb-1">Movimientos</h1>
            <v-divider class="primary" width="32" thickness="2"></v-divider>
          </div>
        </v-card>

      <v-card 
        class="bg-tertiary elevation-7 w-100 my-4"
      >
        <v-card-text>
          <template v-if="transactions === null || transactions.length === 0">
            <p class="text-muted text-center">No hay movimientos.</p>
          </template>

          <template v-else>
            <v-list class="pa-0">  <!--TODO: hay que arreglar la pagina esta, ya me encargo yo.-->
              <ListItem
                v-for="transaction in paginatedTransactions"
                :key="transaction.id"
                :icon="transaction.amount > 0 ? 'mdi-cash-check' : 'mdi-cart'"
                :top="formatTransactionDate(transaction.date)"
                :title="transaction.name"
                :text="transaction.category"
                :right="transaction.amount.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })"
              />
            </v-list> 
          </template>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

        <v-pagination
          v-model="currentPage"
          :length="totalPages"
          :total-visible="6"
          color="colortext"
          class="my-4"
        />


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

  .v-list {
    background-color: transparent;
  }
</style>
