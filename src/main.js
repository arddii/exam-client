import axios from 'axios';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import './assets/scss/app.scss';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faTimes, faBell, faUser, faList, faTh, faCheck, faPepperHot, faInfoCircle, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebookSquare, faInstagramSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faBars, faTimes, faBell, faUser, faList, faTh, faCheck, faPepperHot, faInfoCircle, faMapMarkerAlt, faFacebookSquare, faInstagramSquare, faTwitterSquare);

axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.VUE_APP_API_URL;

createApp(App).use(store).use(router).component('Icon', FontAwesomeIcon).mount('#app');