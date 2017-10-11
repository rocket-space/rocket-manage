import {getCookie} from '../../util/cookie';

export default {
    user_info: (() => {
        try{
            return getCookie('user_info') ? getCookie('user_info') : false;
        }catch(e){
            console.log(e);
            return false;
        }
    })()
}