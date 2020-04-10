<template>
    <div>
        <div class="loading-box" v-if="$apollo.loading">
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
        <div class="container mx-auto" v-if="!$apollo.loading">
            <div class="lds-ring" v-if="saving">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="w-full m-4 rounded overflow-hidden shadow-lg">
                <img
                    class=""
                    v-bind:src="ingredient.image"
                    alt="Sunset in the mountains"
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
                                    v-bind:value="ingredient.title"
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
                                    v-model="ingredient.description"
                                >
das</textarea
                                >
                            </div>
                        </div>
                    </div>
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
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import cloneDeep from "lodash/cloneDeep";
import {
    FindIngredientWithID,
    UpdateIngredient
} from "../../graphql/queries.gql";

export default {
    methods: {
        saveIngredient() {
            this.saving = true;
            this.$apollo
                .mutate({
                    mutation: UpdateIngredient,
                    variables: {
                        id: this.$route.params.ID,
                        ingredient: {
                            title: this.ingredient.title,
                            description: this.ingredient.description,
                            image: this.ingredient.image,
                            measurementType: this.ingredient.measurementType
                        }
                    }
                })
                .then(data => {
                    this.saving = false;
                    this.$toast.success("Saved");
                })
                .catch(err => {
                    this.saving = false;
                    console.log(err);
                    this.$toast.error(err);
                });
        }
    },
    apollo: {
        ingredient: {
            query: FindIngredientWithID,
            variables() {
                return {
                    id: this.$route.params.ID
                };
            }
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
