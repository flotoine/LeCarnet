import api from '../../api.ts';
import { exercisesNames } from '../../../store/index.ts';

export default async function getExercisesNames() {
    await api.get(`/items/exercises_list/`)
    .then(res=> exercisesNames.value = res.data.data)
    .catch(err => console.error(err))
}