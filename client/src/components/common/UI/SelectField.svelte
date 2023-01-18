<script lang="ts">
	export let selectId = '';
	export let selectName = '';
	export let selectLabel = '';
	export let selectValue = '';
	export let disableSelect = false;
	export let isRequired = false;
	export let options: any[] = [];
</script>

<div class="relative">
	<select
		disabled={disableSelect}
		autocomplete="off"
		id={selectId}
		name={selectName}
		class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 focus:outline-none text-sm"
		value={selectValue}
		required={isRequired}
		on:change
	>
		{#each options as option, index}
			<option selected={index === 0} value={option.value}>{option.content}</option>
		{/each}
	</select>
	<label
		for={selectId}
		class="absolute left-0 -top-3.5 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
		>{selectLabel} <span class="text-error">{isRequired ? '*' : ''}</span></label
	>
</div>

<style>
	/* your styles go here */
</style>
