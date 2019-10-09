import Vue from 'vue';
import Vuex from 'vuex';
import * as types from './mutation-types'
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: null,
        messages: []
    },
    mutations: {
        [types.SIGN_IN](state, userPayload) {
            state.user = userPayload
        },
        [types.SIGN_OUT](state) {
            state.user = null
        },
        [types.SET_MESSAGES](state, messages) {
            state.messages = messages
        },
    },
    actions: {
        signIn({ commit }, user_payload) {
            commit(types.SIGN_IN, user_payload)
        },
        signOut({ commit }) {
            commit(types.SIGN_OUT)
        },
        setMessages({ commit }, messages) {
            commit(types.SET_MESSAGES, messages);
        }
    }
})