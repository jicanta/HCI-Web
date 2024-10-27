<script setup>
import { ref } from 'vue';

const props = defineProps({
  label: String,
  content: String,
  editable: Boolean,
  copyable: Boolean,
});

const emit = defineEmits(['update']);

const editing = ref(false);
const localContent = ref('');

const changeEditState = () => {
  if (props.editable) {
    editing.value = !editing.value;
    localContent.value = props.content;
  }
}

const saveChanges = () => {
  emit('update', localContent.value);
  editing.value = false;
}

const snackbar = ref(false);
const snackbarMessage = ref('');

const copyToClipboard = () => {
  navigator.clipboard.writeText(props.content);
  snackbarMessage.value = 'Contenido copiado al portapapeles';
  snackbar.value = true;
}
</script>

<template>
  <v-card class="bg-tertiary w-100 h-40 my-4 pa-2">
    <v-container class="d-flex flex-column pa-6">
      <v-row>
        <v-col class="text-h6">
          {{ label }}
        </v-col>
      </v-row>
      <v-divider class="my-2 w-100"/>
      <v-row v-if="!editing">
        <v-col>
          {{ content }}
        </v-col>
        <v-col cols="3" class="d-flex justify-end">
          <v-btn v-if="copyable" @click="copyToClipboard" icon="mdi-content-copy" class="mr-2 bg-primary" size="small"></v-btn>
          <v-btn v-if="editable" @click="changeEditState" class="bg-primary">Editar</v-btn>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col>
          <v-text-field v-model="localContent" variant="underlined"/>
        </v-col>
        <v-col cols="3" v-if="editable">
          <v-btn @click="saveChanges" class="bg-primary">Guardar</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>

  <v-snackbar v-model="snackbar" :timeout="2000">
    {{ snackbarMessage }}
  </v-snackbar>
</template>

<style/>
