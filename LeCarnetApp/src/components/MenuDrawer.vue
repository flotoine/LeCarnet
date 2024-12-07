<template>
    <nav class=" h-lvh fixed top-0 left-0 bg-slate-200 z-10 w-[70svw] transition-all transform drop-shadow-[20px_100px_100px_rgba(0,0,0,0.9)] " >
        <h2 class="text-5xl font-title text-slate-900  my-10 mx-5 ">Menu</h2>
        <div class="">PEER EFFECT</div>
    </nav>
</template>

<script setup>
import { isDrawerOpen } from '../store/menuDrawerStore.js'

console.log(isDrawerOpen)

</script>

