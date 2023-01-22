<script setup lang="ts">

	import { ArrowPathIcon } from '@heroicons/vue/24/solid'

	defineProps({
		isLoading: {
			type: Boolean,
			default: false
		}
	})
</script>

<template>
	<button class="py-3 px-6 rounded bg-green-500 text-white font-semibold flex items-center justify-center transition hover:bg-green-600" :class="{ 'opacity-50 cursor-auto': isLoading }">
		<ArrowPathIcon v-if="isLoading" class="h-6 w-6 animate-spin"/>
		<slot v-else/>
	</button>
</template>

<style scoped>

</style>
