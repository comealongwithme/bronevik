<script setup lang="ts">
	import { UserIcon } from '@heroicons/vue/24/solid'
	import { ArrowLeftIcon } from '@heroicons/vue/24/solid'

	import { useStore } from './modules/store'
	import { usePocketBase } from './modules/pocketbase'
	import { useRoute, useRouter } from 'vue-router'
	import { computed, onBeforeMount } from 'vue'
	import { UserRole } from './types/User'

	import BasePopup from './components/BasePopup.vue'
	import BaseButton from './components/BaseButton.vue'

	const store = useStore()
	const pb = usePocketBase()

	const router = useRouter()
	const route = useRoute()

	const isAdmin = computed(() => store.state.users.currentUser.role === UserRole.admin)

	const isRoot = computed(() => route.path === '/')

	const openProfile = () => {

		// если уже залогинены и сессия валидна то откроем страницу с профилем
		if (store.state.users.currentUser.id && pb?.authStore.isValid) {
			router.push(`/user/${store.state.users.currentUser.id}`)
			return
		}

		// откроем попап с авторизацией
		store.commit('modals/openModal', 'SignIn')
	}

	const goBack = () => {
		router.back()
	}
</script>

<template>
	<header>
		<template v-if="isAdmin">
			<div class="bg-red-400">
				<section class="container">
					<div class="text-white text-center font-semibold py-4">
						Admin mode
					</div>
				</section>
			</div>
		</template>
		<section class="container">
			<div class="py-4 flex justify-between">
				<div class="flex space-x-4">
					<router-link to="/" class="py-3 px-6 rounded bg-green-500 text-white font-semibold flex items-center justify-center transition hover:bg-green-600">Home</router-link>
				</div>
				<div class="flex space-x-4">
					<BaseButton @click="openProfile">
						<UserIcon class="h-6 w-6"/>
					</BaseButton>
				</div>
			</div>
		</section>
	</header>
	<main>
		<template v-if="!isRoot">
			<section class="container">
				<BaseButton @click="goBack" class="rounded-md bg-green-500">
					<ArrowLeftIcon class="h-6 w-6 text-white"/>
				</BaseButton>
			</section>
		</template>
		<router-view/>
	</main>
	<footer>
		<section class="container">
			<div class="py-4 text-center">
				@
			</div>
		</section>
	</footer>

	<!-- Единый попап -->
	<BasePopup/>
</template>

<style scoped>

</style>
