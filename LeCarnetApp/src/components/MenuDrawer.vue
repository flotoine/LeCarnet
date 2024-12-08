<script setup>
import { RouterLink } from 'vue-router';
import { isDrawerOpen } from '../store/menuDrawerStore.js'
import { watch } from 'vue';
import { useAuth } from '../store/auth.js'
watch( isDrawerOpen, (drawerStatus)=> {
    if (drawerStatus === true) {
        try{document.getElementById("menu-drawer").classList.remove('menu-drawer-closed')}
        finally{document.getElementById("menu-drawer").classList.add('menu-drawer-open')}
    } else {
        try{document.getElementById("menu-drawer").classList.remove('menu-drawer-open')}
        finally{document.getElementById("menu-drawer").classList.add('menu-drawer-closed')}
    }
})

const LoginStore = useAuth()

</script>

<template>
    <nav id="menu-drawer" class='fixed px-5 top-0 left-0 z-10 h-dvh w-[70dvw] bg-slate-100 transition-all drop-shadow-2xl menu-drawer-closed' >
        <h2 class="text-5xl font-title text-slate-900  my-10  ">Menu</h2>
        <div v-if="LoginStore.user !== null" class="flex flex-col ">
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/workouts">Go to Workouts</RouterLink>
            <RouterLink to="/add-new-workout">Add new workout</RouterLink>
        </div>
    </nav>
</template>

<style>
.menu-drawer-open {
    transform: translateX(0);
    
}

.menu-drawer-closed {
    transform: translateX(-100vw);
}

</style>


