<!--nombre, apellido, dni, num telefono, nombre usuario, contraseña-->
<script setup lang="js">

import ButtonsNavBarWithBack from '@/components/ButtonsNavBarWithBack.vue';
import Section from '@/components/Section.vue';
import AppDivision from '@/components/AppDivision.vue';
import BodyGrid from '@/components/BodyGrid.vue';
import DataComponent from '@/components/DataComponent.vue';

const data = {
    name: "Federico Magri",
    dni: 4475526,
    telephone: "4455-6677",
    username: "federulo",
    cvu: "33333333333333333",
    alias: "fmagri.logo"
}
const dataAndName = [ 
  {name:"Nombre y Apellido", content: data.name, editable: false}, 
  {name:"DNI", content: data.dni, editable: false}, 
  {name:"Telefono", content: data.telephone, editable: true}, 
  {name:"Nombre de Usuario", content: data.username, editable: true}, 
  {name:"CVU", content: data.cvu, editable: false}, 
  {name:"Alias", content: data.alias, editable: true}
]

</script>

<template>

    <v-main class="main-container bg-background" fluid>
    <ButtonsNavBarWithBack link_back="/"/>

    <BodyGrid>
      <AppDivision class="ma-4" cols="12" sm="10" md="10" lg="4">
        <Section class="">
          <h1>Tus Datos</h1>
          <DataComponent v-for="dataAndName in dataAndName"
          :propName="dataAndName.name"
          :content="dataAndName.content"
          :editable="dataAndName.editable"
          class="pa-0 data-separator"
          />
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
  width: 100%;
}

.inside-section {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: flex-start;
  align-items: center;
}

.input {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: flex-start;
}

.data-separator {
  border-bottom: 1px solid rgba(255,255,255, 0.5);
  padding-bottom: 8px;
  margin-bottom: 8px;
}
</style>
