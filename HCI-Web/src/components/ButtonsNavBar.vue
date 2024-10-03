<template>
    <v-container class="buttons-nav-bar bg-primary px-16" fluid>
        <SectionNav :selected="true" icon="mdi-home" text="Inicio" class="mx-1" />
        <SectionNav :selected="false" icon="mdi-history" text="Movimientos" class="mx-1" />
        <SectionNav :selected="false" icon="mdi-credit-card-outline" text="Métodos de pago" class="mx-1" />
        <SectionNav :selected="false" icon="mdi-dots-horizontal-circle-outline" text="Más" class="mx-1" />

    </v-container>
</template>

<script setup>
import Section from './Section.vue';
import SectionNav from './SectionNav.vue';

//
</script>

<style scoped>
.buttons-nav-bar {
    color: black;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: row;
}
</style>