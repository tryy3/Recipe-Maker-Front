<template>
    <div>
        <div v-for="(image, index) in images" :key="index">
            <img :src="cloudinaryImage(image)" />
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
        let widget = cloudinary.createUploadWidget(
            {
                cloudName: "ddsiiisuy",
                uploadPreset: "lffykqwj"
            },
            (error, result) => {
                if (error) {
                    this.$emit("failedFileUpload", error);
                } else {
                    if (result) {
                        if (result.event === "success") {
                            this.$emit("successFileUpload", result.info);
                        }
                    }
                }
            }
        );
        return {
            widget,
            uploading: false
        };
    },
    methods: {
        openFileUpload() {
            this.widget.open();
        }
    }
};
</script>

<style></style>
