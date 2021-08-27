<template>
    <div class="registration-page">
        <div class="max-w-xl p-3 md:p-16 mx-auto sm:bg-gray-100 rounded-2xl">
            <form @submit.prevent="submit" class="sm:mt-10 w-full">
                <img class="h-16 w-auto" src="/logo.png"/>
                <div class="pt-5">
                    <input v-model="form.name" type="text" :class="[errors.name ? 'focus:ring-red-300 border-red-400' : 'focus:border-indigo-400']" class="appearance-none border-2 border-gray-200 rounded-xl w-full mb-2 py-3 px-5 text-gray-700 leading-tight focus:outline-none focus:ring transition duration-300" placeholder="Your Name">
                    <span v-if="errors.name" class="ml-2 text-red-400">{{ errors.name[0] }}</span>
                </div>
                <div class="pt-5">
                    <input v-model="form.email" type="email" :class="[errors.email ? 'focus:ring-red-300 border-red-400' : 'focus:border-indigo-400']" class="appearance-none border-2 border-gray-200 rounded-xl w-full mb-2 py-3 px-5 text-gray-700 leading-tight focus:outline-none focus:ring transition duration-300" placeholder="Email">
                    <span v-if="errors.email" class="ml-2 text-red-400">{{ errors.email[0] }}</span>
                </div>
                <div class="pt-5">
                    <input v-model="form.password" type="password" :class="[errors.password ? 'focus:ring-red-300 border-red-400' : 'focus:border-indigo-400']" class="appearance-none border-2 border-gray-200 rounded-xl w-full mb-2 py-3 px-5 text-gray-700 leading-tight focus:outline-none focus:ring transition duration-300" placeholder="Password">
                </div>
                <div class="pt-5">
                    <input v-model="form.password_confirmation" type="password" :class="[errors.password ? 'focus:ring-red-300 border-red-400' : 'focus:border-indigo-400']" class="appearance-none border-2 border-gray-200 rounded-xl w-full mb-2 py-3 px-5 text-gray-700 leading-tight focus:outline-none focus:ring transition duration-300" placeholder="Confirm Password">
                    <span v-if="errors.password" class="ml-2 text-red-400">{{ errors.password[0] }}</span>
                </div>
                <div class="pt-5">
                    <label class="inline-flex ml-2">
                        <input type="checkbox" class="form-checkbox h-4 w-4 text-indigo-500" v-model="form.terms"><span class="ml-2 -mt-1 text-gray-700">I agree to Terms and Conditions.</span>
                    </label>
                    <span v-if="errors.terms" class="block ml-2 text-red-400">{{ errors.terms[0] }}</span>
                </div>
                <div class="pt-16">
                    <button type="submit" class="rounded-xl w-full py-2 px-5 bg-green-500 focus:outline-none hover:bg-green-400 transition duration-300 text-white">{{ loading ? 'Processing...' : 'Register' }}</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        data() {
            return {
                form: {
                    name: '',
                    email: '',
                    password: '',
                    password_confirmation: '',
                    terms: false
                },

                errors: [],
                loading: false,
            }
        },

        methods: {
            ...mapActions({
                register: 'auth/register',
            }),

            async submit() {
                try {
                    this.loading = true;
                    this.errors = [];
                    await this.register(this.form);
                } catch(error) {
                    this.loading = false;
                    if (error.response.status === 422) {
                        return this.errors = error.response.data.errors || {};
                    }
                }

                this.loading = false;

                this.$router.replace({
                    name: 'Discovery'
                });
            }
        }
    }
</script>