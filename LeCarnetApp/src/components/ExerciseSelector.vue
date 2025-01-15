<template>
    <h2 class="text-2xl mb-4">Workout Editor</h2>
    <h3 class="text-xl mb-4"> Select muscle group </h3>
    
    <div class="*:bg-slate-200 dark:*:bg-slate-800 *:rounded-lg *:p-2 flex flex-wrap *:grow gap-2">
        <button v-for="muscle in musclesTargeted" :key="muscle.id" v-on:click="selectMuscleGroup(muscle.id)"> {{ muscle.muscle_type }}</button>
    </div>
    <h3 v-if="exercisesSelected.length !== 0" class="text-xl my-4">Select your exercise</h3>
    <div class="*:bg-slate-200 dark:*:bg-slate-800 *:rounded-lg *:p-2 flex flex-wrap *:grow gap-2">
        <button v-for="exercise in exercisesSelected" :key="exercise.id" v-on:click="selectExercise(exercise.id)"> <!---ne pas hésiter à passer tout l'exercise puis trie dans la fonction, par ex pour des fonctions futures, ça prend pas plus de perfs-->
            {{ exercise.exercise_name }}
        </button>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import axios from 'axios';
    import { exercisesNames, musclesTargeted } from '../store/index.ts';
    import { useRouter } from 'vue-router';

    import { API } from '../services/index.ts';

    let accessToken = localStorage.getItem("accessToken")

    ///peutre un focus muscle selectionne
    ////////////////////////

    API.app.getMusclesTargeted() /// gets all muscle groups possible from DB

    ////////////////////////

    API.app.getExercisesNames()   /// gets all exercises possible from DB
    
    ////////////////////////
    
    const exercisesSelected = ref([]) /// array to received all exercises that match selected muscle group 

    function selectMuscleGroup (muscleId) {
              /// changes muscle targeted when specific button clicked
              exercisesSelected.value = exercisesNames.value.filter((ex) => ex.muscle_target === muscleId);
    }

    ///possiblement remplaçable par une computed

    const router = useRouter()



    
    function selectExercise (exerciseId) { /// on click on specific exercise, adds it to user list of exercise thru DB
        API.exercise.addExercise(exerciseId)
        exercisesSelected.value=[]
        
        router.push('/edit-your-exercise')
    }

</script>

<style>

</style>