const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

import Ingredients from './pages/ingredients/Ingredients.vue'
import Ingredient from './pages/ingredients/Ingredient.vue'

export default [
    {
        path: '/ingredients',
        component: Ingredients,
    },
    {
        path: '/ingredient/:ID',
        component: Ingredient,
    },
    {
        path: '/bar',
        component: Bar,
    }
];