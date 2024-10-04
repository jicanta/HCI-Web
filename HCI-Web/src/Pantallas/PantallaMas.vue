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

<template>
  <AppHeaderSecondaryScreen title="Más" />

  <v-main class="main-container">
    <TopMenu>
      <v-container class="user-container">
        <v-icon class="text-colortext mr-2" size="24">mdi-account-circle</v-icon>
        <p class="text-colortext font-weight-medium">Nombre de usuario</p>
      </v-container>

      <v-container class="link-container bg-secondary my-4 rounded-lg elevation-1" @click="goToLink">
        <p class="text-colortext"> Descarga nuestra app </p>
        <v-icon class="text-colortext mx-2" size="24">mdi-open-in-new</v-icon>
      </v-container>
    </TopMenu>

    <BodyGrid>
      <AppDivision class="ma-4" cols="12" sm="6" md="8">
        <Section class="ma-3">
          <v-container class="options-container">
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
