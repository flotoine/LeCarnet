import axios from 'axios'
import { musclesTargeted } from '../../../store'

export default async function getMusclesTargeted(accessToken: String | null) {
    await axios.get(`http://127.0.0.1:8055/items/muscle_targeted/`, { headers: {"Authorization" : `Bearer ${accessToken}`} })
    .then(res=> musclesTargeted.value = res.data.data)
    .catch(err => console.error(err))
}