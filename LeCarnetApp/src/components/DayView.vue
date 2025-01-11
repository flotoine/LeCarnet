<template>
    <li v-for="item in userItems" :key="item.id">
        <div>
            {{ item }}
        </div>
        <div>
            sets
        </div>
    </li>
</template>

<script setup lang="ts">
import getSets from './ViewExercises/getSets';
import { userItems, exerciseRepData, exerciseToEdit } from '../store';
import { watch } from 'vue';

let accessToken = localStorage.getItem("accessToken")

/// get all data --> to display

watch (userItems, (newItems) => 
    {
        for (let i = 0; i < userItems.value.length;i++) {
            console.log(newItems[i].id)
            exerciseToEdit.value = Number(newItems[i].id)
            getSets (String(accessToken))
        }
    }
) 

watch(exerciseRepData, (newRepData) => console.log(newRepData))



</script>