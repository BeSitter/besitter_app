<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { notificationCenter } from '../../../../config/notifications';
	import { initRegistrationStore } from '../../../../stores/initStore';
	import { onMount } from 'svelte';
	import type { REGISTRATION_DATA } from '../../../../config/types';
	import Navbar from '../../../../components/common/Navbar/index.svelte';
	import Footer from '../../../../components/common/Footer/index.svelte';
	import Step1 from '../../../../components/auth/Steps/Step1.svelte';
	import registrationStore from '../../../../stores/registrationStore';
	import { api } from '../../../../api/Api';
	import Step2 from '../../../../components/auth/Steps/Step2.svelte';

	let data: REGISTRATION_DATA = {
		// step1
		token: null,
		password: null,
		firstName: null,
		lastName: null,
		accountType: null,
		// step2
		country: null,
		city: null,
		address: null,
		postalCode: null,
		// step3
		dateOfBirth: null,
		phoneNumber: null,
		profilePicture: null,
		bio: null,
		spokenLanguages: null,
		// step4
		hourlyRate: null,
		availabilityPeriods: null,
		proposedServices: null,
		highestAcademicLevel: null,
		yearsOfXp: null,
		xpTypes: null,
		clientWithSpecialNeedXp: null,
		characteristics: null,
		additionalCharacteristics: null,
		// step5
		officialIdentityDocument: null,
		criminalRecordDocument: null,
		bafaCertificate: null,
		firstAidCertificate: null
	};
	let currentStep = 1;
	let email = '';

	registrationStore.subscribe((store) => {
		data = store.registrationData;
		currentStep = store.currentStep;
	});

	const onNextStep = (e: CustomEvent<any>) => {
		if (currentStep === 1) {
			if (
				!e.detail.data.password ||
				!e.detail.data.firstName ||
				!e.detail.data.lastName ||
				!e.detail.data.accountType
			) {
				notificationCenter.displayErrorNotification(
					"Vous devez remplir tous les champs avant de passer à l'étape suivante"
				);
				return;
			}

			registrationStore.updateDataCache({ ...data, ...e.detail.data });
		}
	};

	onMount(async () => {
		try {
			const token = $page.url.searchParams.get('token');
			const decodedToken = await (await api.verifyToken(token!)).data;
			if (token && decodedToken && decodedToken.email) {
				await initRegistrationStore(token);
				email = decodedToken.email;
				data.token = token;
			} else {
				throw new Error('Une erreur est survenue. Veuillez réessayer');
			}
		} catch (err) {
			notificationCenter.displayErrorNotification('Une erreur est survenue. Veuillez réessayer');
			goto('/auth/register');
		}
	});
</script>

<Navbar sticky={true} />
<div class="min-h-screen py-6 flex flex-col justify-center sm:py-12">
	<div class="relative py-3 sm:mx-auto">
		<div
			class="absolute inset-0 bg-gradient-to-r from-primary to-info shadow-lg transform -skew-y-6 sm:skew-y-0 sm:rounded-3xl"
		/>
		<div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
			<div class="max-w-md w-full mx-auto">
				<div class="mb-10 flex flex-col justify-items-center items-center">
					<div class="hidden md:block">
						<ul class="steps w-96">
							<i
								class="step"
								class:step-primary={currentStep === 1 ||
									currentStep === 2 ||
									currentStep === 3 ||
									currentStep === 4 ||
									currentStep === 5}
							/>
							<li
								class="step"
								class:step-primary={currentStep === 2 ||
									currentStep === 3 ||
									currentStep === 4 ||
									currentStep === 5}
							/>
							<li
								class="step"
								class:step-primary={currentStep === 3 || currentStep === 4 || currentStep === 5}
							/>
							<li class="step" class:step-primary={currentStep === 4 || currentStep === 5} />
							<li class="step" class:step-primary={currentStep === 5} />
						</ul>
					</div>
				</div>
				<div class="divide-y divide-gray-200">
					{#if currentStep === 1}
						<Step1 {email} on:onNextStep={onNextStep} />
					{/if}
					{#if currentStep === 2}
						<Step2 />
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>
<Footer />

<style>
	/* your styles go here */
</style>
