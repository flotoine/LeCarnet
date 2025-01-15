import api from '../../api.ts'
import dayjs from 'dayjs'
import {exercisesNames, exerciseData} from '../../../store/index.ts'

export default async function getExercise(exerciseId:Number) {
    await api.get(`/items/exercise_item/${exerciseId}`) 
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
