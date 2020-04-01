<template>
    <div class="container mx-auto flex flex-wrap justify-center">
        <div
            v-for="(ingredient, index) in ingredients"
            :key="index"
            class="w-1/3"
        >
            <div class="mx-4 my-4 rounded overflow-hidden shadow-lg">
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
            </div>
        </div>
    </div>
</template>

<script>
const ingredients = [
    {
        description: "barfoo",
        title: "hello",
        image: "https://i.ytimg.com/vi/UJluYVGlv5Q/maxresdefault.jpg",
        measurementType: "kg"
    },
    {
        description:
            "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        title: "hello",
        image: "https://i.ytimg.com/vi/UJluYVGlv5Q/maxresdefault.jpg",
        measurementType: "kg"
    },
    {
        description: "barfoo",
        title: "hello",
        image: "https://i.ytimg.com/vi/UJluYVGlv5Q/maxresdefault.jpg",
        measurementType: "kg"
    },
    {
        description: "barfoo",
        title: "hello",
        image: "https://i.ytimg.com/vi/UJluYVGlv5Q/maxresdefault.jpg",
        measurementType: "kg"
    },
    {
        description: "barfoo",
        title: "hello",
        image: "https://i.ytimg.com/vi/UJluYVGlv5Q/maxresdefault.jpg",
        measurementType: "kg"
    }
];

export default {
    data() {
        return {
            ingredients
        };
    }
};
</script>

<style></style>
