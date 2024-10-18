<script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';

    const router = useRouter();

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
      step.value = 2; // Cambia a mostrar solo el campo CVV
      console.log({
          cardNumber: cardNumber.value,
          expirationDate: expirationDate.value,
          cardholderName: cardholderName.value,
      });
    };

    const handleSubmit = () => {
        console.log('Payment method submitted', {
            cvv: cvv.value,
        });
        router.replace('/payment-methods');
    };

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
              class="mb-6 card-container" color="error" rounded="lg">
                <v-form class="d-flex flex-column justify-between" @submit.prevent="handleNext" v-if="step === 1">
                  <v-img
                  class="pa-0 ma-0"
                  width="50"
                  height="55"
                  src="@/assets/smart_chip.png"
                ></v-img>
                  <div class="input-container mb-4 mt-3 pt-5">
                    <v-text-field
                      placeholder="Numero de la tajeta"
                      v-model="cardNumber"
                      variant="outlined"
                      class="input-field"
                      :rules="[rules.required, rules.cardNumber]"
                      bg-color="white"
                      hide-details
                      density="compact"
                      clearable
                    ></v-text-field>
                  </div>
                  
                  <v-row class="d-flex justify-end pt-12">
                    <v-col cols="7">
                      <v-text-field
                      placeholder="Nombre y Apellido"
                      v-model="cardholderName"
                      variant="outlined"
                      class="input-field pt-2"
                      :rules="[rules.required]"
                      bg-color="white"
                      hide-details
                      density="compact"
                      clearable
                    ></v-text-field>
                    </v-col>
                    <v-col cols="5">
                      <div class="input-container mb-4">
                        <v-select
                          v-model="expirationMonth"
                          :items="months"
                          :label="expirationMonth == '' ? 'Mes' : ''"
                          bg-color="white"
                          density="compact"
                          class= "pr-1 pt-2 pb-1"
                          :rules="[rules.required]"
                        ></v-select>
                        <v-select
                          v-model="expirationYear"
                          :items= "years"
                          :label="expirationYear == '' ? 'Año' : ''"
                          bg-color="white"
                          density="compact"
                          class= "pr-1 pt-2 pb-1"
                          :rules="[rules.required]"
                        ></v-select>
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
                            bg-color="white"
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

  .input-selector{
    max-width: 50%;
   /* border: 2px solid #000; 
    border-radius: 4px; */
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
  width: 100%; /* Ancho del rectángulo */
  height: 65px; /* Alto del rectángulo */
  background-color: black; /* Color de fondo negro */
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