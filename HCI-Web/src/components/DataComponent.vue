<script setup>
import { ref } from 'vue';

const props = defineProps({
  label: String,
  content: String,
  editable: Boolean
});

const emit = defineEmits(['update']);

const editing = ref(false);
const localContent = ref(props.content);

const changeEditState = () => {
  if (props.editable) {
    editing.value = !editing.value;
    if (!editing.value) {
      localContent.value = props.content;
    }
  }
}

const saveChanges = () => {
  emit('update', localContent.value);
  changeEditState();
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
        <v-col cols="3" v-if="editable">
          <v-btn @click="changeEditState" class="bg-primary">Editar</v-btn>
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
</template>

<style/>
