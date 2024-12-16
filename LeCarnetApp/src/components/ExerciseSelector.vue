<template>
    <h2 class="text-2xl mb-4">Workout Editor</h2>
    <h3 class="text-xl mb-4"> Select muscle group </h3>
    
    <div class="*:bg-slate-200 dark:*:bg-slate-800 *:rounded-lg *:p-2 flex flex-wrap *:grow gap-2">
        <button v-for="muscle in musclesTargeted" :key="muscle.id" v-on:click="selectMuscleGroup(muscle.id)"> {{ muscle.muscle_type }}</button>
    </div>
    <h3 v-if="exercisesSelected.length !== 0" class="text-xl my-4">Select your exercise</h3>
    <div class="*:bg-slate-200 dark:*:bg-slate-800 *:rounded-lg *:p-2 flex flex-wrap *:grow gap-2">
        <button v-for="exercise in exercisesSelected" :key="exercise.id" v-on:click="selectExercise(exercise.id)">
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
    import { exercisesNames, musclesTargeted } from '../store/index.ts';
    import { useRouter } from 'vue-router';
    let accessToken = localStorage.getItem("accessToken")
    
    ////////////////////////

    
    getMusclesTargeted(accessToken)  /// gets all muscle groups possible from DB

    ////////////////////////

    getExercisesNames(accessToken)     /// gets all exercises possible from DB
    
    ////////////////////////
    
    const exercisesSelected = ref([]) /// array to received all exercises that match selected muscle group 

    function selectMuscleGroup (muscleId) {
              /// changes muscle targeted when specific button clicked
              exercisesSelected.value = exercisesNames.value.filter((ex) => ex.muscle_target === muscleId);
    }

    const router = useRouter()
    
    function selectExercise (exerciseId) { /// on click on specific exercise, adds it to user list of exercise thru DB
        addExercise(accessToken,exerciseId)
        exercisesSelected.value=[]
        
        router.push('/edit-your-exercise')
    }

</script>

<style>

</style>