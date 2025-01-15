import axios from "axios";

//used for user services

const API_URL = 'http://127.0.0.1:8055/';

const userApi = axios.create({
    baseURL: API_URL
  });


export default userApi;
