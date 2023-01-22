<script setup lang="ts">
	defineProps({
		id: {
			type: String,
			default: ''
		},
		type: {
			type: String,
			default: ''
		},
		label: {
			type: String,
			default: ''
		},
		maxLength: {
			type: Number
		},
		modelValue: {
			type: [String, Number],
			default: ''
		}
	})
	const emits = defineEmits(['update:modelValue'])

	const updateModelValue = (event: Event) => {
		const target = event.target as HTMLInputElement
		emits('update:modelValue', target.value)
	}
</script>

<template>
	<div class="flex flex-col space-y-2">
		<label v-if="label" :for="id">{{ label }}</label>
		<input class="p-2 border rounded-md" :id="id" :type="type" :maxlength="maxLength"
		       :value="modelValue"
		       @input="updateModelValue($event)">
	</div>
</template>

<style scoped>

</style>
