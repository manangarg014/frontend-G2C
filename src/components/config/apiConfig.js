import axios from "axios";

// const baseURL = "http://localhost:2024";
const baseURL = "https://g2c-h8zd.onrender.com";

const publicAxios= axios.create({baseURL});

// private request 
const privateReq= axios.create({baseURL});
privateReq.interceptors.request.use((config)=>{
    const token=localStorage.getItem("token");
    if(token){
        config.headers.Authorization=`Bearer ${token}`
    }
    return config;
})

export {publicAxios,privateReq}

export default baseURL;