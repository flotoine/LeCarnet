import { createRouter, createMemoryHistory } from "vue-router"

import Home from './components/Home.vue'
import ViewWorkouts from './components/ViewWorkouts.vue'
import ExerciseSelector from './components/ExerciseSelector.vue'
import ExerciseEditor from './components/ExerciseEditor.vue'
import DayView from './components/DayView.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/workouts', component: ViewWorkouts },
  { path: '/add-new-exercise', component: ExerciseSelector },
  { path: '/edit-your-exercise', component: ExerciseEditor },
  { path: '/wod', component: DayView}
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router