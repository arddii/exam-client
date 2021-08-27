<template>
    <div class="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div class="border-t border-indigo-500">
            <div class="py-5 sm:flex">
                <div class="mt-8 mb-8 sm:mt-0 sm:w-full sm:px-8 flex flex-col md:flex-row justify-between">
                    <div class="flex flex-col">
                        <span class="text-gray-700 font-bold uppercase mb-3">Business hours</span>
                        <span class="text-gray-700">Every day from 9 AM until 11 PM</span>
                    </div>
                    <div class="flex flex-col mt-8 md:mt-0">
                        <span class="text-gray-700 font-bold uppercase mb-3">Location</span>
                        <span class="text-gray-700">
                            <Icon icon="map-marker-alt"></Icon> Toompuiestee 39
                        </span>
                    </div>
                    <div class="flex flex-col mt-8 md:mt-0">
                        <span class="text-gray-700 font-bold uppercase mb-3">Work for us</span>
                        <span class="text-gray-700">
                            Send Your application to <a class="hover:text-blue-600 transition duration-300" href="mailto:info@nehatu.com">info@nehatu.com</a>.
                        </span>
                    </div>
                    <div class="flex flex-col mt-8 md:mt-0">
                        <span class="text-gray-700 font-bold uppercase mb-3">Socials</span>
                        <span class="text-gray-700 text-3xl flex gap-x-4">
                            <a href="#" class="text-blue-600 hover:text-blue-500 transition duration-300"><Icon :icon="['fab', 'facebook-square']"></Icon></a>
                            <a href="#" class="text-pink-600 hover:text-pink-500 transition duration-300"><Icon :icon="['fab', 'instagram-square']"></Icon></a>
                            <a href="#" class="text-blue-400 hover:text-blue-300 transition duration-300"><Icon :icon="['fab', 'twitter-square']"></Icon></a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>