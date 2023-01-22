<script setup lang="ts">
	import BaseInput from '../components/BaseInput.vue'
	import BaseButton from '../components/BaseButton.vue'

	import { useRoute, useRouter } from 'vue-router'
	import { computed, ComputedRef, onMounted, ref } from 'vue'
	import { useStore } from '../modules/store'
	import { usePocketBase } from '../modules/pocketbase'
	import { FlightRecord } from '../modules/store/flights'
	import { UserRole } from '../types/User'

	const route = useRoute()

	const store = useStore()

	const pb = usePocketBase()

	const isAdmin = computed(() => store.state.users.currentUser.role === UserRole.admin)

	const form = ref({
		flight_number: '',
		arrival_point: '',
		departure_point: '',
		arrival_time: '',
		departure_time: ''
	})

	const flightRecord: ComputedRef<FlightRecord | undefined> = computed(() => store.state.flights.list.get(route.params.id as string))

	const updateRecord = () => {
		store.dispatch('flights/updateFlightRecord', { pb, flight: { ...form.value, id: route.params.id } })
	}

	onMounted(() => {
		store.dispatch('flights/getOne', { pb, id: route.params.id }).then(flight => {
			form.value.flight_number = flight.flight_number
			form.value.arrival_point = flight.arrival_point
			form.value.departure_point = flight.departure_point
			form.value.arrival_time = flight.arrival_time
			form.value.departure_time = flight.departure_time
		})
	})
</script>

<template>
	<section class="container">
		<div class="space-y-8 mt-8">
			<h1 class="text-5xl font-bold">Flight №{{ flightRecord?.flight_number }}</h1>
			<div class="grid grid-cols-2 grid-rows-2">
				<div>
					<p class="text-xl font-semibold">Departure</p>
					<p>{{ flightRecord?.departure_time }}</p>
					<p>{{ flightRecord?.departure_point }}</p>
				</div>
				<div>
					<p class="text-xl font-semibold">Arrival</p>
					<p>{{ flightRecord?.arrival_time }}</p>
					<p>{{ flightRecord?.arrival_point }}</p>
				</div>
			</div>
		</div>
	</section>
	<template v-if="isAdmin">
		<section class="container">
			<div class="space-y-4">
				<div class="text-center">
					<h3 class="font-semibold text-xl">Edit record</h3>
				</div>
				<div class="space-y-4">
					<BaseInput label="Flight number" id="flight_number" type="text" :max-length="4" v-model="form.flight_number"/>
					<BaseInput label="Arrival point" id="arrival_point" type="text" v-model="form.arrival_point"/>
					<BaseInput label="Departure point" id="departure_point" type="text" v-model="form.departure_point"/>
					<BaseInput label="Arrival time" id="arrival_time" type="time" v-model="form.arrival_time"/>
					<BaseInput label="Departure time" id="departure_time" type="time" v-model="form.departure_time"/>
				</div>
				<div class="flex justify-center">
					<BaseButton @click="updateRecord" :is-loading="store.state.users.isLoading">Update</BaseButton>
				</div>
			</div>
		</section>
	</template>
</template>

<style scoped>

</style>
