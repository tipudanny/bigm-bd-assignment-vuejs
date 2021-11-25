import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

Vue.prototype.$api = function (endpoint) {
    return process.env.VUE_APP_API_ENDPOINT + endpoint;
};

export default new Vuex.Store({
    state: {
        status: '',
        token: localStorage.getItem('token') || '',
    },
    getters: {
        isLoggedIn(state) {
            return !!state.token;
        },
        token(state) {
            return state.token;
        },
    },
    mutations: {
        authSuccess(state, {token}) {
            state.status = 'success';
            state.token = token;
        },
        logout(state) {
            localStorage.removeItem('token');
            state.status = '';
            state.token = '';
        }
    },
    actions: {
        login(store, payload) {
            const {commit, dispatch} = store;
            return new Promise((resolve, reject) => {
                axios.post(payload.vm.$api("/login"), payload.fields)
                    .then(response => {
                        if (response.status === "200" || response.status === 200) {
                            console.log(response)
                            const token = response.data.access_token;
                            localStorage.setItem("token", token);
                            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
                            commit("authSuccess", {token});
                            resolve(response)
                        } else {
                            reject();
                        }
                    })
                    .catch(err => {
                        localStorage.removeItem("token");
                        reject(err);
                    });
            });
        },

        logout(context) {
            const {state, commit} = context;
            return new Promise((resolve, reject) => {
                axios.post(vm.$api("/logout")).then(response => {
                    commit("logout");
                    localStorage.removeItem("token");
                    delete axios.defaults.headers.common["Authorization"];
                    if (state.token) {
                        reject();
                    }
                    resolve(response);
                });
            });
        }
    },
    modules: {}
})
