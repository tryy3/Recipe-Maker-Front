const Foo = { template: "<div>foo</div>" };
const Bar = { template: "<div>bar</div>" };

import Ingredients from "./pages/ingredients/Ingredients.vue";
import UpdateIngredient from "./pages/ingredients/UpdateIngredient.vue";
import CreateIngredient from "./pages/ingredients/CreateIngredient.vue";

export default [
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
    {
        path: "/bar",
        component: Bar
    }
];
