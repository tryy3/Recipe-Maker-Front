import { getInstance } from "./index";

export const authGuard = (to, from, next) => {
    const authService = getInstance();

    const fn = () => {
        // If the user is authenticated, continue with the route
        console.log("Checking auth", authService);
        if (authService.isAuthenticated) {
            console.log("authenticated");
            return next();
        }

        // Otherwise, log in
        console.log("login");
        authService.loginWithRedirect({ appState: { targetUrl: to.fullPath } });
    };

    // If loading has already finished, check our auth state using `fn()`
    if (!authService.loading) {
        return fn();
    }

    // Watch for the loading property to change before we check isAuthenticated
    authService.$watch("loading", loading => {
        if (loading === false) {
            return fn();
        }
    });
};
