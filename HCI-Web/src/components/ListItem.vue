<template>
    <v-list-item class="item pa-2">
        <v-list-item-title class="text-caption">{{ top }}</v-list-item-title>
        
        <div class="d-flex align-center py-2">
            <div class="icon-container mr-4">
                <v-icon v-if="icon" size="32" class="text-colortext2">{{ icon }}</v-icon>
            </div>
            
            <div class="flex-grow-1 mr-4">
                <v-list-item-title class="text-truncate font-weight-bold">{{ title }}</v-list-item-title>
                <v-list-item-subtitle class="text-truncate">{{ text }}</v-list-item-subtitle>
            </div>

            <v-list-item-action>
                <span class="font-weight-medium">{{ right }}</span>
            </v-list-item-action>
        </div>
        
        <v-divider class="mt-2"/>
    </v-list-item>
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


<style scoped>
    .item {
        height: auto;
        min-height: 100px;
    }

    .icon-container {
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
