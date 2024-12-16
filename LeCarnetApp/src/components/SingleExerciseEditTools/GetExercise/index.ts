import axios from 'axios'
import dayjs from 'dayjs'
import getExercisesNames from '../../ViewExercises/getExercisesNames/index.ts'
import {exercisesNames, exerciseData} from '../../../store/index.ts'

export default async function getExercise(exerciseId:Number,accessToken:String | null) {
    if (exercisesNames.value.length === 0) {
        getExercisesNames(accessToken)
    }


    await axios.get(`http://127.0.0.1:8055/items/exercise_item/${exerciseId}`, { headers: {"Authorization" : `Bearer ${accessToken}`} }) 
    .then(function(res) 
        {   
            const exerciseType = res.data.data.exercise_type
            const exerciseName = exercisesNames.value[exerciseType-1].exercise_name
            return exerciseData.value = {
                title:exerciseName,
                date:dayjs(res.data.data.date_created).format('DD/MM/YYYY')
            }
        }
    )
    .catch(err => console.error(err))

    
}
