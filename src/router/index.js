import { createRouter, createWebHistory } from "vue-router";

const routes = [{
        path: '/',
        component: () =>
            import ('@/pages/index.vue'),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/login',
        component: () =>
            import ('@/pages/Login.vue'),
        meta: {
            requiresAuth: false,
        },
    },

];


const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem("token");

    if (to.meta.requiresAuth && !isAuthenticated) {
        next("/login");
    } else {
        next();
    }
});

router.onError((err, to) => {
    if (err?.message?.includes("Failed to fetch dynamically imported module")) {
        if (!localStorage.getItem("vuetify:dynamic-reload")) {
            console.log("Reloading page to fix dynamic import error");
            localStorage.setItem("vuetify:dynamic-reload", "true");
            location.assign(to.fullPath);
        } else {
            console.error("Dynamic import error, reloading page did not fix it", err);
        }
    } else {
        console.error(err);
    }
});

router.isReady().then(() => {
    localStorage.removeItem("vuetify:dynamic-reload");
});

export default router;
