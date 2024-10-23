<script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { usePaymentMethodsStore } from '@/stores/paymentMethodsStore';

    const router = useRouter();
    const paymentMethodsStore = usePaymentMethodsStore();

    const cardNumber = ref('');
    const expirationYear = ref('');
    const expirationMonth = ref('');
    const cvv = ref('');
    const cardholderName = ref('');

    const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    const years = ["24","25","26","27","28","29"];

    const rules = {
        required: (value) => !!value || 'Campo requerido',
        cardNumber: (value) => /^\d{16}$/.test(value) || 'Número de tarjeta inválido',
        expirationDate: (value) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(value) || 'Formato inválido (MM/YY)',
        cvv: (value) => /^\d{3,4}$/.test(value) || 'CVV inválido',
    };

    const step = ref(1);

    const handleNext = () => {
      step.value = 2;
    };

    const handleSubmit = () => {
        const newPaymentMethod = {
            type: getCardType(cardNumber.value),
            lastFour: cardNumber.value.slice(-4),
            color: getCardColor(getCardType(cardNumber.value))
        };
        paymentMethodsStore.addPaymentMethod(newPaymentMethod);
        router.replace('/payment-methods');
    };

    function getCardType(cardNumber) {
        // Implement logic to determine card type based on number
        // This is a simplified example
        if (cardNumber.startsWith('4')) return 'Visa';
        if (cardNumber.startsWith('5')) return 'Mastercard';
        if (cardNumber.startsWith('3')) return 'American Express';
        return 'Unknown';
    }

    function getCardColor(cardType) {
        switch (cardType) {
            case 'Visa': return 'green darken-3';
            case 'Mastercard': return 'orange darken-3';
            case 'American Express': return 'blue-grey darken-3';
            default: return 'grey darken-3';
        }
    }
</script>

<template>
    <v-main class="main-container" fluid>
      <ButtonsNavBarWithBack link_back="/payment-methods"/>
      
      <BodyGrid>
        <AppDivision class="ma-4" cols="12" sm="10" md="8" lg="6">
          <Section class="ma-3">
            <v-container class="inside-section">
              <h1 class="text-h4 mb-6 text-center">Añadir metodo de pago</h1>
              
              <v-card :class="{ 'pt-10': step===2, 'pa-6': step===1 }"
              class="mb-6 card-container" color="primary" rounded="lg">
                <v-form class="d-flex flex-column justify-between" @submit.prevent="handleNext" v-if="step === 1">
                  <v-img
                  width="130"
                  src="@/assets/smart_chip.png"
                  ></v-img>
                  <div class="input-container mb-4 mt-3 ">
                    <v-text-field
                      placeholder="Numero de la tajeta"
                      v-model="cardNumber"
                      variant="outlined"
                      class="input-field"
                      :rules="[rules.required, rules.cardNumber]"
                      bg-color= "rgba(255, 255, 255, 0.5)"
                      hide-details
                      density="compact"
                      clearable
                    ></v-text-field>
                  </div>
                  <v-row>
                    <v-col></v-col>
                    <v-col cols="3">
                        <v-select
                          placeholder="mes"
                          v-model="expirationMonth"
                          :items="months"
                          variant="outlined"
                          class="input-field pr-1 pt-2"
                          :rules="[rules.required]"
                          bg-color= "rgba(255, 255, 255, 0.5)"
                          hide-details
                          density="compact"
                        ></v-select>
                    </v-col>
                    <v-col cols="3">
                        <v-select
                          placeholder="mes"
                          v-model="expirationYear"
                          :items="years"
                          variant="outlined"
                          class="input-field pr-1 pt-2"
                          :rules="[rules.required]"
                          bg-color= "rgba(255, 255, 255, 0.5)"
                          hide-details
                          density="compact"
                        ></v-select>
                    </v-col>      
                  </v-row>
                  <v-row>
                    <v-col cols="6">
                      <v-text-field
                      placeholder="Nombre y Apellido"
                      v-model="cardholderName"
                      variant="outlined"
                      class="input-field"
                      :rules="[rules.required]"
                      bg-color= "rgba(255, 255, 255, 0.5)"
                      hide-details
                      density="compact"
                      clearable
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <div class="d-flex justify-end"> 
                        <v-img
                          v-if="getCardType(cardNumber) == 'Mastercard'" 
                          height="80"
                          src="@/assets/master_logo.png"
                        ></v-img>
                        <v-img
                          v-if="getCardType(cardNumber)== 'Visa'" 
                          height="40"
                          src="@/assets/visa_logo.png"
                        ></v-img>
                        <v-img
                          v-if="getCardType(cardNumber) == 'American Express'" 
                          height="60"
                          src="@/assets/amex_logo.png"
                        ></v-img>
                      </div>
                    </v-col>
                  </v-row>
                  <!--<div class="input-container mb-4">
                    <v-text-field
                      placeholder="Nombre y Apellido"
                      v-model="cardholderName"
                      variant="outlined"
                      class="input-field"
                      :rules="[rules.required]"
                      bg-color="white"
                      hide-details
                      density="compact"
                      clearable
                    ></v-text-field>
                  </div>
                -->
                </v-form>
                <Transition>
                  <v-form @submit.prevent="handleSubmit" v-if="step === 2">
                    <v-row>
                      <v-col cols="12">
                        <div class="magnetic-band"></div>
                      </v-col>
                    </v-row>
                    <v-row class="d-flex justify-end">
                      <v-col cols="3">
                        <div class="input-container mb-4">
                          <v-text-field
                            placeholder="CVV"
                            v-model="cvv"
                            variant="outlined"
                            class="input-field pr-6 pt-2"
                            :rules="[rules.required, rules.cvv]"
                            type="password"
                            bg-color= "rgba(255, 255, 255, 0.5)"
                            hide-details
                            density="compact"
                          ></v-text-field>
                        </div>
                      </v-col>
                    </v-row>
                  </v-form>
              </Transition>
              </v-card>
              
              <v-btn
                @click="handleNext"
                color="secondary"
                block
                size="large"
                class="mt-4"
              >
                Siguiente
              </v-btn>
            </v-container>
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
    justify-content: flex-start;
    align-items: stretch;
  }
  
  .card-container {
    aspect-ratio: 5/3;
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    display:flex;
    flex-direction: column;
  }


.card-sensor {
  width: 50px;
  height: 55px;
  background-color: yellowgreen;
  padding-bottom: 3px;
  border-radius: 4px;
}

.input-selector {
  max-width: 50%;
}

.input-container {
  display: flex;
  flex-direction: row;
}

.input-label {
  font-size: 14px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.6);
  margin-bottom: 4px;
}

.magnetic-band {
  width: 100%;
  height: 65px;
  background-color: black;
  margin-bottom: 10px;
  }

  :deep(.input-field) {
    .v-field__outline__start,
    .v-field__outline__end,
    .v-field__outline__notch::before,
    .v-field__outline__notch::after {
      opacity: 0.7;
      border-color: rgba(0, 0, 0, 0.38) !important;
    }
  
    .v-field__input {
      color: black !important;
      font-size: 16px;
      padding-top: 0;
    }
  
    &.v-text-field--focused {
      .v-field__outline__start,
      .v-field__outline__end,
      .v-field__outline__notch::before,
      .v-field__outline__notch::after {
        border-color: black !important;
        opacity: 1;
      }
    }
  }
  
  :deep(.v-col) {
    padding-top: 0;
    padding-bottom: 0;
  }

.v-enter-active,
.v-leave-active {
  transition: opacity 1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>

