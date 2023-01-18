import type {
	ACADEMIC_LEVEL,
	ACCOUNT_TYPE,
	ADDITIONAL_CHARACTERISTIC,
	CHARACTERISTIC,
	PROPOSED_SERVICES,
	TIMEFRAME,
	XP_TYPE
} from './enum';

export type REGISTRATION_DATA = {
	token: string | null;
	password: string | null;
	firstName: string | null;
	lastName: string | null;
	accountType: ACCOUNT_TYPE | null;
	country: string | null;
	city: string | null;
	address: string | null;
	postalCode: string | null;
	dateOfBirth?: Date | null;
	bio?: string | null;
	spokenLanguages?: Array<string> | null;
	hourlyRate?: number | null;
	availabilityPeriods?: Array<AVAILABILITY_PERIOD> | null;
	profilePicture?: string | null;
	proposedServices?: Array<PROPOSED_SERVICES> | null;
	phoneNumber?: string | null;
	highestAcademicLevel?: ACADEMIC_LEVEL | null;
	yearsOfXp?: number | null;
	xpTypes?: Array<XP_TYPE> | null;
	clientWithSpecialNeedXp?: boolean | null;
	characteristics?: Array<CHARACTERISTIC> | null;
	additionalCharacteristics?: Array<ADDITIONAL_CHARACTERISTIC> | null;
	officialIdentityDocument?: string | null;
	criminalRecordDocument?: string | null;
	bafaCertificate?: string | null;
	firstAidCertificate?: string | null;
};

export type AVAILABILITY_PERIOD = {
	week_day: string;
	timeframes: TIMEFRAME[];
};
