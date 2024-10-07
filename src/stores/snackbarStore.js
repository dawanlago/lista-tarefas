import { defineStore } from "pinia";

export const useSnackbarStore = defineStore("snackbarStore", {
    state: () => ({
        showSnackbar: false,
        message: "",
        color: "success",
    }),
    actions: {
        openSnackbar(message, color = "success") {
            this.message = message;
            this.color = color;
            this.showSnackbar = true;
        },
        closeSnackbar() {
            this.showSnackbar = false;
        },
    },
});