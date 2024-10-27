<script setup>
import { useAppStore } from '@/stores/store';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const goToRoute = (route) => {
  router.push(route);
};

const appStore = useAppStore();

const router = useRouter();
const email = ref('');
const isLoading = ref(false);

const rules = {
  required: value => !!value || 'Campo requerido',
  email: value => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(value) || 'Correo electrónico inválido';
  }
};

const recoverPassword = async () => {
  if (email.value){
    isLoading.value = true;
    try {
      console.log('Sending recovery email to:', email.value);
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('Se ha enviado un correo de recuperación. Por favor, revise su bandeja de entrada.');
      router.push('/sign-in');
    } catch (error) {
      console.error('Error al enviar el correo de recuperación:', error);
      alert('Hubo un error al enviar el correo de recuperación. Por favor, intente nuevamente.');
    } finally {
      isLoading.value = false;
    }
  }
  
};
</script>

<template>
  <v-container v-if="appStore.getId() >= 0" class="fill-height" fluid>
    <v-row class="align-start justify-center" style="margin-top: 20px;">
      <v-col cols="11" sm="11" md="5" lg="4" xl="4">
        <v-card 
          class="bg-tertiary elevation-7 w-100 mb-2 pa-2"
          flat
          elevation="0"
        >
          <div class="d-flex flex-column align-center">
            <h1 class="text-h5 font-weight-medium mb-1">Recuperar contraseña</h1>
            <v-divider class="primary" width="32" thickness="2"></v-divider>
          </div>
        </v-card>
        <v-card class="elevation-7 w-100 pa-4 mb-4">
          <v-form @submit.prevent="recoverPassword" class="recover-form">
            <v-text-field
              v-model="email"
              label="Correo electrónico"
              prepend-inner-icon="mdi-email"
              density="compact"
              :rules="[rules.required, rules.email]"
            ></v-text-field>
            <v-btn
              type="submit"
              color="primary"
              block
              :loading="isLoading"
            >
              Enviar correo de recuperación
            </v-btn>
            <div class="w-100 pa-2 text-center">
              ¿Recordaste tu contraseña? 
              <router-link to="/sign-in" class="text-primary">Iniciar sesión</router-link>
            </div>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <template v-else-if="goToRoute({ name: 'signIn' })"/>
</template>

<style scoped>
.recover-form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.v-text-field .v-input__details {
  display: none;
}

.v-text-field {
  margin-bottom: 0.5rem;
}

.v-btn {
  text-transform: none;
  font-weight: 500;
}
</style>
