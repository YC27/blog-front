import axios from "axios";
import {getToken} from "./auth.js";
import {errorMsg} from "./box.js";
import router from "../router/index.js";

const service = axios.create({
    baseURL: "http://URL:8081/",
    timeout: 5000,
})

service.interceptors.request.use(
    config => {
        if ( getToken() ) {
            config.headers.Authorization = getToken()
        }
        config.headers["Content-Type"] = "application/json"
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => {
        return response.data
    },
    error => {
        const err = error.message;
        if ( err.indexOf("401") !== -1 ) {
            errorMsg("登录信息过期,请先登录")
            router.push({path: '/login'})
            return Promise.reject(error)
        }
        errorMsg(error.response.data.message)
        return Promise.reject(error)
    }
)

export default service