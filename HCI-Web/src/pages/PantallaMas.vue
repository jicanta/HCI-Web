<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useTheme } from 'vuetify'; // Usamos useTheme para controlar el tema
import AppDivision from '@/components/AppDivision.vue';
import AppHeaderSecondaryScreen from '@/components/AppHeaderSecondaryScreen.vue';
import BodyGrid from '@/components/BodyGrid.vue';
import Section from '@/components/Section.vue';
import TopMenu from '@/components/TopMenu.vue';

const goToLink = () => {
  window.open('https://github.com/jicanta/HCI-Web', '_blank'); // Enlace externo
};

const isDarkMode = ref(false);
const theme = useTheme();

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  theme.global.name.value = isDarkMode.value ? 'dark' : 'light';
  localStorage.setItem('isDarkMode', isDarkMode.value.toString()); // Guardar el estado en localStorage
};

onMounted(() => {
  const storedTheme = localStorage.getItem('isDarkMode');
  if (storedTheme !== null) {
    isDarkMode.value = storedTheme === 'true';
    theme.global.name.value = isDarkMode.value ? 'dark' : 'light';
  }
});

</script>

<template>ead
  <ButtonsNavBarWithBack link_back="/"/>

  <v-main class="main-container  bg-background">

    <BodyGrid>
      <AppDivision class="ma-4" cols="12" sm="10" md="10" lg="4">
        <Section class="ma-3">
          <h1>Descarga nuestra app!</h1>
          <v-container class="link-container my-4 rounded-lg elevation-1" @click="goToLink">
            <p class="text-colortext-black"> Hacé click acá </p>
            <v-icon class="text-colortext-black mx-2" size="24">mdi-open-in-new</v-icon>
          </v-container>
        </Section>
        <Section class="ma-3">
          <v-container class="d-flex justify-center flex-column my-4 ">
            <h1 class="pb-5 d-flex justify-center">Configuración</h1>
            <v-divider />
            <v-container class="switch-option">
              <!-- Switch para alternar el tema -->
              <v-switch
                label="Modo oscuro"
                color="primary"
                inset
                v-model="isDarkMode"
                @change="toggleDarkMode"
              />
            </v-container>
            <v-divider />
          </v-container>
        </Section>
      </AppDivision>
    </BodyGrid>
  </v-main>
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
