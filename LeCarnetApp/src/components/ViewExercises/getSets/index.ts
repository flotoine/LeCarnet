import axios from "axios"

import { exerciseToEdit, exerciseRepData } from "../../../store"

export default async function getSets (accessToken:String) {
    await axios.get(`http://127.0.0.1:8055/items/exercise_set/?&filter[exercise_id][_eq]=${exerciseToEdit.value}`, { headers: {"Authorization" : `Bearer ${accessToken}`} }) 
    .then(res => exerciseRepData.value = res.data.data)
.catch(err => console.error(err))
}