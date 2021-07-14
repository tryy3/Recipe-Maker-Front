// Middlewares
import { routeGuard, logoutAuth } from "@/auth/vue3_auth";

import Profile from "@/pages/user/Profile";

import Ingredients from "@/pages/ingredients/Ingredients.vue";
import UpdateIngredient from "@/pages/ingredients/UpdateIngredient.vue";
import CreateIngredient from "@/pages/ingredients/CreateIngredient.vue";

import Recipes from "@/pages/recipes/Recipes.vue";
import UpdateRecipe from "@/pages/recipes/UpdateRecipe.vue";
import CreateRecipe from "@/pages/recipes/CreateRecipe.vue";

export default [
    // User routes
    {
        path: "/profile",
        name: "profile",
        component: Profile,
        beforeEnter: routeGuard
    },

    // Ingredients routes
    {
        path: "/ingredients",
        component: Ingredients,
        beforeEnter: routeGuard
    },
    {
        path: "/ingredient/create",
        component: CreateIngredient,
        beforeEnter: routeGuard
    },
    {
        path: "/ingredient/:ID",
        component: UpdateIngredient,
        beforeEnter: routeGuard
    },

    // Recipes routes
    {
        path: "/recipes",
        component: Recipes,
        beforeEnter: routeGuard
    },
    {
        path: "/recipe/create",
        component: CreateRecipe,
        beforeEnter: routeGuard
    },
    {
        path: "/recipe/:ID",
        component: UpdateRecipe,
        beforeEnter: routeGuard
    },
];
