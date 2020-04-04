<template>
    <div
        v-if="show"
        class="border-l-4 p-4 w-full mb-4 cursor-pointer"
        v-bind:class="classes"
        role="alert"
        @click="removeToast"
    >
        <p>{{toast.message}}</p>
    </div>
</template>

<script>
export default {
    mounted() {
        this.timeoutID = setTimeout(() => {
            this.$root.removeToast(this._props.toast.id);
        }, this._props.toast.timeout);
    },
    data() {
        let classes = [];
        let color = "blue";
        switch(this._props.toast.level) {
            case "danger":
                color = "red";
                break;
            case "warning":
                color = "orange";
                break;
            case "success":
                color = "green";
                break;
        }
        classes.push("bg-"+color+"-100");
        classes.push("border-"+color+"-500");
        classes.push("text-"+color+"-700");

        return {
            classes,
            show: true,
        }
    },
    props: {
        toast: Object,
    },
    methods: {
        removeToast() {
            clearTimeout(this.timeoutID);
            this.$root.removeToast(this._props.toast.id);
        }
    }
};
</script>

<style>
</style>
