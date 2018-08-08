import Vue from 'vue'
import App from './App.vue'
// plugins
import VueRouter from 'vue-router'
import VueMask from 'v-mask'

import store from './store'
import './utils/filters'
import { routes } from './routes'

// Styles
import './stylus/main.styl';

// custom components
import { CButton } from './components/CButton.jsx';
import { CInput } from './components/CInput.jsx';
import { CSelect } from './components/CSelect.jsx';

// register plugins
Vue.use(VueRouter);
Vue.use(VueMask);

// register components
Vue.component('c-button', CButton);
Vue.component('c-input', CInput);
Vue.component('c-select', CSelect);

const router = new VueRouter({
    routes,
    mode: 'history',
});

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
