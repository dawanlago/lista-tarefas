<template>
  <v-btn @click="showDialogNewTask = true" class="m-4">Adicionar Tarefa</v-btn>

  <v-dialog v-model="showDialogNewTask" max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Nova Tarefa</span>
      </v-card-title>

      <v-card-text>
        <v-text-field
          label="Título"
          v-model="task.title"
          clearable
        ></v-text-field>
        <v-textarea
          label="Descrição"
          v-model="task.description"
          clearable
          rows="3"
        ></v-textarea>
      </v-card-text>

      <v-card-actions>
        <v-btn @click="showDialogNewTask = false">Cancelar</v-btn>
        <v-btn color="primary" @click="addTask" :disabled="!task.title"
          >Adicionar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-skeleton-loader
    v-if="loading"
    :elevation="3"
    type="paragraph"
    class="mt-4"
  ></v-skeleton-loader>
  <ListTasks v-else class="mt-4" :tasks="tasks" @getTask="getTasks" />
</template>

<script setup>
import ListTasks from "./ListTasks.vue";
import { ref, onMounted } from "vue";

import {
  getTasks as fetchTasks,
  addTask as createTask,
} from "@/services/taskService";
import { useSnackbarStore } from "@/stores/snackbarStore";

const snackbarStore = useSnackbarStore();

const loading = ref(false);
const tasks = ref([]);
const showDialogNewTask = ref(false);
const task = ref({
  title: "",
  description: "",
  status: false,
  user: "",
  createdAt: "",
});

const getTasks = async () => {
  loading.value = true;
  tasks.value = await fetchTasks(snackbarStore);
  loading.value = false;
};

onMounted(getTasks);

const addTask = async () => {
  const newTask = await createTask(task.value, snackbarStore);
  if (newTask) {
    tasks.value.push(newTask);
    showDialogNewTask.value = false;
    task.value = {
      title: "",
      description: "",
      status: false,
      createdAt: "",
    };
    getTasks();
  }
};
</script>
