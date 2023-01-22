import { Module } from 'vuex'
import { RootState } from '../index'
import { User, UserRole } from '../../../types/User'
import PocketBase from 'pocketbase'

export interface UsersStoreState {
	isLoading: boolean,
	currentUser: User
}

// TODO: Сделать разлогин по истечению времени

const defaultUserInfo: User = {
	id: '',
	username: '',
	email: '',
	role: UserRole.user,
	verified: false,
	updated: '',
	created: '',
	emailVisibility: false
}

const users: Module<UsersStoreState, RootState> = {
	namespaced: true,
	state: () => ({
		isLoading: false,
		currentUser: JSON.parse(localStorage.getItem('user')!) || defaultUserInfo
	}),
	mutations: {
		setUser(state, user: User) {
			if (user) {
				state.currentUser = {...user, role: 1}
				localStorage.setItem('user', JSON.stringify(user))
			}
		},
		setRole(state, role: UserRole) {
			if (role !== undefined) {
				state.currentUser.role = role
				localStorage.setItem('user', JSON.stringify(state.currentUser))
			}
		},
		clearUser(state) {
			state.currentUser = defaultUserInfo
			localStorage.setItem('user', JSON.stringify(state.currentUser))
		},
		changeLoadingStatus(state, isLoading: boolean) {
			state.isLoading = isLoading
		}
	},
	actions: {
		async getUser({ state, commit }, { pb, id }: { pb: PocketBase, id: string }) {

			try {
				const user = await pb?.collection('users').getOne(id)

				if (user) {
					commit('setUser', user)
				}
			}
			catch (e) {
				console.error(e)
			}
		},
		async signIn({ state, commit, dispatch }, { pb, email, password }: { pb: PocketBase, email: string, password: string }) {

			if (state.isLoading) {
				return Promise.resolve()
			}

			commit('changeLoadingStatus', true)

			try {

				// перед логином чистим сессию
				pb?.authStore.clear()
				const sessionData = await pb?.collection('users').authWithPassword(email, password)

				if (sessionData) {

					// получаем залогиненного пользователя и записываем в стор
					await dispatch('getUser', { pb, id: pb?.authStore.model?.id })

					return sessionData
				}
			}
			catch (e) {
				console.error(e)
			}
			finally {
				commit('changeLoadingStatus', false)
			}
		},
		async signUp({ state, commit, dispatch }, { pb, username, email, password, passwordConfirm }: {pb: PocketBase, username: string, email: string, password: string, passwordConfirm: string }) {

			if (state.isLoading) {
				return Promise.resolve()
			}

			commit('changeLoadingStatus', true)

			try {

				pb?.authStore.clear()

				return await pb?.collection('users').create({
					username,
					email,
					password,
					passwordConfirm
				})
			}
			catch (e) {
				console.error(e)
			}
			finally {
				commit('changeLoadingStatus', false)
			}
		},
		signOut({ commit }, pb: PocketBase) {
			pb.authStore.clear()
			commit('clearUser')
		}
	}
}

export default users
