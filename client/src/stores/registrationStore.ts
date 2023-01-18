import { writable, get } from 'svelte/store';
import type { REGISTRATION_DATA } from '../config/types';

const defaultStoreValue: { registrationData: REGISTRATION_DATA; currentStep: number } = {
	registrationData: {
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
	},
	currentStep: 1
};

const registrationStoreWrittable = writable(defaultStoreValue);
const { subscribe, update } = registrationStoreWrittable;
export const getRegistrationStoreValues = () => get(registrationStoreWrittable);

const registrationStore = {
	subscribe,
	init(providedToken: string) {
		try {
			let registrationDataCache: REGISTRATION_DATA = defaultStoreValue.registrationData;
			let currStep = 1;

			if (window && window.localStorage.getItem('registrationDataCache')) {
				// @ts-ignore
				registrationDataCache = JSON.parse(window.localStorage.getItem('registrationDataCache'));

				currStep = generateStep(registrationDataCache, providedToken);
			} else {
				if (window) {
					window.localStorage.setItem(
						'registrationDataCache',
						JSON.stringify(defaultStoreValue.registrationData)
					);
				}
			}

			return update((store) => ({
				...store,
				registrationData: { ...store.registrationData, ...registrationDataCache },
				currentStep: currStep
			}));
		} catch (err) {
			console.error('[registrationDataCacheStore] error on init', err);
		}
	},
	updateDataCache(updatedData: REGISTRATION_DATA) {
		if (window && window.localStorage.getItem('registrationDataCache')) {
			window.localStorage.setItem('registrationDataCache', JSON.stringify(updatedData));
			const currentStep = generateStep(updatedData, updatedData.token);
			return update((store) => ({
				...store,
				registrationData: { ...updatedData },
				currentStep: currentStep
			}));
		}
	}
};

function generateStep(dataCache: REGISTRATION_DATA, providedToken: string | null): number {
	let currentStep = 1;

	if (
		dataCache.token &&
		dataCache.token === providedToken &&
		dataCache.firstName &&
		dataCache.lastName &&
		dataCache.accountType
	) {
		currentStep = 2;
	}

	if (dataCache.country && dataCache.city && dataCache.address && dataCache.postalCode) {
		currentStep = 3;
	}

	if (
		dataCache.dateOfBirth &&
		dataCache.phoneNumber &&
		dataCache.profilePicture &&
		dataCache.bio &&
		dataCache.spokenLanguages
	) {
		currentStep = 4;
	}

	if (
		dataCache.hourlyRate &&
		dataCache.availabilityPeriods &&
		dataCache.proposedServices &&
		dataCache.highestAcademicLevel &&
		dataCache.yearsOfXp &&
		dataCache.xpTypes &&
		dataCache.clientWithSpecialNeedXp &&
		dataCache.characteristics &&
		dataCache.additionalCharacteristics
	) {
		currentStep = 5;
	}

	if (
		dataCache.officialIdentityDocument &&
		dataCache.criminalRecordDocument &&
		dataCache.bafaCertificate &&
		dataCache.firstAidCertificate
	) {
		currentStep = 6;
	}

	return currentStep;
}

export default registrationStore;
