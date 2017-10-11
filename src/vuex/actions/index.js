let actions = {};

import { mixin } from 'utils';

import * as base from './base.js';
import * as user from './user.js';
import * as data from './data.js';

/*mixin(actions, base);
mixin(actions, user);
mixin(actions, data);*/


actions = {
    loading({ commit }, load) {
        console.log('actions.loading....', load);
        commit('LOADING', load);
    },
    setUserInfo({commit}, userInfo) {
        console.log("actions....setUserInfo", userInfo);
        commit('SETUSERINFO', userInfo);
    }
}

export default actions;