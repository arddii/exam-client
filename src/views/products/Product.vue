<template>
    <div class="product-page" v-if="product">
        <h1 class="text-5xl font-bold text-gray-700">{{ product.title  }}</h1>
        <div class="flex-1 flex space-x-4 overflow-x-auto mt-10">
            <span v-for="category in product.categories" :key="category.id" class="bg-gray-200 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-full font-semibold transition duration-300 focus:outline-none">{{ category.title }}</span>
            <span class="bg-red-400 text-white hover:bg-red-300 px-4 py-2 rounded-full font-semibold transition duration-300 focus:outline-none">{{ product.price }} €</span>
        </div>
        <div class="block md:flex w-full">
            <div class="flex w-full md:w-1/2">
                <div class="bg-no-repeat bg-center bg-contain h-96 w-96 mx-auto" :style="'background-image: url('+ product.images[0].path +');'"></div>
            </div>
            <div class="block w-full md:w-1/2 items-center text-gray-700 mt-5">
                <div class="text-center md:text-left">Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita quidem libero ad atque architecto iste ea repellat quo nihil provident.</div>
                <table class="min-w-full divide-y divide-gray-200 mt-5 md:mx-0 mx-auto">
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr class="">
                            <td class="px-6 py-4 whitespace-nowrap">Spiciness</td>
                            <td class="px-6 py-4 whitespace-nowrap"><b>{{ product.spice }}</b> <Icon icon="pepper-hot"></Icon></td>
                        </tr>
                        <tr class="">
                            <td class="px-6 py-4 whitespace-nowrap">Vegan</td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <Icon v-if="product.vegan" icon="check"></Icon>
                                <Icon v-else icon="times"></Icon>
                            </td>
                        </tr>
                        <tr class="">
                            <td class="px-6 py-4 whitespace-nowrap">Gluten free</td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <Icon v-if="product.gluten" icon="check"></Icon>
                                <Icon v-else icon="times"></Icon>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button class="mt-5 md:mx-0 mx-auto flex w-auto text-center border-2 rounded-xl py-2 px-4 border-green-500 hover:border-green-400 text-green-500 hover:text-green-400 transition duration-300 focus:outline-none">Add to Cart</button>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';

    export default {
        data() {
            return {
                product_id: this.$route.params.product_id,
            }
        },

        async created() {
            await this.get_product(this.product_id);
        },

        computed: {
            ...mapGetters({
                product: 'product',
            }),
        },

        methods: {
            ...mapActions({
                fetch_product: 'fetch_product',
            }),

            async get_product(id) {
                try {
                    await this.fetch_product(id);
                } catch(error) {
                    if (error.response.status === 404) {
                        this.$router.replace({name: 'Discovery'});
                    }
                }
            }
        }
    }
</script>