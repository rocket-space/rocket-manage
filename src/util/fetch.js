
import axios from 'axios';
import httpConfig from '../config/http.config.js';
import pleaseWaitMe from 'utils/pleaseWaitMe.js';

let fetch = axios.create({
    timeout: 30000
});

fetch.interceptors.request.use((config)=>{
    pleaseWaitMe.wait();
    //config.startTime = Date.now();
    return config;
}, (error) => {
    console.log('fetch.....', error);
/*    let endTime = Date.now();
    if (endTime - config.startTime > config.timeout) {
        pleaseWaitMe.finish();
    }
    console.log(error);*/
    //pleaseWaitMe.finish();
    return Promise.reject(error);
});

fetch.interceptors.response.use((response)=>{
    pleaseWaitMe.finish();
    return response;
}, function (error) {
    return Promise.reject(error);
});

export default fetch;