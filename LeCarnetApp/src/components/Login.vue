<template>
    <nav v-if="store.user !== null">
        <h2>Connecté.e</h2> 
        <button v-on:click="logout">Logout</button>
    </nav>
    <nav v-else>
        <input type="email" id="email" name="email" placeholder="Your@email.com" v-model="formData.email">
        <input type="password" id="password" name="password" placeholder="YourPassword" v-model="formData.password">
        <button v-on:click="login" >Connect</button>
    </nav>
</template>

<script setup>
import axios from 'axios'
import { useAuth } from '../store/auth.js'
import { reactive } from 'vue';

const store = useAuth();
let refreshToken = {};

const formData = reactive({
    email: "",
    password: ""
});

async function login()
        {
            let result = await axios.post("http://127.0.0.1:8055/auth/login/",      
            formData
                ).then(
                    response => {
                        store.authenticate({
                        formData
                        })
                        refreshToken = {refresh_token : response.data.data.refresh_token}
                    }
                ).catch(error => {console.error(error)})       
        }

async function logout()
        {
            let response = await axios.post("http://127.0.0.1:8055/auth/logout",refreshToken

            ).then(res => {
                store.user = null
            }
            ).catch(err => console.error(err))
        }

</script>


<style .scoped>
    nav {
        display: flex;
        gap: 10px;
    }
</style>