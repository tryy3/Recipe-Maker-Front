<template>
    <div>
        <div>
            <ingredient-editor :ingredient="ingredient">
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
                            v-on:click="createIngredient"
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
            </ingredient-editor>
        </div>
    </div>
</template>

<script>
import { CreateIngredient } from "@/graphql/ingredients.gql";
import IngredientEditor from "@/components/IngredientEditor";

export default {
    components: {
        IngredientEditor
    },
    methods: {
        createIngredient() {
            this.creating = true;
            this.$apollo
                .mutate({
                    mutation: CreateIngredient,
                    variables: {
                        ingredient: {
                            title: this.ingredient.title,
                            description: this.ingredient.description,
                            image: this.ingredient.image
                        }
                    }
                })
                .then(({ data }) => {
                    this.creating = false;
                    this.$toast.success("Created");
                    this.$router.push(
                        "/ingredient/" + data.createIngredient.id
                    );
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
            ingredient: {
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
