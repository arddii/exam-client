<template>
    <div class="dashboard-categories">
        <h1 class="text-5xl font-bold text-gray-700">Categories</h1>
        <div class="options-bar mt-10 relative">
            <router-link to="/dashboard/categories/new" class="py-2 px-4 border-red-500 text-red-500 hover:border-red-400 border-2 rounded-xl transition duration-300">New</router-link>
        </div>
        <div v-if="categories" class="flex flex-col mt-10">
            <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="py-2 align-middle inline-block w-full sm:px-6 lg:px-8">
                    <div class="border-b border-gray-200">
                        <table class="w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Modified</th>
                                    <th scope="col" class="relative px-6 py-3">
                                        <span class="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr v-for="category in categories" :key="category.id">
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="flex items-center">
                                            <div>
                                                <div class="text-sm font-medium text-gray-900">{{  category.title  }}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-900">{{ category.description }}</div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Published</span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ category.updated_at }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex gap-x-4">
                                        <router-link to="/dashboard/categories/edit/" class="text-indigo-600 hover:text-indigo-900">Edit</router-link>
                                        <router-link to="" class="text-indigo-600 hover:text-indigo-900">Delete</router-link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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
            this.get_categories();
        },

        methods: {
            ...mapActions({
                fetch_categories: 'fetch_categories',
            }),

            get_categories() {
                this.fetch_categories();
            },
        },

        computed: {
            ...mapGetters({
                categories: 'categories',
            }),
        }
    }
</script>