<script setup>
import { useRouter } from 'vue-router';
import AppHeaderSecondaryScreen from '@/components/AppHeaderSecondaryScreen.vue';
import BodyGrid from '@/components/BodyGrid.vue';
import AppDivision from '@/components/AppDivision.vue';
import Section from '@/components/Section.vue';
import ButtonsNavBarWithBack from '@/components/ButtonsNavBarWithBack.vue';
import { usePaymentMethodsStore } from '@/stores/paymentMethodsStore';
import { ref } from 'vue';
import visaLogo from '@/assets/visa-logo.png';
import mastercardLogo from '@/assets/mastercard-logo.png';
import amexLogo from '@/assets/amex-logo.png';

const router = useRouter();
const paymentMethodsStore = usePaymentMethodsStore();

const removePaymentMethod = (id) => {
  paymentMethodsStore.removePaymentMethod(id);
};

const isHovered = ref('false');

const addPaymentMethod = () => {
  router.push({ name: 'addPaymentMethod' });
};

const sections = [
  {text: "Inicio", icon: "mdi-home", selected: false, route: "home"}, 
  {text: "Movimientos", icon: "mdi-history", selected: false, route: "movements"}, 
  {text: "Medios de pago", icon: "mdi-credit-card-outline", selected: true, route: "paymentMethods"}, 
  {text: "Invertir", icon: "mdi-cash-plus", selected: false, route: "invest"}
]
const editState = ref(false);

function cardLogo(type){
    switch (type) {
        case 'Visa':
          return visaLogo;
        case 'Mastercard':
          return mastercardLogo;
        case 'American Express':
          return amexLogo;
        default:
          return null;
      }
};


</script>


<template>
  <v-main class="main-container bg-background">
    <ButtonsNavBar :sections="sections"/>
    
    <BodyGrid>
      <AppDivision class="ma-4" cols="12" sm="10" md="10" lg="4">
        <Section class="ma-3 d-flex align-start" height="500px">
          <v-container class="inside-section mb-auto">
            <v-row>
              <v-col cols="7">
                <h2 class="text-h5 mb-4">Tus Medios de Pago</h2>
              </v-col>
              <v-col cols="5">
                <div class="d-flex justify-end">
                  <v-btn 
                    class="rounded-xl"
                    @click="editState = !editState"
                  >
                  {{ editState ? 'Cancelar' : 'Editar' }}
                  </v-btn>          
                </div>
              </v-col>            
            </v-row>
            <v-list class="bg-tertiary">
              <v-list-item v-for="card in paymentMethodsStore.paymentMethods" :key="card.id" class="mb-2">
                <v-card 
                :key="card.id"
                class="rounded-card pa-0"  
                :class="{ 'hovered-card' : isHovered === card.id }"
                width="100%" 
                :color="card.color"
                @mouseover = "isHovered = card.id"
                @mouseleave = "isHovered = null">
                <component />
                  <v-card-text class="d-flex justify-space-between align-center pa-0">
                    <v-container>
                      <v-row class="align-center justify-space-between">
                        <v-col >
                          <div class="d-flex flex-column">
                            <div class="text-subtitle-1">{{ card.type }}</div>
                            <div>{{ card.number }}</div>
                          </div>
                        </v-col>

                        <v-col class="d-flex justify-end">
                          <v-img
                            :src="cardLogo(card.type)"
                            max-width="50"
                            contain
                            class="card-logo "
                          ></v-img>
                        </v-col>
                      </v-row>
                    </v-container>
                    <div class="pr-2">
                      <v-btn
                      v-if="editState"
                      icon
                      small
                      @click="removePaymentMethod(card.id)"
                      class="remove-btn"
                      >
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </div>
                  </v-card-text>
                </v-card>
              </v-list-item>
            </v-list>
            <v-btn
              color="primary"
              block
              class="mt-auto"
              @click="addPaymentMethod"
            >
              Agregar método de pago
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

.v-list-item {
  padding: 0;
}

.remove-btn {
  background-color: rgba(255, 255, 255, 0.2);
}

.card-logo {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.rounded-card{
  border-radius: 15px;
  height: 75px;
  transition: 0.4s;
}

/*.rounded-card:hover{
  height: 150px;
}*/

.hovered-card{
  height: 150px;
}

</style>
