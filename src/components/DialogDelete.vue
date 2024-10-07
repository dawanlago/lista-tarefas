<template>
  <div class="text-center pa-4">
    <v-dialog v-model="props.dialog" max-width="400" persistent>
      <v-card title="Deseja remover a tarefa?">
        <template v-slot:actions>
          <v-spacer></v-spacer>

          <v-btn @click="$emit('toggleDelete')"> Não </v-btn>

          <v-btn @click="$emit('deleteTask')"> Sim </v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  dialog: Boolean,
});
</script>
