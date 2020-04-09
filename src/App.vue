<template>
    <div id="app">
        <nav
            class="flex items-center justify-between flex-wrap bg-teal-500 p-6"
        >
            <div class="flex items-center flex-shrink-0 text-white mr-6">
                <svg
                    class="fill-current h-8 w-8 mr-2"
                    width="54"
                    height="54"
                    viewBox="0 0 54 54"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"
                    />
                </svg>
                <span class="font-semibold text-xl tracking-tight"
                    >Tailwind CSS</span
                >
            </div>
            <div class="block lg:hidden">
                <button
                    class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
                >
                    <svg
                        class="fill-current h-3 w-3"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <title>Menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                </button>
            </div>
            <div
                class="w-full block flex-grow lg:flex lg:items-center lg:w-auto"
            >
                <div class="text-sm lg:flex-grow">
                    <router-link
                        to="/bar"
                        class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
                        >Go to Bar</router-link
                    >
                    <router-link
                        to="/ingredients"
                        class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
                        >Ingredients</router-link
                    >
                </div>
            </div>
        </nav>
        <router-view></router-view>

        <div class="w-1/5 fixed right-0 bottom-0 mr-4">
            <transition-group name="slide-fade" appear>
                <Toast
                    v-for="toast of toasts"
                    v-bind:key="toast.id"
                    v-bind:toast="toast"
                />
            </transition-group>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Toast from "./components/Toast.vue";

export default {
    name: "app",
    components: {
        Toast,
    },
    computed: mapState({
        toasts: (state) => state.toasts,
    }),
    data() {
        return {
            //toasts: this.$root._data.toasts,
            msg: "Welcome to Your Vue.js App",
        };
    },
};
</script>

<style>
.slide-fade-enter-active {
    transition: all 0.8s cubic-bezier(1, 0.8, 0.5, 1);
}
.slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateX(30px);
    opacity: 0;
}
</style>
