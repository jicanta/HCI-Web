<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="signin-card">
          <v-card-title class="text-h5 text-center">Iniciar sesión</v-card-title>
          <v-form @submit.prevent="handleSubmit" class="signin-form">
            <v-text-field
              v-model="email"
              label="Email"
              prepend-inner-icon="mdi-account"
              density="compact"
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Contraseña"
              prepend-inner-icon="mdi-lock"
              :type="showPassword ? 'text' : 'password'"
              :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="showPassword = !showPassword"
              density="compact"
            ></v-text-field>
            <v-btn
              type="submit"
              color="primary"
              block
              class="mt-2"
            >
              Ingresar
            </v-btn>
          </v-form>
          <v-card-text class="text-center mt-2">
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
import { useAuthStore } from '@/stores/authStore';

const router = useRouter();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const showPassword = ref(false);

const handleSubmit = async () => {
  const result = await authStore.signIn({
    email: email.value,
    password: password.value
  });
  
  if (result.success) {
    router.push('/');
  } else {
    console.error(result.error);
    // You might want to show an error message to the user here
  }
};
</script>

<style scoped>
.signin-card {
  padding: 1.5rem;
}

.signin-form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

:deep(.v-text-field .v-input__details) {
  display: none;
}

:deep(.v-text-field) {
  margin-bottom: 0.5rem;
}

:deep(.v-btn) {
  text-transform: none;
  font-weight: 500;
}
</style>