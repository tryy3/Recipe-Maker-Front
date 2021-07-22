import "core-js/stable";
import "regenerator-runtime/runtime";

// Import Vue related imports
import { createApp, provide, h } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import Toast from "vue-toastification";
import Cloudinary from "./plugins/cloudinary";
import { DefaultApolloClient } from '@vue/apollo-composable'

// Internal imports
import routes from "./routes/";
import App from "./App.vue";
import apolloClient from "./apolloClient";

// Import auth.
import authConfig from './auth/auth_config.json';
import { setupAuth } from './auth';

// Import global css styles
import "vue-toastification/dist/index.css";
import "./tailwind.css";
import "./styles/base.css";

// Initialize the router
const router = createRouter({
    history: createWebHistory(),
    routes,
})

const app = createApp({
    setup() {
        provide(DefaultApolloClient, apolloClient);
    },
    render: () => h(App),
});

// Initialize Vue plugins
app.use(router);
app.use(Toast, {});
app.use(Cloudinary, {
    configuration: {
        cloudName: "ddsiiisuy"
    }
});

// Configure authentication
function callbackRedirect(appState) {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : '/'
    );
}
  
setupAuth(authConfig, callbackRedirect).then((auth) => {
    app.use(auth).mount('#app')
})