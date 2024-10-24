<script setup lang="js">
import { ref } from 'vue';
import AppDivision from '@/components/AppDivision.vue';
import AppHeaderSecondaryScreen from '@/components/AppHeaderSecondaryScreen.vue';
import BodyGrid from '@/components/BodyGrid.vue';
import Section from '@/components/Section.vue';
import AppHeaderPrimaryScreen from '@/components/AppHeaderPrimaryScreen.vue';
import ButtonsNavBarWithBack from '@/components/ButtonsNavBarWithBack.vue';

const pesos = 25761;
const centavos = 57;

const sections = [
      {text: "Inicio", icon: "mdi-home", selected: false, route: "home"}, 
      {text: "Movimientos", icon: "mdi-history", selected: false, route: "movements"}, 
      {text: "Medios de pago", icon: "mdi-credit-card-outline", selected: false, route: "paymentMethods"}, 
      {text: "Invertir", icon: "mdi-cash-plus", selected: false, route: "invest"}
    ]

const saldo = ref('');
const descripcion = ref('');
const showDialog = ref(false);
const paymentLink = ref('');
const copySuccess = ref(false);

const generatePaymentLink = () => {
  // Generate a random payment link
  const randomString = Math.random().toString(36).substring(7);
  paymentLink.value = `https://payment.example.com/${randomString}`;
  showDialog.value = true;
  copySuccess.value = false;
};

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(paymentLink.value);
    copySuccess.value = true;
    setTimeout(() => {
      copySuccess.value = false;
    }, 2000);
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
};
  
</script>

<template>
  <v-main class="main-container bg-background" fluid>
    <ButtonsNavBarWithBack link_back="/"/>
    <BodyGrid>
      <AppDivision class="ma-4" cols="12" sm="10" md="10" lg="4">
        <Section class="ma-3">
          <v-container class="inside-section">
            <h2 class="text-h5 mb-4">Depositar dinero</h2>
            <p>Saldo actual: ${{ pesos }}.{{ centavos }}</p>
            <v-text-field
              v-model="saldo"
              label="Agregar saldo"
              prefix="$"
              type="number"
              variant="outlined"
              class="mb-4"
            ></v-text-field>
            <v-text-field
              v-model="descripcion"
              label="Agregar descripción"
              variant="outlined"
              class="mb-4"
            ></v-text-field>
            <v-btn
              color="primary"
              block
              x-large
              class="mt-4"
              style="height: 50px; text-transform: none;"
              @click="generatePaymentLink"
            >
              GENERAR
            </v-btn>
          </v-container>
        </Section>
      </AppDivision>
    </BodyGrid>

    <!-- Payment Link Dialog -->
    <v-dialog v-model="showDialog" max-width="400px">
      <v-card>
        <v-card-title class="text-h5">
          Link de Pago Generado
        </v-card-title>
        <v-card-text>
          <p>Su link de pago es:</p>
          <v-text-field
            :value="paymentLink"
            readonly
            variant="outlined"
            class="mt-2"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="copyToClipboard">
            {{ copySuccess ? 'Copiado!' : 'Copiar' }}
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="showDialog = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-main>
</template>

<style>
.v-field__outline__start {
  border-radius: 8px 0 0 8px;
}

.v-field__outline__end {
  border-radius: 0 8px 8px 0;
}

.v-btn {
  text-transform: none;
  font-weight: bold;
  font-size: 1rem;
  letter-spacing: normal;
}
</style>
