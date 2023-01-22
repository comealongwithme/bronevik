<script setup lang="ts">
import { computed, markRaw } from 'vue'
import { useStore } from '../modules/store'

import { XMarkIcon } from '@heroicons/vue/24/solid'

import SignIn from './SignIn.vue'
import SignUp from './SignUp.vue'

import CreateFlightRecord from './CreateFlightRecord.vue'

const store = useStore()

const isOpen = computed(() => store.state.modals.isOpen)

const component = computed(() => {
	const lookUp: Record<string, any> = {
		SignIn,
		SignUp,
		CreateFlightRecord
	}
	return markRaw(lookUp[store.state.modals.component])
})

const closeModal = () => {
	store.commit('modals/closeModal')
}
</script>

<template>
	<teleport to="#app">
		<transition enter-from-class="opacity-0"
		            leave-to-class="opacity-0"
		            enter-active-class="transition duration-300"
		            leave-active-class="transition duration-300">
			<div class="fixed inset-0 z-10" v-if="isOpen">
				<div class="bg-gray-700 opacity-50 w-full h-full cursor-pointer" @click=closeModal></div>
				<div class="rounded-md bg-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col w-full lg:max-w-2xl h-full lg:h-auto justify-center">
					<div class="flex w-full justify-end">
						<button class="p-4 lg:hidden" @click="closeModal">
							<XMarkIcon class="h-6 w-6"/>
						</button>
					</div>
					<component :is="component"/>
				</div>
			</div>
		</transition>
	</teleport>
</template>

<style scoped>

</style>
