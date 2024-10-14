<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="elevation-12 pa-8">
          <v-card-title class="text-h4 mb-6 text-center">Iniciar sesión</v-card-title>
          <v-form @submit.prevent="handleSubmit">
            <v-text-field
              v-model="email"
              label="Email"
              prepend-inner-icon="mdi-account"
              variant="outlined"
              class="mb-4"
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Contraseña"
              prepend-inner-icon="mdi-lock"
              :type="showPassword ? 'text' : 'password'"
              :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="showPassword = !showPassword"
              variant="outlined"
              class="mb-6"
            ></v-text-field>
            <v-btn
              type="submit"
              color="primary"
              block
              size="large"
              class="mb-4"
            >
              Ingresar
            </v-btn>
          </v-form>
          <v-card-text class="text-center">
            ¿No tiene una cuenta? 
            <router-link to="/sign-up" class="text-primary">Registrarse</router-link>
          </v-card-text>
          <v-card-text class="text-center text-caption">
            <router-link to="/recover-password" class="text-primary text-decoration-none">
              Olvidé mi contraseña
            </router-link>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const showPassword = ref(false);
const router = useRouter();

const handleSubmit = () => {
  // aca iria la logica con su API
  console.log('Sign in attempt', { username: username.value, password: password.value });
  
  router.push('/');
};
</script>

