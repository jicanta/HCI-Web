<template>
    <v-container class="rounded-circle bg-tertiary d-flex align-center justify-center cursor-pointer">
        <h2 class="font-weight-regular text-textcolor"> {{name}} </h2>
    </v-container>
</template>

<script setup>
    const props = defineProps({
    name:{
        type: String,
        required: true
    }
    });
</script>

<style scoped>

</style>