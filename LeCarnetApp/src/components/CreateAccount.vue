<template>
    <div>
        <h2 class="mb-4 text-xl">Create your account</h2>
        <form class="flex flex-col gap-1 *:rounded-xl *:p-2" id="registerUser" @submit.prevent="CreateAccountFormHandler">
            <label id="email" name="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Your@email.com" v-model="registerFormData.email"
                required>
            <label class="mt-4" id="password" name="password">Password</label>
            <input type="password" id="password" name="password" placeholder="YourPassword"
                v-model="registerFormData.password" required>
            <label class="mt-4" id="firstname" name="firstname">First Name</label>
            <input type="firstname" id="firstname" name="firstname" placeholder="First Name"
                v-model="registerFormData.first_name" required>
            <label class="mt-4" id="lastname" name="lastname">Last Name</label>
            <input type="lastname" id="lastname" name="lastname" placeholder="Last Name"
                v-model="registerFormData.last_name" required>
            <button class="bg-slate-800 text-slate-200 my-4">Create an account</button>
            <RouterLink class="bg-slate-800 text-slate-200 my-4 text-center" to="/">Home</RouterLink>
        </form>
    </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { reactive } from 'vue';
import { API } from '../services';

const registerFormData = reactive({
    email: "",
    password: "",
    first_name: "",
    last_name: ""
})

function CreateAccountFormHandler() {
    API.user.createAccount(registerFormData)
}


</script>