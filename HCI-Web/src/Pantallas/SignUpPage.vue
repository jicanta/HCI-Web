<template>
  <v-container class="fill-height">
    <v-row allign="center" justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card class="elevation-12 pa-8">
          <v-card-title class="text-h4 mb-6 text-center">Registrarse</v-card-title>
          <v-form @submit.prevent="handleSubmit">
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="nombre"
                  label="Nombre"
                  variant="outlined"
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="apellido"
                  label="Apellido"
                  variant="outlined"
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="dni"
                  label="DNI"
                  variant="outlined"
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="telefono"
                  label="Número de teléfono"
                  variant="outlined"
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="username"
                  label="Nombre de usuario"
                  variant="outlined"
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="password"
                  label="Contraseña"
                  :type="showPassword ? 'text' : 'password'"
                  :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append-inner="showPassword = !showPassword"
                  variant="outlined"
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
            <v-btn
              type="submit"
              color="primary"
              block
              size="large"
              class="mt-4"
            >
              Ingresar
            </v-btn>
          </v-form>
          <v-card-text class="text-center mt-4">
            ¿Ya tiene una cuenta? 
            <router-link to="/sign-in" class="text-primary">Iniciar sesión</router-link>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const nombre = ref('');
const apellido = ref('');
const dni = ref('');
const telefono = ref('');
const username = ref('');
const password = ref('');
const showPassword = ref(false);
const router = useRouter();

const handleSubmit = () => {
  // aca iria conectado a la API de ellos
  console.log('Sign up attempt', { 
    nombre: nombre.value,
    apellido: apellido.value,
    dni: dni.value,
    telefono: telefono.value,
    username: username.value,
    password: password.value
  });
  
  router.push('/sign-in');
};
</script>
