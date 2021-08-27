<template>
    <div class="discovery-page">
        <h1 class="text-5xl font-bold text-gray-700">Discover your favourites.</h1>
        <div class="options-bar mt-10 relative">
            <div class="flex-1 flex space-x-4 overflow-x-auto">
                <button @click="activate_category(category.id)" v-for="category in categories" :key="category.id" :class="[active_category == category.id ? 'bg-green-500 text-white hover:bg-green-400' : 'bg-gray-200 text-gray-700 hover:bg-gray-100']" class="px-4 py-2 rounded-full font-semibold transition duration-300 focus:outline-none">{{ category.title }}</button>
            </div>
            <div class="absolute inset-y-0 right-0 xl:flex space-x-4 hidden">
                <button @click="view_filter()" :class="[!view_filters ? 'text-gray-700 bg-gray-200 hover:bg-gray-100' : 'text-white bg-green-500 hover:bg-green-400']" class="px-3 py-2 rounded text-xl transition duration-300 focus:outline-none"><Icon icon="list"></Icon></button>
                <button @click="view_filter()" :class="[view_filters ? 'text-gray-700 bg-gray-200 hover:bg-gray-100' : 'text-white bg-green-500 hover:bg-green-400']" class="px-3 py-2 rounded text-xl transition duration-300 focus:outline-none"><Icon icon="th"></Icon></button>
            </div>
        </div>
        <div class="mt-10 xl:divide-y">
            <div v-for="product in products" :key="product.id" class="w-full xl:flex hidden relative">
                <router-link :to="{name: 'Product', params: { product_id: product.id }}" class="flex">
                    <div class="w-48 h-48 bg-contain bg-no-repeat bg-center" :style="'background-image: url('+ product.images[0].path +');'"></div>
                    <div class="flex items-center min-w-250 ml-10">
                        <span class="text-2xl font-bold text-gray-700">{{ product.title }} <br>
                            <span class="font-light">{{ product.price }} €</span>
                        </span>
                    </div>
                    <div class="flex items-center max-w-md min-w-md ml-10">
                        <p class="text-gray-700 font-normal">{{ product.description }}</p>
                    </div>
                </router-link>
                <div class="absolute right-0 h-full flex items-center">
                    <button class="block text-center border-2 rounded-xl w-full py-2 px-4 border-green-500 hover:border-green-400 text-green-500 hover:text-green-400 transition duration-300 focus:outline-none">Add to Cart</button>
                </div>
            </div>
            <div class="xl:hidden grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <div v-for="product in products" :key="product.id" class="text-center mx-auto">
                    <router-link :to="{name: 'Product', params: { product_id: product.id }}" class="grid">
                        <div class="bg-no-repeat bg-center bg-contain h-64 w-64" :style="'background-image: url('+ product.images[0].path +');'"></div>
                        <div>
                            <span class="text-gray-700 font-bold text-2xl">{{ product.title }} <br>
                                <span class="font-light">{{ product.price }} €</span>
                            </span>
                        </div>
                    </router-link>
                    <div class="mt-5">
                         <button class="block text-center border-2 rounded-xl w-full py-2 px-4 border-green-500 hover:border-green-400 text-green-500 hover:text-green-400 transition duration-300 focus:outline-none">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        created() {
            this.fetch_categories();
            // this.fetch_discovery();
            this.get_products();
        },

        data() {
            return {
                view_filters: true,
                active_category: null,
            }
        },

        computed: {
            ...mapGetters({
                categories: 'categories',
                // discovery: 'discovery',
                products: 'products',
            }),
        },

        methods: {
            ...mapActions({
                fetch_categories: 'fetch_categories',
                fetch_discovery: 'fetch_discovery',
                fetch_products: 'fetch_products',
            }),

            view_filter() {
                this.view_filters = !this.view_filters;
            },

            get_products() {
                this.fetch_products();
            },

            get_discovery(id = null) {
                this.fetch_discovery(id);
            },

            activate_category(id) {
                if (id == this.active_category) {
                    this.active_category = null;
                    // this.get_discovery();
                } else {
                    this.active_category = id;
                    // this.get_discovery(id);
                }
            },

            // activate_category(id) {
            //     if (id == this.active_category) {
            //         this.active_category = null;
            //         this.get_products();
            //     } else {
            //         this.active_category = id;
            //         this.get_products(id);
            //     }
            // },
        }
    }
</script>