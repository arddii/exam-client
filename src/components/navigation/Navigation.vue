<template>
    <Disclosure as="nav" class="bg-indigo-500" v-slot="{ open }">
        <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div class="relative flex items-center justify-between h-16">
                <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    <DisclosureButton class="inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-white hover:bg-gray-700 focus:outline-none transition duration-300">
                        <Icon icon="bars" v-if="!open" class="block h-6 w-6"></Icon>
                        <Icon icon="times" v-else class="block h-6 w-6"></Icon>
                    </DisclosureButton>
                </div>
                <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                    <div class="flex-shrink-0 flex items-center">
                        <img class="hidden lg:block h-8 w-auto" src="/logo.png"/>
                    </div>
                    <div class="hidden sm:block sm:ml-6">
                        <div class="flex space-x-4">
                            <router-link to="/discovery" class="text-gray-200 hover:text-white px-3 py-2 rounded-md text-md uppercase font-medium transition duration-300">Discovery</router-link>
                            <router-link to="/news" class="text-gray-200 hover:text-white px-3 py-2 rounded-md text-md uppercase font-medium transition duration-300">News</router-link>
                            <router-link v-if="authenticated && user.is_admin" to="/dashboard" class="text-gray-200 hover:text-white px-3 py-2 rounded-md text-md uppercase font-medium transition duration-300">
                                <span class="bg-red-200 text-red-500 hover:text-red-600 rounded px-2 py-1 transition duration-300">Area 51</span>
                            </router-link>
                        </div>
                    </div>
                </div>
                <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <Menu as="div" class="ml-3 relative">
                        <div>
                            <MenuButton class="flex text-md rounded-full focus:outline-none">
                                <span class="sr-only">Open user menu</span>
                                <span v-if="!authenticated" class="text-gray-200 hover:text-white px-3 py-2 rounded-md text-md uppercase font-medium transition duration-300">
                                    <Icon icon="user"></Icon>
                                </span>
                                <span v-else class="flex">
                                    <img class="h-10 w-10 rounded-full" :src="'https://eu.ui-avatars.com/api/?background=random&name=' + user.name.replace(' ', '+')" alt="" />
                                    <span class="sm:block hidden text-gray-200 hover:text-white px-3 py-2 rounded-md text-md font-medium uppercase transition duration-300">{{ firstname(user.name) }}</span>
                                </span>
                            </MenuButton>
                        </div>
                        <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                            <MenuItems v-if="authenticated" class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <MenuItem v-slot="{ active }" class="sm:hidden block">
                                    <a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 border-b min-w-0']">
                                        {{ user.name }}
                                        <span class="text-sm text-gray-400 truncate block">{{ user.email }}</span>
                                    </a>
                                </MenuItem>
                                <MenuItem v-slot="{ active }">
                                    <router-link to="/profile" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Profile</router-link>
                                </MenuItem>
                                <MenuItem v-slot="{ active }">
                                    <button @click="logout" :class="[active ? 'bg-gray-100' : '', 'px-4 py-2 text-sm text-gray-700 border-t block w-full text-left']">Log out</button>
                                </MenuItem>
                            </MenuItems>
                            <MenuItems v-else class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <MenuItem v-slot="{ active }">
                                    <router-link to="/auth/login" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Log in</router-link>
                                </MenuItem>
                                <MenuItem v-slot="{ active }">
                                    <router-link to="/auth/register" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Register</router-link>
                                </MenuItem>
                            </MenuItems>
                        </transition>
                    </Menu>
                </div>
            </div>
        </div>
        <transition name="slide" mode="out-in">
            <DisclosurePanel class="sm:hidden border-t">
                <div class="px-2 pt-2 pb-3 space-y-1">
                    <router-link to="/discovery" class="text-gray-200 hover:text-white block px-3 py-2 rounded-md text-md uppercase font-medium">Discovery</router-link>
                    <router-link to="/news" class="text-gray-200 hover:text-white block px-3 py-2 rounded-md text-md uppercase font-medium">News</router-link>
                    <router-link v-if="authenticated && user.is_admin" to="/dashboard" class="text-gray-200 hover:text-white block px-3 py-2 rounded-md text-md uppercase font-medium">
                        <span class="bg-red-200 text-red-500 hover:text-red-600 rounded px-2 py-1 transition duration-300">Area 51</span>
                    </router-link>
                </div>
            </DisclosurePanel>
        </transition>
    </Disclosure>
</template>

<script>
    import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
    import { mapGetters, mapActions } from 'vuex';

    export default {
        components: {
            Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems 
        },

        computed: {
            ...mapGetters({
                authenticated: 'auth/authenticated',
                user: 'auth/user',
            }),
        },

        methods: {
            ...mapActions({
                sign_out: 'auth/sign_out',
            }),

            async logout() {
                await this.sign_out();

                this.$router.replace({
                    'name': 'Discovery'
                });
            },

            firstname(name) {
                return name.split(' ')[0];
            }
        }
    }
</script>

<style scoped>
    .slide-enter-active, .slide-leave-active {
        transition: all 0.3s ease;
        max-height: 200px;
    }

    .slide-enter, .slide-leave-to {
        transition: all 0.3s;
        opacity: 0;
        max-height: 0px;
    }

    .slide-enter-from, .slide-leave-to {
        max-height: 0px;
        transition: all 0.3s;
        opacity: 0;
    }
</style>