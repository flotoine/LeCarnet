import axios from 'axios'
import { exercisesNames } from '../../../store/index.ts';

export default async function getExercisesNames(accessToken: String | null) {
    await axios.get(`http://127.0.0.1:8055/items/exercises_list/`, { headers: {"Authorization" : `Bearer ${accessToken}`} })
    .then(res=> exercisesNames.value = res.data.data)
    .catch(err => console.error(err))
}