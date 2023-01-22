import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Readonly<RouteRecordRaw[]> = [
	{
		path: '/',
		component: () => import('../../views/HomeView.vue'),
	},
	{
		path: '/user/:id',
		component: () => import('../../views/UserView.vue'),
	},
	{
		path: '/flight/:id',
		component: () => import('../../views/FlightView.vue')
	},
]

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes
})



export default router

