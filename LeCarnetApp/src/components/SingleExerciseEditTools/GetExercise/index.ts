import axios from 'axios'
import dayjs from 'dayjs'
import getExercisesNames from '../../ViewExercises/getExercisesNames/index.ts'
import {exercises_names, exercise_data} from '../../../store/index.ts'

export default async function getExercise(id:Number,access_token:String | null) {
    if (exercises_names.value.length === 0) {
        getExercisesNames(access_token)
    }


    await axios.get(`http://127.0.0.1:8055/items/exercise_item/${id}`, { headers: {"Authorization" : `Bearer ${access_token}`} }) 
    .then(function(res) 
        {   
            const exercise_type = res.data.data.exercise_type
            const exercise_name = exercises_names.value[exercise_type-1].exercise_name
            return exercise_data.value = {
                title:exercise_name,
                date:dayjs(res.data.data.date_created).format('DD/MM/YYYY')
            }
        }
    )
    .catch(err => console.error(err))

    
}