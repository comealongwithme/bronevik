<script setup lang="ts">
	import BaseInput from './BaseInput.vue'
	import BaseButton from './BaseButton.vue'

	import { computed, ref } from 'vue'
	import { usePocketBase } from '../modules/pocketbase'
	import { useStore } from '../modules/store'

	const signInData = ref<{ email: string, password: string }>({
		email: '',
		password: ''
	})

	const pb = usePocketBase()

	const store = useStore()

	const isLoading = computed(() => store.state.users.isLoading)

	const signIn = async () => {
		try {
			const session = await store.dispatch('users/signIn', { pb, email: signInData.value.email, password: signInData.value.password })

			if (session) {
				signInData.value.email = ''
				signInData.value.password = ''

				store.commit('modals/closeModal')
			}

		} catch (e) {
			console.error(e)
		}
	}

	const showSignUp = () => {
		store.commit('modals/openModal', 'SignUp')
	}
</script>

<template>
	<article class="p-6 w-full lg:max-w-2xl space-y-8">
		<div class="text-center">
			<h3 class="font-semibold text-xl">Sign in</h3>
		</div>
		<div class="flex flex-col space-y-4">
			<BaseInput label="Email" id="email" type="email" v-model="signInData.email"/>
			<BaseInput label="Password" id="password" type="password" v-model="signInData.password"/>
			<BaseButton @click="signIn" :is-loading="store.state.users.isLoading">Sign in</BaseButton>
		</div>
		<div class="text-center">
			<h3>Or <button class="underline hover:no-underline" @click="showSignUp">Sign up</button> instead</h3>
		</div>
	</article>
</template>

<style scoped>

</style>
