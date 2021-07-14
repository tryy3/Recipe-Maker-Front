<template>
    <div>
        <div class="loading-box" v-if="apolloLoading">
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
        <div v-if="!apolloLoading">
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
                            <!--div v-for="(image, index) in images" :key="index">
                            <cld-image
                                :publicId="image"
                                width="auto"
                                crop="scale"
                            />
                        </div-->
                            <cld-image
                                :publicId="
                                    recipe.image || '/samples/animals/cat.jpg'
                                "
                                width="auto"
                                crop="scale"
                            />
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
        <div v-if="apolloLoading">Loading...</div>
    </div>
</template>

<script>
import { FindAllRecipes, DeleteRecipe } from "@/graphql/recipes.gql";
import { useToast } from 'vue-toastification';

export default {
    setup() {
        const toast = useToast();
        return { toast }
    },
    computed: {
        apolloLoading() {
            if ((typeof this.$apollo) == "undefined") return false;
            if ((typeof this.$apollo.loading) == "undefined") return false;
            return this.$apollo.loading;
        }
    },
    methods: {
        deleteRecipe(e) {
            console.log(this);
            var id = e.target.getAttribute("id");
            this.$apollo
                .mutate({
                    mutation: DeleteRecipe,
                    variables: {
                        id
                    }
                })
                .then(({ data }) => {
                    this.recipes.splice(e.target.getAttribute("index"), 1);
                    this.toast.success("Deleted");
                })
                .catch(err => {
                    console.log(err);
                    this.toast.error(err);
                });
        }
    },
    apollo: {
        recipes: FindAllRecipes
    }
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
