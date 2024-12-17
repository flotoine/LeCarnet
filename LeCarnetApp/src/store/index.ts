import { Dayjs } from "dayjs";
import { ref } from "vue";
import type { Ref } from 'vue'

export const exerciseToEdit: Ref<number | undefined> = ref()

export const itemsDates = ref<String[]>([])

interface ExerciseName {
    id: PropertyKey,
    exercise_name: String | undefined,
}

export const exercisesNames = ref<ExerciseName[]>([])

export const isDrawerOpen = ref(false)  ///Menu Drawer status shared between components

export const musclesTargeted = ref([]) /// array to received all muscle groups from DB

interface UserItem {
    id: PropertyKey;
    short_date: string | number | Date | Dayjs | null | undefined          // dd/mm/yyyy format
    date_created: string | number | Date | Dayjs | null | undefined;   // long format
    exercise_name: String | undefined;
    exercise_type: Number;
}

export const userItems = ref<UserItem[]>([])

interface ExerciseDataTypes {
    title:String | undefined,
    date:string | number | Date | Dayjs | null | undefined
}


export const exerciseData = ref<ExerciseDataTypes>({
    title:"Exercice title placeholder",
    date:"dd/mm/yyyy"
})

export const exerciseRepData = ref([])