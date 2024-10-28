<template>
  <v-container class="fill-height" fluid>
    <v-row class="align-start justify-center" style="margin-top: 20px;">
      <v-col cols="11" sm="11" md="5" lg="4" xl="4">
        <v-card 
          class="bg-tertiary elevation-7 w-100 mb-2 pa-2"
          flat
          elevation="0"
        >
          <div class="d-flex flex-column align-center">
            <h1 class="text-h5 font-weight-medium mb-1">Iniciar sesión</h1>
            <v-divider class="primary" width="32" thickness="2"></v-divider>
          </div>
        </v-card>
        <v-card class="elevation-7 w-100 pa-4 mb-4">
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
  import { useAppStore } from '@/stores/store';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';

  const appStore = useAppStore();

  const router = useRouter();

  const email = ref('');
  const password = ref('');
  const showPassword = ref(false);
  const isEmailValid = ref(true);

  function validateEmail() {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  isEmailValid.value = emailPattern.test(email.value);
  if (!isEmailValid.value) {
    alert('Por favor ingrese una dirección de email válida');
  }
}

  const handleSubmit = async () => {
    const result = await appStore.authUser(email.value, password.value);
    validateEmail(email.value);
    if (result == 1) {
      router.push('/');
    } else {
      console.error("Contraseña o email incorrecto");
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
