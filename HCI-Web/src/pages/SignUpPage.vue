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
                <v-text-field
                  v-model="nombre"
                  label="Nombre"
                  prepend-inner-icon="mdi-account"
                  density="compact"
                  @keypress="preventDigitInput"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="apellido"
                  label="Apellido"
                  prepend-inner-icon="mdi-account"
                  density="compact"
                  @keypress="preventDigitInput"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="dni"
                  label="DNI"
                  prepend-inner-icon="mdi-card-account-details"
                  density="compact"
                  @keypress="handleDniInput"
                  @blur="validateDni"
                ></v-text-field>
                <span v-if="dniError" class="text-error">{{ dniError }}</span>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="phoneNumber"
                  label="Teléfono"
                  prepend-inner-icon="mdi-phone"
                  density="compact"
                  @keypress="handlePhoneInput"
                  :value="formatPhoneNumber(phoneNumber)"
                  placeholder="11-1234-5678"
                ></v-text-field>
                <span v-if="phoneError" class="text-error">{{ phoneError }}</span>
              </v-col>
            </v-row>
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
            <!--  <v-card v-if="showPasswordMismatch" color="error" class="pa-2">
                <v-card-text class="text-caption white--text">
                  Las contraseñas no coinciden
                </v-card-text>
              </v-card> -->
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

  <v-dialog v-model="showErrorDialog" max-width="400px">
    <v-card class="elevation-7">
      <v-card-title class="text-h5 text-center">
        Error en el registro
      </v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item v-for="(error, index) in errorMessages" :key="index" class="text-error">
            • {{ error }}
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn color="primary" @click="showErrorDialog = false">
          Entendido
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog v-model="showSuccessDialog" max-width="400px">
    <v-card class="elevation-7">
      <v-card-title class="text-h5 text-center text-success">
        Registro exitoso
      </v-card-title>
      <v-card-text class="text-center">
        ¡Su cuenta ha sido creada correctamente!
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn color="success" @click="showSuccessDialog = false">
          Entendido
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAppStore } from '@/stores/store';

const router = useRouter();
const appStore = useAppStore();

const nombre = ref('');
const apellido = ref('');
const dni = ref('');
const phoneNumber = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const showMenu = ref(false);
const dniError = ref('');
const phoneError = ref('');
const showErrorDialog = ref(false);
const errorMessages = ref([]);
const showSuccessDialog = ref(false);

const showPasswordMismatch = computed(() => {
  return confirmPassword.value && password.value !== confirmPassword.value;
});

watch(showPasswordMismatch, (newValue) => {
  showMenu.value = newValue;
});

const handleSubmit = async () => {
  if (!validateFields()) return;
  
  if (password.value !== confirmPassword.value) {
    showMenu.value = true;
    return;
  }

  const result = await appStore.addUser(
    email.value, password.value, nombre.value, apellido.value, dni.value, phoneNumber.value
  );
  
  if (result == 1) {
    showSuccessDialog.value = true;
    setTimeout(() => {
      showSuccessDialog.value = false;
      router.push('/');
    }, 2000);
  } else {
    errorMessages.value = ['Usuario ya existente'];
    showErrorDialog.value = true;
  }
};

function filterTextInput(value) {
  return value.replace(/[^a-zA-Z\s]/g, '');
}

const formattedNombre = computed({
  get: () => nombre.value,
  set: (value) => {
    nombre.value = value.replace(/\d/g, '');
  }
});

const formattedApellido = computed({
  get: () => apellido.value,
  set: (value) => {
    apellido.value = value.replace(/\d/g, '');
  }
});

function preventDigitInput(event) {
  if (/\d/.test(event.key)) {
    event.preventDefault();
  }
}

function handleDniInput(event) {
  if (!/\d/.test(event.key) || dni.value.length >= 8) {
    event.preventDefault();
  }
}

function handlePhoneInput(event) {
  if (!/\d/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Delete') {
    event.preventDefault();
  }
}


function formatPhoneNumber(value  ) {
  const cleaned = value.replace(/\D/g, '');
  let formatted = cleaned;
  phoneError.value = ''
  if (cleaned.length >= 2) {
    formatted = cleaned.slice(0, 2) + '-' + cleaned.slice(2);
    if (cleaned.length >= 6) {
      formatted = formatted.slice(0, 7) + '-' + formatted.slice(7);
    }
    if (cleaned.length >= 11) {
      phoneError.value = 'Teléfono debe tener 10 dígitos'
    }
  }
  
  return formatted;
}

const isEmailValid = ref(true);

function validateEmail() {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  isEmailValid.value = emailPattern.test(email.value);
  if (!isEmailValid.value) {
    alert('Por favor ingrese una dirección de email válida');
    return false;
  }
  return true;
}

const validateFields = () => {
  errorMessages.value = [];
  
  if (!nombre.value) {
    errorMessages.value.push("Debe ingresar un nombre");
  }
  
  if (!apellido.value) {
    errorMessages.value.push("Debe ingresar un apellido");
  }

  if (!dni.value || (dni.value.length !== 8 && dni.value.length !== 7)) {
    errorMessages.value.push("DNI debe tener 7 u 8 dígitos");
  }

  if (!phoneNumber.value || phoneNumber.value.replace(/\D/g, '').length !== 10) {
    errorMessages.value.push("Teléfono debe tener 10 dígitos");
  }

  if (!email.value || !validateEmail()) {
    errorMessages.value.push("Debe ingresar un email válido");
  }

  if (!password.value) {
    errorMessages.value.push("Debe ingresar una contraseña");
  }

  if (!confirmPassword.value) {
    errorMessages.value.push("Debe confirmar la contraseña");
  }

  if (password.value !== confirmPassword.value) {
    errorMessages.value.push("Las contraseñas no coinciden");
  }

  if (errorMessages.value.length > 0) {
    showErrorDialog.value = true;
    return false;
  }
  return true;
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
