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
        
        console.log('Card Type:', type); // Debugging log
        return type;
    }

    function getCardColor(cardType) {
        switch (cardType) {
            case 'Visa': return 'green darken-3';
            case 'Mastercard': return 'orange darken-3';
            case 'American Express': return 'blue-grey darken-3';
            default: return 'grey darken-3';
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
    <ButtonsNavBarWithBack/>
    
    <BodyGrid>
      <AppDivision class="ma-4" cols="12" sm="10" md="8" lg="6">
        <Section class="ma-3">
          <v-container class="inside-section">
            <h1 class="text-h4 mb-6 text-center">Añadir metodo de pago</h1>
            
            <div class="card-container mb-6">
              <div class="card-wrapper" :class="{ 'is-flipped': showBack }">
                <v-card rounded="lg" class="card-face card-front">
                  <v-form ref="form" class="d-flex flex-column justify-center align-center h-100">
                    <v-container class="w-100 h-25 pa-0 h-25">
                      <v-img
                        width="100"
                        src="@/assets/smart-chip.png"
                      />
                    </v-container>
                    <v-container class="py-2 w-100 h-25">
                        <v-text-field
                          rounded="sm"
                          placeholder="Numero de la tajeta"
                          v-model="formattedCardNumber"
                          variant="outlined"
                          class="input-field"
                          :rules="[rules.required, rules.cardNumber]"
                          bg-color="white"
                          density="compact"
                          clearable
                          @input="updateCardNumber"
                          maxlength="19"
                        />
                    </v-container>
                    
                    <v-container class="d-flex flex-row justify-center align-center py-0 px-1 w-100 h-25">
                        <v-col cols="6" class="d-flex flex-column justify-start">
                          <v-text-field
                            rounded="sm"
                            placeholder="Nombre y Apellido"
                            v-model="formattedCardholderName"
                            variant="outlined"
                            :rules="[rules.required, rules.cardholderName]"
                            bg-color="white"
                            hide-details
                            density="compact"
                            clearable
                            @keypress="onlyText"
                          />
                        </v-col>
                        <v-col cols="3">
                          <v-select
                            rounded="sm"
                            v-model="expirationMonth"
                            :items="months"
                            label="Mes"
                            bg-color="white"
                            hide-details
                            density="compact"
                            :rules="[rules.required]"
                          />
                        </v-col>
                        <v-col cols="3">
                          <v-select
                            rounded="sm"
                            v-model="expirationYear"
                            :items="years"
                            label="Años"
                            bg-color="white"
                            hide-details
                            density="compact"
                            :rules="[rules.required]"
                          />
                        </v-col>
                    </v-container>

                    <v-contianer class="d-flex flex-row justify-end w-100 h-25">
                      <v-img
                        v-if="cardNumber.length > 0"
                        :src="cardLogo"
                        max-width="60"
                        contain
                        class="card-logo"
                      ></v-img>
                    </v-contianer>
                  </v-form>
                </v-card>
                <v-card rounded="lg" class="card-face card-back">
                  <div class="card-content">
                    <div class="cvv-strip"></div>
                    <div class="cvv-container">
                      <v-text-field
                        placeholder="CVV"
                        v-model="cvv"
                        variant="outlined"
                        class="cvv-input"
                        :rules="[rules.required, rules.cvv]"
                        bg-color="white"
                        hide-details
                        density="compact"
                        type="password"
                        inputmode="numeric"
                        maxlength="3"
                        @input="validateCVV"
                      ></v-text-field>
                    </div>
                  </div>
                </v-card>
              </div>
            </div>

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
  perspective: 1000px;
  width: 100%;
  max-width: 450px;
  height: 250px;
  margin: 0 auto;
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
</style>




