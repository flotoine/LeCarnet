import axios from 'axios'
import dayjs from 'dayjs';
import { items_dates, exercises_names, user_items } from '../../../store/index.ts'


export default async function getExerciseItems(access_token: String | null) {
    await axios.get("http://127.0.0.1:8055/items/exercise_item/", { headers: {"Authorization" : `Bearer ${access_token}`} }) // gets all exercises saved by user
    .then(res => user_items.value = res.data.data) // saves exercises under ref array
    .catch(err => console.error(err))

    let full_items_dates: Array<String> = []
    
    for (let i = 0; i < user_items.value.length;i++) {
        let exercise_type: PropertyKey = user_items.value[i].exercise_type - 1
        user_items.value[i].exercise_name = exercises_names.value[exercise_type].exercise_name // get the name related to the id

        let date_created = user_items.value[i].date_created
        let short_date: Date | String | undefined = dayjs(date_created).format('DD/MM/YYYY')
        user_items.value[i].short_date = short_date
        full_items_dates.push(short_date)
    }
    items_dates.value = [...new Set(full_items_dates)].reverse();
    return {user_items}
}
