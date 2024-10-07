<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card v-if="!showCreateAccount">
          <v-card-title>Login</v-card-title>
          <v-card-text>
            <v-text-field v-model="email" label="Email" type="email" required />

            <v-text-field
              v-model="password"
              label="Senha"
              type="password"
              required
            />

            <v-btn @click="showRecoveryDialog" variant="text"
              >Recuperar Senha</v-btn
            >
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="login">Login</v-btn>
            <v-btn @click="toggleCreateAccount" variant="text"
              >Criar Conta</v-btn
            >
          </v-card-actions>
        </v-card>

        <v-card v-else>
          <v-card-title>Criar Conta</v-card-title>
          <v-card-text>
            <v-text-field
              v-model="newEmail"
              label="Email"
              type="email"
              required
            />
            <v-text-field
              v-model="newPassword"
              label="Senha"
              type="password"
              required
            />
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="createAccount">Criar Conta</v-btn>
            <v-btn text @click="toggleCreateAccount">Voltar para Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <DialogRecoveryPassword
      :dialog="showDialog"
      :recoveryEmail="recoveryEmail"
      @update:dialog="showDialog = $event"
    />
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { loginUser, registerUser } from "@/services/authService";

import { useSnackbarStore } from "@/stores/snackbarStore";
import { useRouter } from "vue-router";

import DialogRecoveryPassword from "@/components/DialogRecoveryPassword.vue";

const snackbarStore = useSnackbarStore();

const router = useRouter();

const showCreateAccount = ref(false);
const email = ref("");
const password = ref("");
const showDialog = ref(false);
const recoveryEmail = ref("");
const newEmail = ref("");
const newPassword = ref("");

const login = async () => {
  try {
    const userCredential = await loginUser(email.value, password.value);
    const user = userCredential.user;
    const token = await user.getIdToken();
    localStorage.setItem("token", token);
    localStorage.setItem("email", email.value);

    router.push("/");
  } catch (err) {
    console.log(err);
    snackbarStore.openSnackbar(
      "Erro ao tentar logar! Tente novamente",
      "error"
    );
  }
};

const createAccount = async () => {
  try {
    const userCredential = await registerUser(
      newEmail.value,
      newPassword.value
    );
    const user = userCredential.user;
    const token = await user.getIdToken();
    localStorage.setItem("token", token);
    localStorage.setItem("email", newEmail.value);

    snackbarStore.openSnackbar("Conta criada com sucesso!", "success");
    router.push("/");
  } catch (err) {
    console.log(err);
    snackbarStore.openSnackbar("Erro ao criar conta! Tente novamente", "error");
  }
};

const showRecoveryDialog = () => {
  showDialog.value = true;
};

const toggleCreateAccount = () => {
  showCreateAccount.value = !showCreateAccount.value;
};
</script>

<style scoped>
.v-container {
  margin-top: 100px;
}
</style>
