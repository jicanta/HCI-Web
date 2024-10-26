<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useTheme } from 'vuetify'; // Usamos useTheme para controlar el tema
import AppDivision from '@/components/AppDivision.vue';
import AppHeaderSecondaryScreen from '@/components/AppHeaderSecondaryScreen.vue';
import BodyGrid from '@/components/BodyGrid.vue';
import Section from '@/components/Section.vue';
import TopMenu from '@/components/TopMenu.vue';
import VChart from 'vue-echarts';
import DataComponent from '@/components/DataComponent.vue';

const goToLink = () => {
  window.open('https://github.com/jicanta/HCI-Web', '_blank'); // Enlace externo
};

const user = ref({

  name: {
    content: 'Federico Magri',
    label: 'Nombre y Apellido',
    editable: true,
    copyable: false,
  },
  email: {
    content: 'fmagri@fi.uba.ar',
    label: 'Email',
    editable: true,
    copyable: false,
  },
  telephone: {
    content: '11-3344-9977',
    label: 'Telefono',
    editable: true,
    copyable: false,
  },
  username: {
    content: 'fmagri',
    label: 'Nombre de Usuario',
    editable: true,
    copyable: false,
  }
});

const editing = ref(false);

const changeEditState = (data) => {
  if(data.editable) {
    editing.value = !editing.value;
  }
}

const isDarkMode = ref(false);
const theme = useTheme();

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  theme.global.name.value = isDarkMode.value ? 'dark' : 'light';
  localStorage.setItem('isDarkMode', isDarkMode.value.toString()); // Guardar el estado en localStorage
};

const updateUserData = (key, newValue) => {
  user.value[key].content = newValue;
};

onMounted(() => {
  const storedTheme = localStorage.getItem('isDarkMode');
  if (storedTheme !== null) {
    isDarkMode.value = storedTheme === 'true';
    theme.global.name.value = isDarkMode.value ? 'dark' : 'light';
  }
});

</script>

<template>
  <ButtonsNavBarWithBack link_back="/"/>

  <v-row class="w-100 h-100 d-flex justify-center" style="margin-top: 106px;" fluid>
    <v-col cols="11" sm="11" md="5" lg="4" xl="4" class="d-flex flex-column align-center justify-start">

      <v-card 
        class="bg-tertiary w-100 h-40 my-4 pa-2"
      >
        <v-container class="d-flex align-center justify-center pa-6" style="height: 100%;">
          <v-row class="align-center justify-space-between" no-gutters>
            <v-col class="mr-2 text-h4 d-flex align-center justify-center">
              Personalizar
            </v-col>
          </v-row>
        </v-container>
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
        class="bg-tertiary w-100 h-40 my-4 pa-2"
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
