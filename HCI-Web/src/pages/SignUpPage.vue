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
            <h1 class="text-h5 font-weight-medium mb-1">Registrarse</h1>
            <v-divider class="primary" width="32" thickness="2"></v-divider>
          </div>
        </v-card>

        <v-card class="elevation-7 w-100 pa-4 mb-4">
          <v-form @submit.prevent="handleSubmit" class="signup-form">
            <v-row dense>
              <v-col cols="12" sm="6">
                <v-text-field v-model="nombre" label="Nombre" prepend-inner-icon="mdi-account" density="compact"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="apellido" label="Apellido" prepend-inner-icon="mdi-account" density="compact"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="dni" label="DNI" prepend-inner-icon="mdi-card-account-details" density="compact"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="telefono" label="Número de teléfono" prepend-inner-icon="mdi-phone" density="compact"></v-text-field>
              </v-col>
            </v-row>
            <v-text-field v-model="username" label="Nombre de usuario" prepend-inner-icon="mdi-account" density="compact"></v-text-field>
            <v-text-field v-model="email" label="Email" prepend-inner-icon="mdi-email" density="compact"></v-text-field>
            <v-text-field
              v-model="password"
              label="Contraseña"
              prepend-inner-icon="mdi-lock"
              :type="showPassword ? 'text' : 'password'"
              :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="showPassword = !showPassword"
              density="compact"
            ></v-text-field>
            <v-menu
              v-model="showMenu"
              :close-on-content-click="false"
              :nudge-width="200"
              offset-y
            >
              <template v-slot:activator="{ props }">
                <v-text-field
                  v-model="confirmPassword"
                  label="Confirmar contraseña"
                  prepend-inner-icon="mdi-lock-check"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  :append-inner-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append-inner="showConfirmPassword = !showConfirmPassword"
                  density="compact"
                  v-bind="props"
                ></v-text-field>
              </template>
              <v-card v-if="showPasswordMismatch" color="error" class="pa-2">
                <v-card-text class="text-caption white--text">
                  Las contraseñas no coinciden
                </v-card-text>
              </v-card>
            </v-menu>
            <v-btn type="submit" color="primary" block class="mt-2">Registrarse</v-btn>
            <div class="w-100 pa-2 text-center">
              ¿Ya tiene una cuenta? 
              <router-link to="/sign-in" class="text-primary">Iniciar sesión</router-link>
            </div>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const router = useRouter();
const authStore = useAuthStore();

const nombre = ref('');
const apellido = ref('');
const dni = ref('');
const telefono = ref('');
const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const showMenu = ref(false);

const showPasswordMismatch = computed(() => {
  return confirmPassword.value && password.value !== confirmPassword.value;
});

watch(showPasswordMismatch, (newValue) => {
  showMenu.value = newValue;
});

const handleSubmit = async () => {
  if (password.value !== confirmPassword.value) {
    showMenu.value = true;
    return;
  }

  const result = await authStore.signUp({
    nombre: nombre.value,
    apellido: apellido.value,
    dni: dni.value,
    telefono: telefono.value,
    username: username.value,
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
.signup-form {
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
