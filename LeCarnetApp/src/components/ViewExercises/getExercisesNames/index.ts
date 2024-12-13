import axios from 'axios'
import { exercises_names } from '../../../store/index.ts';

export default async function getExercisesNames(access_token: String | null) {
    await axios.get(`http://127.0.0.1:8055/items/exercises_list/`, { headers: {"Authorization" : `Bearer ${access_token}`} })
    .then(res=> exercises_names.value = res.data.data)
    .catch(err => console.warn(err))
}