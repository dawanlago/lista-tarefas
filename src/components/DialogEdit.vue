<template>
  <div class="text-center pa-4">
    <v-dialog v-model="props.dialog" max-width="600" min-width="400">
      <v-card>
        <v-card-title class="text-h5"> Editar tarefa </v-card-title>
        <v-card-text>
          <v-text-field v-model="props.task.title" label="Title"></v-text-field>
          <v-text-field
            v-model="props.task.description"
            label="Description"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn @click="saveTask" color="primary" :disabled="!props.task.title"
            >Salvar</v-btn
          >
          <v-btn @click="$emit('toggleEdit')" color="grey">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  dialog: Boolean,
  task: Object,
});

const emit = defineEmits();
const saveTask = () => {
  emit("updateTask", { ...props.task });
};
</script>
