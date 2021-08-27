<template>
    <div class="profile-page">
        <h1 class="text-5xl font-bold text-gray-700">{{ whattimeisit }} {{ firstname(user.name) }}</h1>
        <div class="options-bar mt-10 flex gap-x-4">
            <router-link to="/profile" class="bg-green-500 hover:bg-green-400 text-white px-3 py-2 rounded text-xl transition duration-300 focus:outline-none">Profile</router-link>
            <router-link to="/profile/orders" class="bg-gray-200 hover:bg-gray-100 text-gray-700 px-3 py-2 rounded text-xl transition duration-300 focus:outline-none">Recent Orders</router-link>
            <router-link to="/profile/settings" class="bg-gray-200 hover:bg-gray-100 text-gray-700 px-3 py-2 rounded text-xl transition duration-300 focus:outline-none">Settings</router-link>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        computed: {
            ...mapGetters({
                user: 'auth/user',
            }),

            whattimeisit() {
                const hours = (new Date).getHours();
                let string = '';

                switch(true) {
                    case (hours < 4):
                        string = 'Good night';
                        break;
                    case (hours < 12):
                        string = 'Good morning';
                        break;
                    case (hours < 17):
                        string = 'Good afternoon';
                        break;
                    case (hours < 24):
                        string = 'Good evening';
                        break;
                    default:
                        string = 'Howdy';
                }

                return string;
            }
        },

        methods: {
            firstname(name) {
                return name.split(' ')[0];
            }
        }
    }
</script>