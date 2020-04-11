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
        <div
            class="container mx-auto flex flex-wrap justify-center"
            v-if="!$apollo.loading"
        >
            <div
                v-for="(ingredient, index) in ingredients"
                :key="index"
                class="w-1/3"
            >
                <div class="mx-4 my-4 rounded overflow-hidden shadow-lg">
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
                                <p class="text-gray-700 text-base break-words">
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
        </div>
        <div v-if="$apollo.loading">Loading...</div>
    </div>
</template>

<script>
import { FindAllIngredients } from "../../graphql/queries.gql";

export default {
    apollo: {
        ingredients: FindAllIngredients
    }
};
</script>

<style></style>
