<template>
  <v-dialog v-model="props.dialog" max-width="600px">
    <v-card>
      <v-card-title>Recuperar Senha</v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            v-model="localRecoveryEmail"
            label="Email"
            type="email"
            required
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="handlePasswordReset" color="primary">Enviar Email</v-btn>
        <v-btn @click="emit('update:dialog', false)">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { defineProps, defineEmits, watch } from "vue";
import { resetPassword } from "@/services/authService";
import { useSnackbarStore } from "@/stores/snackbarStore";

const props = defineProps({
  dialog: Boolean,
  recoveryEmail: String,
});

const emit = defineEmits(["update:dialog", "update:recoveryEmail"]);
const snackbarStore = useSnackbarStore();

const localRecoveryEmail = ref(props.recoveryEmail);

watch(localRecoveryEmail, (newVal) => {
  emit("update:recoveryEmail", newVal);
});

const handlePasswordReset = async () => {
  try {
    await resetPassword(localRecoveryEmail.value);
    snackbarStore.openSnackbar("Email de recuperação enviado!", "success");
    emit("update:dialog", false);
  } catch (err) {
    console.log(err);
    snackbarStore.openSnackbar("Erro ao enviar email de recuperação!", "error");
  }
};
</script>
