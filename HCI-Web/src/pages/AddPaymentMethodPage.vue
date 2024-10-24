<script setup>
    import { ref, computed } from 'vue';
    import { useRouter } from 'vue-router';
    import { usePaymentMethodsStore } from '@/stores/paymentMethodsStore';

    // Import the logo images
    import visaLogo from '@/assets/visa-logo.png';
    import mastercardLogo from '@/assets/mastercard-logo.png';
    import amexLogo from '@/assets/amex-logo.png';
    import smartChip from '@/assets/smart-chip.png';
    import ButtonsNavBarWithBack from '@/components/ButtonsNavBarWithBack.vue';

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
        cardNumber: (value) => {
            const digitsOnly = value.replace(/\D/g, '');
            return digitsOnly.length === 16 || 'El número de tarjeta debe tener 16 dígitos';
        },
        expirationDate: (value) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(value) || 'Formato inválido (MM/YY)',
        cvv: (value) => value.length === 3 || 'CVV debe tener 3 dígitos',
        cardholderName: (value) => /^[a-zA-Z\s]*$/.test(value) || 'Solo se permiten letras y espacios',
    };

    const step = ref(1);

    const form = ref(null);

    const isFirstPageValid = computed(() => {
      return (
        cardNumber.value.length === 16 &&
        cardholderName.value.trim().length > 0 &&
        expirationMonth.value &&
        expirationYear.value &&
        !form.value?.validate().length
      );
    });

    const showBack = ref(false);

    const handleNext = () => {
      if (!showBack.value) {
        if (isFirstPageValid.value) {
          showBack.value = true;
        }
      } else {
        handleSubmit();
        console.log('Form submitted');
      }
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
        let type;
        if (cardNumber.startsWith('34') || cardNumber.startsWith('37')) type = 'American Express';
        else if (cardNumber.startsWith('4')) type = 'Visa';
        else if (cardNumber.startsWith('5')) type = 'Mastercard';
        else type = 'Unknown';
        
        console.log('Card Type:', type);
        return type;
    }

    function getCardColor(cardType) {
        switch (cardType) {
            case 'Visa': return 'visa-card';
            case 'Mastercard': return 'master-card';
            case 'American Express': return 'american-card';
            default: return 'defaulty-card';
        }
    }

    const formattedCardNumber = computed(() => {
      const groups = cardNumber.value.match(/\d{1,4}/g) || [];
      return groups.join('-');
    });

    const onlyNumbers = (event) => {
      const charCode = event.which ? event.which : event.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        event.preventDefault();
      }
    };

    const formattedCardholderName = computed({
      get: () => cardholderName.value,
      set: (value) => {
        cardholderName.value = value.replace(/\d/g, '').slice(0, 50);
      }
    });

    const onlyText = (event) => {
      const charCode = event.which ? event.which : event.keyCode;
      if ((charCode >= 48 && charCode <= 57) || charCode === 46) {
        event.preventDefault();
      }
    };

    const formattedCVV = computed({
      get: () => cvv.value,
      set: (value) => {
        const numericValue = value.replace(/\D/g, '');
        const maxLength = getCardType(cardNumber.value) === 'American Express' ? 4 : 3;
        cvv.value = numericValue.slice(0, maxLength);
      }
    });

    const onlyNumbersCVV = (event) => {
      const charCode = event.which ? event.which : event.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        event.preventDefault();
      }
    };

    const cardType = computed(() => getCardType(cardNumber.value));

    const cardLogo = computed(() => {
      if (cardNumber.value.length === 0) return null;
      
      switch (cardType.value) {
        case 'Visa':
          return visaLogo;
        case 'Mastercard':
          return mastercardLogo;
        case 'American Express':
          return amexLogo;
        default:
          return null;
      }
    });

    const validateCVV = (event) => {
      cvv.value = cvv.value.replace(/\D/g, '').slice(0, 3);
    };

    const updateCardNumber = (event) => {
      const cleaned = event.target.value.replace(/\D/g, '');
      cardNumber.value = cleaned.slice(0, 16);
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
              
              <v-card :class="['card-wrapper', { 'is-flipped': showBack }]" color="primary" rounded="lg">
                <div class="card-front">
                <v-form class="d-flex flex-column justify-between" @submit.prevent="handleNext" v-if="step === 1">
                  <v-img
                  width="130"
                  :src="smartChip"
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
                    <v-col cols="6" class="d-flex justify-end aligned-right">
                        <v-img
                          height="80"
                          :src="cardLogo"
                        ></v-img>
                    </v-col>
                  </v-row>
                </v-form>
                </div>
                <Transition>
                  <div class="card-back">
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
                </div>
              </Transition>
              </v-card>
              
              <v-btn
              @click="handleNext"
              color="secondary"
              block
              size="large"
              class="mt-4"
              :disabled="!isFirstPageValid"
            >
              {{ showBack ? 'Confirmar' : 'Siguiente' }}
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

  .card-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.card-wrapper.is-flipped {
  transform: rotateY(180deg);
}

.card-face {
  background: linear-gradient(-45deg, black, rgb(85, 85, 85));
  width: 100%;
  height: 100%;
  position: absolute;
  padding: 25px;
  backface-visibility: visible;
}

.card-front {
  z-index: 2;
}

.card-back {
  transform: rotateY(180deg);
  z-index: 1;
}

.card-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.cvv-strip {
  width: 100%;
  height: 40px;
  background-color: #888;
  margin: 20px 0;
}

.cvv-container {
  width: 100%;
  max-width: 150px;
  align-self: flex-end;
  margin-top: auto;
}

.cvv-input {
  background-color: white;
  font-family: monospace;
}

/* Hide front content when flipped */
.card-wrapper.is-flipped .card-front {
  z-index: 1;
}

/* Ensure back content is visible and interactive when flipped */
.card-wrapper.is-flipped .card-back {
  z-index: 2;
}

/* Hide back content when not flipped */
.card-back .card-content {
  opacity: 0;
  transition: opacity 0.3s;
}

.card-wrapper.is-flipped .card-back .card-content {
  opacity: 1;
}

/* ... other styles ... */

.card-logo {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
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
      background-color: rgba(255, 255, 255, 0.5);
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