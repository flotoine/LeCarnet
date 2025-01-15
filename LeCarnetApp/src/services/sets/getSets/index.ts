import api from "../../api"

import { exerciseToEdit, exerciseRepData } from "../../../store"

export default async function getSets () {
    await api.get(`/items/exercise_set/?&filter[exercise_id][_eq]=${exerciseToEdit.value}`) 
    .then(res => exerciseRepData.value = res.data.data)
    .catch(err => console.error(err))
}