<script setup lang="ts">
	import { useStore } from '../modules/store'
	import { computed } from 'vue'
	import { usePocketBase } from '../modules/pocketbase'
	import { useRouter } from 'vue-router'

	import BaseButton from '../components/BaseButton.vue'
	import { UserRole } from '../types/User'

	const store = useStore()
	const router = useRouter()

	// TODO: Нужна куча бойлерплейта чтобы прихерачить типы к модулям Vuex
	const user = computed(() => store.state.users.currentUser)

	const pb = usePocketBase()

	const signOut = () => {
		store.dispatch('users/signOut', pb)
		router.push('/')
	}

	const changeRole = () => {
		store.commit('users/setRole', store.state.users.currentUser.role === UserRole.admin ? UserRole.user : UserRole.admin)
	}
</script>

<template>
	<section class="container h-full">
		<article class="flex h-full items-center justify-center">
			<div class="space-y-4 flex flex-col justify-center">
				<h1>Logged in as {{ user.email }}</h1>
				<BaseButton @click="signOut">Sign out</BaseButton>
				<BaseButton @click="changeRole">Change role</BaseButton>
			</div>
		</article>
	</section>
</template>

<style scoped>

</style>
