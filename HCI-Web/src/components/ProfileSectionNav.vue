<template>
    <v-container class="rounded-circle bg-tertiary d-flex align-center justify-center cursor-pointer">
        <h2 class="font-weight-regular text-textcolor"> FM </h2>
    </v-container>
</template>

<script setup>
    const props = defineProps({
    text: {
        type: String,
        required: false,
    },
    backgound_color:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    }
    });
</script>

<style scoped>

</style>