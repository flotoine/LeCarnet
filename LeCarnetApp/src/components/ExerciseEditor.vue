<template>
    <div>
        <h2>Your exercise - {{exercise_data.title}}</h2>
        <p>date : {{ exercise_data.date }}</p>
        <button>Submit</button>
        <br>
    </div>
</template>

<script setup >
    import { reactive, ref } from 'vue';
    import getExercise from './SingleExerciseEditTools/GetExercise/index.ts'
    import { exercise_to_edit, exercise_data } from '../store/index.ts';
    
    let access_token = localStorage.getItem("accesstoken")

    function getExerciseAtDisplay () {
        getExercise(exercise_to_edit.value,access_token,exercise_data)
    }

    getExerciseAtDisplay()


    
</script>