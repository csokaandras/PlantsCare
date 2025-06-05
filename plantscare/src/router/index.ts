import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Plants from '@/views/Plants.vue'
import PlantsAdd from '@/views/PlantsAdd.vue'
import Dashboard from '@/views/Dashboard.vue'
import WateringAdd from '@/views/WateringAdd.vue'
import PlantsEdit from '@/views/PlantsEdit.vue'
import WateringsList from '@/views/WateringsList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/Plants',
      name: 'Plants',
      component: Plants,
    },
    {
      path: '/PlantsAdd',
      name: 'PlantsAdd',
      component: PlantsAdd,
    },
    {
      path: '/PlantsEdit/:id',
      name: 'PlantsEdit',
      component: PlantsEdit,
    },
    {
      path: '/Dashboard',
      name: 'Dashboard',
      component: Dashboard,
    },
    {
      path: '/WateringsList',
      name: 'WateringsList',
      component: WateringsList,
    },
    {
      path: '/WateringAdd',
      name: 'WateringAdd',
      component: WateringAdd,
    },
  ],
})

export default router
