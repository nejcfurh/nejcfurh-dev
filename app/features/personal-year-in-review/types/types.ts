/* eslint-disable @typescript-eslint/no-explicit-any */

// ANY WAS SET BECAUSE THE TYPES ARE NOT NEEDED AS THE MOCK DATA IS USED INSTEAD

// BIRDER PROFILE ENUM
export enum BirderProfile {
  SOCIALITE = 'socialite',
  SPECIALIST = 'specialist',
  GUARDIAN = 'guardian',
  SCIENTIST = 'scientist',
}

export type YearInReviewResponse = any;

export type YearInReviewQueryData = any;

// GENERAL VISIT STATISTICS
export type YearInReviewGeneralStats =
  YearInReviewQueryData['generalVisitStats'];

// SPECIES VISIT STATISTICS
export type YearInReviewSpeciesStats =
  YearInReviewQueryData['speciesVisitStats'];

// INDIVIDUAL SPECIES VISIT DATA
export type YearInReviewSpeciesVisit =
  YearInReviewSpeciesStats['distinctSpecies'][number];

// NAMED BIRD VISIT STATISTICS
export type YearInReviewNamedBirdStats =
  YearInReviewQueryData['namedBirdVisitStats'];

// INDIVIDUAL NAMED BIRD VISIT DATA
export type YearInReviewNamedBirdVisit =
  NonNullable<YearInReviewNamedBirdStats>['namedBirds'][number];

// RARE GUEST VISIT STATISTICS
export type YearInReviewRareGuestStats =
  YearInReviewQueryData['rareGuestVisitStats'];

// OTHER ANIMAL VISIT STATISTICS
export type YearInReviewOtherAnimalStats =
  YearInReviewQueryData['otherAnimalVisitStats'];

// MONTHLY VISIT STATISTICS
export type YearInReviewMonthlyStats =
  YearInReviewQueryData['monthlyVisitStats'];

// DAILY VISIT STATISTICS
export type YearInReviewDailyStats = YearInReviewQueryData['dailyVisitStats'];

// RARE GUEST RARITY TYPE (shim for @gql/generated)
export enum YearInReviewForUserRareGuestRarityType {
  TopSpeciesContributor = 'TOP_SPECIES_CONTRIBUTOR',
  RareSpecies = 'RARE_SPECIES',
  RareForUser = 'RARE_FOR_USER',
}
