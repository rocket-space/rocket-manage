let mutations = {};

/*import { mixin } from 'utils';

import * as base from './base.js';
import * as user from './user.js';
import * as data from './data.js';

mixin(mutations, base);
mixin(mutations, user);
mixin(mutations, data);

export default mutations;*/

export default mutations = {
    LOADING (state, showOrHide) {
        console.log('mutations...', showOrHide);
        state.loading = showOrHide;
    },
    SETUSERINFO(state, userInfo) {
        state.userInfo = userInfo;
    }
}