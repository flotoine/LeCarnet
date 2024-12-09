import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
// @ts-ignore
import App from './App.vue'
import { createMemoryHistory, createRouter } from 'vue-router'

// @ts-ignore
import Home from './components/Home.vue'
// @ts-ignore
import ViewWorkouts from './components/ViewWorkouts.vue'
// @ts-ignore
import WorkoutEditor from './components/WorkoutEditor.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/workouts', component: ViewWorkouts },
  { path: '/add-new-workout', component: WorkoutEditor }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})


const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.mount('#app')
