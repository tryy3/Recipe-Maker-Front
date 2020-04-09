<template>
    <div>
        <div>
            h
            <div class="loading">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
        <div class="container mx-auto">
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
                                    'opacity-75': saving,
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
import { mapState, mapActions } from "vuex";
import cloneDeep from "lodash/cloneDeep";
import { FindIngredientWithID } from "../../graphql/queries.gql";

export default {
    methods: {
        saveIngredient() {
            if (this.saving) return;
            this.saving = true;
            this.$store
                .dispatch("ingredients/saveIngredient", {
                    ID: this.$route.params.ID,
                    ingredient: this.ingredient,
                })
                .then(() => (this.saving = false));
        },
    },
    apollo: {
        ingredient: {
            query: FindIngredientWithID,
            variables() {
                return {
                    id: this.$route.params.ID,
                };
            },
        },
    },
    data() {
        return {
            saving: false,
        };
    },
};
</script>

<style>
.loading {
    display: inline-block;
    position: relative;
    width: 50px;
    height: 50px;
}
.loading div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 50px;
    height: 50px;
    margin: 4px;
    border: 2px solid #ccc;
    border-radius: 50%;
    animation: spinner 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #ccc transparent transparent transparent;
}
.lds-ring {
    display: inline-block;
    position: relative;
    width: 15px;
    height: 15px;
}
.lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 15px;
    height: 15px;
    margin: 4px;
    border: 2px solid #fff;
    border-radius: 50%;
    animation: spinner 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #fff transparent transparent transparent;
}

.lds-ring div:nth-child(1),
.loading div:nth-child(1) {
    animation-delay: -0.45s;
}
.lds-ring div:nth-child(2),
.loading div:nth-child(1) {
    animation-delay: -0.3s;
}
.lds-ring div:nth-child(3, .loading div:nth-child(1)) {
    animation-delay: -0.15s;
}
@keyframes spinner {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
