<template>
    <h2 class="text-2xl mb-4">Workout Editor</h2>
    <h3 class="text-xl mb-4"> Select muscle group </h3>
    
    <div class="*:bg-slate-200 dark:*:bg-slate-800 *:rounded-lg *:p-2 flex flex-wrap *:grow gap-2">
        <button v-for="muscle in muscles_targeted" :key="muscle.id" v-on:click="selectMuscleGroup(muscle.id)"> {{ muscle.muscle_type }}</button>
    </div>
    <h3 v-if="exercises_selected.length !== 0" class="text-xl my-4">Select your exercise</h3>
    <div class="*:bg-slate-200 dark:*:bg-slate-800 *:rounded-lg *:p-2 flex flex-wrap *:grow gap-2">
        <button v-for="exercise in exercises_selected" :key="exercise.id" v-on:click="selectExercise(exercise.id)">
            {{ exercise.exercise_name }}
        </button>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import axios from 'axios';
    import getExercisesNames from './ViewExercises/getExercisesNames/index.ts'
    import getMusclesTargeted from './ViewExercises/getMusclesTargeted/index.ts'
    import addExercise from './SingleExerciseEditTools/AddExercise/index.ts'
    import { exercises_names, muscles_targeted } from '../store/index.ts';
    import { useRouter } from 'vue-router';
    let access_token = localStorage.getItem("accesstoken")
    
    ////////////////////////

    
    getMusclesTargeted(access_token)  /// gets all muscle groups possible from DB

    ////////////////////////

    getExercisesNames(access_token)     /// gets all exercises possible from DB
    
    ////////////////////////
    
    const exercises_selected = ref([]) /// array to received all exercises that match selected muscle group 

    function selectMuscleGroup (muscleid) {
              /// changes muscle targeted when specific button clicked
        exercises_selected.value = exercises_names.value.filter((ex) => ex.muscle_target === muscleid);
    }

    const router = useRouter()
    
    function selectExercise (exerciseid) { /// on click on specific exercise, adds it to user list of exercise thru DB
        addExercise(access_token,exerciseid)
        exercises_selected.value=[]
        
        router.push('/edit-your-exercise')
    }

</script>

<style>

</style>