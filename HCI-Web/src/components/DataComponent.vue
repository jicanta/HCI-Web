<script setup>

import { defineProps} from 'vue';
import { ref } from 'vue';

const data = defineProps(['propName', 'content', 'editable']);

const editing = ref(false);

function changeEditingState(){
    editing.value = !editing.value;
}

</script>

<template>
    <v-container class="inside-section d-flex pt-5">
        <v-container class="container">
            {{data.propName}}
        </v-container>
        <v-container class="container flex-row">
            <p v-if="editing == false" class="font-weight-bold text-colortext2">{{data.content}}</p>
            <v-text-field v-else 
            v-model="data.content"
            class="font-weight-thin inputField" 
            :label="`Introduzca un nuevo ${data.propName}`" 
            variant="underlined"
            >
            </v-text-field>
            <template v-if="editable">
                <v-btn v-if="!editing" class="font-weight-thin bg-" @click="changeEditingState">Editar</v-btn>
                <v-btn v-else class="font-weight-thin bg-" @click="changeEditingState">Guardar</v-btn>
            </template>
        </v-container>
        <v-divider class="my-2"/>
    </v-container>
</template>

<style>

.container{
    display: flex;
    justify-content: space-between;
    padding-left: 2%;
    padding-right: 2%;
    padding: 1%;
}
.inputField{
    padding-right: 5%;
    height: 5%;
}

</style>