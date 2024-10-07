<template>
  <v-app id="inspire" theme="dark">
    <v-navigation-drawer v-model="drawer" v-if="$route.path !== '/login'">
      <v-list>
        <v-list-item :subtitle="email" title="Lista de tarefas" />
      </v-list>

      <v-divider></v-divider>

      <v-list :lines="false" density="compact" nav>
        <RouterLink v-for="(item, i) in items" :key="i" :to="item.to">
          <v-list-item :value="item" color="primary">
            <template v-slot:prepend>
              <v-icon :icon="item.icon"></v-icon>
            </template>

            <v-list-item-title :textContent="item.text"></v-list-item-title>
          </v-list-item>
        </RouterLink>
        <v-list-item @click="showLogoutDialog = true" color="primary">
          <template v-slot:prepend>
            <v-icon icon="mdi-exit-to-app"></v-icon>
          </template>
          <v-list-item-title>Sair</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar v-if="$route.path !== '/login'">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>Lista de tarefas</v-app-bar-title>
    </v-app-bar>

    <v-main class="ma-4">
      <router-view />
    </v-main>

    <v-snackbar
      v-model="snackbarStore.showSnackbar"
      :color="snackbarStore.color"
      timeout="3000"
      top
    >
      {{ snackbarStore.message }}
    </v-snackbar>

    <v-dialog v-model="showLogoutDialog" max-width="400px">
      <v-card>
        <v-card-title>Confirmar saída</v-card-title>
        <v-card-text>Tem certeza de que deseja sair?</v-card-text>
        <v-card-actions>
          <v-btn @click="showLogoutDialog = false">Cancelar</v-btn>
          <v-btn color="primary" @click="logout">Sair</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useSnackbarStore } from "./stores/snackbarStore";

const drawer = ref(false);
const showLogoutDialog = ref(false);
const router = useRouter();
const snackbarStore = useSnackbarStore();

const email = computed(() => localStorage.getItem("email") || "");

const items = [{ text: "Tarefas", icon: "mdi-calendar-check", to: "/" }];

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("email");

  showLogoutDialog.value = false;

  router.push("/login");

  snackbarStore.openSnackbar("Você saiu com sucesso!", "success");
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: #fafafa;
}
</style>
