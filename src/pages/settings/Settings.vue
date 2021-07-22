<template>
    <div class="z-10">
        <Pumps :ingredients="ingredients" :settings="pumps">

        </Pumps>
    </div>
</template>

<script>
import { ref } from 'vue';
import Pumps from '@pages/settings/components/Pumps.vue';

export default {
    components: {
        Pumps
    },
    setup() {
        const pumps = [
            {
                id: "",
                name: "pump 1",
                ingredientId: "27D4y9dr",
                internalPin: "abc123",
            },
            {
                id: "",
                name: "pump 1",
                ingredientId: "27D4y9dr",
                internalPin: "abc123",
            },
            {
                id: "",
                name: "pump 1",
                ingredientId: "27D4y9dr",
                internalPin: "abc123",
            },
            {
                id: "",
                name: "pump 1",
                ingredientId: "27D4y9dr",
                internalPin: "abc123",
            },
            {
                id: "",
                name: "pump 1",
                ingredientId: "27D4y9dr",
                internalPin: "abc123",
            },
            {
                id: "",
                name: "pump 1",
                ingredientId: "27D4y9dr",
                internalPin: "abc123",
            },
            {
                id: "",
                name: "pump 1",
                ingredientId: "27D4y9dr",
                internalPin: "abc123",
            },
        ]

        const ingredients = [{
            description:"foobar",
            id:"27D4y9dr",
            image:"dcibyoiapp5srcmjett6",
            title:"test"
        }, {
            description:"Febor",
            id:"7HcIHMFw",
            image:"",
            title:"Tjenix"
        }, {
            description:"Febor",
            id:"7HcIHMFw1",
            image:"",
            title:"Tjenix"
        }, {
            description:"Febor",
            id:"7HcIHMFw2",
            image:"",
            title:"Tjenix"
        }
        ]

        return { pumps, ingredients }
    }
};
</script>

<style></style>
