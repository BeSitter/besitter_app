<script lang="ts">
	import InputField from '../../../components/common/UI/InputField.svelte';
	import MdArrowForward from 'svelte-icons/md/MdArrowForward.svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
</script>

<div class="">
	<div class="flex items-center justify-center mb-4">
		<h1 class="text-2xl font-semibold">Faisons un peu connaissance</h1>
	</div>
	<div
		class="py-8 text-base leading-6 space-y-8 sm:text-lg sm:leading-7 grid grid-cols-1 lg:grid-cols-2 gap-2"
	>
		<div class="col-span-2">
			<!-- <InputField
				inputId="email"
				inputName="email"
				inputLabel="Votre adresse email"
				inputType="email"
				inputValue={email}
				isRequired
				disableInput
			/> -->
		</div>
		<div class="relative flex flex-col justify-center items-center mt-4 col-span-2">
			<button class="btn btn-primary flex flex-row items-center justify-center gap-2">
				<div>Suivant</div>
				<div class="w-4">
					<MdArrowForward />
				</div>
			</button>
		</div>
	</div>
</div>

<style>
	/* your styles go here */
</style>
