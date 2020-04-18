<template>
    <div>
        <div class="container mx-auto">
            <div class="w-full m-4 rounded overflow-hidden shadow-lg">
                <upload-image
                    :url="[ingredient.image]"
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
                                    v-model="ingredient.title"
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
                                ></textarea>
                            </div>
                        </div>
                    </div>
                    <slot> </slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { UpdateIngredient } from "@/graphql/ingredients.gql";
import UploadImage from "@/components/UploadImage.vue";

export default {
    components: {
        UploadImage
    },
    props: {
        ingredient: Object
    },
    methods: {
        successFileUpload: function({ data }) {
            // TODO: Redo this to support multiple images
            var image = data.uploadFiles[0].id;

            this.$apollo
                .mutate({
                    mutation: UpdateIngredient,
                    variables: {
                        id: this.$route.params.ID,
                        ingredient: {
                            image
                        }
                    }
                })
                .then(data => {
                    this.$toast.success("Uploaded");
                })
                .catch(err => {
                    this.$toast.error(err);
                });
        },
        failedFileUpload: function(err, files) {
            this.$toast.error(err);
        }
    }
};
</script>

<style></style>
