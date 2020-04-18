const Foo = { template: "<div>foo</div>" };
const Bar = { template: "<div>bar</div>" };

import Ingredients from "@/pages/ingredients/Ingredients.vue";
import UpdateIngredient from "@/pages/ingredients/UpdateIngredient.vue";
import CreateIngredient from "@/pages/ingredients/CreateIngredient.vue";

import Recipes from "@/pages/recipes/Recipes.vue";
import UpdateRecipe from "@/pages/recipes/UpdateRecipe.vue";
import CreateRecipe from "@/pages/recipes/CreateRecipe.vue";

export default [
    // Ingredients routes
    {
        path: "/ingredients",
        component: Ingredients
    },
    {
        path: "/ingredient/create",
        component: CreateIngredient
    },
    {
        path: "/ingredient/:ID",
        component: UpdateIngredient
    },

    // Recipes routes
    {
        path: "/recipes",
        component: Recipes
    },
    {
        path: "/recipe/create",
        component: CreateRecipe
    },
    {
        path: "/recipe/:ID",
        component: UpdateRecipe
    }
];
