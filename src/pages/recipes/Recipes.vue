<template>
    <div>
        <div class="loading-box" v-if="loading">
            <div class="flex content-center flex-wrap">
                <div class="w-full text-center">
                    <i
                        class="text-gray-700 fas fa-sync fa-spin text-center text-6xl"
                    ></i>
                    <div class="text-gray-700 text-center text-2xl mt-10">
                        Loading...
                    </div>
                </div>
            </div>
        </div>
        <div class="error-box" v-if="error">
            Error: {{error.message}}
        </div>
        <div v-if="!loading">
            <div class="container mx-auto flex flex-wrap justify-center">
                <router-link
                    to="/recipe/create"
                    class="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-green-500 hover:bg-green-700 my-4"
                    >Create a new recipe</router-link
                >
            </div>
            <transition-group
                name="recipe-list-item"
                class="container mx-auto flex flex-wrap justify-center"
                tag="div"
            >
                <div
                    v-for="(recipe, index) in recipes"
                    :key="recipe.id"
                    class="w-1/3 transition duration-1000 ease-in-out"
                >
                    <div
                        class="mx-4 my-4 rounded overflow-hidden shadow-lg relative"
                    >
                        <i
                            class="fas fa-times text-red-600 text-3xl cursor-pointer hover:text-red-700 transition-colors duration-300 ease-in-out absolute right-0 top-0 p-2"
                            @click="deleteRecipe"
                            :id="recipe.id"
                            :index="index"
                        ></i>
                        <router-link v-bind:to="'/recipe/' + recipe.id">
                            <img :src="cloudinaryImage(recipe.image)" />
                            <div class="px-6">
                                <div class="py-4">
                                    <div class="font-bold text-xl mb-2">
                                        {{ recipe.title }}
                                    </div>
                                    <p
                                        class="text-gray-700 text-base break-words"
                                    >
                                        {{ recipe.description }}
                                    </p>
                                </div>
                                <div class="py-4">
                                    <span
                                        class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
                                        >#photography</span
                                    >
                                    <span
                                        class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
                                        >#travel</span
                                    >
                                    <span
                                        class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
                                        >#winter</span
                                    >
                                </div>
                            </div>
                        </router-link>
                    </div>
                </div>
            </transition-group>
        </div>
        <div v-if="loading">Loading...</div>
    </div>
</template>

<script>
import { FindAllRecipes, DeleteRecipe } from "@graphql/recipes.gql";
import { useToast } from 'vue-toastification';
import { useQuery, useResult, useMutation } from '@vue/apollo-composable';

export default {
    setup() {
        const toast = useToast();

        const { mutate: RunDeleteRecipe, onDone, onError } = useMutation(DeleteRecipe)
        const { result, loading, error } = useQuery(FindAllRecipes);
        const recipes = useResult(result, null, data => data.recipes);
        
        onDone(() => {
            toast.success("Deleted");
        })
        onError((err) => {
            console.log("Error", err)
            toast.error(err)
        })

        return { toast, recipes, error, loading, RunDeleteRecipe }
    },
    methods: {
        deleteRecipe(e) {
            var id = e.target.getAttribute("id");
            this.RunDeleteRecipe({
                id,
            }, {
                update: (cache, { data } ) => {
                    const cachedData = cache.readQuery({ query: FindAllRecipes});
                    const newRecipes = cachedData.recipes.filter(
                        (recipe) => recipe.id != data.delete_recipes.returning[0].id
                    )
                    cache.writeQuery({ query: FindAllRecipes, data: {
                        ...cachedData,
                        recipes: [
                            ...newRecipes
                        ]
                    }})
                }
            })
        },
    },
};
</script>

<style>
.recipe-list-item-enter, .recipe-list-item-leave-to
/* .recipe-list-item-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
}
.recipe-list-item-leave-active {
    position: absolute;
}
</style>
