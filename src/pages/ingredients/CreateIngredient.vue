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
import { CreateIngredient, FindAllIngredients } from "@graphql/ingredients.gql";
import IngredientEditor from "@components/IngredientEditor.vue";
import { useToast } from 'vue-toastification';
import { useMutation } from '@vue/apollo-composable';
import { useRouter } from 'vue-router'
import { reactive, ref } from 'vue';

export default {
    setup() {
        const toast = useToast();
        const creating = ref(false);
        const router = useRouter();
        
        const ingredient = reactive({
            image: "",
            title: "",
            description: "",
        })

        const { mutate: RunCreateIngredient, onDone, onError } = useMutation(CreateIngredient)

        onDone(({data}) => {
            creating.value = false;
            toast.success("Created");
            router.push("/ingredient/" + data.insert_ingredients.returning[0].id);
        });
        onError((err) => {
            creating.value = false;
            console.log("Error", err)
            toast.error(err);
        });

        return { toast, router, RunCreateIngredient, creating, ingredient }
    },
    components: {
        IngredientEditor
    },
    methods: {
        createIngredient() {
            this.creating = true;
            this.RunCreateIngredient({
                ingredient: this.ingredient,
            }, {
                update: (cache, { data } ) => {
                    const cachedData = cache.readQuery({ query: FindAllIngredients});
                    if ((typeof cachedData) != "undefined" && cachedData != null) {
                        cache.writeQuery({query:FindAllIngredients, data: {
                            ...cachedData,
                            ingredients: [
                                ...cachedData.ingredients,
                                data.insert_ingredients.returning[0]
                            ]
                        }})
                    }
                }
            });
        }
    },
};
</script>

<style></style>
