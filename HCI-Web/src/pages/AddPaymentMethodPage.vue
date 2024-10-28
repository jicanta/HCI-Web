<script setup>
    import { ref, computed } from 'vue';
    import { useRouter } from 'vue-router';
    import { useAppStore } from '@/stores/store';

    // Import the logo images
    import visaLogo from '@/assets/visa-logo.png';
    import mastercardLogo from '@/assets/mastercard-logo.png';
    import amexLogo from '@/assets/amex-logo.png';
    import smartChip from '@/assets/smart-chip.png';

    const router = useRouter();
    const appStore = useAppStore();
    const cardNumber = ref('');
    const expirationYear = ref('');
    const expirationMonth = ref('');
    const cvv = ref('');
    const cardholderName = ref('');

    const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    const years = ["24","25","26","27","28","29"];

    const goToRoute = (route) => {
      router.push(route);
    };

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

    // Add this computed property to check if the first page is valid
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
        showSuccessDialog.value = true;
        
        appStore.addCreditCard(cardNumber.value, cardholderName.value, cvv.value);
        
        setTimeout(() => {
            showSuccessDialog.value = false;
            router.push({ name: 'paymentMethods'});
        }, 2000);
    };

    function getCardType(cardNumber) {
        let type;
        if (cardNumber.startsWith('34') || cardNumber.startsWith('37')) type = 'American Express';
        else if (cardNumber.startsWith('4')) type = 'Visa';
        else if (cardNumber.startsWith('5')) type = 'Mastercard';
        else type = 'Unknown';
        
        return type;
    }

    function getCardColor(cardType) {
        switch (cardType) {
            case 'Visa': return 'black darken-3';
            case 'Mastercard': return 'blue darken-1';
            case 'American Express': return 'orange-darken-3';
            default: return 'grey darken-3';
        }
    }

    const formattedCardNumber = computed(() => {
      const groups = cardNumber.value.match(/\d{1,4}/g) || [];
      return groups.join(' ');
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

    const showSuccessDialog = ref(false);
</script>

<template>
  <v-main v-if="appStore.getId() >= 0" class="main-container" fluid>
    <ButtonsNavBarWithBack link_back="/payment-methods"/>
    
    <BodyGrid>
      <AppDivision class="ma-4" cols="12" sm="10" md="8" lg="6">
        <Section class="ma-3">
          <v-container class="inside-section">
            <v-card 
          class="bg-tertiary elevation-7 w-100 mb-2 pa-2"
          flat
          elevation="0"
        >
          <div class="d-flex flex-column align-center">
            <h1 class="text-h5 font-weight-medium mb-1">Agregar método de pago</h1>
            <v-divider class="primary" width="32" thickness="2"></v-divider>
          </div>
        </v-card>
            <div class="card-container mb-6">
              <div class="card-wrapper" :class="{ 'is-flipped': showBack }">
                <v-card color="black" rounded="lg" class="card-face card-front elevation-7">
                  <v-form ref="form" class="card-content">
                    <div class="justify-start">
                    <v-img
                      width="60"
                      :src="smartChip"
                    ></v-img>
                    </div>
                    <div class="mb-2 mt-8">
                    <v-text-field
                      placeholder="Numero de la tajeta"
                      v-model="formattedCardNumber"
                      variant="outlined"
                      class="input-field"
                      :rules="[rules.required, rules.cardNumber]"
                      bg-color="rgba(255, 255, 255, 0.5)"
                      hide-details
                      density="compact"
                      clearable
                      @input="updateCardNumber"
                      maxlength="19"
                      inputmode="numeric"
                      @keypress="onlyNumbers"
                    ></v-text-field>
                  </div>
                  <div class="d-flex justify-end mb-2">
                      <div class="d-flex justify-space-between">
                        <v-select
                          v-model="expirationMonth"
                          :items="months"
                          variant="outlined"
                          placeholder="Mes"
                          bg-color="rgba(255, 255, 255, 0.5)"
                          density="compact"
                          class="expiration-select mr-1"
                          :rules="[rules.required]"
                          hide-details
                          style="margin-bottom: 0;"
                        ></v-select>
                        <v-select
                          v-model="expirationYear"
                          :items="years"
                          variant="outlined"
                          placeholder="Año"
                          bg-color="rgba(255, 255, 255, 0.5)"
                          density="compact"
                          class="expiration-select ml-1"
                          :rules="[rules.required]"
                          hide-details
                          style="margin-bottom: 0;"
                        ></v-select>
                      </div>
                    </div>
                  <v-row class="mb-2 d-flex justify-space-between align-center">
                    <v-col >
                    <div class="input-container mb-2">
                      <v-text-field
                        placeholder="Nombre y Apellido"
                        v-model="formattedCardholderName"
                        variant="outlined"
                        class="name-container"
                        :rules="[rules.required, rules.cardholderName]"
                        bg-color="rgba(255, 255, 255, 0.5)"
                        hide-details
                        density="compact"
                        clearable
                        @keypress="onlyText"
                      ></v-text-field>
                    </div>
                    </v-col>
                    <v-col >
                      <div v-if="cardNumber.length > 0" class="card-logo-container mb-2">
                        <v-img
                          :src="cardLogo"
                          width="40"
                          class="card-logo"
                        ></v-img>
                      </div>
                    </v-col>
                  </v-row>
                  </v-form>
                </v-card>
                <v-card color="error" rounded="lg" class="card-face card-back elevation-7">
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
  <template v-else-if="goToRoute({ name: 'signIn' })"/>
  

  <v-dialog v-model="showSuccessDialog" max-width="400px" persistent>
    <v-card class="elevation-7">
      <v-card-title class="text-h5 text-center text-success">
        Método de pago agregado
      </v-card-title>
      <v-card-text class="text-center">
        ¡La tarjeta se ha agregado exitosamente!
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn color="success" @click="showSuccessDialog = false">
          Entendido
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
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
  perspective: 1000px;
  width: 100%;
  max-width: 450px;

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


.card-wrapper.is-flipped .card-front {
  z-index: 1;
}

.card-wrapper.is-flipped .card-back {
  z-index: 2;
}


.card-back .card-content {
  opacity: 0;
  transition: opacity 0.3s;
}

.card-wrapper.is-flipped .card-back .card-content {
  opacity: 1;
}


.card-logo-container {
  display: flex;
  justify-content: right;
  align-items: center;
}

.card-logo {
  max-width: 65px;
  max-height: 100%;
  object-fit: contain;
}

.name-container{
  width: 110%;
  align-items: center;
}
</style>




