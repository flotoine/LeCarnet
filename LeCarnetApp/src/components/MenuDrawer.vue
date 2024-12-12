<script setup>
import { RouterLink } from 'vue-router';
import { isDrawerOpen } from '../store/menuDrawerStore.js'
import { watch } from 'vue';
import { useAuth } from '../store/auth.js'

/// Watch global ref status update to change menu drawer class to open/close it

watch( isDrawerOpen, (drawerStatus)=> {
    if (drawerStatus === true) {
        try{document.getElementById("menu-drawer").classList.remove('menu-drawer-closed')}
        finally{document.getElementById("menu-drawer").classList.add('menu-drawer-open')}
    } else {
        try{document.getElementById("menu-drawer").classList.remove('menu-drawer-open')}
        finally{document.getElementById("menu-drawer").classList.add('menu-drawer-closed')}
    }
})


</script>

<template>
    <nav id="menu-drawer" class='fixed px-5 top-0 left-0 z-10 h-dvh w-[70dvw] bg-slate-100 dark:bg-slate-800 transition-all drop-shadow-2xl menu-drawer-closed' >
        <h2 class="text-5xl font-title text-slate-900 dark:text-slate-50  my-10  ">Menu</h2>
        <div class="flex flex-col ">
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/workouts">Go to Workouts</RouterLink>
            <RouterLink to="/add-new-workout">Add new workout</RouterLink>
        </div>
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


