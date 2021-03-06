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
            <recipe-editor :recipe="recipe">
                <div class="py-4 md:w-4/5 mx-auto">
                    <div class="flex items-center justify-between">
                        <button
                            class="transition transition duration-300 ease-in-out text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            :class="{
                                'bg-green-500': !saving,
                                'hover:bg-green-700': !saving,
                                'cursor-pointe': !saving,

                                'bg-gray-500': saving,
                                'cursor-wait': saving,
                                'opacity-75': saving
                            }"
                            type="button"
                            v-on:click="saveRecipe"
                            :disabled="saving"
                        >
                            Save
                            <div class="lds-ring" v-if="saving">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </button>
                    </div>
                </div>
            </recipe-editor>
        </div>
    </div>
</template>

<script>
import { FindRecipeWithID, UpdateRecipe } from "@/graphql/recipes.gql";
import RecipeEditor from "@/components/RecipeEditor";
import { useToast } from 'vue-toastification';

export default {
    setup() {
        const toast = useToast();
        return { toast }
    },
    components: {
        RecipeEditor,
        apolloLoading() {
            if ((typeof this.$apollo) == "undefined") return false;
            if ((typeof this.$apollo.loading) == "undefined") return false;
            return this.$apollo.loading;
        }
    },
    methods: {
        saveRecipe() {
            this.saving = true;

            let recipe = {
                description: this.recipe.description,
                title: this.recipe.title,
                ingredients: this.recipe.ingredients.map(o => ({
                    id: o.id,
                    measurementType: o.measurementType,
                    measurementValue: o.measurementValue
                }))
            };

            this.$apollo
                .mutate({
                    mutation: UpdateRecipe,
                    variables: {
                        id: this.$route.params.ID,
                        recipe: recipe
                    }
                })
                .then(data => {
                    this.saving = false;
                    this.toast.success("Saved");
                })
                .catch(err => {
                    this.saving = false;
                    console.log(err);
                    this.toast.error(err);
                });
        }
    },
    apollo: {
        recipe: {
            query: FindRecipeWithID,
            variables() {
                return {
                    id: this.$route.params.ID
                };
            },
            update: data => data.recipes[0]
        }
    },
    data() {
        return {
            saving: false
        };
    }
};
</script>

<style></style>
