const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

import Ingredients from './pages/ingredients/ingredients.vue'

export default [
    {
        path: '/ingredients',
        component: Ingredients,
    },
    {
        path: '/bar',
        component: Bar,
    }
];