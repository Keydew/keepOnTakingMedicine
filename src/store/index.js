import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        x: null,
        y: null,
        radius: 25,

        clientWidth: null,
        clientHeight: null,

        score: 0,
    },
    getters: {},
    mutations: {
        setX(state, x) {
            state.x = x;
        },
        setY(state, y) {
            state.y = y;
        },
        addRadius(state, radius) {
            state.radius += radius;
        },
        setClientWidth(state, width) {
            state.clientWidth = width;
        },
        setClientHeight(state, height) {
            state.clientHeight = height;
        },

        addScore(state, add) {
            state.score += add;
        }
    },
    actions: {}
})