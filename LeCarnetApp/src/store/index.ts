import { ref } from "vue";
import type { Ref } from 'vue'

export const exercise_to_edit: Ref<number | undefined> = ref()
export const items_dates = ref([])
export const exercises_names = ref ([])
export const isDrawerOpen = ref(false)  ///Menu Drawer status shared between components