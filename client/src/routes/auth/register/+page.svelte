<script lang="ts">
	import Navbar from '../../../components/common/Navbar/index.svelte';
	import Footer from '../../../components/common/Footer/index.svelte';
	import InputField from '../../../components/common/UI/InputField.svelte';
	import { isEmailValid } from '../../../utils/helpers';
	import { notificationCenter } from '../../../config/notifications';
	import { api } from '../../../api/Api';

	let data = {
		email: {
			value: '',
			error: ''
		}
	};
	let loading = false;

	const handleChange = (e: any) => {
		data.email.value = e.target.value;

		if (!isEmailValid(data.email.value)) {
			data.email.error = 'Veuillez renseigner un email valide.';
		} else {
			data.email.error = '';
		}
	};

	const handleSubmit = async () => {
		loading = true;

		if (data.email.error) {
			notificationCenter.displayErrorNotification('Veuillez renseigner un email valide.');
			loading = false;
			return;
		}

		try {
			await api.sendVerificationEmail(data.email.value);
			notificationCenter.displaySuccessNotification('Un email de vérification vous a été envoyé.');
		} catch (err: any) {
			if (err.response?.data?.statusCode === 400) {
				notificationCenter.displayErrorNotification(
					"Nous n'avons pas pu vous envoyer un email de vérification. Veuillez réessayer plus tard."
				);
			} else {
				notificationCenter.displayErrorNotification('Une erreur est survenue.');
			}
		} finally {
			loading = false;
		}
	};
</script>

<Navbar sticky={true} />
<div class="min-h-screen py-6 flex flex-col justify-center sm:py-12">
	<div class="relative py-3 sm:max-w-xl sm:mx-auto">
		<div
			class="absolute inset-0 bg-gradient-to-r from-primary to-info shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"
		/>
		<div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
			<div class="max-w-md w-96 mx-auto">
				<div>
					<h1 class="text-2xl font-semibold">Inscription</h1>
				</div>
				<div class="divide-y divide-gray-200">
					<div class="py-8 text-base leading-6 space-y-4 sm:text-lg sm:leading-7">
						<InputField
							inputId="email"
							inputName="email"
							inputLabel="Votre adresse email"
							inputType="email"
							inputValue={data.email.value}
							on:input={handleChange}
						/>
						<div class="relative flex flex-col justify-center items-center mt-4">
							<button
								on:click={handleSubmit}
								class="btn btn-primary"
								disabled={!data.email.value || data.email.error.length > 0}
							>
								{#if loading}
									<div class="spin">
										<svg
											role="status"
											class="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-white fill-primary"
											viewBox="0 0 100 101"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
												fill="currentColor"
											/>
											<path
												d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
												fill="currentFill"
											/>
										</svg>
									</div>
								{:else}
									Recevoir mon lien d'inscription
								{/if}
							</button>
							{#if data.email.error}
								<p class="text-sm text-error mt-2">{data.email.error}</p>
							{/if}
							<p class="text-sm mt-5">
								Vous avez déjà un compte ? <a
									href="/auth/login"
									class="underline font-bold text-primary">Connectez-vous</a
								>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<Footer />

<!-- markup (zero or more items) goes here -->
<style>
	/* your styles go here */
</style>
