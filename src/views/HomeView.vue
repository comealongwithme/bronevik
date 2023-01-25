<script setup lang="ts">
	import { ArrowPathIcon } from '@heroicons/vue/24/solid'

	import BaseButton from '../components/BaseButton.vue'
	import BaseInput from '../components/BaseInput.vue'

	import { useStore } from '../modules/store'
	import { computed, onMounted, ref, watch } from 'vue'
	import { usePocketBase } from '../modules/pocketbase'
	import { UserRole } from '../types/User'
	import { FlightRecord } from '../modules/store/flights'

	const store = useStore()
	const pb = usePocketBase()

	const flights = ref<Array<FlightRecord>>()

	const isAdmin = computed(() => store.state.users.currentUser.role === UserRole.admin)

	const getList = (force: boolean) => {
		store.dispatch('flights/getList', { pb, page: 1, perPage: 50, force }).then(list => {
			flights.value = Array.from(list.values())
		})
	}

	const openCreateFlightPopup = () => {
		store.commit('modals/openModal', 'CreateFlightRecord')
	}

	onMounted(() => {
		getList(false)
	})
</script>

<template>
	<template v-if="isAdmin">
		<section class="container mb-8">
			<div class="flex space-x-4">
				<BaseButton @click="openCreateFlightPopup">Create flight record</BaseButton>
				<BaseButton @click="getList(true)"><ArrowPathIcon class="h-6 w-6"/></BaseButton>
			</div>
		</section>
	</template>
	<section class="container">
		<div class="space-y-4">
			<div class="flex flex-col space-y-4">
				<router-link v-for="flight of flights" :to="`/flight/${flight.id}`">
					<article class="border rounded-md p-4 space-y-4 transition hover:bg-gray-100" :key="flight.id">
						<h3 class="font-semibold space-x-2">
							<span>№ {{ flight.flight_number }}</span>
							<span>{{ flight.departure_point }} -> {{ flight.arrival_point }}</span>
							<span>{{ flight.departure_time }} -> {{ flight.arrival_time }}</span></h3>
					</article>
				</router-link>
			</div>
		</div>
	</section>
</template>

<style scoped>

</style>
