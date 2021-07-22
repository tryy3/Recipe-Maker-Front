<template>
    <div>
        <div class="container mx-auto">
            <div class="w-full m-4 rounded overflow-hidden shadow-lg">
                <upload-image
                    :url="[recipe.image]"
                    @successFileUpload="successFileUpload"
                    @failedFileUpload="failedFileUpload"
                />
                <div class="px-6">
                    <div class="py-4 md:w-4/5 mx-auto">
                        <div class="flex flex-wrap -mx-3 mb-6">
                            <div class="w-full px-3">
                                <label
                                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    for="editor-title"
                                >
                                    Title
                                </label>
                                <input
                                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="editor-title"
                                    type="text"
                                    v-model="recipe.title"
                                />
                            </div>
                        </div>
                        <div class="flex flex-wrap -mx-3">
                            <div class="w-full px-3">
                                <label
                                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    for="editor-description"
                                >
                                    Description
                                </label>
                                <textarea
                                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="editor-description"
                                    id="editor-description"
                                    cols="30"
                                    rows="10"
                                    v-model="recipe.description"
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="px-6">
                    <div class="py-4 md:w-4/5 mx-auto grid grid-cols-5 gap-4">
                        <div class="col-span-4">
                            <h2 class="font-bold text-2xl mb-2">
                                Modify or remove ingredients
                            </h2>
                            <div class="h-full">
                                <div class="grid grid-cols-3 gap-4">
                                    <draggable
                                        v-model="recipe.recipeIngredients"
                                        group="{name: 'recipeIngredients', pull: false, put: false}"
                                        @end="dragRemoveIngredient"
                                        tag="transition-group"
                                        :component-data="{name: 'list-group'}"
                                        item-key="id"
                                    >
                                        <template #item="{element}">
                                            <div
                                                class="list-group-item transition-opacity duration-700 ease-in-out"
                                                :id="element.id"
                                            >
                                                <i
                                                    class="fas fa-times text-red-600 text-3xl cursor-pointer hover:text-red-700 transition-colors duration-300 ease-in-out absolute right-0 top-0 p-2"
                                                    @click="deleteIngredientList"
                                                    :id="element.id"
                                                ></i>
                                                <div>
                                                    <img :src="cloudinaryImage(element.ingredient.image)" />
                                                </div>
                                                <div class="mt-4">
                                                    <h3 class="font-bold text-lg">
                                                        {{
                                                            element.ingredient.title
                                                        }}
                                                    </h3>
                                                </div>
                                                <div class="mt-4">
                                                    <label
                                                        class="block  cursor-pointer uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                        :for="
                                                            'measurementType-' +
                                                                element.id
                                                        "
                                                    >
                                                        Measurement Type
                                                    </label>
                                                    <div class="relative">
                                                        <select
                                                            class="block cursor-pointer appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            :id="
                                                                'measurementType-' +
                                                                    element.id
                                                            "
                                                            v-model="
                                                                element.measurementType
                                                            "
                                                        >
                                                            <option value="null"
                                                                >Select a
                                                                measurement
                                                                type</option
                                                            >
                                                            <option
                                                                v-for="(el,
                                                                key) in measurementTypes"
                                                                :key="key"
                                                                :value="key"
                                                            >
                                                                {{ el.name }}
                                                            </option>
                                                        </select>
                                                        <div
                                                            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
                                                        >
                                                            <svg
                                                                class="fill-current h-4 w-4"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 20 20"
                                                            >
                                                                <path
                                                                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                                                                />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="mt-4">
                                                    <label
                                                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                                        :for="
                                                            'measurementValue-' +
                                                                element.id
                                                        "
                                                    >
                                                        Measurement
                                                    </label>
                                                    <input
                                                        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                        :id="
                                                            'measurementValue-' +
                                                                element.id
                                                        "
                                                        v-model="
                                                            element.measurementValue
                                                        "
                                                        type="number"
                                                        placeholder="123123"
                                                    />
                                                </div>
                                            </div>
                                        </template>
                                    </draggable>
                                </div>
                            </div>
                        </div>

                        <div class="col-3">
                            <h2 class="font-bold text-2xl mb-2">
                                All ingredients
                            </h2>
                            
                            <div>
                                <draggable
                                    :list="listIngredients"
                                    group="{name: 'ingredients', pull: false, put: false}"
                                    @end="dragAddIngredient"
                                    tag="transition-group"
                                    :component-data="{name: 'list-group'}"
                                    item-key="id"
                                >
                                    <template #item="{element}">
                                        <div
                                            class="list-group-item transition duration-700 ease-in-out grid grid-cols-5"
                                            :id="element.id"
                                        >
                                            <div
                                                class="absolute right-0 top-0 bottom-0 flex flex-wrap content-center"
                                            >
                                                <i
                                                    class="fas fa-plus text-green-600 text-2xl cursor-pointer hover:text-green-700 transition-colors duration-300 ease-in-out p-2 align-middle"
                                                    @click="clickedAddIngredient"
                                                    :id="element.id"
                                                ></i>
                                            </div>
                                            <div>
                                                <img :src="cloudinaryImage(element.image)" />
                                            </div>
                                            <div class="col-span-4">
                                                <h3 class="font-bold text-lg mb-2">
                                                    {{ element.title }}
                                                </h3>
                                            </div>
                                        </div>
                                    </template>
                                </draggable>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mx-6"><slot> </slot></div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    //UpdateRecipe,
    AddRecipeIngredient,
    RemoveRecipeIngredient,
    UpdateRecipe,
    FindRecipeWithID
} from "@graphql/recipes.gql";
import { FindAllIngredients } from "@graphql/ingredients.gql";
import UploadImage from "@components/UploadImage.vue";
import Draggable from "vuedraggable";
import { useToast } from 'vue-toastification';
import { useQuery, useResult, useMutation } from '@vue/apollo-composable';
import { watch, watchEffect, ref } from 'vue';
import { useRoute } from 'vue-router'

