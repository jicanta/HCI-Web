<template>
    <v-container class="item w-100 pa-2">
        <h3 class="font-weight-medium">{{top}}</h3>
        
        <v-container class="middle-container w-100 h-100">
            <v-container class="icon-container border-sm border-opacity-100 rounded-circle ma-0">
                <v-icon v-if="icon" size="32" class="text-colortext2">{{ icon }}</v-icon>
            </v-container>
            
            <v-container class="info-container mx-4">
                <h2 class="font-weight-bold">{{title}}</h2>
                <p class="font-weight-light">{{text}}</p>
            </v-container>

            <p class="font-weight-medium">{{right}}</p>
        
        </v-container>
        <v-divider class="mt-2"/>
    </v-container>
</template>


<script setup>
    const props = defineProps({
    icon: {
        type: String,
        required: false,
    },
    title: {
        type: String,
        required: false,
    },
    text: {
        type: String,
        required: false,
    },
    right: {
        type: String,
        required: false,
    },
    top: {
        type: String,
        required: false,
    }

    });
</script>


<style>
    .item {
        height: 100px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
    }
    .icon-container {
        min-height: 48px;
        min-width: 48px;

        max-height: 48px;
        max-width: 48px;

        display: flex;
        align-items: center;
        justify-content: center;
    }
    .middle-container {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        padding: 0px;
        align-items: center;
    }
    .info-container{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        padding: 0px;
    }
</style>