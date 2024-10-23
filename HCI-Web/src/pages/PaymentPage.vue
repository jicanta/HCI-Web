<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import AppDivision from '@/components/AppDivision.vue';
import BodyGrid from '@/components/BodyGrid.vue';
import Section from '@/components/Section.vue';
import ButtonsNavBarWithBack from '@/components/ButtonsNavBarWithBack.vue';
import { usePaymentMethodsStore } from '@/stores/paymentMethodsStore';

const router = useRouter();
const paymentMethodsStore = usePaymentMethodsStore();

const productName = ref('Product XYZ');
const productPrice = ref(100.00);
const availableBalance = ref(150.00);

const selectedPaymentMethod = ref('balance');
const paymentMethods = computed(() => [
  { id: 'balance', name: 'Available Balance', amount: availableBalance.value },
  ...paymentMethodsStore.paymentMethods
]);

const isPaymentValid = computed(() => {
  if (selectedPaymentMethod.value === 'balance') {
    return availableBalance.value >= productPrice.value;
  }
  return true; // Assume credit cards always have sufficient funds
});

const handlePayment = () => {
  if (isPaymentValid.value) {
    // Process payment logic here
    alert('Payment successful!');
    router.push('/');
  } else {
    alert('Insufficient funds. Please choose another payment method.');
  }
};

const sections = [
  {text: "Inicio", icon: "mdi-home", selected: false, route: "/"}, 
  {text: "Movimientos", icon: "mdi-history", selected: false, route: "/movements"}, 
  {text: "Medios de pago", icon: "mdi-credit-card-outline", selected: false, route: "/payment-methods"}, 
  {text: "Invertir", icon: "mdi-cash-plus", selected: false, route: "/invest"}
];
</script>

<template>
  <main class="main-container bg-background">
    <ButtonsNavBarWithBack :link-back="'/'"/>
    
    <BodyGrid>
      <AppDivision class="ma-4" :cols="12" :sm="10" :md="8" :lg="6">
        <Section class="ma-3">
          <div class="inside-section">
            <h2 class="text-h5 mb-4">Pagar {{ productName }}</h2>
            
            <div class="mb-4 pa-4 card">
              <div class="card-text">
                <p class="text-h6">Monto a pagar: ${{ productPrice.toFixed(2) }}</p>
              </div>
            </div>

            <h3 class="text-h6 mb-2">Seleccionar método de pago</h3>
            <div class="radio-group">
              <div
                v-for="method in paymentMethods"
                :key="method.id"
                class="radio-item"
              >
                <input
                  type="radio"
                  :id="method.id"
                  :value="method.id"
                  v-model="selectedPaymentMethod"
                  :name="'payment-method'"
                />
                <label :for="method.id">
                  {{ method.type ? `${method.type} (•••• ${method.lastFour})` : `${method.name} ($${method.amount.toFixed(2)})` }}
                </label>
              </div>
            </div>

            <button
              class="primary-btn mt-4"
              :disabled="!isPaymentValid"
              @click="handlePayment"
            >
              Pagar ${{ productPrice.toFixed(2) }}
            </button>
          </div>
        </Section>
      </AppDivision>
    </BodyGrid>
  </main>
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
  justify-content: flex-start;
  align-items: stretch;
}

:deep(.v-btn) {
  text-transform: none;
  font-weight: bold;
  font-size: 1rem;
  letter-spacing: normal;
}

.primary-btn {
  text-transform: none;
  font-weight: bold;
  font-size: 1rem;
  letter-spacing: normal;
}

.card {
  border: 1px solid #ccc;
  border-radius: 4px;
}

.radio-group {
  display: flex;
  flex-direction: column;
}

.radio-item {
  margin-bottom: 8px;
}
</style>
