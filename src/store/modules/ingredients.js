import gql from "graphql-tag";
import apolloClient from "../../apolloClient";
import { FindAllIngredients } from "../../graphql/queries.gql";

import { SAVE_INGREDIENTS, SET_INGREDIENTS } from "../mutations";

// initial state
const state = [];

const getters = {
    findIngredientWithID: (state) => (id) => {
        return state.find((ingredient) => ingredient.id == id);
    },
};

const actions = {
    saveIngredient(context, payload) {
        return new Promise((resolve, reject) => {
            context.commit(SAVE_INGREDIENTS, payload);
            context.dispatch(
                "toasts/createToast",
                { level: "success", message: "Saved" },
                { root: true }
            );
            resolve();
        });
    },
    async getIngredients(context) {
        console.log(context);
        const resp = await apolloClient.query({
            query: FindAllIngredients,
            /*query: gql`
                query {
                    ingredients {
                        id
                        description
                        title
                        image
                        measurementType
                    }
                }
            `,*/
        });
        context.commit(SET_INGREDIENTS, resp.data);
    },
};

const mutations = {
    [SAVE_INGREDIENTS](state, payload) {
        for (const key in state) {
            if (state[key].id.toLowerCase() == payload.ID) {
                state[key] = payload.ingredient;
            }
        }
    },
    [SET_INGREDIENTS](state, { ingredients }) {
        state.splice(0, state.length);
        for (let ingredient of ingredients) {
            state.push(ingredient);
        }
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
