<template>
  <div>
    <v-list lines="three" select-strategy="classic">
      <v-list-subheader>Todas as tarefas</v-list-subheader>

      <v-list-item
        :value="index"
        v-for="(task, index) in props.tasks"
        :key="task.id"
      >
        <template v-slot:prepend>
          <v-list-item-action start>
            <v-checkbox-btn
              v-model="task.status"
              @change="handleUpdateTaskStatus(task)"
            ></v-checkbox-btn>
          </v-list-item-action>
        </template>

        <v-list-item-title>{{ task.title }}</v-list-item-title>

        <v-list-item-subtitle class="mt-2">
          {{ task.description }}

          <p class="text-caption">
            Adicionado em {{ formatDate(task.createdAt) }}
          </p>
        </v-list-item-subtitle>
        <template v-slot:append>
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn
                color="grey-lighten-1"
                icon="mdi-dots-vertical"
                variant="text"
                v-bind="props"
              >
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="toggleEdit(task)">
                <v-list-item-title>Editar</v-list-item-title>
              </v-list-item>
              <v-list-item @click="toggleDelete(task.id)">
                <v-list-item-title>Deletar</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-list-item>
    </v-list>
    <DialogEdit
      :dialog="showDialogEdit"
      @toggleEdit="toggleEdit"
      :task="selectedTask"
      @updateTask="handleUpdateTask"
    />
    <DialogDelete
      :dialog="showDialogDelete"
      @toggleDelete="toggleDelete"
      @deleteTask="handleDeleteTask"
    />
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import DialogEdit from './DialogEdit.vue';
import DialogDelete from './DialogDelete.vue';
import { useSnackbarStore } from '@/stores/snackbarStore';
import {
  deleteTask,
  updateTask,
  updateTaskStatus,
} from '@/services/taskService';
import { formatDate } from '@/utils/dateUtils';

const props = defineProps({
  tasks: Array,
});

const emit = defineEmits();
const snackbarStore = useSnackbarStore();
const showDialogEdit = ref(false);
const showDialogDelete = ref(false);
const selectedTask = ref(null);
const taskIdToDelete = ref(null);

const toggleEdit = task => {
  selectedTask.value = { ...task };
  showDialogEdit.value = !showDialogEdit.value;
};

const toggleDelete = id => {
  taskIdToDelete.value = id;
  showDialogDelete.value = !showDialogDelete.value;
};

const handleDeleteTask = async () => {
  try {
    await deleteTask(taskIdToDelete.value);
    snackbarStore.openSnackbar('Tarefa deletada com sucesso!', 'success');
    emit('getTask');
  } catch (error) {
    snackbarStore.openSnackbar('Erro ao deletar a tarefa!', 'error');
  } finally {
    showDialogDelete.value = false;
  }
};

const handleUpdateTask = async task => {
  try {
    await updateTask(task);
    emit('getTask');
    snackbarStore.openSnackbar('Tarefa atualizada com sucesso!', 'success');
  } catch (error) {
    snackbarStore.openSnackbar('Erro ao atualizar a tarefa!', 'error');
  } finally {
    showDialogEdit.value = false;
    selectedTask.value = null;
  }
};

const handleUpdateTaskStatus = async task => {
  try {
    await updateTaskStatus(task);
    snackbarStore.openSnackbar('Status da tarefa atualizado!', 'success');
    emit('getTask');
  } catch (error) {
    snackbarStore.openSnackbar(
      'Erro ao atualizar o status da tarefa!',
      'error'
    );
  }
};
</script>
