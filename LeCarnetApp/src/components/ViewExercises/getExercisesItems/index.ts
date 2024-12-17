import axios from 'axios'
import  dayjs, { Dayjs } from 'dayjs';
import { itemsDates, exercisesNames, userItems } from '../../../store/index.ts'
import { watch } from 'vue';
import getExercisesNames from '../getExercisesNames/index.ts';


export default async function getExerciseItems(accessToken: String | null) {
    await axios.get("http://127.0.0.1:8055/items/exercise_item/", { headers: {"Authorization" : `Bearer ${accessToken}`} }) // gets all exercises saved by user
    .then(res => {
        getExercisesNames(accessToken);
        userItems.value = res.data.data;
        let full_items_dates: Array<String> = [] ///little flash --> probs refresh names each time
    
        watch(exercisesNames, () => {
            for (let i = 0; i < userItems.value.length;i++) {
                let exercise_type: PropertyKey = Number(userItems.value[i].exercise_type) - 1
                userItems.value[i].exercise_name = exercisesNames.value[exercise_type].exercise_name // get the name related to the id
    
                let date_created: string | number | Date | Dayjs | null | undefined = userItems.value[i].date_created
                let short_date: string | number | Date | Dayjs | null | undefined = dayjs(date_created).format('ddd, MMM D, YYYY')
                userItems.value[i].short_date = short_date
                full_items_dates.push(short_date)
            }
            itemsDates.value = [...new Set(full_items_dates)].reverse();
            return {userItems}
        })

        
        }
    ) // saves exercises under ref array
    .catch(err => console.error(err))

}
