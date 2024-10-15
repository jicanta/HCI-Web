<script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';

    const router = useRouter();

    const cardNumber = ref('');
    const expirationDate = ref('');
    const cvv = ref('');
    const cardholderName = ref('');

    const rules = {
        required: (value) => !!value || 'Campo requerido',
        cardNumber: (value) => /^\d{16}$/.test(value) || 'Número de tarjeta inválido',
        expirationDate: (value) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(value) || 'Formato inválido (MM/YY)',
        cvv: (value) => /^\d{3,4}$/.test(value) || 'CVV inválido',
    };

    const handleSubmit = () => {
        console.log('Payment method submitted', {
            cardNumber: cardNumber.value,
            expirationDate: expirationDate.value,
            cvv: cvv.value,
            cardholderName: cardholderName.value,
        });
        router.replace('/payment-methods');
    };
</script>

<template>
    <v-main class="main-container bg-background" fluid>
      <ButtonsNavBarWithBack link_back="/payment-methods"/>
      
      <BodyGrid>
        <AppDivision class="ma-4" cols="12" sm="10" md="8" lg="6">
          <Section class="ma-3">
            <v-container class="inside-section">
              <h1 class="text-h4 mb-6 text-center">Añadir metodo de pago</h1>
              
              <v-card class="pa-6 mb-6 card-container" color="error" rounded="lg">
                <v-form @submit.prevent="handleSubmit">
                  <div class="input-container mb-4">
                    <label class="input-label">Numero de la tarjeta</label>
                    <v-text-field
                      v-model="cardNumber"
                      variant="outlined"
                      class="input-field"
                      :rules="[rules.required, rules.cardNumber]"
                      bg-color="white"
                      hide-details
                    ></v-text-field>
                  </div>
                  
                  <v-row>
                    <v-col cols="6">
                      <div class="input-container mb-4">
                        <label class="input-label">Vencimiento</label>
                        <v-text-field
                          v-model="expirationDate"
                          variant="outlined"
                          class="input-field"
                          :rules="[rules.required, rules.expirationDate]"
                          bg-color="white"
                          hide-details
                        ></v-text-field>
                      </div>
                    </v-col>
                    <v-col cols="6">
                      <div class="input-container mb-4">
                        <label class="input-label">CVV</label>
                        <v-text-field
                          v-model="cvv"
                          variant="outlined"
                          class="input-field"
                          :rules="[rules.required, rules.cvv]"
                          type="password"
                          bg-color="white"
                          hide-details
                        ></v-text-field>
                      </div>
                    </v-col>
                  </v-row>
                  
                  <div class="input-container mb-4">
                    <label class="input-label">Nombre y apellido</label>
                    <v-text-field
                      v-model="cardholderName"
                      variant="outlined"
                      class="input-field"
                      :rules="[rules.required]"
                      bg-color="white"
                      hide-details
                    ></v-text-field>
                  </div>
                </v-form>
              </v-card>
              
              <v-btn
                @click="handleSubmit"
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
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
  }
  
  .input-container {
    display: flex;
    flex-direction: column;
  }
  
  .input-label {
    font-size: 14px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.6);
    margin-bottom: 4px;
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
</style>