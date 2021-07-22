<template>
    <div>
        <div class="loading-box" v-if="loading">
            <div class="flex content-center flex-wrap">
                <div class="w-full text-center">
                    <i
                        class="text-gray-700 fas fa-sync fa-spin text-center text-6xl"
                    ></i>
                    <div class="text-gray-700 text-center text-2xl mt-10">
                        Loading...
                    </div>
                </div>
            </div>
        </div>
        <div class="error-box" v-if="error">
            Error: {{error.message}}
        </div>
        <!-- <pre>{{updating}}</pre>
        <pre>{{pumps}}</pre> -->
        <div v-if="!loading">
            <div class="container mx-auto flex flex-wrap justify-center">
                <button 
                    class="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-green-500 hover:bg-green-700 my-4"
                    @click="createPump"
                >
                    Create a new pump
                </button>
            </div>
            <div class="container mx-auto flex flex-wrap justify-center">
                <transition-group
                    name="recipe-list-item"
                    class="container mx-auto flex flex-wrap justify-center"
                    tag="div"
                >
                    <div
                        v-for="(pump) in pumps"
                        :key="pump.id"
                        class="w-1/6 transition duration-1000 ease-in-out mb-4"
                    >
                        <Pump :pump="pump" :ingredients="ingredients" @delete="deletePump" />
                    </div>
                </transition-group>
            </div>
        </div>
    </div>
</template>

<script>
import Pump from '@pages/settings/components/Pump.vue';
import { ref, watch } from 'vue';
import { useQuery, useResult } from '@vue/apollo-composable';
import { useMutation } from '@utils/mutations.js';
import { useToast } from 'vue-toastification';
import gql from 'graphql-tag';
import { cloneDeep, xorWith } from 'lodash';

const Query = gql`
    query GetPumps {
        pumps(order_by: {id: asc}) {
            id
            ingredientId
            internalPin
            name @client
        }
        ingredients(order_by: {id: asc}) {
            id
            image
            title
        }
    }
`

const UpdatePump = gql`
    mutation UpdatePump($id: String!, $ingredientId: String!) {
        update_pumps(where: {id: {_eq: $id}}, _set: {ingredientId: $ingredientId}) {
            affected_rows
        }
    }
`

const CreatePump = gql`
    mutation CreatePump {
        insert_pumps(objects: {}) {
            returning {
                id
                ingredientId
            }
        }
    }
`

const DeletePump = gql`
    mutation DeletePump($id: String!) {
        delete_pumps(where: {id: {_eq: $id}}) {
            affected_rows
        }
    }
`

export default {
    components: {
        Pump
    },
    setup() {
        const toast = useToast();
        const creating = ref(false);
        const updating = ref(false);
        const deleting = ref(false);

        const { mutate: RunCreatePump } = useMutation(CreatePump, { trigger: creating, onDone: "Created a new pump" })
        const { mutate: RunUpdatePump } = useMutation(UpdatePump, { trigger: updating, onDone: "Updated pump" })
        const { mutate: RunDeletePump } = useMutation(DeletePump, { trigger: deleting, onDone: "Pump deleted" })

        const { result, loading, error } = useQuery(Query, {}, { pollInterval: 1000});
        const pumps = useResult(result, null, data => data.pumps);
        const ingredients = useResult(result, null, data => data.ingredients);

        // Initialize the name variable on pumps
        watch(pumps, (newValue, prevValue) => {
            let i = 0;
            for (let o of pumps.value) {
                i++;
                o["name"] = `Pump ${i}`;
            }
        })

        // Check for changes in pumps variables
        watch(
            () => (pumps.value != null)?pumps.value.map((o) => cloneDeep(o)):[],
            (newValue, prevValue) => {
                // Skip if we don't have any previous value
                if (prevValue == null) return;

                // Check for diff
                for (let pump1 of newValue) {
                    for (let pump2 of prevValue) {
                        // Check for matching id
                        if (pump1.id != pump2.id) continue;
                        
                        // Validation checks
                        if (pump1.ingredientId == null || pump1.ingredientId == pump2.ingredientId) break;
                        
                        // Start updating graphql
                        updating.value = true;
                        RunUpdatePump({
                            "id": pump1.id,
                            "ingredientId": pump1.ingredientId,
                        })

                        break
                    }
                }
            },
            {
                deep: true,
            }
        )

        return { toast, ingredients, creating, RunCreatePump, RunDeletePump, pumps, loading, error, updating, deleting }
    },
    methods: {
        createPump() {
            this.RunCreatePump()
        },
        deletePump({pump}) {
            this.RunDeletePump({ id: pump.id })
        }
    },
}
</script>
