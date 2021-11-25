import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {mapGetters} from "vuex";
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
Vue.use(ElementUI)
require('./assets/sass/main.scss')
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import VueProgressBar from 'vue-progressbar'
require('./util/filters');

Vue.config.productionTip = false

Vue.use(VueProgressBar, {
    color: '#008AFF',
    failedColor: 'red',
    height: '10px',
    thickness: '5px',
})


router.beforeEach((to, from, next) => {

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters['isLoggedIn']) {
            next();
        } else {
            next('/login');
        }
    } else if (to.path === '/login' && store.getters['isLoggedIn']) {
        next('/admin');
    } else {
        next();
    }
})

new Vue({
    router,
    store,
    render: function (h) {
        return h(App)
    },
    computed: {
        ...mapGetters(['isLoggedIn'])
    },
}).$mount('#app')