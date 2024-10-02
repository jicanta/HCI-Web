<template>
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>Balance</v-card-title>
            <v-card-text>
              <h2 class="text-h4">${{ balance.toFixed(2) }}</h2>
            </v-card-text>
          </v-card>
  
          <v-card class="mb-4">
            <v-card-title>Recent Transactions</v-card-title>
            <v-list>
              <v-list-item v-for="transaction in recentTransactions" :key="transaction.id">
                <v-list-item-title>{{ transaction.description }}</v-list-item-title>
                <v-list-item-subtitle>
                  {{ transaction.amount > 0 ? '+' : '-' }}${{ Math.abs(transaction.amount).toFixed(2) }}
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
  
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title>Spending by Category</v-card-title>
            <v-card-text>
              <v-chart class="chart" :option="chartOption" />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { use } from 'echarts/core';
  import { CanvasRenderer } from 'echarts/renderers';
  import { PieChart } from 'echarts/charts';
  import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components';
  import VChart from 'vue-echarts';
  
  use([CanvasRenderer, PieChart, TitleComponent, TooltipComponent, LegendComponent]);
  
  const balance = ref(1250.75);
  
  const recentTransactions = ref([
    { id: 1, description: 'Grocery Shopping', amount: -75.50, category: 'Food' },
    { id: 2, description: 'Salary Deposit', amount: 2000.00, category: 'Income' },
    { id: 3, description: 'Electric Bill', amount: -120.00, category: 'Utilities' },
    { id: 4, description: 'Online Purchase', amount: -50.25, category: 'Shopping' },
    { id: 5, description: 'Restaurant Dinner', amount: -85.00, category: 'Food' },
  ]);
  
  const spendingByCategory = computed(() => {
    const categories = {};
    recentTransactions.value.forEach(transaction => {
      if (transaction.amount < 0) {
        if (categories[transaction.category]) {
          categories[transaction.category] += Math.abs(transaction.amount);
        } else {
          categories[transaction.category] = Math.abs(transaction.amount);
        }
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
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '18',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: spendingByCategory.value
      }
    ]
  }));
  </script>
  
  <style scoped>
  .chart {
    height: 400px;
  }
  </style>