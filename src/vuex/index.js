import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        numero:10,
        serverPath:'http://localhost:3000/'
    }
});