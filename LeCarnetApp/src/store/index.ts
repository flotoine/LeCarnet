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
    short_date: Date | String | undefined;           // dd/mm/yyyy format
    date_created: Date | String;   // long format
    exercise_name: String | undefined;
    exercise_type: PropertyKey;
}

export const user_items = ref<User_Item[]>([])