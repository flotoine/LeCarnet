<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router';
import { isDrawerOpen } from '../store/index.ts'
import { watch } from 'vue';
import { useAuth } from '../store/auth.ts'
import axios from 'axios';


/// Watch global ref status update to change menu drawer class to open/close it

watch( isDrawerOpen, (drawerStatus)=> {
    const menudrawer: HTMLElement | null = document.getElementById('menu-drawer');
    if (drawerStatus === true) {
        //@ts-expect-error
        try{menudrawer.classList.remove('menu-drawer-closed')}
        catch{console.error("No menu drawer found")}
        //@ts-expect-error
        finally{menudrawer.classList.add('menu-drawer-open')}
    } else {
        //@ts-expect-error
        try{menudrawer.classList.remove('menu-drawer-open')}
        catch{console.error("No menu drawer found")}
        //@ts-expect-error
        finally{menudrawer.classList.add('menu-drawer-closed')}
    }
})


const router = useRouter();
const loginStore = useAuth();

function logoutButtonHandler() {
    async function logout() {
    await axios.post("http://127.0.0.1:8055/auth/logout", { "refresh_token": localStorage.getItem("refreshToken") }
    ).then(res => {
        console.log(res)
        router.push('/')
        loginStore.user = null;
        if (isDrawerOpen.value === true ) {isDrawerOpen.value = false} // close drawer if open during logout
    }
    ).catch(err => console.error(err))
}
    logout()

}




</script>

<template>
    <nav id="menu-drawer" class='fixed px-5 top-0 left-0 z-10 h-dvh w-[70dvw] bg-slate-100 dark:bg-slate-800 transition-all drop-shadow-2xl menu-drawer-closed' >
        <h2 class="text-5xl font-title text-slate-900 dark:text-slate-50  my-10  ">Menu</h2>
        <div class="flex flex-col ">
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/workouts">Go to Workouts</RouterLink>
            <RouterLink to="/add-new-exercise">Select new exercise</RouterLink>
        </div>
        <button class="bg-slate-200 text-slate-900 p-2 rounded-xl dark:bg-slate-700 dark:text-slate-50" v-on:click="logoutButtonHandler">Logout</button>
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


