import { defineStore } from 'pinia';
import { ref } from 'vue';


export const useAuth = defineStore('auth', () => {
    const user = ref(null);
    const authenticate = ({
        email,
        password
    }) => {
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