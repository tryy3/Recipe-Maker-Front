<template>
    <div>
        <div>
            <recipe-editor :recipe="recipe">
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
                            v-on:click="createRecipe"
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
            </recipe-editor>
        </div>
    </div>
</template>

<script>
import { CreateRecipe, FindAllRecipes } from "@/graphql/recipes.gql";
import RecipeEditor from "@/components/RecipeEditor";
import { useToast } from 'vue-toastification';
import { useMutation } from '@vue/apollo-composable';
import { useRouter } from 'vue-router'
import { reactive, ref } from 'vue';

export default {
    setup() {
        const toast = useToast();
        const creating = ref(false);
        const router = useRouter();
        
        const recipe = reactive({
            description: "",
            image: "",
            title: "",
            recipeIngredients: []
        })

        const { mutate: RunCreateRecipe, onDone, onError } = useMutation(CreateRecipe)

        onDone(({data}) => {
            creating.value = false;
            toast.success("Created");
            router.push("/recipe/" + data.insert_recipes.returning[0].id);
        });
        onError((err) => {
            creating.value = false;
            console.log("Error", err)
            toast.error(err);
        });

        return { toast, router, RunCreateRecipe, creating, recipe }
    },
    components: {
        RecipeEditor
    },
    methods: {
        createRecipe() {
            this.creating = true;
            this.RunCreateRecipe({
                recipe: this.recipe,
            }, {
                update: (cache, { data } ) => {
                    const cachedData = cache.readQuery({ query: FindAllRecipes});
                    if ((typeof cachedData) != "undefined" && cachedData != null) {
                        cache.writeQuery({query:FindAllRecipes, data: {
                            ...cachedData,
                            recipes: [
                                ...cachedData.recipes,
                                data.insert_recipes.returning[0]
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
