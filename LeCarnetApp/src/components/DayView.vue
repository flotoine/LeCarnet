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
import { userItems, exerciseRepData, exerciseToEdit } from '../store';
import { watch } from 'vue';
import { API } from '../services';


/// get all data --> to display

watch (userItems, (newItems) => 
    {
        for (let i = 0; i < userItems.value.length;i++) {
            console.log(newItems[i].id)
            exerciseToEdit.value = Number(newItems[i].id)
            API.sets.getSets()
        }
    }
) 

watch(exerciseRepData, (newRepData) => console.log(newRepData))



</script>