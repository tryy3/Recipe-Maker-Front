<template>
    <div>
        <div>
            <recipe-editor :recipe="recipe">
                <div class="py-4 md:w-4/5 mx-auto">
                    <div class="flex items-center justify-between">
                        <button
                            class="transition duration-300 ease-in-out text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            :class="{
                                'bg-green-500': !creating,
                                'hover:bg-green-700': !creating,
                                'cursor-pointer': !creating,

                                'bg-gray-500': creating,
                                'cursor-wait': creating,
                                'opacity-75': creating
                            }"
                            type="button"
                            v-on:click="createRecipe"
                            :disabled="creating"
                        >
                            Create
                            <div class="lds-ring" v-if="creating">
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
import { CreateRecipe } from "@/graphql/recipes.gql";
import RecipeEditor from "@/components/RecipeEditor";

export default {
    components: {
        RecipeEditor
    },
    methods: {
        createRecipe() {
            this.creating = true;
            this.$apollo
                .mutate({
                    mutation: CreateRecipe,
                    variables: {
                        recipe: {
                            title: this.recipe.title,
                            description: this.recipe.description
                        }
                    }
                })
                .then(({ data }) => {
                    this.creating = false;
                    this.$toast.success("Created");
                    this.$router.push("/recipe/" + data.createRecipe.id);
                })
                .catch(err => {
                    this.creating = false;
                    console.log(err);
                    this.$toast.error(err);
                });
        }
    },
    data() {
        return {
            recipe: {
                image: "",
                title: "",
                description: ""
            },
            creating: false
        };
    }
};
</script>

<style></style>
