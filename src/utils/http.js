import axios from 'axios';
// import userStore from '../stores/userStore';
import config from './config'
// const baseURL = 'http://10.70.1.206:8000/api/';
const baseURL = 'https://www.hlfeilibao.com';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(config => config);
axios.interceptors.response.use(
    (response) => {
        // Do something with response data
        const data = response.data;
        if (response.status === 200) {
            return data;
        }
        return Promise.reject();
    }
    , error =>
        // Do something with response error
        Promise.reject(error)
);


const Http = {
    baseURL,
    header: {
        'Content-Type': 'application/json; charset=utf-8',
    },
    request(method, api, data) {
        const headers = this.header;
        // headers.token = userStore.token;
        const reqBody = data;
        const req = {
            method,
            url: api,
            baseURL,
            headers,
            transformRequest: [fromdata => JSON.stringify(fromdata)],
        };
        if (method === 'get') {
            req.params = reqBody;
        } else {
            req.data = reqBody;
        }
        return axios(req).catch(e => ({}));
    },
    async get(api, data) {
        if (data) {
            let openid = data.openid;
            data.unionid = openid;
            // data.location = getLocation()
        }
        let loc = '';
        if (config) {
            if (config.user.location) {
                loc = config.user.location;
                // return 'sdasdsads'

            }
            // else {
            //     console.log(config);
            //     await config.getLocation();
            //     loc = config.user.location;
            // }
        }
        if(loc){
            if(data){
                data.w = loc.w;
                data.j = loc.j
            }else {
                data = loc
            }
        }
        // let loc = await getLocation();
        return this.request('get', api, data);
    },
    post(api, data) {
        return this.request('post', api, data);
    },
    patch(api, data) {
        return this.request('patch', api, data);
    },
    put(api, data) {
        return this.request('put', api, data);
    },
    delete(api, data) {
        return this.request('delete', api, data);
    }
};

export default Http;
