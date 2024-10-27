<script setup lang="js">
import { ref, onMounted } from 'vue';
import { useAppStore } from '@/stores/store.js';
import ButtonsNavBarWithBack from '@/components/ButtonsNavBarWithBack.vue';
import DataComponent from '@/components/DataComponent.vue';

const appStore = useAppStore();
const user = ref({});

const formatDNI = (dni) => {
  if (typeof dni !== 'string') {
    dni = dni.toString();
  }
  const reversed = dni.split('').reverse().join('');
  const formatted = reversed.replace(/(\d{3})(?=\d)/g, '$1.');
  return formatted.split('').reverse().join('');
};

onMounted(() => {
  const currentUser = appStore.getCurrentUser();

  user.value = {
    dni: {
      content: formatDNI(currentUser.dni),
      label: 'DNI',
      editable: false,
      copyable: false,
    },
    cvu: {
      content: currentUser.cvu,
      label: 'CVU',
      editable: false,
      copyable: true,
    },
    alias: {
      content: currentUser.alias,
      label: 'Alias',
      editable: true,
      copyable: true,
    }
  };
});

const updateUserData = (key, newValue) => {
  user.value[key].content = newValue;
  if (key === 'alias') {
    appStore.updateUserAlias(newValue);
  }
};
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
              Tus datos
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
    </v-col>
  </v-row>

</template>


<style/>
