<template>
    <div>
        <input
            type="file"
            :name="name"
            class="hidden"
            accept="image/*"
            :multiple="!multiple"
            @change="attemptFileUpload"
        />

        <div v-for="(image, index) in images" :key="index">
            <cld-image :publicId="image || ''" width="auto" crop="scale" />
        </div>

        <div class="flex flex-wrap justify-center my-2">
            <button
                class="transition duration-300 ease-in-out text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                :class="{
                    'bg-blue-500': !uploading,
                    'hover:bg-blue-700': !uploading,
                    'cursor-pointer': !uploading,

                    'bg-gray-500': uploading,
                    'cursor-wait': uploading,
                    'opacity-75': uploading
                }"
                @click="openFileUpload"
                type="button"
                :disabled="uploading"
            >
                Upload Image
                <div class="lds-ring" v-if="uploading">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </button>
        </div>
    </div>
</template>

<script>
import { UploadFiles } from "@/graphql/ingredients.gql";

export default {
    props: {
        url: {
            type: [String, Array],
            required: true,
            default: null
        },
        name: {
            type: String,
            required: false,
            default: "images[]"
        },
        max_files: {
            type: Number,
            required: false,
            default: 1
        },
        max_filesize: {
            type: Number,
            required: false,
            default: 8000
        }
    },
    computed: {
        images() {
            var images = [];
            if (this.$props.url instanceof String) {
                images = [this.$props.url];
            } else {
                images = this.$props.url;
            }
            return images;
        },
        multiple() {
            return this.$props.max_files > 1;
        }
    },
    data() {
        return {
            uploading: false
        };
    },
    methods: {
        openFileUpload() {
            // TODO: Maybe some events here? BeforeClick, AfterClick....
            document
                .querySelector(
                    "input[type='file'][name='" + this.$props.name + "']"
                )
                .click();
        },
        attemptFileUpload(e) {
            this.uploading = true;
            const fileList = e.target.files;
            this.$emit("beforeFileUpload", fileList);

            this.$apollo
                .mutate({
                    mutation: UploadFiles,
                    variables: {
                        files: fileList
                    }
                })
                .then(data => {
                    this.$emit("successFileUpload", data);
                })
                .catch(err => {
                    this.$emit("failedFileUpload", err, fileList);
                })
                .finally(() => {
                    this.$emit("afterFileUploaded", fileList);
                    this.uploading = false;
                });
        }
    }
};
</script>

<style></style>
