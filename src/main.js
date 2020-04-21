import "core-js/stable";
import "regenerator-runtime/runtime";

// Import Vue related imports
import Vue from "vue";
import VueRouter from "vue-router";
import VueApollo from "vue-apollo";
import VueToast from "vue-toast-notification";
import Cloudinary from "cloudinary-vue";

// Internal imports
import routes from "./routes/";
import App from "./App";
import apolloClient from "./apolloClient";

// Import auth.
import { domain, clientId, audience } from "./auth/auth_config.json";
import { Auth0Plugin, getInstance } from "./auth";

// Import global css styles
import "vue-toast-notification/dist/theme-default.css";
import "./styles/output.css";
import "./styles/base.css";

// Initialize Vue plugins
Vue.use(VueRouter);
Vue.use(VueApollo);
Vue.use(VueToast);
Vue.use(Cloudinary, {
    configuration: {
        cloudName: "ddsiiisuy"
    }
});
Vue.use(Auth0Plugin, {
    domain,
    clientId,
    audience,
    onRedirectCallback: appState => {
        router.push(
            appState && appState.targetUrl
                ? appState.targetUrl
                : window.location.pathname
        );
    }
});

// Create and initialize apollo
const apolloProvider = new VueApollo({
    defaultClient: apolloClient
});

// Initialize the router
const router = new VueRouter({
    mode: "history",
    routes
});

// Initialize Vue
new Vue({
    apolloProvider,
    router,
    el: "#app",
    render: h => h(App),
    methods: {}
});
