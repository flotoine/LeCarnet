import { defineStore } from 'pinia';
import { ref } from 'vue';

interface UserCredentials {
    email: String | undefined | null,
    password: String | undefined | null,
}

export const useAuth = defineStore('auth', () => {
    const user = ref<UserCredentials | null>(null);
    const authenticate = ({
        email,
        password
    }:UserCredentials) => {
        user.value = {
        email : email,
        password : password
    };
    };

    
return {
    user,
    authenticate,
} 
});