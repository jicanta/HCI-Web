<template>
    <v-container class="top-menu bg-primary rounded-b-sm ma-0 pa-0" fluid>
        <slot></slot>
    </v-container>
</template>

<script setup>
import Section from './Section.vue';

//
</script>

<style scoped>
.top-menu {
    color: black;
    align-items: center;
    justify-content: flex-start;
    display: flex;
    flex-direction: column;
    width: 100%;
}
</style>