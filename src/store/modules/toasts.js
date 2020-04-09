import { DELETE_TOASTS, CREATE_TOASTS } from "../mutations";

import shortid from "shortid";

const defaultToastOptions = {
    level: "primary",
    message: "",
    timeout: 5000,
};

// initial state
const state = [];

const getters = {};

const actions = {
    deleteToast(context, id) {
        context.commit(DELETE_TOASTS, id);
    },
    createToast(context, payload) {
        const toast = { ...defaultToastOptions, ...payload };
        toast.id = shortid.generate();
        context.commit(CREATE_TOASTS, toast);
    },
};

const mutations = {
    [DELETE_TOASTS](state, id) {
        for (const i in state) {
            if (state[i].id == id) {
                state.splice(i, 1);
                return;
            }
        }
    },
    [CREATE_TOASTS](state, payload) {
        state.push(payload);
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
