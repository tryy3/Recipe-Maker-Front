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
        <div v-if="!$apollo.loading">
            <transition-group
                name="ingredient-list-item"
                class="container mx-auto flex flex-wrap justify-center"
            >
                <div
                    v-for="(ingredient, index) in ingredients"
                    :key="ingredient.id"
                    class="w-1/3 transition duration-1000 ease-in-out"
                >
                    <div
                        class="mx-4 my-4 rounded overflow-hidden shadow-lg relative"
                    >
                        <i
                            class="fas fa-times text-red-600 text-3xl cursor-pointer hover:text-red-700 transition-colors duration-300 ease-in-out absolute right-0 top-0 p-2"
                            @click="deleteIngredient"
                            :id="ingredient.id"
                            :index="index"
                        ></i>
                        <router-link v-bind:to="'/ingredient/' + ingredient.id">
                            <!--div v-for="(image, index) in images" :key="index">
                            <cld-image
                                :publicId="image"
                                width="auto"
                                crop="scale"
                            />
                        </div-->
                            <cld-image
                                :publicId="ingredient.image"
                                width="auto"
                                crop="scale"
                            />
                            <div class="px-6">
                                <div class="py-4">
                                    <div class="font-bold text-xl mb-2">
                                        {{ ingredient.title }}
                                    </div>
                                    <p
                                        class="text-gray-700 text-base break-words"
                                    >
                                        {{ ingredient.description }}
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
        <div v-if="$apollo.loading">Loading...</div>
    </div>
</template>

<script>
import {
    FindAllIngredients,
    DeleteIngredient
} from "../../graphql/queries.gql";

export default {
    methods: {
        deleteIngredient(e) {
            var id = e.target.getAttribute("id");
            this.$apollo
                .mutate({
                    mutation: DeleteIngredient,
                    variables: {
                        id
                    }
                })
                .then(({ data }) => {
                    this.ingredients.splice(e.target.getAttribute("index"), 1);
                    this.$toast.success("Deleted");
                })
                .catch(err => {
                    console.log(err);
                    this.$toast.error(err);
                });
        }
    },
    apollo: {
        ingredients: FindAllIngredients
    }
};
</script>

<style>
.ingredient-list-item-enter, .ingredient-list-item-leave-to
/* .ingredient-list-item-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
}
.ingredient-list-item-leave-active {
    position: absolute;
}
</style>
