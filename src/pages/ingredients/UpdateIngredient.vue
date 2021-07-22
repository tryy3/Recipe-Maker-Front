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
            <ingredient-editor :ingredient="ingredient">
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
                            v-on:click="saveIngredient"
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
            </ingredient-editor>
        </div>
    </div>
</template>

<script>
import {
    FindIngredientWithID,
    UpdateIngredient
} from "@graphql/ingredients.gql";
import IngredientEditor from "@components/IngredientEditor.vue";
import { useToast } from 'vue-toastification';
import { useQuery, useResult, useMutation } from '@vue/apollo-composable';
import { useRoute } from 'vue-router'
import { watch, reactive, ref } from 'vue';

export default {
    setup() {
        const toast = useToast();
        const route = useRoute();
        const saving = ref(false); // Keep track if we are saving or not

        const { mutate: RunUpdateIngredient, onDone, onError } = useMutation(UpdateIngredient)

        const { result, loading, error } = useQuery(FindIngredientWithID, {
            id: route.params.ID,
        });
        const ingredient = useResult(result, null, data => data.ingredients[0]);


        // TODO: Previously we had a "saving" loader, reimplement this with new tech
        onDone(() => {
            toast.success("Saved");
            console.log(saving);
            saving.value = false;
        })
        onError((err) => {
            console.log("Error saving", err)
            toast.error(err)
            saving.value = false;
        })

        // TODO: Maybe there is a better way to do this?
        // Create a copy of the ingredient so that we can edit it
        const ingredientValue = ingredient.value;
        const ingredientCopy = reactive({
            title: (ingredientValue)?ingredientValue.title:"",
            description: (ingredientValue)?ingredientValue.description:"",
            id: (ingredientValue)?ingredientValue.id:"",
            image: (ingredientValue)?ingredientValue.image:""
        });
        watch(ingredient, (newIngredient, prevIngredient) => {
            ingredientCopy.title = newIngredient.title;
            ingredientCopy.description = newIngredient.description;
            ingredientCopy.id = newIngredient.id;
            ingredientCopy.image = newIngredient.image;
            ingredientCopy.title = newIngredient.title;
        })

        return { toast, ingredient: ingredientCopy, error, loading, RunUpdateIngredient, route, saving }
    },
    components: {
        IngredientEditor,
    },
    methods: {
        saveIngredient() {
            this.saving = true;
            this.RunUpdateIngredient({
                id: this.route.params.ID,
                ingredient: {
                    title: this.ingredient.title,
                    description: this.ingredient.description,
                }
            })
        }
    },
};
</script>

<style></style>
