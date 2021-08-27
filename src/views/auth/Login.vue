<template>
    <div class="login-page">
        <div class="max-w-xl p-3 md:p-16 mx-auto sm:bg-gray-100 rounded-2xl">
            <form @submit.prevent="submit" class="sm:mt-10 w-full">
                <img class="h-16 w-auto" src="/logo.png"/>
                <div class="pt-5">
                    <input v-model="form.email" type="email" :class="[errors.email ? 'focus:ring-red-300 border-red-400' : 'focus:border-indigo-400']" class="appearance-none border-2 border-gray-200 rounded-xl w-full mb-2 py-3 px-5 text-gray-700 leading-tight focus:outline-none focus:ring transition duration-300" placeholder="E-Mail">
                    <span v-if="errors.email" class="ml-2 text-red-400">{{ errors.email[0] }}</span>
                </div>
                <div class="pt-5">
                    <input v-model="form.password" type="password" :class="[errors.password ? 'focus:ring-red-300 border-red-400' : 'focus:border-indigo-400']" class="appearance-none border-2 border-gray-200 rounded-xl w-full mb-2 py-3 px-5 text-gray-700 leading-tight focus:outline-none focus:ring transition duration-300" placeholder="Password">
                    <span v-if="errors.password" class="ml-2 text-red-400">{{ errors.password[0] }}</span>
                </div>
                <div class="pt-16">
                    <button type="submit" class="rounded-xl w-full py-2 px-5 bg-green-500 focus:outline-none hover:bg-green-400 transition duration-300 text-white">{{ loading ? 'Processing...' : 'Login' }}</button>
                </div>
                <div class="pt-5">
                    <router-link to="/auth/register" class="block text-center border-2 rounded-xl w-full py-2 px-4 border-green-500 hover:border-green-400 text-green-500 hover:text-green-400 transition duration-300 focus:outline-none">Register</router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        name: 'Login',

        data() {
            return {
                form: {
                    email: '',
                    password: ''
                },

                errors: [],
                loading: false,
            }
        },

        methods: {
            ...mapActions({
                sign_in: 'auth/sign_in'
            }),
            
            async submit() {
                try {
                    this.loading = true;
                    this.errors = [];
                    await this.sign_in(this.form);
                } catch(error) {
                    this.loading = false;
                    if (error.response.status === 422) {
                        return this.errors = error.response.data.errors || {};
                    }
                }

                this.loading = false;

                this.$router.replace({
                    name: 'Profile'
                });
            },
        }
    }
</script>