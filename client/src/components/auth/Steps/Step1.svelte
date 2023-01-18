<script lang="ts">
	import SelectField from '../../../components/common/UI/SelectField.svelte';
	import InputField from '../../../components/common/UI/InputField.svelte';
	import { ACCOUNT_TYPE } from '../../../config/enum';
	import MdArrowForward from 'svelte-icons/md/MdArrowForward.svelte';
	import { createEventDispatcher } from 'svelte';

	export let email = '';

	let accountTypeOptions = [
		{ value: ACCOUNT_TYPE.CLIENT, content: 'Je cherche une baby-sitter ou une assistante de vie' },
		{ value: ACCOUNT_TYPE.BABY_SITTER, content: 'Je suis une baby-sitter' },
		{ value: ACCOUNT_TYPE.HOME_CARE_ASSISTANT, content: 'Je suis une assistante de vie' }
	];

	let data = {
		password: {
			value: '',
			error: ''
		},
		firstName: {
			value: '',
			error: ''
		},
		lastName: {
			value: '',
			error: ''
		},
		accountType: {
			value: accountTypeOptions[0].value,
			error: ''
		},
		confirmPassword: {
			value: '',
			error: ''
		}
	};

	const dispatch = createEventDispatcher();

	const handleChange = (e: any, field: string) => {
		if (field === 'firstName') {
			data.firstName.value = e.target.value;
			data.firstName.error = '';
			if (!data.firstName.value) {
				data.firstName.error = 'Ce champs est requis';
			}
		}
		if (field === 'lastName') {
			data.lastName.value = e.target.value;
			data.lastName.error = '';
			if (!data.lastName.value) {
				data.lastName.error = 'Ce champs est requis';
			}
		}

		if (field === 'password') {
			data.password.value = e.target.value;
			data.password.error = '';
			if (!data.password.value) {
				data.password.error = 'Ce champs est requis';
			} else if (data.password.value.length < 6) {
				data.password.error = 'Votre mot de passe doit compter au moins 6 caractères';
			}
		}

		if (field === 'confirmPassword') {
			data.confirmPassword.value = e.target.value;
			data.confirmPassword.error = '';
			if (!data.confirmPassword.value) {
				data.confirmPassword.error = 'Ce champs est requis';
			} else if (data.password.value !== data.confirmPassword.value) {
				data.confirmPassword.error = 'Les mots de passe ne sont pas identiques';
			}
		}

		if (field === 'accountType') {
			data.accountType.value = e.target.value;
			data.accountType.error = '';
			if (!data.accountType.value) {
				data.accountType.error = 'Ce champs est requis';
			}
		}
	};
</script>

<div class="">
	<div class="flex items-center justify-center mb-4">
		<h1 class="text-2xl font-semibold">Faisons un peu connaissance</h1>
	</div>
	<div
		class="py-8 text-base leading-6 space-y-8 sm:text-lg sm:leading-7 grid grid-cols-1 lg:grid-cols-2 gap-2"
	>
		<div class="col-span-2">
			<InputField
				inputId="email"
				inputName="email"
				inputLabel="Votre adresse email"
				inputType="email"
				inputValue={email}
				isRequired
				disableInput
			/>
		</div>
		<div class="col-span-2 lg:col-span-1">
			<InputField
				inputId="firstName"
				inputName="firstName"
				inputLabel="Votre prénom"
				inputType="text"
				inputValue={data.firstName.value}
				isRequired
				on:input={(e) => handleChange(e, 'firstName')}
			/>
			{#if data.firstName.error}
				<p class="text-sm text-error mt-2">{data.firstName.error}</p>
			{/if}
		</div>
		<div class="col-span-2 lg:col-span-1">
			<InputField
				inputId="lastName"
				inputName="lastName"
				inputLabel="Votre nom"
				inputType="text"
				inputValue={data.lastName.value}
				isRequired
				on:input={(e) => handleChange(e, 'lastName')}
			/>
			{#if data.lastName.error}
				<p class="text-sm text-error mt-2">{data.lastName.error}</p>
			{/if}
		</div>
		<div class="col-span-2">
			<SelectField
				selectId="accountType"
				selectName="accountType"
				selectLabel="Qu'est ce qui vous décrit le mieux ?"
				selectValue={data.accountType.value}
				isRequired
				options={accountTypeOptions}
				on:change={(e) => handleChange(e, 'accountType')}
			/>
		</div>
		<div class="col-span-2">
			<InputField
				inputId="password"
				inputName="password"
				inputLabel="Mot de passe"
				inputType="password"
				inputValue={data.password.value}
				isRequired
				on:input={(e) => handleChange(e, 'password')}
			/>
			{#if data.password.error}
				<p class="text-sm text-error mt-2">{data.password.error}</p>
			{/if}
		</div>
		<div class="col-span-2">
			<InputField
				inputId="confirmPassword"
				inputName="confirmPassword"
				inputLabel="Confirmer votre mot de passe"
				inputType="password"
				inputValue={data.confirmPassword.value}
				isRequired
				on:input={(e) => handleChange(e, 'confirmPassword')}
			/>
			{#if data.confirmPassword.error}
				<p class="text-sm text-error mt-2">{data.confirmPassword.error}</p>
			{/if}
		</div>
		<div class="relative flex flex-col justify-center items-center mt-4 col-span-2">
			<button
				disabled={[
					data.accountType.error,
					data.password.error,
					data.confirmPassword.error,
					data.firstName.error,
					data.lastName.error
				].some((err) => err.length > 0) ||
					[
						data.accountType.value,
						data.password.value,
						data.confirmPassword.value,
						data.firstName.value,
						data.lastName.value
					].some((value) => value.length === 0)}
				class="btn btn-primary flex flex-row items-center justify-center gap-2"
				on:click={() =>
					dispatch('onNextStep', {
						data: {
							password: data.password.value,
							firstName: data.firstName.value,
							lastName: data.lastName.value,
							accountType: data.accountType.value
						}
					})}
			>
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
