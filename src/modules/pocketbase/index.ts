import PocketBase from 'pocketbase'
import { App, inject, InjectionKey } from 'vue'

export const pocketBaseSymbol: InjectionKey<PocketBase> = Symbol("PBClient");

export function usePocketBase() {
	return inject(pocketBaseSymbol)
}

export default {
	install: (app: App) => {
		const client = new PocketBase(import.meta.env.VITE_POCKETBASE_URL);
		app.provide(pocketBaseSymbol, client)
	}
}
