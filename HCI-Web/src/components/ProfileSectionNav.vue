<template>
    <v-container class="section container rounded bg-tertiary">
    <v-row>
        <v-col class="pl-5 pa-3 w-100">
            <!-- <v-icon v-if="icon" :class="{'text-secondary': selected}" size="24" class="text-colortext2 mr-2">{{ icon }}</v-icon> -->
            <h4 class="d-md-flex d-sm-none text-no-wrap text-colortext2 px-0" justify="center">Hola {{ name }}</h4>
            <h5 class="d-md-flex d-sm-none text-no-wrap text-colortext2 px-0">{{ text }}</h5>
        </v-col>
    </v-row>
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

    .section:hover {
        box-shadow: inset 4px 4px 6px rgba(0, 0, 0, 0.2), 
        inset -4px -4px 6px rgba(0, 0, 0, 0.2);
    }

    .section:active {
        box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 0.2), 
        inset -2px -2px 4px rgba(0, 0, 0, 0.2);
        background-color: rgba(0, 0, 0, 0.05);
    }

</style>