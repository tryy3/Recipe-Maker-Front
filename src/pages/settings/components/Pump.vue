<template>
    <div>
        <div class="overflow-visible mx-4 my-4 rounded overflow-hidden shadow-lg border-2 border-gray-300 relative h-full pb-4">
            <i
                class="fas fa-times text-red-600 text-3xl cursor-pointer hover:text-red-700 transition-colors duration-300 ease-in-out absolute right-0 top-0 p-2"
                :id="pump.id"
                :index="pump.id"
                aria-hidden="true"
                @click="clickDelete"
            ></i>
            <img src="https://res.cloudinary.com/ddsiiisuy/image/upload/dcibyoiapp5srcmjett6.jpg">
            <div class="px-4 mb-4">
                <div class="py-2">
                    <div class="font-bold text-xl mb-2">
                        {{pump.name}}
                    </div>
                </div>
                <div class="py-2">
                    <Listbox as="div" v-model="selected">
                        <ListboxLabel class="block text-sm font-bold text-gray-700">
                            Ingredient
                        </ListboxLabel>
                        <div class="mt-1 relative">
                            <ListboxButton class="relative w-full bg-white border border-gray-400 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                <span class="flex items-center">
                                    <template v-if="!selected.disabled">
                                        <img
                                            :src="cloudinaryImage(selected.image)"
                                            alt=""
                                            class="flex-shrink-0 h-6 w-6 rounded-full"
                                        />
                                        <span class="ml-3 block truncate">{{ selected.title }}</span>
                                    </template>
                                    <template v-else>
                                        <span class="block truncate">{{ selected.title }}</span>
                                    </template>
                                </span>
                                <span class="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                    <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </span>
                            </ListboxButton>

                            <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
                                <ListboxOptions class="absolute z-20 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                    <ListboxOption
                                        as="template"
                                        v-for="ingredient in ingredients"
                                        :key="ingredient.id"
                                        :value="ingredient"
                                        v-slot="{ active, selected }"
                                        >
                                        <li
                                            :class="[active ? 'text-white bg-indigo-600' : 'text-gray-900', 'cursor-default select-none relative py-2 pl-3 pr-9']"
                                            >
                                            <div class="flex items-center">
                                                <img
                                                    :src="cloudinaryImage(ingredient.image)"
                                                    alt=""
                                                    class="flex-shrink-0 h-6 w-6 rounded-full"
                                                />
                                                <span :class="[selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate']">
                                                    {{ ingredient.title }}
                                                </span>
                                            </div>

                                            <span v-if="selected" :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                                                <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                            </span>
                                        </li>
                                    </ListboxOption>
                                </ListboxOptions>
                            </transition>
                        </div>
                    </Listbox>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { CheckIcon, SelectorIcon } from '@heroicons/vue/solid'
import { ref, watch } from 'vue';

export default {
    components: {
        Listbox,
        ListboxButton,
        ListboxLabel,
        ListboxOption,
        ListboxOptions,
        CheckIcon,
        SelectorIcon,
    },
    setup(props) {
        const selected = ref({"title": "Select an ingredient", "disabled": true})
        if (props.pump.ingredientId) selected.value = props.ingredients.find((e) => e.id == props.pump.ingredientId)

        // Check if selected is changed
        watch(selected, (newValue, prevValue) => {
            props.pump.ingredientId = newValue.id
        })

        return {selected}
    },
    props: {
        ingredients: Object,
        pump: Object,
    },
    emits: ['delete'],
    methods: {
        clickDelete() {
            this.$emit('delete', {pump: this.pump});
        }
    }
}
</script>