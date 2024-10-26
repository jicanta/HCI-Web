<template>
  <v-container class="fill-height" fluid>
    <v-row class="align-start justify-center" style="margin-top: 20px;">
      <v-col cols="11" sm="11" md="5" lg="4" xl="4">
        <v-card 
          class="bg-tertiary w-100 mb-4 pa-2"
        >
          <v-container class="d-flex align-center justify-center pa-4">
            <v-row class="align-center justify-space-between" no-gutters>
              <v-col class="text-h4 d-flex align-center justify-center">
                Iniciar sesión
              </v-col>
            </v-row>
          </v-container>
        </v-card>
        <v-card class="w-100 pa-4 mb-4">
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
            <div class="w-100 pa-2 text-center">
              ¿No tiene una cuenta? 
              <router-link :to="{ name: 'signUp' }" class="text-primary">Registrarse</router-link>
            </div>
            <div class="w-100 pa-1 text-center text-caption">
              <router-link :to="{ name: 'recoverPassword' }" class="text-primary text-decoration-none">
                Olvidé mi contraseña
              </router-link>
            </div>
          </v-form>
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
.signin-form {
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
