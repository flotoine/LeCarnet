import { Dayjs } from "dayjs";
import { ref } from "vue";
import type { Ref } from 'vue'

export const exercise_to_edit: Ref<number | undefined> = ref()

export const items_dates = ref<String[]>([])

interface Exercise_Name {
    id: PropertyKey,
    exercise_name: String | undefined,
}

export const exercises_names = ref<Exercise_Name[]>([])

export const isDrawerOpen = ref(false)  ///Menu Drawer status shared between components

export const muscles_targeted = ref([]) /// array to received all muscle groups from DB

interface User_Item {
    id: PropertyKey;
    short_date: string | number | Date | Dayjs | null | undefined          // dd/mm/yyyy format
    date_created: string | number | Date | Dayjs | null | undefined;   // long format
    exercise_name: String | undefined;
    exercise_type: Number;
}

export const user_items = ref<User_Item[]>([])

interface Exercise_Data_Types {
    title:String | undefined,
    date:string | number | Date | Dayjs | null | undefined
}


export const exercise_data = ref<Exercise_Data_Types>({
    title:"Exercice title placeholder",
    date:"dd/mm/yyyy"
})