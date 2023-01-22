<script setup lang="ts">
	import BaseInput from './BaseInput.vue'
	import BaseButton from './BaseButton.vue'
	import { useStore } from '../modules/store'
	import { usePocketBase } from '../modules/pocketbase'
	import { ref } from 'vue'

	const store = useStore()

	const pb = usePocketBase()

	const form = ref({
		flight_number: '',
		arrival_point: '',
		departure_point: '',
		arrival_time: '',
		departure_time: ''
	})

	const createFlight = async () => {

		if (Object.values(form.value).some(item => !item)) {
			console.error('Fill inputs')
			return
		}

		try {
			await store.dispatch('flights/createFlightRecord', { pb, flight: form.value })
		}
		catch (e) {
			console.error(e)
		}
	}
</script>

<template>
	<article class="p-6 w-full lg:max-w-2xl space-y-8">
		<div class="text-center">
			<h3 class="font-semibold text-xl">Create record</h3>
		</div>
		<div class="flex flex-col space-y-4">
			<BaseInput label="Flight number" id="flight_number" type="text" v-model="form.flight_number"/>
			<BaseInput label="Arrival point" id="arrival_point" type="text" v-model="form.arrival_point"/>
			<BaseInput label="Departure point" id="departure_point" type="text" v-model="form.departure_point"/>
			<BaseInput label="Arrival time" id="arrival_time" type="time" v-model="form.arrival_time"/>
			<BaseInput label="Departure time" id="departure_time" type="time" v-model="form.departure_time"/>
			<BaseButton @click="createFlight" :is-loading="store.state.flights.isLoading">Create</BaseButton>
		</div>
	</article>
</template>

<style scoped>

</style>
