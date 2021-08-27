import axios from "axios";

export default {
    namespaced: true,

    state: {
        authenticated: false,
        user: null,
    },

    getters: {
        authenticated(state) {
            return state.authenticated;
        },

        user(state) {
            return state.user;
        },
    },

    mutations: {
        SET_AUTHENTICATED(state, payload) {
            state.authenticated = payload;
        },

        SET_USER(state, payload) {
            state.user = payload;
        },
    },

    actions: {
        async sign_in({ dispatch }, credentials) {
            await axios.get('/sanctum/csrf-cookie');
            await axios.post('/login', credentials, {
                headers: {
                    'Accept': 'application/json'
                }
            });

            return dispatch('me');
        },

        async sign_out({ dispatch }) {
            await axios.post('/logout');

            return dispatch('me');
        },

        async register({ dispatch }, credentials) {
            await axios.get('/sanctum/csrf-cookie');
            await axios.post('/register', credentials);

            return dispatch('me');
        },

        me({ commit }) {
            return axios.get('/api/user').then((response) => {
                commit('SET_AUTHENTICATED', true);
                commit('SET_USER', response.data);
            }).catch(() => {
                commit('SET_AUTHENTICATED', false);
                commit('SET_USER', null);
            });
        }
    }
}