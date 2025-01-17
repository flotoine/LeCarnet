import api from "../../api";
import { itemsDates, exercisesNames, userItems } from '../../../store/index.ts'
import dayjs, { Dayjs } from "dayjs";
import { API } from "../../index.ts";

export default async function getAllExercises() {
    await api.get("/items/exercise_item/")
    .then(res => {
            userItems.value = res.data.data;
            let full_items_dates: Array<String> = [] ///little flash --> probs refresh names each time
            if(exercisesNames.value.length === 0) {
                API.app.getExercisesNames().then(getAllExercises)
            } else {
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
                }
    
            
            }
        ) // saves exercises under ref array
        .catch(err => console.error(err))
    
    }