// TODO: Set the correct name and prefix, maybe rename to shortName?
const measurementTypes = {
    // Volume - Base is liter
    TEASPOON: { name: "Teaspoon", prefix: "Teaspoon" },
    TABLESPOON: { name: "Tablespoon", prefix: "Tablespoon" },
    FLUIDOUNCE: { name: "Fluidounce", prefix: "Fluidounce" },
    GILL: { name: "Gill", prefix: "Gill" },
    CUP: { name: "Cup", prefix: "Cup" },
    PINT: { name: "Pint", prefix: "Pint" },
    QUART: { name: "Quart", prefix: "Quart" },
    MILLILITER: { name: "Milliliter", prefix: "Milliliter" },
    CENTERLITER: { name: "Centerliter", prefix: "Centerliter" },
    DECILITER: { name: "Deciliter", prefix: "Deciliter" },
    LITER: { name: "Liter", prefix: "Liter" },

    // Weight - Base is gram
    POUND: { name: "Pound", prefix: "Pound" },
    OUNCE: { name: "Ounce", prefix: "Ounce" },
    MILLIGRAM: { name: "Milligram", prefix: "Milligram" },
    GRAM: { name: "Gram", prefix: "Gram" },
    KILOGRAM: { name: "Kilogram", prefix: "Kilogram" }
};

