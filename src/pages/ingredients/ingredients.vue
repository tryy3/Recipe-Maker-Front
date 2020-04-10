<template>
    <div>
        <div class="loading-box" v-if="$apollo.loading">
            <div>
                <div id="floatingCirclesG">
                    <div class="f_circleG" id="frotateG_01"></div>
                    <div class="f_circleG" id="frotateG_02"></div>
                    <div class="f_circleG" id="frotateG_03"></div>
                    <div class="f_circleG" id="frotateG_04"></div>
                    <div class="f_circleG" id="frotateG_05"></div>
                    <div class="f_circleG" id="frotateG_06"></div>
                    <div class="f_circleG" id="frotateG_07"></div>
                    <div class="f_circleG" id="frotateG_08"></div>
                </div>
                <div class="text-gray-700 text-center text-2xl">Loading...</div>
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
                        <img
                            class=""
                            v-bind:src="ingredient.image"
                            alt="Sunset in the mountains"
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
