require('dotenv').config();

export const JWTCONFIG = {
  secret: process.env.TOKEN_KEY,
};

export const EVENTS = {
  user_created: 'user.created',
};

export const ACCOUNT_REQUIRED_FIELDS_PERCENTAGES = {
  country: 5,
  city: 5,
  address: 5,
  postalCode: 5,
  dateOfBirth: 5,
  bio: 5,
  spokenLanguages: 5,
  hourlyRate: 2.5,
  availabilityPeriods: 2.5,
  profilePicture: 5,
  proposedServices: 5,
};

export const ACCOUNT_OPTIONAL_FIELDS_PERCENTAGES = {
  phoneNumber: 5,
  highestAcademicLevel: 5,
  yearsOfXp: 5,
  xpTypes: 5,
  characteristics: 5,
  additionalCharacteristics: 5,
  officialIdentityDocument: 10,
  criminalRecordDocument: 10,
};
