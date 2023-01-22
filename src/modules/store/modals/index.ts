import { Module } from 'vuex'
import { RootState } from '../index'

export interface ModalsStoreState {
	isOpen: boolean,
	component: string
}

const modals: Module<ModalsStoreState, RootState> = {
	namespaced: true,
	state: () => ({
		isOpen: false,
		component: ''
	}),
	mutations: {
		openModal(state, component: string) {
			state.isOpen = true
			state.component = component
		},
		closeModal(state) {
			state.isOpen = false
			state.component = ''
		}
	}
}

export default modals