export default {
    setup(props) {
        const toast = useToast();
        const route = useRoute();

        const { result, loading, error } = useQuery(FindAllIngredients);
        const ingredients = useResult(result, null, data => data.ingredients);

        // Initialize setup for RemoveRecipeIngredient graphql mutation
        const { mutate: RunRemoveRecipeIngredient, onDone: onDoneRemoveRecipeIngredient, onError: onErrorRemoveRecipeIngredient } = useMutation(RemoveRecipeIngredient)
        onDoneRemoveRecipeIngredient(() => {
            toast.success("Removed ingredient");
        })
        onErrorRemoveRecipeIngredient((err) => {
            console.log("Error", err);
            toast.error(err)
        })

        // Initialize setup for UpdateRecipe (used when uploading a image)
        const {mutate: RunUpdateRecipe, onError: onErrorUpdateRecipe } = useMutation(UpdateRecipe)
        onErrorUpdateRecipe((err) => {
            console.log("Error", err);
            toast.error(err)
        })

        // Initialize setup for AddRecipeIngredient graphql mutation
        const { mutate: RunAddRecipeIngredient, onDone: onDoneAddRecipeIngredient, onError: onErrorAddRecipeIngredient } = useMutation(AddRecipeIngredient)
        onDoneAddRecipeIngredient(() => {
            toast.success("Added ingredient");
        })
        onErrorAddRecipeIngredient((err) => {
            console.log("Error", err);
            toast.error(err)
        })
        
        // Create a filtered list of ingredients that doesn't include ingredients in this recipe
        const listIngredients = ref([]);
        watchEffect(() => {
            // Can't update anything if ingredients is null
            if (ingredients.value == null) return;
            if (
                (typeof props.recipe) == "undefined" || props.recipe == null ||
                (typeof props.recipe.recipeIngredients) == "undefined" || props.recipe.recipeIngredients == null
            ) {
                listIngredients.value = ingredients.value;
            } else {
                const recipeIngredients = props.recipe.recipeIngredients.map(
                    o => o.ingredient.id
                );

                listIngredients.value = ingredients.value.filter(
                    o => !recipeIngredients.includes(o.id)
                );
            }
        })

        return { toast, route, ingredients, loading, error, listIngredients, RunRemoveRecipeIngredient, RunAddRecipeIngredient, RunUpdateRecipe }
    },
    components: {
        UploadImage,
        Draggable
    },
    props: {
        recipe: Object
    },
    methods: {
        successFileUpload: async function(data) {
            // TODO: Redo this to support multiple images
            var image = data.public_id;

            // We are in the 
            if (this.route.name == "CreateRecipe") {
                this.recipe.image = image
            } else {
                const data = await this.RunUpdateRecipe({
                    id: this.route.params.ID,
                    recipe: {
                        image
                    }
                }, {
                    // TODO: Why do we need this here(?)
                    update: (cache, {data}) => {
                        cache.modify({
                            id: "recipes:"+this.recipe.id,
                            fields: {
                                image(t) {
                                    return data.update_recipes.returning[0].image;
                                }
                            }
                        })
                    }
                })
                if (data != null) {
                    this.toast.success("Image uploaded")
                }
            }
        },
        failedFileUpload: function({ statusText }) {
            this.toast.error(statusText);
        },
        addRecipeIngredient({ recipeId, ingredientId }) {
            this.RunAddRecipeIngredient({
                recipeId,
                ingredientId
            }, {
                update: (cache, {data}) => {
                    var recipeIngredient = data.insert_recipeIngredients.returning[0];
                    cache.modify({
                        id: "recipes:"+this.recipe.id,
                        fields: {
                            recipeIngredients(t) {
                                return [...t, recipeIngredient]
                            }
                        }
                    })
                }
            })
        },
        deleteRecipeIngredient({ recipeIngredientId }) {
            this.RunRemoveRecipeIngredient({
                recipeIngredientId
            }, {
                update: (cache, {data}) => {
                    const newRecipeIngredients = this.recipe.recipeIngredients.filter(
                        (ingredient) => ingredient.id != data.delete_recipeIngredients.returning[0].id
                    );
                    cache.modify({
                        id: "recipes:"+this.recipe.id,
                        fields: {
                            recipeIngredients(t) {
                                return [...newRecipeIngredients];
                            }
                        }
                    })
                }
            })
        },
        dragRemoveIngredient(element) {
            const id = element.item.getAttribute("id");
            this.deleteRecipeIngredient({recipeIngredientId: id})
        },
        dragAddIngredient(element) {
            this.addRecipeIngredient({
                recipeId: this.recipe.id,
                ingredientId: element.item.getAttribute("id")
            });
        },
        clickedAddIngredient(e) {
            let id = e.target.getAttribute("id");
            let ingredient = this.listIngredients.find(e => e.id == id);
            this.addRecipeIngredient({
                recipeId: this.recipe.id,
                ingredientId: ingredient.id
            });
        },
        deleteIngredientList(e) {
            let id = e.target.getAttribute("id");
            this.deleteRecipeIngredient({recipeIngredientId: id})
        }
    },
    data() {
        return {
            measurementTypes
        };
    }
};
</script>

<style>
.list-group-item:first-child {
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
}

.list-group-item {
    position: relative;
    display: block;
    padding: 0.75rem 1.25rem;
    margin-bottom: -1px;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.125);
}

.list-group-item {
    cursor: move;
}

.list-group-enter, .list-group-leave-to
/* .list-group-leave-active below version 2.1.8 */ {
    opacity: 0;
    /*transform: translateY(30px);*/
}
</style>
