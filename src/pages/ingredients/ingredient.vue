<template>
    <div class="container mx-auto ">
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
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="editor-title">
                                Title
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="editor-title" type="text" v-bind:value="ingredient.title">
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-3">
                        <div class="w-full px-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="editor-description">
                                Description
                            </label>
                            <textarea class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="editor-description" id="editor-description" cols="30" rows="10" v-model="ingredient.description">das</textarea>
                        </div>
                    </div>
                </div>
                <div class="py-4 md:w-4/5 mx-auto">
                    <div class="flex items-center justify-between">
                        <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" v-on:click="saveIngredient">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep';

export default {
    methods: {
        saveIngredient() {
            var id = this.$route.params.ID.toLowerCase();
            for (const i in this.$root._data.ingredients) {
                if (this.$root._data.ingredients[i].title.toLowerCase() == id) {
                    this.$root._data.ingredients[i] = cloneDeep(this.ingredient)
                    this.$root.createToast("success", "Saved");
                    return;
                }
            }
        }
    },
    data() {
        var data = {};
        var id = this.$route.params.ID.toLowerCase();
        for (const o of this.$root._data.ingredients) {
            if (o.title.toLowerCase() == id) {
                data["ingredient"] = cloneDeep(o);
                break;
            }
        }
        
        return data;
    }
};
</script>

<style></style>
