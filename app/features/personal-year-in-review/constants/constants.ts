import { YearInReviewQueryData } from '../types/types';

export const MOCK_YEAR_IN_REVIEW_DATA: YearInReviewQueryData = {
  year: 2025,

  // GENERAL VISIT STATISTICS
  generalVisitStats: {
    totalVisits: 8541,
    totalVisitsPercentile: 85,
    hasFeederHousingTypeClassicVisits: true,
  },

  // SPECIES VISIT STATISTICS
  speciesVisitStats: {
    distinctSpeciesPercentile: 95,
    distinctSpecies: [
      {
        species: {
          id: 'great-tit',
          name: 'Great Tit',
          iconUrl:
            'https://assets.cms-api-graphql.cms-api.prod.aws.mybirdbuddy.com/asset/icon/bird-illustrations/d204f5b6-7b69-4206-ab3b-b51356bd8f11_EurasianBlueTit.png',
          favoriteFoods: [
            {
              name: 'Sunflower Seeds',
            },
          ],
        },
        visitCount: 537,
        medias: [
          {
            __typename: 'MediaImage',
            id: 'great-tit-media-1',
            thumbnailUrl:
              'https://graphql.app-api.prod.aws.mybirdbuddy.com/api/v1/public/media/83f70d81-44ae-4cda-a89b-9f56b9cd3ddc/view?size=thumbnail',
            width: 300,
            height: 300,
            createdAt: '2024-03-15T10:30:00.000Z',
          },
          {
            __typename: 'MediaImage',
            id: 'great-tit-media-2',
            thumbnailUrl:
              'https://graphql.app-api.prod.aws.mybirdbuddy.com/api/v1/public/media/9cb42035-e82e-4eeb-b2ae-d7235967e4ab/view?size=thumbnail',
            width: 300,
            height: 300,
            createdAt: '2024-04-10T14:20:00.000Z',
          },
          {
            __typename: 'MediaImage',
            id: 'great-tit-media-3',
            thumbnailUrl:
              'https://graphql.app-api.prod.aws.mybirdbuddy.com/api/v1/public/media/cb20660b-694c-459c-bb53-b3b4a6d425a4/view?size=thumbnail',
            width: 300,
            height: 300,
            createdAt: '2024-05-22T09:45:00.000Z',
          },
        ],
      },
      {
        species: {
          id: 'european-robin',
          name: 'European Robin',
          iconUrl:
            'https://assets.cms-api-graphql.cms-api.prod.aws.mybirdbuddy.com/asset/icon/bird-illustrations/e24541fc-d766-462f-ada6-f7e729a3b011_NorthernCardinal.png',
          favoriteFoods: [
            {
              name: 'Mealworms',
            },
          ],
        },
        visitCount: 189,
        medias: [
          {
            __typename: 'MediaImage',
            id: 'european-robin-media-1',
            thumbnailUrl:
              'https://graphql.app-api.prod.aws.mybirdbuddy.com/api/v1/public/media/2ac37958-6ddc-4fd7-aece-57288b09f960/view?size=thumbnail',
            width: 300,
            height: 300,
            createdAt: '2024-02-18T11:15:00.000Z',
          },
          {
            __typename: 'MediaImage',
            id: 'european-robin-media-2',
            thumbnailUrl:
              'https://graphql.app-api.prod.aws.mybirdbuddy.com/api/v1/public/media/9ebea131-2cc5-47af-9149-163824194c0d/view?size=thumbnail',
            width: 300,
            height: 300,
            createdAt: '2024-03-25T16:40:00.000Z',
          },
          {
            __typename: 'MediaImage',
            id: 'european-robin-media-3',
            thumbnailUrl:
              'https://graphql.app-api.prod.aws.mybirdbuddy.com/api/v1/public/media/9f397857-affe-4d0e-9199-1daa0e502a1c/view?size=thumbnail',
            width: 300,
            height: 300,
            createdAt: '2024-06-12T08:30:00.000Z',
          },
        ],
      },
      {
        species: {
          id: 'house-sparrow',
          name: 'House Sparrow',
          iconUrl:
            'https://assets.cms-api-graphql.cms-api.prod.aws.mybirdbuddy.com/asset/icon/bird-illustrations/affa570b-882d-4b1a-a179-f350f666c322_CaliforniaScrub-Jay.png',
          favoriteFoods: [
            {
              name: 'Seeds',
            },
          ],
        },
        visitCount: 141,
        medias: [
          {
            __typename: 'MediaImage',
            id: 'house-sparrow-media-1',
            thumbnailUrl:
              'https://graphql.app-api.prod.aws.mybirdbuddy.com/api/v1/public/media/93ec1e7d-92cc-41c9-ad08-5636df49feec/view?size=thumbnail',
            width: 300,
            height: 300,
            createdAt: '2024-01-20T13:25:00.000Z',
          },
          {
            __typename: 'MediaImage',
            id: 'house-sparrow-media-2',
            thumbnailUrl:
              'https://graphql.app-api.prod.aws.mybirdbuddy.com/api/v1/public/media/9ebea131-2cc5-47af-9149-163824194c0d/view?size=thumbnail',
            width: 300,
            height: 300,
            createdAt: '2024-04-08T15:10:00.000Z',
          },
          {
            __typename: 'MediaImage',
            id: 'house-sparrow-media-3',
            thumbnailUrl:
              'https://graphql.app-api.prod.aws.mybirdbuddy.com/api/v1/public/media/ab88c055-56ea-4950-9db6-51c8714c49af/view?size=thumbnail',
            width: 300,
            height: 300,
            createdAt: '2024-07-14T10:55:00.000Z',
          },
        ],
      },
      {
        species: {
          id: 'dove',
          name: 'Dove',
          iconUrl:
            'https://assets.cms-api-graphql.cms-api.prod.aws.mybirdbuddy.com/asset/icon/bird-illustrations/a0de5d6c-4ca6-44ee-a75a-8db292c65b49_EurasianCollaredDove.png',
          favoriteFoods: [
            {
              name: 'Grains',
            },
          ],
        },
        visitCount: 88,
        medias: [
          {
            __typename: 'MediaImage',
            id: 'dove-media-1',
            thumbnailUrl:
              'https://graphql.app-api.prod.aws.mybirdbuddy.com/api/v1/public/media/5bceee89-c79f-4572-a215-7bf86b058a84/view?size=thumbnail',
            width: 300,
            height: 300,
            createdAt: '2024-02-05T12:00:00.000Z',
          },
          {
            __typename: 'MediaImage',
            id: 'dove-media-2',
            thumbnailUrl:
              'https://graphql.app-api.prod.aws.mybirdbuddy.com/api/v1/public/media/9bdb2574-36d7-4de9-8f14-491a92b23834/view?size=thumbnail',
            width: 300,
            height: 300,
            createdAt: '2024-05-18T14:30:00.000Z',
          },
          {
            __typename: 'MediaImage',
            id: 'dove-media-3',
            thumbnailUrl:
              'https://graphql.app-api.prod.aws.mybirdbuddy.com/api/v1/public/media/2aa3905a-38a8-4df5-ae22-3944026f3029/view?size=thumbnail',
            width: 300,
            height: 300,
            createdAt: '2024-08-22T09:15:00.000Z',
          },
        ],
      },
    ],
  },

  // NAMED BIRDS
  namedBirdVisitStats: {
    namedBirds: [
      {
        identificationCount: 12,
        namedBird: {
          id: 'george',
          name: 'George',
          createdAt: '2024-01-05T10:00:00.000Z',
          species: {
            id: 'dove',
            name: 'Dove',
            iconUrl:
              'https://assets.cms-api-graphql.cms-api.prod.aws.mybirdbuddy.com/asset/icon/bird-illustrations/a0de5d6c-4ca6-44ee-a75a-8db292c65b49_EurasianCollaredDove.png',
            favoriteFoods: [
              {
                name: 'Peanuts',
              },
            ],
          },
          previewMedia: [
            {
              __typename: 'MediaImage',
              id: 'george-preview-1',
              thumbnailUrl:
                'https://graphql.app-api.prod.aws.mybirdbuddy.com/api/v1/public/media/5bceee89-c79f-4572-a215-7bf86b058a84/view?size=thumbnail',
              width: 300,
              height: 300,
              createdAt: '2024-01-05T10:00:00.000Z',
            },
          ],
        },
      },
      {
        identificationCount: 18,
        namedBird: {
          id: 'jackson',
          name: 'Jackson',
          createdAt: '2024-02-10T11:30:00.000Z',
          species: {
            id: 'eurasian-blue-tit',
            name: 'Eurasian Blue Tit',
            iconUrl:
              'https://assets.cms-api-graphql.cms-api.prod.aws.mybirdbuddy.com/asset/icon/bird-illustrations/d204f5b6-7b69-4206-ab3b-b51356bd8f11_EurasianBlueTit.png',
            favoriteFoods: [
              {
                name: 'Peanuts',
              },
            ],
          },
          previewMedia: [
            {
              __typename: 'MediaImage',
              id: 'jackson-preview-1',
              thumbnailUrl:
                'https://graphql.app-api.prod.aws.mybirdbuddy.com/api/v1/public/media/83f70d81-44ae-4cda-a89b-9f56b9cd3ddc/view?size=thumbnail',
              width: 300,
              height: 300,
              createdAt: '2024-02-10T11:30:00.000Z',
            },
          ],
        },
      },
      {
        identificationCount: 24,
        namedBird: {
          id: 'lucas',
          name: 'Lucas',
          createdAt: '2024-03-15T09:45:00.000Z',
          species: {
            id: 'california-scrub-jay',
            name: 'California Scrub Jay',
            iconUrl:
              'https://assets.cms-api-graphql.cms-api.prod.aws.mybirdbuddy.com/asset/icon/bird-illustrations/affa570b-882d-4b1a-a179-f350f666c322_CaliforniaScrub-Jay.png',
            favoriteFoods: [
              {
                name: 'Peanuts',
              },
            ],
          },
          previewMedia: [
            {
              __typename: 'MediaImage',
              id: 'lucas-preview-1',
              thumbnailUrl:
                'https://graphql.app-api.prod.aws.mybirdbuddy.com/api/v1/public/media/93ec1e7d-92cc-41c9-ad08-5636df49feec/view?size=thumbnail',
              width: 300,
              height: 300,
              createdAt: '2024-03-15T09:45:00.000Z',
            },
          ],
        },
      },
      {
        identificationCount: 30,
        namedBird: {
          id: 'max',
          name: 'Max',
          createdAt: '2024-04-20T14:15:00.000Z',
          species: {
            id: 'northern-cardinal',
            name: 'Northern Cardinal',
            iconUrl:
              'https://assets.cms-api-graphql.cms-api.prod.aws.mybirdbuddy.com/asset/icon/bird-illustrations/e24541fc-d766-462f-ada6-f7e729a3b011_NorthernCardinal.png',
            favoriteFoods: [
              {
                name: 'Peanuts',
              },
            ],
          },
          previewMedia: [
            {
              __typename: 'MediaImage',
              id: 'max-preview-1',
              thumbnailUrl:
                'https://graphql.app-api.prod.aws.mybirdbuddy.com/api/v1/public/media/2ac37958-6ddc-4fd7-aece-57288b09f960/view?size=thumbnail',
              width: 300,
              height: 300,
              createdAt: '2024-04-20T14:15:00.000Z',
            },
          ],
        },
      },
      {
        identificationCount: 42,
        namedBird: {
          id: 'kevin',
          name: 'Kevin',
          createdAt: '2024-06-12T16:20:00.000Z',
          species: {
            id: 'eurasian-blue-tit-2',
            name: 'Eurasian Blue Tit',
            iconUrl:
              'https://assets.cms-api-graphql.cms-api.prod.aws.mybirdbuddy.com/asset/icon/bird-illustrations/d204f5b6-7b69-4206-ab3b-b51356bd8f11_EurasianBlueTit.png',
            favoriteFoods: [
              {
                name: 'Peanuts',
              },
            ],
          },
          previewMedia: [
            {
              __typename: 'MediaImage',
              id: 'kevin-preview-1',
              thumbnailUrl:
                'https://graphql.app-api.prod.aws.mybirdbuddy.com/api/v1/public/media/2c543f33-6161-4be1-b336-333b846359a2/view?size=thumbnail',
              width: 300,
              height: 300,
              createdAt: '2024-06-12T16:20:00.000Z',
            },
          ],
        },
      },
    ],
  },

  // RARE GUEST
  rareGuestVisitStats: {
    rareGuest: {
      species: {
        id: 'pine-warbler',
        name: 'Pine Warbler',
        iconUrl: '',
        favoriteFoods: [
          {
            name: 'Insects',
          },
        ],
      },
      visitCount: 5,
      medias: [
        {
          __typename: 'MediaImage',
          id: 'rare-guest-media',
          thumbnailUrl:
            '/images/projects/personal-year-in-review/test-data/pine-warbler.jpg',
          width: 300,
          height: 300,
          createdAt: '2024-07-28T08:30:00.000Z',
        },
      ],
    },
    rarityDescription: 'Only 5% of feeders',
    rarityType: 'RareSpecies',
    rarityValue: 5,
  },

  // OTHER ANIMAL VISIT STATISTICS
  otherAnimalVisitStats: {
    otherAnimals: [
      {
        species: {
          id: 'cat',
          name: 'Cat',
          iconUrl: '',
          favoriteFoods: [],
        },
        visitCount: 55,
        medias: [
          {
            __typename: 'MediaImage',
            id: 'cat-media-1',
            thumbnailUrl:
              'https://graphql.app-api.prod.aws.mybirdbuddy.com/api/v1/public/media/e1d903e5-e6f9-4b7e-8d32-c329158b1a34/view?size=thumbnail',
            width: 300,
            height: 300,
            createdAt: '2024-03-10T15:45:00.000Z',
          },
        ],
      },
      {
        species: {
          id: 'squirrel',
          name: 'Squirrel',
          iconUrl: '',
          favoriteFoods: [],
        },
        visitCount: 31,
        medias: [
          {
            __typename: 'MediaImage',
            id: 'squirrel-media-1',
            thumbnailUrl:
              '/images/projects/personal-year-in-review/test-data/squirrel.png',
            width: 300,
            height: 300,
            createdAt: '2024-04-15T10:20:00.000Z',
          },
        ],
      },
      {
        species: {
          id: 'rabbit',
          name: 'Rabbit',
          iconUrl: '',
          favoriteFoods: [],
        },
        visitCount: 22,
        medias: [
          {
            __typename: 'MediaImage',
            id: 'rabbit-media-1',
            thumbnailUrl:
              '/images/projects/personal-year-in-review/test-data/rabbit.jpg',
            width: 300,
            height: 300,
            createdAt: '2024-05-08T12:30:00.000Z',
          },
        ],
      },
    ],
  },

  // MONTHLY VISIT STATISTICS
  monthlyVisitStats: {
    monthlyVisits: [
      {
        month: 'January',
        visitCount: 600,
      },
      {
        month: 'February',
        visitCount: 650,
      },
      {
        month: 'March',
        visitCount: 700,
      },
      {
        month: 'April',
        visitCount: 800,
      },
      {
        month: 'May',
        visitCount: 900,
      },
      {
        month: 'June',
        visitCount: 850,
      },
      {
        month: 'July',
        visitCount: 750,
      },
      {
        month: 'August',
        visitCount: 700,
      },
      {
        month: 'September',
        visitCount: 680,
      },
      {
        month: 'October',
        visitCount: 650,
      },
      {
        month: 'November',
        visitCount: 620,
      },
      {
        month: 'December',
        visitCount: 641,
      },
    ],
  },

  // DAILY VISIT STATISTICS
  dailyVisitStats: {
    topDays: [
      {
        date: '2024-05-15T00:00:00.000Z',
        visitCount: 125,
      },
    ],
  },
};
