<template>
    <div>
        <h2>Your exercise - {{exerciseData.title}}</h2>
        <p>date : {{ exerciseData.date }}</p>
        <br>
    </div>
    <div>
        <h3>Add reps</h3>
        <label for="reps">Reps: </label>
        <input id="reps" name="reps" class="dark:text-slate-950" type="number">
        <br>
        <label for="weight">Weight: </label>
        <input id="weight" name="weight" class="dark:text-slate-950" type="number">
        <br>
    </div>
    <div>
        <h3>Your reps</h3>
        <ul>
            <li>12reps @ 10.5kg</li>
            <li>10reps @ 10.5kg</li>
            <li>10reps @ 9.5kg</li>
        </ul>
        <button @click="addSetHandler" class= "bg-red-600">Ajouter</button>
    </div>

</template>

<script setup >
    import { reactive, ref } from 'vue';
    import getExercise from './SingleExerciseEditTools/GetExercise/index.ts'
    import { exerciseToEdit, exerciseData } from '../store/index.ts';
    import { watch } from 'vue';
    import addSet from './SingleExerciseEditTools/AddSet/index.ts';
    
    let accessToken = localStorage.getItem("accessToken")

    watch(exerciseToEdit, (newExercise) => {
        getExerciseAtDisplay()
    })

    async function getExerciseAtDisplay () {
        await getExercise(exerciseToEdit.value,accessToken,exerciseData)
    }

    getExerciseAtDisplay()

    async function addSetHandler() {
        addSet(accessToken)
    }

    
</script>