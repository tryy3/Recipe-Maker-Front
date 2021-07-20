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
        <div v-if="!loading">
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
import { FindRecipeWithID, UpdateRecipe, UpdateRecipeIngredient } from "@/graphql/recipes.gql";
import RecipeEditor from "@/components/RecipeEditor";
import { useToast } from 'vue-toastification';
import { useQuery, useResult, useMutation } from '@vue/apollo-composable';
import { useRoute } from 'vue-router'
import { watch, watchEffect, reactive, ref } from 'vue';
import {cloneDeep} from 'lodash';

export default {
    setup() {
        const toast = useToast();
        const route = useRoute();
        const saving = ref(false); // Keep track if we are saving or not

        // Initialize graphql mutations
        const { mutate: RunUpdateRecipe, onError: onErrorUpdateRecipe } = useMutation(UpdateRecipe)
        const { mutate: RunUpdateRecipeIngredient, onError: onErrorUpdateRecipeIngredient} = useMutation(UpdateRecipeIngredient)
        onErrorUpdateRecipe((err) => {
            console.log("Error saving", err)
            toast.error(err) // TODO: This may spam errors if there is multiple errors
        })
        onErrorUpdateRecipeIngredient((err) => {
            console.log("Error saving", err)
            toast.error(err) // TODO: This may spam errors if there is multiple errors
        })

        // Initialize graphql query
        const { result, loading, error } = useQuery(FindRecipeWithID, {
            id: route.params.ID,
        });
        const recipe = useResult(result, null, data => data.recipes[0]);

        // TODO: Maybe there is a better way to do this?
        // Create a copy of the ingredient so that we can edit it
        const recipeValue = recipe.value;
        const recipeIngredientsCopy = reactive([]);
        const recipeCopy = reactive({
            title: (recipeValue)?recipeValue.title:"",
            description: (recipeValue)?recipeValue.description:"",
            id: (recipeValue)?recipeValue.id:"",
            image: (recipeValue)?recipeValue.image:"",
            recipeIngredients: recipeIngredientsCopy,
        });
        watch(recipe, (newRecipe, prevRecipe) => {
            recipeCopy.title = newRecipe.title;
            recipeCopy.description = newRecipe.description;
            recipeCopy.id = newRecipe.id;
            recipeCopy.image = newRecipe.image;
            recipeCopy.title = newRecipe.title;

            recipeIngredientsCopy.splice(0);
            for (let recp of newRecipe.recipeIngredients) {
                recipeIngredientsCopy.push({...recp})
            }
        })

        // Check for changes and add them into a the mutationBatches array
        const mutationBatches = reactive({"recipe": {}, "recipeIngredients": {}}); // TODO: Maybe this doesn't need to be reactive...
        watch(
            () => cloneDeep(recipeCopy),
            (newRecipe, prevRecipe) => {
                // Skip if we don't have any previous records of the recipe (probably first time run)
                if (prevRecipe.id == "") return;

                // First check if the recipe data has changed
                if (
                    newRecipe.title != prevRecipe.title ||
                    newRecipe.description != prevRecipe.description ||
                    newRecipe.image != prevRecipe.image
                ) {
                    const recipeUpdate = {
                        title: newRecipe.title,
                        description: newRecipe.description,
                        image: newRecipe.image,
                    };
                    mutationBatches.recipe[newRecipe.id] = recipeUpdate;
                }

                // Check for changes in RecipeIngredients
                for (let newRecipeIngredient of newRecipe.recipeIngredients) {
                    for (let prevRecipeIngredient of prevRecipe.recipeIngredients) {
                        // Find matching ids
                        if (newRecipeIngredient.id == prevRecipeIngredient.id) {
                            const newValue = newRecipeIngredient;
                            const prevValue = prevRecipeIngredient;
                            // Check if anything has changed
                            if (
                                newValue.measurementType != prevValue.measurementType ||
                                newValue.measurementValue != prevValue.measurementValue
                            ) {
                                const recipeIngredientUpdate = {
                                    measurementType: newValue.measurementType,
                                    measurementValue:  newValue.measurementValue,
                                }
                                mutationBatches.recipeIngredients[newValue.id] = recipeIngredientUpdate;
                            }
                            break;
                        }
                    }
                }
            }, {
                deep: true
            }
        )

        return { toast, recipe: recipeCopy, error, loading, RunUpdateRecipe, RunUpdateRecipeIngredient, route, saving, mutationBatches }
    },
    components: {
        RecipeEditor,
    },
    methods: {
        async saveRecipe() {
            this.saving = true;
            // Run the updates
            for (let id in this.mutationBatches.recipe) {
                const update = this.mutationBatches.recipe[id];
                const data = await this.RunUpdateRecipe({id, recipe: {...update}});
                if (data == null) {
                    // TODO: Better error handling
                    // Cancel this process if an error has occured
                    this.saving = false;
                    return
                }
            }
            for (let id in this.mutationBatches.recipeIngredients) {
                const update = this.mutationBatches.recipeIngredients[id];
                const data = await this.RunUpdateRecipeIngredient({id, recipeIngredient: {...update}});
                if (data == null) {
                    // TODO: Better error handling
                    // Cancel this process if an error has occured
                    this.saving = false;
                    return
                }
            }

            // Finish up everything and clear the updates
            this.saving = false;
            this.toast.success("Recipe saved")
            this.mutationBatches.recipe = {};
            this.mutationBatches.recipeIngredients = {};
        }
    },
};
</script>

<style></style>
