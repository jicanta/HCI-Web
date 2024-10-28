<script setup>
import { ref, computed } from 'vue';
import { useTheme } from 'vuetify'; // Usamos useTheme para controlar el tema
import DataComponent from '@/components/DataComponent.vue';
import { useAppStore } from '@/stores/store';
import ButtonsNavBarWithBack from '@/components/ButtonsNavBarWithBack.vue';
import router from '@/router';
  
const goToRoute = (route) => {
  router.push(route);
};

const appStore = useAppStore();

const currentUser = computed(() => appStore.getCurrentUser());

const user = computed(() => ({
  name: {
    content: currentUser.value.name,
    label: 'Nombre',
    editable: true,
    copyable: false,
  },
  surname: {
    content: currentUser.value.surname,
    label: 'Apellido',
    editable: true,
    copyable: false,
  },
  email: {
    content: currentUser.value.email,
    label: 'Email',
    editable: true,
    copyable: false,
  },
  telephone: {
    content: currentUser.value.telephone,
    label: 'Teléfono',
    editable: true,
    copyable: false,
  }
}));

const updateUserData = (key, newValue) => {
  user.value[key].content = newValue;
  switch(key){
    case 'name':
      appStore.updateUserName(newValue);
      break;
    case 'surname':
      appStore.updateUserSurname(newValue);
      break;
    case 'email':
      appStore.updateUserEmail(newValue);
      break;
    case 'telephone':
      appStore.updateUserTelephone(newValue);
      break;
  }
};

const isDarkMode = ref(localStorage.getItem('isDarkMode') === 'true');
const theme = useTheme();

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  theme.global.name.value = isDarkMode.value ? 'dark' : 'light';
  localStorage.setItem('isDarkMode', isDarkMode.value.toString());
};

// Inicializar el tema
theme.global.name.value = isDarkMode.value ? 'dark' : 'light';
</script>

<template>
  <template v-if="appStore.getId() >= 0">
    <ButtonsNavBarWithBack/>
    <v-row class="w-100 h-100 d-flex justify-center" style="margin-top: 106px;" fluid>
      <v-col cols="11" sm="11" md="5" lg="4" xl="4" class="d-flex flex-column align-center justify-start">

        <v-card 
            class="bg-tertiary elevation-7 w-100 mb-2 pa-2"
            flat
            elevation="0"
          >
            <div class="d-flex flex-column align-center">
              <h1 class="text-h5 font-weight-medium mb-1">Personalizar</h1>
              <v-divider class="primary" width="32" thickness="2"></v-divider>
            </div>
          </v-card>
        <DataComponent
          v-for="(data, key) in user"
          :key="key"
          :label="data.label"
          :content="data.content"
          :editable="data.editable"
          :copyable="data.copyable"
          @update="updateUserData(key, $event)"
        />
        <v-card 
          class="bg-tertiary elevation-7 w-100 h-40 my-4 pa-2"
        >
          <v-container class="d-flex align-center justify-center pa-6" style="height: 100%;">
            <v-row class="align-center justify-space-between" no-gutters>
              <v-col cols="auto" class="mr-2 text-h6">
                Alternar modo oscuro
              </v-col>
              <v-col cols="2">
                <v-switch
                  color="primary"
                  inset
                  v-model="isDarkMode"
                  @change="toggleDarkMode"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </template>
  <template v-else-if="goToRoute({ name: 'signIn' })"/>
</template>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.user-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.link-container {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.switch-option {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.options-container {
  height: 100%;
}
</style>
