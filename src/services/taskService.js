import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from 'firebase/firestore';
import { db } from '@/services/firebaseConfig';

export const getIdUser = () => {
  const token = localStorage.getItem('token');
  const decodedToken = JSON.parse(atob(token.split('.')[1]));
  return decodedToken.user_id;
};

export const getTasks = async snackbarStore => {
  const tasks = [];
  const loading = ref(true);
  try {
    const q = query(collection(db, 'tasks'), where('user', '==', getIdUser()));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      tasks.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    tasks.sort((a, b) => {
      if (a.status === b.status) {
        return a.createdAt.toDate() - b.createdAt.toDate();
      }
      return a.status - b.status;
    });
  } catch (error) {
    snackbarStore.openSnackbar('Erro ao buscar as tarefas!', 'error');
  } finally {
    loading.value = false;
  }
  return tasks;
};

export const addTask = async (task, snackbarStore) => {
  if (task.title) {
    try {
      const docRef = await addDoc(collection(db, 'tasks'), {
        title: task.title,
        description: task.description,
        status: false,
        user: getIdUser(),
        createdAt: new Date(),
      });
      snackbarStore.openSnackbar('Tarefa adicionada com sucesso!', 'success');
      return { id: docRef.id, ...task };
    } catch (error) {
      snackbarStore.openSnackbar('Erro ao adicionar a tarefa!', 'error');
    }
  } else {
    snackbarStore.openSnackbar(
      'Por favor, insira um título para a tarefa',
      'warning'
    );
  }
};

export const updateTask = async task => {
  try {
    await updateDoc(doc(db, 'tasks', task.id), {
      title: task.title,
      description: task.description,
      status: task.status,
    });
  } catch (error) {
    throw new Error('Erro ao atualizar a tarefa!');
  }
};

export const deleteTask = async id => {
  try {
    await deleteDoc(doc(db, 'tasks', id));
  } catch (error) {
    throw new Error('Erro ao deletar a tarefa!');
  }
};

export const updateTaskStatus = async task => {
  try {
    await updateDoc(doc(db, 'tasks', task.id), {
      status: task.status,
    });
  } catch (error) {
    throw new Error('Erro ao atualizar o status da tarefa!');
  }
};
