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
} from "@/graphql/ingredients.gql";
import IngredientEditor from "@/components/IngredientEditor";
import { useToast } from 'vue-toastification';

export default {
    setup() {
        const toast = useToast();
        return { toast }
    },
    components: {
        IngredientEditor,
        apolloLoading() {
            if ((typeof this.$apollo) == "undefined") return false;
            if ((typeof this.$apollo.loading) == "undefined") return false;
            return this.$apollo.loading;
        }
    },
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
                            description: this.ingredient.description
                        }
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
        ingredient: {
            query: FindIngredientWithID,
            variables() {
                return {
                    id: this.$route.params.ID
                };
            },
            update: data => data.ingredients[0]
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
