<template>

    <v-col class="container rounded" :class="{ 'bg-grey-darken-1': selected, 'bg-tertiary': !selected }">
        <v-col class="section pb-1 pt-2 w-100">
            <v-icon v-if="icon" size="24" class="mr-2 text-colortext2" >{{ icon }}</v-icon>
            <h4 class="d-flex text-no-wrap text-colortext2">{{ text }}</h4>
        </v-col>
        <v-col class="px-0 py-1 rounded-b w-100" :class="{'bg-secondary': selected}"/>
    </v-col>
</template>

<script setup>
    const props = defineProps({
    icon: {
        type: String,
        required: false,
    },
    text: {
        type: String,
        required: false,
    },
    selected: {
        type: Boolean,
        required: false,
    },
    });
</script>

<style scoped>
    .container {
        align-items: center;
        justify-content: center;
        display: flex;
        flex-direction: column;
        cursor: pointer;
        padding: 0px;
    }
    .section {
        align-items: center;
        justify-content: flex-start;
        display: flex;
        flex-direction: row;
        box-shadow: inset 0px 4px 2px rgba(0, 0, 0, 0.1), 
        inset 0px 0px 0px rgba(0, 0, 0, 0.1);
        cursor: pointer;
        transition: background-color 0.3s ease, box-shadow 0.3s ease;
        
    }

    .section:active {
        box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 0.2), 
        inset -2px -2px 4px rgba(0, 0, 0, 0.2);
        background-color: rgba(0, 0, 0, 0.05);
    }

</style>
