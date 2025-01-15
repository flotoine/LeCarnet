<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router';
import { computed } from 'vue';
import { useAuth } from '../store/auth.ts'
import { API } from '../services/index.ts';




const loginStore = useAuth();
const router = useRouter();

function logoutButtonHandler() {
    API.user.logout()
    router.push('/')
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
