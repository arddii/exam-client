import axios from 'axios';
import { createStore } from 'vuex';
import auth from './auth.js';

export default createStore({
    modules: {
        auth,
    },

    state: {
        categories: null,
        products: null,
        product: null,
        discovery: null,
    },

    getters: {
        categories(state) {
            return state.categories;
        },

        products(state) {
            return state.products;
        },

        product(state) {
            return state.product;
        },

        discovery(state) {
            return state.discovery;
        }
    },

    mutations: {
        SET_CATEGORIES(state, payload) {
            state.categories = payload;
        },

        SET_PRODUCTS(state, payload) {
            state.products = payload;
        },

        SET_PRODUCT(state, payload) {
            state.product = payload;
        },

        SET_DISCOVERY(state, payload) {
            state.discovery = payload;
        }
    },

    actions: {
        async fetch_categories({ commit }) {
            await axios.get('/api/categories').then((response) => {
                commit('SET_CATEGORIES', response.data.data);
            });
        },

        async fetch_products({ commit }) {

            await axios.get('/api/products').then((response) => {
                commit('SET_PRODUCTS', response.data.data);
            });
        },

        async fetch_product({ commit }, id) {
            await axios.get('/api/products/' + id).then((response) => {
                commit('SET_PRODUCT', response.data.data);
            });
        },

        async fetch_discovery({ commit }, category) {
            if (!category) category = '';

            axios.get('/api/discovery/' + category).then((response) => {
                commit('SET_DISCOVERY', response.data.data);
            });
        }
    },
});
