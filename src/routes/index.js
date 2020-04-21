// Middlewares
import { authGuard } from "@/auth/authGuard";

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
        beforeEnter: authGuard
    },

    // Ingredients routes
    {
        path: "/ingredients",
        component: Ingredients,
        beforeEnter: authGuard
    },
    {
        path: "/ingredient/create",
        component: CreateIngredient,
        beforeEnter: authGuard
    },
    {
        path: "/ingredient/:ID",
        component: UpdateIngredient,
        beforeEnter: authGuard
    },

    // Recipes routes
    {
        path: "/recipes",
        component: Recipes,
        beforeEnter: authGuard
    },
    {
        path: "/recipe/create",
        component: CreateRecipe,
        beforeEnter: authGuard
    },
    {
        path: "/recipe/:ID",
        component: UpdateRecipe,
        beforeEnter: authGuard
    }
];
