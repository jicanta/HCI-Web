<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card class="signup-card">
          <v-card-title class="text-h5 text-center">Registrarse</v-card-title>
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
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="confirmPassword"
                  label="Confirmar contraseña"
                  prepend-inner-icon="mdi-lock-check"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  :append-inner-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append-inner="showConfirmPassword = !showConfirmPassword"
                  density="compact"
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-card v-if="showPasswordMismatch" color="error" class="pa-2">
                <v-card-text class="text-caption white--text">
                  Las contraseñas no coinciden
                </v-card-text>
              </v-card>
            </v-menu>
            <v-btn type="submit" color="primary" block class="mt-2">Registrarse</v-btn>
          </v-form>
          <v-card-text class="text-center mt-2">
            ¿Ya tiene una cuenta? 
            <router-link to="/sign-in" class="text-primary">Iniciar sesión</router-link>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
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
.signup-card {
  padding: 1.5rem;
}

.signup-form {
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