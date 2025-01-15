import api from '../../api'
import { musclesTargeted } from '../../../store'

export default async function getMusclesTargeted() {
    await api.get(`/items/muscle_targeted/`)
    .then(res=> musclesTargeted.value = res.data.data)
    .catch(err => console.error(err))
}