import { Module } from 'vuex'
import { RootState } from '../index'
import PocketBase from 'pocketbase'

const pbCollectionKey = 'arrivals'

export interface FlightRecord {
	id?: string,
	created?: string,
	updated?: string,
	flight_number: string,
	arrival_point: string,
	departure_point: string,
	departure_time: string,
	arrival_time: string
}

export interface FlightsStoreState {
	isLoading: boolean,
	list: Map<string, FlightRecord>,
	page: number,
	perPage: number,
	totalItems: number,
	totalPages: number
}

const flights: Module<FlightsStoreState, RootState> = {
	namespaced: true,
	state: () => ({
		isLoading: false,
		list: new Map(),
		page: 1,
		perPage: 50,
		totalItems: 0,
		totalPages: 0

	}),
	mutations: {
		saveFLightList(state, flightList: Array<FlightRecord>) {
			state.list = new Map(flightList.map(flight => {
				return [flight.id!, flight]
			}))
		},
		updateFlightList(state, flight: FlightRecord) {
			state.list.set(flight.id!, flight)
		},
		updateFlightRecord() {},
		createFlightRecord() {},
		deleteFlightRecord() {},
		changeLoadingStatus(state, isLoading: boolean) {
			state.isLoading = isLoading
		},
		saveMeta(state, { page, perPage, totalItems, totalPages }: { page: number, perPage: number, totalItems: number, totalPages: number }) {
			state.page = page
			state.perPage = perPage
			state.totalItems = totalItems
			state.totalPages = totalPages
		}
	},
	actions: {
		async getOne({ state, commit }, { pb, id }: { pb: PocketBase, id: string }) {

			try {

				let flightRecord = state.list.get(id)

				if (flightRecord) {
					return flightRecord
				}

				flightRecord = await pb?.collection(pbCollectionKey).getOne(id)

				if (flightRecord) {
					commit('updateFlightList', flightRecord)
					return flightRecord
				}
			}
			catch (e) {
				console.error(e)
			}

		},
		async getList({ state, commit }, { pb, page, perPage, force }: { pb: PocketBase, page: number, perPage: number, force: boolean }) {

			if (state.isLoading) {
				return
			}

			if (state.list.size > 0 && state.page === page && state.perPage === perPage && !force) {
				return state.list
			}

			try {
				commit('changeLoadingStatus', true)

				const resultList = await pb.collection(pbCollectionKey).getList(page, perPage)

				if (resultList) {

					commit('saveFLightList', resultList.items)
					commit('saveMeta', { page: resultList.page, perPage: resultList.perPage, totalItems: resultList.totalItems, totalPages: resultList.totalPages })

					return state.list
				}
			}
			catch (e) {
				console.error(e)
			}
			finally {
				commit('changeLoadingStatus', false)
			}
		},
		async updateFlightRecord({ state, commit }, { pb, flight }: { pb: PocketBase, flight: FlightRecord }) {
			if (state.isLoading) {
				return Promise.resolve()
			}

			try {
				commit('changeLoadingStatus', true)

				const data: FlightRecord = {
					flight_number: flight.flight_number,
					arrival_point: flight.arrival_point,
					departure_point: flight.departure_point,
					departure_time: flight.departure_time,
					arrival_time: flight.arrival_time
				};

				console.log(flight.id, data)

				const record = await pb?.collection('arrivals').update(flight.id!, data);

				if (record) {

					commit('updateFlightList', record)

					return Promise.resolve()
				}
			}
			catch (e) {
				console.error(e)
			}
			finally {
				commit('changeLoadingStatus', false)
			}
		},
		async createFlightRecord({ state, commit }, { pb, flight }: { pb: PocketBase, flight: FlightRecord }) {

			if (state.isLoading) {
				return Promise.resolve()
			}

			try {
				commit('changeLoadingStatus', true)

				const payload: FlightRecord = {
					flight_number: flight.flight_number,
					arrival_point: flight.arrival_point,
					departure_point: flight.departure_point,
					departure_time: flight.departure_time,
					arrival_time: flight.arrival_time
				}

				const record = await pb.collection(pbCollectionKey).create(payload);

				if (record) {
					commit('updateFlightList', record)
				}
			}
			catch (e) {
				console.error(e)
			}
			finally {
				commit('changeLoadingStatus', false)
			}
		},
		async deleteFlightRecord({ commit }, { pb, id }: { pb: PocketBase, id: string }) {}
	}
}

export default flights
