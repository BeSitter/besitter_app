<script>
	export let inputType = 'text';
	export let inputId = '';
	export let inputName = '';
	export let inputPlaceholder = ' ';
	export let inputLabel = '';
	export let inputValue = '';
	export let disableInput = false;
	export let isRequired = false;
</script>

<div class="relative">
	<input
		disabled={disableInput}
		autocomplete="off"
		id={inputId}
		name={inputName}
		type={inputType}
		class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 focus:outline-none text-sm"
		placeholder={inputPlaceholder}
		value={inputValue}
		required={isRequired}
		on:input
	/>
	<label
		for={inputId}
		class="absolute left-0 -top-3.5 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
		>{inputLabel} <span class="text-error">{isRequired ? '*' : ''}</span></label
	>
</div>

<style>
	/* your styles go here */
</style>
