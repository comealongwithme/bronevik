<script setup lang="ts">
	import BaseInput from './BaseInput.vue'
	import BaseButton from './BaseButton.vue'

	import { ref } from 'vue'
	import { usePocketBase } from '../modules/pocketbase'
	import { useRouter } from 'vue-router'
	import { useStore } from '../modules/store'

	const signUpData = ref<{ username: string, email: string, password: string, passwordConfirm: string }>({
		username: '',
		email: '',
		password: '',
		passwordConfirm: ''
	})

	const pb = usePocketBase()

	const router = useRouter()

	const store = useStore()

	const signUp = async () => {
		try {

			// регистрируемся через стор
			const user = await store.dispatch('users/signUp', {
				pb,
				username: signUpData.value.username,
				email: signUpData.value.email,
				password: signUpData.value.password,
				passwordConfirm: signUpData.value.passwordConfirm
			})

			// если успешно получили ответ, то пробуем залогиниться
			if (user) {

				// TODO: Нужно написать кастомные типы для dispatch стора чтобы подтягивались типы
				const session = await store.dispatch('users/signIn', { pb, email: signUpData.value.email, password: signUpData.value.password })

				if (session) {
					signUpData.value.username = ''
					signUpData.value.email = ''
					signUpData.value.password = ''
					signUpData.value.passwordConfirm = ''

					store.commit('modals/closeModal')

					await router.push('/')
				}
			}
		}
		catch (e) {
			console.error(e)
		}
	}

	const showSignIn = () => {
		store.commit('modals/openModal', 'SignIn')
	}
</script>

<template>
	<article class="p-6 w-full lg:max-w-2xl space-y-8">
		<div class="text-center">
			<h3 class="font-semibold text-xl">Sign up</h3>
		</div>
		<div class="flex flex-col space-y-4">
			<BaseInput label="Username" id="username" type="text" v-model="signUpData.username"/>
			<BaseInput label="Email" id="email" type="email" v-model="signUpData.email"/>
			<BaseInput label="Password" id="password" type="password" v-model="signUpData.password"/>
			<BaseInput label="Repeat password" id="passwordConfirm" type="password" v-model="signUpData.passwordConfirm"/>
			<BaseButton @click="signUp" :is-loading="store.state.users.isLoading">Sign up</BaseButton>
		</div>
		<div class="text-center">
			<h3>Or <button class="underline hover:no-underline" @click="showSignIn">Sign up</button> instead</h3>
		</div>
	</article>
</template>

<style scoped>

</style>
