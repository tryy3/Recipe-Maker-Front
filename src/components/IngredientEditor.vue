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
import { UpdateIngredient } from "@graphql/ingredients.gql";
import UploadImage from "@components/UploadImage.vue";
import { useToast } from 'vue-toastification';
import { useMutation } from '@vue/apollo-composable'
import { useRoute } from 'vue-router'

export default {
    setup() {
        const toast = useToast();
        const route = useRoute();

        const { mutate: RunUpdateIngredient, onDone, onError } = useMutation(UpdateIngredient)

        onDone(() => {
            toast.success("Uploaded");
        })
        onError((err) => {
            console.log("error uploading image", err)
            toast.error(err)
        })

        return { toast, RunUpdateIngredient, route }
    },
    components: {
        UploadImage
    },
    props: {
        ingredient: Object
    },
    methods: {
        successFileUpload: function(data) {
            // TODO: Redo this to support multiple images
            var image = data.public_id;

            // We are in the 
            if (this.route.name == "CreateIngredient") {
                this.ingredient.image = image
            } else {
                console.log(this.route);
                this.RunUpdateIngredient({
                    id: this.route.params.ID,
                    ingredient: {
                        image
                    }
                })
            }
        },
        failedFileUpload: function({ statusText }) {
            this.toast.error(statusText);
        }
    }
};
</script>

<style></style>
