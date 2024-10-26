<script setup lang="js">

import ButtonsNavBarWithBack from '@/components/ButtonsNavBarWithBack.vue';
import Section from '@/components/Section.vue';
import AppDivision from '@/components/AppDivision.vue';
import BodyGrid from '@/components/BodyGrid.vue';
import DataComponent from '@/components/DataComponent.vue';
import { ref } from 'vue';


const user = ref({

  name: {
    content: '44759526',
    label: 'DNI',
    editable: false,
  },
  email: {
    content: '33333333333333333',
    label: 'CVU',
    editable: false,
  },
  telephone: {
    content: 'fmagri.logo',
    label: 'Alias',
    editable: true,
  }
});

const updateUserData = (key, newValue) => {
  user.value[key].content = newValue;
};
</script>

<template>
  <ButtonsNavBarWithBack link_back="/"/>

  <v-row class="w-100 h-100 d-flex justify-center" style="margin-top: 106px;" fluid>
    <v-col cols="11" sm="11" md="5" lg="4" xl="4" class="d-flex flex-column align-center justify-start">
      <DataComponent
        v-for="(data, key) in user"
        :key="key"
        :label="data.label"
        :content="data.content"
        :editable="data.editable"
        @update="updateUserData(key, $event)"
      />
    </v-col>
  </v-row>

</template>


<style/>
