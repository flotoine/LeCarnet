<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router';
import { isDrawerOpen } from '../store/index.ts'
import { computed } from 'vue';
import { useAuth } from '../store/auth.ts'
import axios from 'axios';

const router = useRouter();

const loginStore = useAuth();
///axios non configuré ? avec url de base et tout et tout voir : The Axios Instance
function logoutButtonHandler() {
    async function logout() {  // problème aussi, composant dupliqué sur home.vue, bref découpe mieux
        await axios.post("http://127.0.0.1:8055/auth/logout", { "refresh_token": localStorage.getItem("refreshToken") }
        ).then(res => {
            console.log(res)
            router.push('/')
            loginStore.user = null;
            if (isDrawerOpen.value === true) { isDrawerOpen.value = false } // close drawer if open during logout
        }
        ).catch(err => console.error(err))
    }
    logout()

}

interface Props {
    isOpened: boolean
}
const props = defineProps<Props>()

const menuDrawerClasses = computed(() => {
	return (props.isOpened && loginStore.user !== null) ? 'menu-drawer-open' : 'menu-drawer-closed'
})

</script>

<template>
    <nav id="menu-drawer" :class="menuDrawerClasses"
        class='fixed px-5 top-0 left-0 z-10 h-dvh w-[70dvw] bg-slate-100 dark:bg-slate-800 transition-all drop-shadow-2xl'>
        <h2 class="text-5xl font-title text-slate-900 dark:text-slate-50  my-10 ">Menu</h2>
        <div class="flex flex-col *:self-start">
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/workouts">Go to Workouts</RouterLink>
            <RouterLink to="/add-new-exercise">Select new exercise</RouterLink>
        </div>
        <button class="bg-slate-200 text-slate-900 p-2 rounded-xl dark:bg-slate-700 dark:text-slate-50"
            v-on:click="logoutButtonHandler">Logout</button>
    </nav>
</template>

<style>
/* Drawer animation */
.menu-drawer-open {
    transform: translateX(0);
}

.menu-drawer-closed {
    transform: translateX(-100vw);
}

/* Drawer animation */
</style>
