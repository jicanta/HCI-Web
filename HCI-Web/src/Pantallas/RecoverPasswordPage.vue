<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

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
  isLoading.value = true;
  try {
    // Implement password recovery logic here
    // For example, call an API to send a recovery email
    console.log('Sending recovery email to:', email.value);
    // Simulating API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    alert('Se ha enviado un correo de recuperación. Por favor, revise su bandeja de entrada.');
    router.push('/sign-in');
  } catch (error) {
    console.error('Error al enviar el correo de recuperación:', error);
    alert('Hubo un error al enviar el correo de recuperación. Por favor, intente nuevamente.');
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="elevation-12 pa-8">
          <v-card-title class="text-h5 mb-6 text-center">Recuperar contraseña</v-card-title>
          <v-form @submit.prevent="recoverPassword">
            <v-text-field
              v-model="email"
              label="Correo electrónico"
              prepend-inner-icon="mdi-email"
              variant="outlined"
              class="mb-4"
              :rules="[rules.required, rules.email]"
            ></v-text-field>
            <v-btn
              type="submit"
              color="primary"
              block
              size="large"
              class="mb-4"
              :loading="isLoading"
            >
              Enviar correo de recuperación
            </v-btn>
          </v-form>
          <v-card-text class="text-center">
            <router-link to="/sign-in" class="text-primary">Volver al inicio de sesión</router-link>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
