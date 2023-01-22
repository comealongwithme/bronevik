import { createLogger, createStore, Store, useStore as baseUseStore } from 'vuex'

import users, { UsersStoreState } from './users'
import modals, { ModalsStoreState } from './modals'
import flights, { FlightsStoreState } from './flights'

import { InjectionKey } from 'vue'

export interface RootState {
	users: UsersStoreState,
	modals: ModalsStoreState,
	flights: FlightsStoreState
}

export const storeKey: InjectionKey<Store<RootState>> = Symbol()

export default createStore<RootState>({
	devtools: true,
	modules: {
		users,
		modals,
		flights
	},
	plugins: !import.meta.env.PROD ? [createLogger()] : [],
})

export function useStore() {
	return baseUseStore(storeKey)
}
