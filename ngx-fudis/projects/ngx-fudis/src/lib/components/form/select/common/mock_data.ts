/**
 * This file contains mock data related to Select and Multiselect Components
 */

import { FudisSelectOption } from '../../../../types/forms';

interface MockSelectOptionGroupData {
  country: string;
  options: FudisSelectOption<TestAnimalScience>[];
}

export type TestAnimalSound = {
  value: string;
  label: string;
  sound: string;
  disabled?: boolean;
};

export const defaultOptions: FudisSelectOption<TestAnimalSound>[] = [
  { value: 'value-1-dog', label: 'Dog', sound: 'Wuf!' },
  { value: 'value-2-capybara', label: 'Capybara', sound: 'Squek!' },
  { value: 'value-3-platypys', label: 'Platypus', sound: 'Plat plat!' },
  { value: 'value-4-cat', label: 'Really dangerous cat', disabled: true, sound: 'PurrROAR!' },
  {
    value: 'value-5-armadillo',
    label: 'Screaming hairy armadillo',
    sound: "Rollin' rollin' rollin'!",
  },
  { value: 'value-6-gecko', label: 'Southern Titiwangsa Bent-Toed Gecko', sound: 'Gec-koooo!' },
];

export const multiselectChipListMockData: FudisSelectOption<object>[] = [
  { value: 'hereford', label: 'Hereford' },
  { value: 'texas-longhorn', label: 'Texas Longhorn' },
  { value: 'ayrshire', label: 'Ayrshire' },
  { value: 'wagyu', label: 'Wagyu' },
];

export type TestAnimalScience = {
  value: string;
  label: string;
  subLabel: string;
  disabled?: boolean;
};

type CountryData = {
  country: string;
  options: TestAnimalScience[];
};

type CountryDataArray = CountryData[];

export const groupedTestData: CountryDataArray = [
  {
    country: 'Netherlands',

    options: [
      {
        value: '4257d865-872c-4ea6-80e6-8bd04ce56ad7',
        label: 'Golden jackal',
        subLabel: 'Canis aureus',
      },
      {
        value: 'e2fa6f0a-632a-485f-8ccf-b984311fe3b4',
        label: 'Mountain lion',
        subLabel: 'Felis concolor',
      },
      {
        value: '0cf7dff9-10e4-400b-b8e0-828b2e0baf30',
        label: 'Cat, european wild',
        subLabel: 'Felis silvestris lybica',
      },
    ],
  },
  {
    country: 'Brazil',
    options: [
      {
        value: '4ae756e1-3ace-43a4-8c47-7081328970b1',
        label: 'Small Indian mongoose',
        subLabel: 'Herpestes javanicus',
      },
      {
        value: 'c0cba653-c8eb-410d-bf65-32d2353e1fca',
        label: 'Falcon, prairie',
        subLabel: 'Falco mexicanus',
      },
      {
        value: 'cc5a789e-6a7c-471a-a931-40edd734cbad',
        label: 'Spotted hyena',
        subLabel: 'Crocuta crocuta',
      },
    ],
  },
  {
    country: 'China',
    options: [
      {
        value: '4c08f813-45b6-4a32-99de-eee6a80a555a',
        label: 'Salmon pink bird eater tarantula',
        subLabel: 'Lasiodora parahybana',
      },
      {
        value: '98bd0882-5bc8-435f-932d-0bf7495b0608',
        label: 'Crane, sandhill',
        subLabel: 'Grus canadensis',
      },
      {
        value: '967d39b8-f85a-45aa-952e-8d0607dde1f6',
        label: 'Arctic fox',
        subLabel: 'Alopex lagopus',
      },
    ],
  },
];

export const selectMovieMockData: FudisSelectOption<object>[] = [
  {
    value: '70c15d93-e846-425b-bae0-2313a5c91d90',
    label: "101 Dalmatians II: Patch's London Adventure",
    subLabel: 'Animation | Children',
  },
  {
    value: '40628e30-66bf-493d-abe6-9c8e38fab714',
    label: '18 Fingers of Death!',
    subLabel: 'Action | Comedy',
  },
  {
    value: 'deb13323-5330-43ff-81ed-df90323be426',
    label: '1971',
    subLabel: 'Documentary',
  },
  {
    value: 'b8a0460a-21cf-49a1-8a93-ead5516fd0bb',
    label: '2-Headed Shark Attack',
    subLabel: 'Comedy | Horror',
  },
  {
    value: '12bcb11f-193d-413c-b795-0f89ba9f64dd',
    label: '2019: After the Fall of New York',
    subLabel: 'Action | Horror | Sci-Fi',
  },
  {
    value: '6a87f4c1-dc22-475d-b88f-eec7fc632408',
    label: '27 Dresses',
    subLabel: 'Comedy | Romance',
  },
  {
    value: '86a27212-b5a5-41a6-bfc4-c0b88248ad6f',
    label: '28 Hotel Rooms',
    subLabel: 'Drama',
  },
  {
    value: '453dc456-97d9-4366-a2d2-2be50e5db678',
    label: '300 Miles to Heaven (300 Mil do Nieba)',
    subLabel: 'Drama',
  },
  {
    value: 'a13a50aa-4ad2-4a68-b10c-be2fd7897340',
    label: '3000 Miles to Graceland',
    subLabel: 'Action | Thriller',
  },
  {
    value: '4ec6c2bc-5183-4b16-b1dd-a40d92bf8ce0',
    label: '40 Guns to Apache Pass',
    subLabel: 'Adventure | Romance | Western',
  },
  {
    value: 'fff95503-c671-4291-b9e2-ee7e46d78806',
    label: '44 Inch Chest',
    subLabel: 'Crime | Drama',
  },
  {
    value: '4c4694a9-70b2-4f10-b058-9d2e704a4cd1',
    label: '8 Women',
    subLabel: 'Comedy | Crime | Musical | Mystery',
  },
  {
    value: '0461f62c-cb5c-4794-9532-aef587ff8c9e',
    label: '8MM 2',
    subLabel: 'Drama | Mystery | Thriller',
  },
  {
    value: 'c35bb021-6edd-4892-96b4-4f60ee930a20',
    label: '9 Star Hotel (Malon 9 Kochavim)',
    subLabel: 'Documentary',
  },
  {
    value: '78cadcb7-98a2-4836-bf3a-9250ca754733',
    label: '99 River Street',
    subLabel: 'Action | Crime | Drama | Film-Noir',
  },
  {
    value: '8d56a956-6f88-4cf9-91dc-906033d744c2',
    label: '9th Company',
    subLabel: 'Action | Drama | War',
  },
  {
    value: 'cd43f370-030b-46de-9c8e-fefd53f5db64',
    label: 'A Magnificent Haunting',
    subLabel: 'Drama',
  },
  {
    value: '348ac9b3-679d-429c-8fc3-4ec8a9a2db4f',
    label: 'À nos amours',
    subLabel: 'Drama | Romance',
  },
  {
    value: '816c39e6-0e4f-4b4d-a9b1-ce136e116a39',
    label: 'A Star Athlete',
    subLabel: 'Comedy | Drama',
  },
  {
    value: 'e2c629f8-023b-40ee-a95c-42d77daff5a9',
    label: 'A Summer in La Goulette',
    subLabel: 'Comedy | Drama',
  },
  {
    value: '58c7af35-c4cf-4508-8eab-5d8cb915c738',
    label: 'Above the Street, Below the Water (Over gaden under vandet)',
    subLabel: 'Drama',
  },
  {
    value: 'cda5a068-b531-440b-a5b4-bed99dff6cee',
    label: 'Adam',
    subLabel: 'Drama | Romance',
  },
  {
    value: 'd39b8288-4b28-416c-aa9d-bcdeefe6d9a8',
    label: 'Adam Resurrected',
    subLabel: 'Drama | War',
  },
  {
    value: '43977a2c-1b7d-4e3b-8e62-656dd518e9ee',
    label: 'Adventures of Huckleberry Finn, The',
    subLabel: 'Adventure | Drama',
  },
  {
    value: '411962ac-69de-4685-a9b0-bc4ff61c45b5',
    label: 'Adventures of Prince Achmed, The (Abenteuer des Prinzen Achmed, Die)',
    subLabel: 'Adventure | Animation | Fantasy | Romance',
  },
  {
    value: '43483f61-e72b-48db-bd36-908dd6421cab',
    label: 'Adventures of Sherlock Holmes, The',
    subLabel: 'Crime | Mystery | Thriller',
  },
  {
    value: 'f701ed81-e1ca-4b35-b136-9a5fe238adff',
    label: 'Africa: The Serengeti',
    subLabel: 'Documentary | IMAX',
  },
  {
    value: 'ca75f1bd-917e-4684-9c9d-bedd0d5108f1',
    label: 'Age of Consent',
    subLabel: 'Comedy | Drama | Romance',
  },
  {
    value: 'bef9ea19-a3d8-43d0-8a76-1e1957032d6e',
    label: 'Age of Dinosaurs',
    subLabel: 'Action | Sci-Fi',
  },
  {
    value: 'addca0c4-5cb4-4a73-be28-f8016fe68ff0',
    label: 'Ai Weiwei: Never Sorry',
    subLabel: 'Documentary',
  },
  {
    value: '01ad5198-23de-4067-9135-2d9ece204954',
    label: 'Aimée & Jaguar',
    subLabel: 'Drama | Romance | War',
  },
  {
    value: '1b6ca405-a60f-49ab-8774-b8e2df1b085f',
    label: 'Algiers',
    subLabel: 'Drama | Romance',
  },
  {
    value: 'd707bfa6-4c5c-4cee-9e64-c2cf6ae3b56c',
    label: 'Alice Upside Down (Alice)',
    subLabel: 'Adventure | Children | Comedy | Drama',
  },
  {
    value: '50674b45-6470-4add-a0b1-3de45dc99e40',
    label: 'Alien Abduction',
    subLabel: 'Horror | Mystery | Sci-Fi',
  },
  {
    value: '2b235dc6-a59c-4f56-9119-c7387b052260',
    label: 'All the Boys Love Mandy Lane',
    subLabel: 'Horror | Mystery | Thriller',
  },
  {
    value: '886d6cdf-583f-459f-a002-fb77040a0ad7',
    label: 'All Through the Night',
    subLabel: 'Action | Comedy | Drama | Thriller | War',
  },
  {
    value: 'f4ae74cb-9495-4a21-81dd-d2c69f448a7e',
    label: 'Along Came Polly',
    subLabel: 'Comedy | Romance',
  },
  {
    value: '1bf53bb2-12c1-41f0-a777-15e77b9eed55',
    label: 'Alpha and Omega 3: The Great Wolf Games',
    subLabel: 'Action | Adventure | Animation | Children | Comedy',
  },
  {
    value: 'cb61aa26-9624-4f79-88ab-637dc2b5c6ff',
    label: 'Alphaville (Alphaville, une étrange aventure de Lemmy Caution)',
    subLabel: 'Drama | Mystery | Romance | Sci-Fi | Thriller',
  },
  {
    value: '6d927897-80db-4318-a9c7-5303b73da20a',
    label: 'Always',
    subLabel: 'Comedy | Drama',
  },
  {
    value: '01d3d6e5-7d24-49eb-98b7-8d630b456e19',
    label: 'Am Ende eiens viel zu kurzen Tages (Death of a superhero)',
    subLabel: 'Animation | Drama',
  },
  {
    value: '5797a114-50d0-44ea-a9bc-a684f066403a',
    label: 'Amateurs, The (Moguls, The)',
    subLabel: 'Comedy',
  },
  {
    value: 'edb14ee5-77b8-41e1-b29d-311c8dfb870e',
    label: 'Amber Lake ',
    subLabel: 'Drama | Thriller',
  },
  {
    value: '5e8fa57e-5c66-4d54-992d-dea2b532af40',
    label: 'Ambush (Mai fu)',
    subLabel: 'Action | Adventure',
  },
  {
    value: 'd81001f9-c724-43ce-a49a-093b33ff4bd2',
    label: 'American Crime, An',
    subLabel: 'Crime',
  },
  {
    value: '7ada9ed2-cccd-49b8-a172-4ec1e5b021c2',
    label: 'American Me',
    subLabel: 'Drama',
  },
  {
    value: '3b911856-a048-4c10-927a-c42645152405',
    label: 'American Pimp',
    subLabel: 'Documentary',
  },
  {
    value: '37dbd746-17e1-4660-b555-4ce4c31118c7',
    label: 'Amongst Friends',
    subLabel: 'Crime | Drama',
  },
  {
    value: '4751483d-7aa1-4dd2-bc68-8234b4696e1d',
    label: 'Amor brujo, El (Love Bewitched, A)',
    subLabel: 'Drama | Musical',
  },
  {
    value: 'e0d4f360-028c-4c35-9da7-4018e484f945',
    label: "Amore (L'Amore)",
    subLabel: 'Drama',
  },
  {
    value: '8c09ae21-e099-4a9a-878c-7a61b78a2ac6',
    label: 'And Nobody Weeps for Me (Und keiner weint mir nach)',
    subLabel: 'Drama | Romance',
  },
  {
    value: '206b6b87-42ff-4490-b0bf-eb0cece54b2a',
    label: 'And Now... Ladies and Gentlemen...',
    subLabel: 'Romance | Thriller',
  },
  {
    value: '833ec30a-79c9-48a9-878c-df4b0b4ded5d',
    label: 'And Soon the Darkness',
    subLabel: 'Horror | Thriller',
  },
  {
    value: '1a467dec-cb7e-4f8c-a05d-9a5125e66eca',
    label: 'Andalusian Dog, An (Chien andalou, Un)',
    subLabel: 'Fantasy',
  },
  {
    value: 'd2a2db46-9a9c-4918-87a4-9231ec87201a',
    label: 'Angel on My Shoulder',
    subLabel: 'Crime | Drama',
  },
  {
    value: '9432ba2a-ee3f-48d1-a278-57b6f42f82ca',
    label: 'Animal, The',
    subLabel: 'Comedy',
  },
  {
    value: 'eaad996c-ec05-4378-a787-d80adb0f470e',
    label: 'Another Woman',
    subLabel: 'Drama',
  },
  {
    value: '637c6232-956d-4e62-b92c-859354cd9380',
    label: 'Antarctica',
    subLabel: 'Adventure | Drama',
  },
  {
    value: '8e6c08ac-c1ca-4de5-894e-4904158b52bf',
    label: 'Anthony Zimmer',
    subLabel: 'Crime | Drama | Romance | Thriller',
  },
  {
    value: '7cf9835d-3349-428e-9b9a-0c2abd33fbce',
    label: 'Anything Goes',
    subLabel: 'Musical',
  },
  {
    value: '5fdeccd7-4ae4-4be9-b476-1c0f6b96c6b0',
    label: 'Apartment Zero',
    subLabel: 'Drama | Thriller',
  },
  {
    value: 'f1a538ff-3f1d-4ac9-8314-6dded808009a',
    label: 'Apocalypse Now',
    subLabel: 'Action | Drama | War',
  },
  {
    value: '63a0c52d-0b8b-423d-868d-5f474bb066d7',
    label: 'Applause (Applaus)',
    subLabel: 'Drama',
  },
  {
    value: '7660f887-85ad-4297-beb7-d72fd080781b',
    label: 'Aprile',
    subLabel: 'Comedy',
  },
  {
    value: 'e5a42340-862f-4116-8240-6002ff44b597',
    label: 'Around the World in 80 Days',
    subLabel: 'Adventure | Children | Comedy',
  },
  {
    value: '0f218651-b1d5-4ee4-a463-b40e67b8c000',
    label: 'Arthur Christmas',
    subLabel: 'Animation | Children | Comedy | Drama',
  },
  {
    value: 'a1de094c-abba-498c-81c9-862a290c3e23',
    label: 'As Above, So Below',
    subLabel: 'Horror | Thriller',
  },
  {
    value: '14c819f2-6c6b-4fa8-a46c-456388a952c6',
    label: 'As You Like It',
    subLabel: 'Comedy | Drama | Romance',
  },
  {
    value: '5e96b5da-31a7-43bf-bc62-387834caede8',
    label: 'Ask the Dust',
    subLabel: 'Drama | Romance',
  },
  {
    value: 'e9e4e560-9e3a-4dd2-8cc7-0653e6bf7b9b',
    label: 'Asterix and the Gauls (Astérix le Gaulois)',
    subLabel: 'Action | Adventure | Animation | Children | Comedy',
  },
  {
    value: '3677a3e6-209e-488d-9af0-e159861bbe28',
    label: 'At War with the Army',
    subLabel: 'Comedy | Musical | Romance',
  },
  {
    value: 'b070c38e-8d18-4adb-8fd5-bca838677233',
    label: 'At War with the Army',
    subLabel: 'Comedy | Musical | Romance',
  },
  {
    value: 'ff91d714-96d0-43fe-aca7-e143310b81fe',
    label: 'Atlas Shrugged: Part II',
    subLabel: 'Drama | Mystery | Sci-Fi',
  },
  {
    value: '59946b50-1495-42c6-82ce-5f2859058923',
    label: 'Attack of the Mushroom People (Matango)',
    subLabel: 'Fantasy | Horror | Sci-Fi | Thriller',
  },
  {
    value: '54231645-8b35-4d4e-bb66-ecf504a278c7',
    label: 'Attack, The',
    subLabel: 'Romance | Thriller',
  },
  {
    value: 'd1db8844-a666-4cf1-b706-3ab0e3cdce2e',
    label: 'Avalon',
    subLabel: 'Drama | Fantasy | Sci-Fi',
  },
  {
    value: '795997bf-b5e1-4612-85af-0682ac7f7d7b',
    label: 'AVP: Alien vs. Predator',
    subLabel: 'Action | Horror | Sci-Fi | Thriller',
  },
  {
    value: 'e1f4a887-9220-450f-ad9c-00bcd0c7088a',
    label: 'Awful Truth, The',
    subLabel: 'Comedy | Romance',
  },
  {
    value: '8e090731-60df-47bd-888a-3094dc5cb70a',
    label: 'Azur & Asmar (Azur et Asmar)',
    subLabel: 'Adventure | Animation | Children',
  },
  {
    value: '45d780e6-71d8-4e4c-9743-8d07cc2de6d7',
    label: 'Babes in Arms',
    subLabel: 'Comedy | Musical',
  },
  {
    value: '15a10ea4-bf6a-4e47-9858-6fbc261aa81f',
    label: 'Baby Mama',
    subLabel: 'Comedy',
  },
  {
    value: '6d0dd3e3-be69-4e6a-a078-d7d0c906938e',
    label: 'Bad Education (La mala educación)',
    subLabel: 'Drama | Thriller',
  },
  {
    value: 'cd9fa720-0d20-4758-aa89-53f86156c2f6',
    label: 'Bad Luck (Zezowate szczescie)',
    subLabel: 'Comedy',
  },
  {
    value: '5b8e3926-4fb0-409a-814a-2753a6f44563',
    label: 'Bait',
    subLabel: 'Action | Horror | Thriller',
  },
  {
    value: '848224b6-3999-4318-b6e6-9560ad044399',
    label:
      "Bandit: Bandit's Silver Angel (Smokey and the Bandit 7) (Bandit: Bandit and the Silver Angel)",
    subLabel: 'Comedy',
  },
  {
    value: '5d59c3f4-f642-444e-9002-99d5843edde1',
    label: 'Baraka',
    subLabel: 'Documentary',
  },
  {
    value: 'd2bb0322-a71c-4704-b7ba-e4dd7e540b03',
    label: 'Barbershop 2: Back in Business',
    subLabel: 'Comedy',
  },
  {
    value: '375717dc-98ba-45b8-9a42-8b94dfb74843',
    label: 'Bat, The',
    subLabel: 'Horror',
  },
  {
    value: '9ddc76ba-de1c-4c23-baed-cd2562582872',
    label: 'Batman: Under the Red Hood',
    subLabel: 'Action | Animation',
  },
  {
    value: '21f83074-f601-42b4-b03d-bda878abd14d',
    label: "Bear's Kiss",
    subLabel: 'Drama | Fantasy | Romance',
  },
  {
    value: '94ca2b1e-e2fa-4e41-8930-ccf275cfc609',
    label: 'Beautiful Kate',
    subLabel: 'Drama | Mystery',
  },
  {
    value: 'f73622c6-003d-4a0e-a245-03c4312d717e',
    label: 'Beautiful Ohio',
    subLabel: 'Comedy | Drama',
  },
  {
    value: '958fa427-4a1a-40f8-82e1-37338ff150be',
    label: 'Bedtime Stories',
    subLabel: 'Adventure | Children | Comedy',
  },
  {
    value: '483ea099-72b7-4bd7-bb7a-45519f4340ad',
    label: 'Beethoven',
    subLabel: 'Children | Comedy | Drama',
  },
  {
    value: '6fb4b991-9f40-47f5-8679-523a99969e18',
    label: 'Beginning of an Unknown Era (Nachalo nevedomogo veka)',
    subLabel: 'Drama',
  },
  {
    value: 'e8c71014-1606-426a-872e-15eecba0ee2d',
    label: 'Bekännelsen (Confession, The)',
    subLabel: 'Thriller',
  },
  {
    value: 'bc63fbb0-d933-4b54-8e20-c8ce59f4805a',
    label: 'Ben X',
    subLabel: 'Drama',
  },
  {
    value: '386838b2-1da1-4625-a051-08bdcb28e2ed',
    label: 'Beneath the Rooftops of Paris (Sous les toits de Paris)',
    subLabel: 'Drama',
  },
  {
    value: '40815758-7f9c-4048-b3ca-36a4833b0ffb',
    label: 'Berlin Babylon',
    subLabel: 'Documentary',
  },
  {
    value: 'bfa9caa9-7315-4f7a-9491-2a1726ce487f',
    label: "Besieged (a.k.a. L' Assedio)",
    subLabel: 'Drama',
  },
  {
    value: 'b4516406-14b8-4a62-b2d3-a7f53f372a06',
    label: 'Best of Times, The',
    subLabel: 'Comedy | Drama',
  },
  {
    value: '8e8b2246-275c-4594-9c59-6b5a8e645728',
    label: 'Best Years of Our Lives, The',
    subLabel: 'Drama | War',
  },
  {
    value: '13ee017e-e66c-4a19-aa79-b908eb8c3e21',
    label: 'Betrayed',
    subLabel: 'Drama | Thriller',
  },
  {
    value: '554dbc90-8fb9-4399-9406-c3c50dff9faa',
    label: 'Better Than Sex',
    subLabel: 'Comedy | Romance',
  },
  {
    value: '1e02bb46-1012-4dec-8f0b-3241c4aba96a',
    label: 'Better Tomorrow, A (Ying hung boon sik)',
    subLabel: 'Crime | Drama | Thriller',
  },
  {
    value: '1082958f-b77c-4c37-baf2-642bdf996090',
    label: 'Beyond Borders',
    subLabel: 'Drama | Romance | War',
  },
  {
    value: '5b5e7c8c-2621-4622-8c71-3ce7fa5dd43f',
    label: 'Beyond the Gates of Splendor',
    subLabel: 'Documentary',
  },
  {
    value: '9eba726e-2d8e-4bba-b53f-bf4f184f6c94',
    label: 'Big Jake',
    subLabel: 'Western',
  },
  {
    value: '7f781394-0205-4116-869f-b9032c4dbf94',
    label: 'Big Knife, The',
    subLabel: 'Film-Noir',
  },
  {
    value: '2f2a0299-b50d-4840-9a95-8e83e80b149f',
    label: 'Big Sky, The',
    subLabel: 'Drama | Western',
  },
  {
    value: '3d27ecd4-9730-421d-987c-94ca8baa9698',
    label: 'Bigamist, The',
    subLabel: 'Drama',
  },
  {
    value: '4b14c073-a432-47cc-8f41-f947a10f2659',
    label: 'Bill Bailey: Tinselworm',
    subLabel: 'Comedy | Documentary',
  },
  {
    value: '25cc1bf4-b563-47ee-b7ab-f0db1809fc2b',
    label: 'Billy Jack',
    subLabel: 'Action | Drama',
  },
  {
    value: 'e1720ab4-8c2c-479f-8002-0e69b3fc2667',
    label: 'Bingo',
    subLabel: 'Adventure | Comedy',
  },
  {
    value: '8e9bb8ea-eff4-4e71-a65b-123cb67a4608',
    label: 'Bionicle 3: Web of Shadows',
    subLabel: 'Action | Adventure | Animation | Children',
  },
  {
    value: 'fbe6fd66-1c38-4de0-a42b-e36c40b9dd5f',
    label: 'Birds, The',
    subLabel: 'Horror | Thriller',
  },
  {
    value: 'cc619ca7-da83-4dcc-99e7-1498ee0364b3',
    label: 'Bit by Bit',
    subLabel: '(no genres listed)',
  },
  {
    value: '282c5f87-6bd2-45e8-b5c9-c02af6e3656b',
    label: 'Bitter Sweet',
    subLabel: 'Drama | Musical | Romance',
  },
  {
    value: 'e9c773e4-145f-437a-978e-e92d49df3e79',
    label: 'Black and White',
    subLabel: 'Drama',
  },
  {
    value: '4d6af40d-543e-4ff9-8399-9a0727a8577f',
    label: 'Black Camel, The (Charlie Chan in the Black Camel)',
    subLabel: 'Crime | Drama | Horror | Mystery | Thriller',
  },
  {
    value: '77c653b0-b71b-469e-bce1-39070e56b3ce',
    label: 'Black Dragons',
    subLabel: 'Mystery | Thriller | War',
  },
  {
    value: 'b99cede8-2f09-49c5-9974-10490a22aea5',
    label: 'Black Rock',
    subLabel: 'Horror | Thriller',
  },
  {
    value: 'a9647bbc-d6af-47e7-aee2-485e4b55f192',
    label: 'Black Widow',
    subLabel: 'Drama | Mystery',
  },
  {
    value: '97919929-3026-4bce-b7bb-9cb131c5c488',
    label: 'Blackhat',
    subLabel: 'Action | Crime | Drama | Mystery | Thriller',
  },
  {
    value: '79e5e05f-8c41-49a7-ab63-bcff8f1b0f12',
    label: 'Blazing Saddles',
    subLabel: 'Comedy | Western',
  },
  {
    value: '08053c06-b276-4b6b-b5ff-744b562ec02a',
    label: 'Blessed Event',
    subLabel: 'Comedy | Drama',
  },
  {
    value: 'cc906b42-546d-4da3-839b-ed8ed46e8e61',
    label: 'Blind Justice (Hævnens nat)',
    subLabel: 'Drama | Mystery | Thriller',
  },
  {
    value: '05c6e483-a189-4a7c-a171-23e8edcdb6af',
    label: 'Bliss',
    subLabel: 'Drama | Romance',
  },
  {
    value: 'cc149ea5-a905-44ea-9bfa-c442db0e332a',
    label: 'Blow Out',
    subLabel: 'Mystery | Thriller',
  },
  {
    value: '053589b3-0c76-40d3-883c-69d8a6ad9c47',
    label: 'Blue Smoke',
    subLabel: 'Drama | Romance | Thriller',
  },
  {
    value: '3280d65e-5b39-41c8-a764-87435504b8a6',
    label: 'Boca',
    subLabel: 'Action | Crime | Drama',
  },
  {
    value: '40c9b17d-be7f-46fe-84a1-9095d782e537',
    label: 'Body Shots',
    subLabel: 'Drama',
  },
  {
    value: 'bb77fef0-6c5d-4b06-a9dd-d930e08b9bb6',
    label: 'Bohemian Life, The (La vie de bohème)',
    subLabel: 'Comedy | Drama',
  },
  {
    value: 'b2b39e4e-9893-4250-996d-97f0d4635482',
    label: 'Born to Be Wild',
    subLabel: 'Documentary | IMAX',
  },
  {
    value: 'd0240d1f-72c9-4cb4-a97d-dde28d527d78',
    label: 'Boston Strangler, The',
    subLabel: 'Crime | Drama | Mystery | Thriller',
  },
  {
    value: '56d5f6e9-0195-42cd-8806-bde0c28dab5a',
    label: 'Boys of St. Vincent, The',
    subLabel: 'Drama',
  },
  {
    value: 'de19377d-4e03-4629-8ee0-e2c94e795011',
    label: 'Brain, The',
    subLabel: 'Horror | Sci-Fi',
  },
  {
    value: 'd53fc41d-dcab-4282-b6fc-1e4e3a9421ce',
    label: 'Bribe, The',
    subLabel: 'Drama | Film-Noir | Thriller',
  },
  {
    value: '0e2170da-fc9e-484d-bfc0-3cbe6dbfde08',
    label: 'Brighton Rock',
    subLabel: 'Crime | Drama | Film-Noir',
  },
  {
    value: 'c6be4132-6d3c-4535-88d0-82eeeba94590',
    label: 'Bringing Down the House',
    subLabel: 'Comedy',
  },
  {
    value: '2be42621-67a5-424f-8115-88cb39f1a905',
    label: 'Bringing Up Bobby',
    subLabel: 'Comedy',
  },
  {
    value: '2119dc1a-ce7c-4e32-b2ad-7db70fe58cee',
    label: 'Broken Lance',
    subLabel: 'Drama | Romance | Western',
  },
  {
    value: '7cee56e7-a964-4463-b816-047eaffe5822',
    label: 'Brøken, The (a.k.a. Broken, The)',
    subLabel: 'Drama | Horror | Thriller',
  },
  {
    value: '5e62653d-51a3-43c0-b6c1-935e2cecdde8',
    label: 'Brother of Sleep (Schlafes Bruder)',
    subLabel: 'Drama',
  },
  {
    value: '4a25bb54-ff43-4d79-8c3f-1f161cb710a5',
    label: 'Brothers Rico, The',
    subLabel: 'Crime | Drama | Film-Noir | Thriller',
  },
  {
    value: '4655f6af-c1f7-4472-ba15-bbc395841890',
    label: 'Buddy Boy',
    subLabel: 'Drama | Thriller',
  },
  {
    value: '27c15a93-e21e-4e16-b620-e81f1521b734',
    label: 'Butterfly on a Wheel (Shattered)',
    subLabel: 'Crime | Drama | Thriller',
  },
  {
    value: '04bd7ced-9200-46b7-8967-9999643754b7',
    label: 'Bye Bye Brazil (Bye Bye Brasil)',
    subLabel: 'Drama',
  },
  {
    value: 'a7a7b7fd-14e9-4bbe-ba35-8a72fda1e9c2',
    label: 'Cake',
    subLabel: 'Drama',
  },
  {
    value: '73a3063c-cfb9-45c7-bd4c-2079e4b8a634',
    label: 'Call Me Crazy: A Five Film',
    subLabel: 'Drama',
  },
  {
    value: 'a17e0dca-b6f2-48ca-8a70-0925bb481c82',
    label: 'Camera Obscura',
    subLabel: 'Crime | Drama | Thriller',
  },
  {
    value: 'd6b92efb-5b9e-4501-a222-f157140f1124',
    label: 'Canvas',
    subLabel: 'Drama',
  },
  {
    value: 'a60301f8-0853-499f-88d7-c660692cab05',
    label: 'Captain America II: Death Too Soon',
    subLabel: 'Action | Crime',
  },
  {
    value: '9c89b623-1c75-4f02-8630-a166b3a5a742',
    label: 'Captains of the Clouds',
    subLabel: 'Action | Drama | War',
  },
  {
    value: '5c3e2b6f-a2fc-4296-8a46-9a0721e9e21e',
    label: 'Carey Treatment, The',
    subLabel: 'Mystery',
  },
  {
    value: '64ce1332-965f-4834-b0f9-ea9524f5a8f7',
    label: 'Carnosaur',
    subLabel: 'Horror | Sci-Fi',
  },
  {
    value: '1387bab6-5fe2-4e8e-a0a9-34a70e122e36',
    label: 'Cars That Ate Paris, The',
    subLabel: 'Comedy | Horror | Thriller',
  },
  {
    value: '1f2ca4aa-c8ea-4cd4-819c-f8950e899224',
    label: 'Carson City',
    subLabel: 'Action | Romance | Western',
  },
  {
    value: '3089ac63-4a41-47fa-ab5d-a03264eaa809',
    label: 'Casino Jack',
    subLabel: 'Comedy | Crime',
  },
  {
    value: '004b17e2-3884-44c6-9a03-8a177e044ca3',
    label: 'Casper Meets Wendy',
    subLabel: 'Adventure | Children | Comedy | Fantasy',
  },
  {
    value: '3380152e-f026-468c-b56c-b1f1e993492c',
    label: 'Catch and Release',
    subLabel: 'Comedy | Drama | Romance',
  },
  {
    value: '3d9dbc43-7699-4fc7-8d9e-dfbad08077ef',
    label: 'Caught',
    subLabel: 'Drama | Thriller',
  },
  {
    value: '0194d89f-3e92-426e-a6a9-445d64a68f06',
    label: 'Celsius 41.11: The Temperature at Which the Brain... Begins to Die',
    subLabel: 'Documentary',
  },
  {
    value: '1c5145ba-3414-4313-86d0-1d8bc5df150a',
    label: 'Chan Is Missing',
    subLabel: 'Crime',
  },
  {
    value: '8fd5722c-ef27-46df-b5c6-838dfb292c95',
    label: 'Cheat, The',
    subLabel: 'Drama',
  },
  {
    value: 'b1677b08-6e51-4438-a74a-67240983d0a0',
    label: 'Chelsea on the Rocks',
    subLabel: 'Documentary',
  },
  {
    value: '19b3443a-bd3d-4606-ac1f-1a6866594657',
    label: 'Chicago 10',
    subLabel: 'Animation | Documentary',
  },
  {
    value: '0d056d79-7c4e-476a-b2bb-89919e058c28',
    label: "Child's Pose",
    subLabel: 'Drama',
  },
  {
    value: '0badb552-6f74-46a6-a92e-c1aece522ab2',
    label: 'Children (Börn)',
    subLabel: 'Drama',
  },
  {
    value: '157697e5-1e6f-4b8c-aa68-fb4b1edf304a',
    label: 'Children of Leningradsky, The',
    subLabel: 'Documentary',
  },
  {
    value: 'ac49f2e4-877b-426b-b42e-2a10aef389de',
    label: 'Children of the Living Dead',
    subLabel: 'Horror | Thriller',
  },
  {
    value: 'b3d17112-730a-49f0-a957-155a04332428',
    label: 'Children of the Revolution',
    subLabel: 'Comedy',
  },
  {
    value: 'dcf11d47-038f-4e35-8a01-51954a769a2d',
    label: 'Chori Chori Chupke Chupke',
    subLabel: 'Drama | Romance',
  },
  {
    value: '16fd5dd2-6070-4310-97ea-8ccc45898b51',
    label: 'Christmas Carol, A (Scrooge)',
    subLabel: 'Drama | Fantasy',
  },
  {
    value: 'd869c8fd-9bda-47ad-8ab2-12b3ad08e2ae',
    label: "Christmas Memory, A (Truman Capote's 'A Christmas Memory')",
    subLabel: 'Children | Drama',
  },
  {
    value: '6280229b-fe40-4ec3-9e57-15859f9df81e',
    label: 'Cinderella II: Dreams Come True',
    subLabel: 'Animation | Children | Fantasy',
  },
  {
    value: 'ca135a82-20b5-488d-973d-9ba1c08d9d5a',
    label: 'Classmates',
    subLabel: 'Comedy | Drama',
  },
  {
    value: '97d3445b-6ccc-4242-84f1-c975dc11bddc',
    label: 'Cobweb, The',
    subLabel: 'Drama',
  },
  {
    value: '62d76a07-687f-44b3-9da0-fc562fd3fd2f',
    label: 'Cold Storage',
    subLabel: 'Thriller',
  },
  {
    value: '550f466e-269a-4d79-93ff-a0e9bcb009a8',
    label: 'Collector, The',
    subLabel: 'Drama | Horror | Thriller',
  },
  {
    value: '71b3a835-fb93-4610-8f5b-268f77b0e01f',
    label: 'Collector, The',
    subLabel: 'Crime | Horror | Thriller',
  },
  {
    value: 'c638390b-c43f-43fb-9614-b4304682bbae',
    label: 'College Road Trip',
    subLabel: 'Comedy',
  },
  {
    value: '4a7ee224-2124-4dd0-9258-6859ed1de311',
    label: 'Colonel Chabert, Le',
    subLabel: 'Drama | Romance | War',
  },
  {
    value: '7b5c11f0-c6ca-47f9-a104-f23bf39db68d',
    label: 'Color Wheel, The',
    subLabel: 'Comedy | Romance',
  },
  {
    value: '32f9636d-8153-43c8-b992-0f1b55d51911',
    label: 'Comet',
    subLabel: 'Comedy | Drama | Romance | Sci-Fi',
  },
  {
    value: '5277b5ff-792d-4e83-984a-fbd313af38cc',
    label: 'Comfort and Joy',
    subLabel: 'Comedy',
  },
  {
    value: 'cb5353fe-60ea-4665-8620-14daa075295f',
    label: 'Comic Book: The Movie',
    subLabel: 'Comedy',
  },
  {
    value: '62aaf314-a89a-4e76-9352-14ff8aea1a22',
    label: 'Con, The',
    subLabel: 'Comedy | Crime',
  },
  {
    value: '7a90699b-e6aa-4151-a934-dd2a18fbf7ae',
    label: 'Concert for George, The',
    subLabel: 'Documentary | Musical',
  },
  {
    value: 'bd668fea-cea8-4415-81f2-24ee72a7afe2',
    label: 'Conclave, The',
    subLabel: 'Drama',
  },
  {
    value: '666e8dab-4a21-4c2e-9529-995644a92686',
    label: 'Confessor, The (a.k.a. The Good Shepherd)',
    subLabel: 'Drama | Thriller',
  },
  {
    value: '6628ea99-a606-4441-bf28-4ca5e88fedb5',
    label: 'Confiance règne, La',
    subLabel: 'Comedy',
  },
  {
    value: '0aa6e6f1-917c-43e5-bea4-024498618711',
    label: 'Congress, The',
    subLabel: 'Animation | Sci-Fi',
  },
  {
    value: '384858be-044a-4f4a-babd-86f5baec9173',
    label: 'Congress, The',
    subLabel: 'Animation | Sci-Fi',
  },
  {
    value: '1a675206-cb6a-4e47-ace2-98422caa92a6',
    label: 'Contact',
    subLabel: 'Drama | Sci-Fi',
  },
  {
    value: '45887c64-bc56-4259-adc2-1b80e8e82878',
    label: 'Control',
    subLabel: 'Drama',
  },
  {
    value: '3b65be84-2f24-4a23-890b-81952728647b',
    label: 'Conversations with My Gardener (Dialogue avec mon jardinier)',
    subLabel: 'Comedy | Drama',
  },
  {
    value: '4527104f-15b4-4e40-bd5b-f0e98a24f4d1',
    label: 'Coronado',
    subLabel: 'Action | Adventure | War',
  },
  {
    value: 'd6c0daf4-dbe6-4be3-990c-901b78e3b89d',
    label: 'Cosmonaut, The',
    subLabel: 'Drama | Sci-Fi',
  },
  {
    value: '74643a1a-d8de-4c69-954f-b6c1fb3db1ff',
    label: 'Country Strong',
    subLabel: 'Drama | Musical | Romance',
  },
  {
    value: '1bb565e5-7da1-456d-b124-7de46f81ee28',
    label: 'Crazy Stranger, The (Gadjo Dilo)',
    subLabel: 'Comedy | Drama',
  },
  {
    value: '579bd1ff-7282-48b2-b85b-4fc7fb2b2e62',
    label: 'Crazy/Beautiful',
    subLabel: 'Drama | Romance',
  },
  {
    value: '330b18fb-f7a3-4ad8-9515-7401e55107e7',
    label: 'Crime Story (Zhong an zu)',
    subLabel: 'Action | Crime | Drama',
  },
  {
    value: '24a5d7ce-2970-4887-a64b-cfb881f10f9c',
    label: 'Crimson Kimono, The',
    subLabel: 'Crime | Mystery | Thriller',
  },
  {
    value: '845a7112-ced2-4e11-90cb-9259bc542ef1',
    label: 'Crystal Fairy & the Magical Cactus and 2012',
    subLabel: 'Adventure | Comedy',
  },
  {
    value: '727b5e09-4089-497d-9587-ec61630ffaa8',
    label: 'Dad Savage',
    subLabel: 'Crime | Thriller',
  },
  {
    value: '611d0fac-9326-4aa0-b53d-acb68e49d774',
    label: 'Dagon',
    subLabel: 'Fantasy | Horror | Mystery | Thriller',
  },
  {
    value: '9e3c711d-9ad2-49e1-bffd-6ada058357d4',
    label: 'Dangerous Moves (La diagonale du fou)',
    subLabel: 'Drama | Thriller',
  },
  {
    value: '322a3f7f-e4a0-4539-b76e-4d3e19a11d4a',
    label: "Dante's Inferno",
    subLabel: 'Action | Drama',
  },
  {
    value: '0c4a98e2-a5f3-40b3-919b-fbde23b75720',
    label: 'Danube Exodus, The',
    subLabel: 'Documentary',
  },
  {
    value: '0a6fb60e-f989-4bc2-98ba-c7877c1c4b90',
    label: 'Daria: Is It Fall Yet?',
    subLabel: 'Animation | Comedy',
  },
  {
    value: '57f7c1bc-24e6-4d31-9e3f-384d6ac27176',
    label: 'Dark Days',
    subLabel: 'Documentary',
  },
  {
    value: '7c2c7193-d431-41d2-bcb5-904882dc4c19',
    label: 'Dark Habits (Entre tinieblas)',
    subLabel: 'Comedy | Drama',
  },
  {
    value: '6aeb4ec1-d8c3-44e6-8710-6dbdc8fe6a6c',
    label: 'Dark Star',
    subLabel: 'Comedy | Sci-Fi | Thriller',
  },
  {
    value: 'f6e3fa84-934e-4bad-8c65-db8217004b03',
    label: 'Darkest Night',
    subLabel: 'Drama | Horror',
  },
  {
    value: '4a447989-cde6-4408-b790-5cdce247d462',
    label: 'Dating Games People Play',
    subLabel: 'Comedy',
  },
  {
    value: '2034aedd-11c8-4144-92a1-60c7de55fb53',
    label: 'Dawn of the Dead',
    subLabel: 'Action | Drama | Horror | Thriller',
  },
  {
    value: '35735985-a1f1-419c-ba23-4c2d2e7b7660',
    label: 'Day Lincoln Was Shot, The',
    subLabel: 'Drama',
  },
  {
    value: '02b1e2b4-f3bd-43f4-a752-9db838d29a0c',
    label: 'Day the Fish Came Out, The',
    subLabel: 'Comedy | Sci-Fi',
  },
  {
    value: 'bebd6b9c-e699-44b5-9820-9a0d3f5971fe',
    label: 'Days and Nights in the Forest (Aranyer Din Ratri)',
    subLabel: 'Drama',
  },
  {
    value: '94ba21b9-7f5b-4dca-a32c-3238c2354d6e',
    label: 'Dead End',
    subLabel: 'Comedy | Horror | Mystery | Thriller',
  },
  {
    value: '4c046baf-2005-47ba-9974-6bb78b530be7',
    label: 'Dead End',
    subLabel: 'Comedy | Horror | Mystery | Thriller',
  },
  {
    value: 'aa17ae45-caa8-40f3-ac61-4fc7ca7659b3',
    label: 'Dead Men Tell',
    subLabel: 'Comedy | Crime | Drama | Mystery | Thriller',
  },
  {
    value: 'f5e8c8ee-8812-434e-9fc2-2ccb41682a7a',
    label: 'Dead on Time',
    subLabel: 'Comedy | Drama | Romance',
  },
  {
    value: 'c66e14e0-66e8-4854-9e9d-e1d1a71db690',
    label: 'Dead Pit, The',
    subLabel: 'Horror',
  },
  {
    value: '0df7ecf9-6589-487d-80f6-74549f0127b8',
    label: 'Dead Silence',
    subLabel: 'Horror | Mystery | Thriller',
  },
  {
    value: '741caa75-72a9-42f1-a9ac-9d6c32d4fcd4',
    label: 'Dead Silent',
    subLabel: 'Thriller',
  },
  {
    value: 'de6b0ce6-f852-4c93-b5d1-b3b7b5f35ba8',
    label: 'DeadHeads',
    subLabel: 'Adventure | Comedy | Horror',
  },
  {
    value: '4bbc4748-3e57-4ba9-8a9f-c9e4bf52b87b',
    label: 'Deadline',
    subLabel: 'Mystery | Thriller',
  },
  {
    value: '4e36b220-7728-4cc1-9e59-bf2c89e2e692',
    label: 'Deadline at Dawn',
    subLabel: 'Film-Noir | Mystery | Romance | Thriller',
  },
  {
    value: '0e67e700-732e-47ad-9d54-c2d460acfd9c',
    label: 'Dear Heart',
    subLabel: 'Comedy',
  },
  {
    value: 'da8567de-b272-4b22-beb7-463cbb9fc730',
    label: 'Dear Zachary: A Letter to a Son About His Father',
    subLabel: 'Documentary',
  },
  {
    value: '85822037-aa2d-4823-bb90-2fa7d9d6ad97',
    label: 'Death Note',
    subLabel: 'Adventure | Crime | Drama | Horror | Mystery',
  },
  {
    value: 'd76bb454-1321-431e-ae00-8577062fb30f',
    label: 'Death of a Cyclist (Muerte de un ciclista)',
    subLabel: 'Drama',
  },
  {
    value: 'd8c1219f-4105-4bc0-a90c-6981f65f83c9',
    label: 'Death of a Dynasty',
    subLabel: 'Comedy',
  },
  {
    value: '98be6b43-9c86-45dc-b680-ed89b50e4dbf',
    label: 'Death of a Salesman',
    subLabel: 'Drama',
  },
  {
    value: '8904e4ab-d1d0-43cf-8684-1aa687ce46da',
    label: 'Death on the Staircase (Soupçons)',
    subLabel: 'Crime | Documentary',
  },
  {
    value: '7b4c305d-0e3d-4be4-9d59-cbae77a16790',
    label: 'Death Race 2',
    subLabel: 'Action | Sci-Fi | Thriller',
  },
  {
    value: '937ed53f-1b19-41f4-8c67-975a48226573',
    label: 'Delicate Balance, A',
    subLabel: 'Drama',
  },
  {
    value: 'c865bd23-93d5-42cc-b398-87af078122fe',
    label: 'Delta Force, The',
    subLabel: 'Action',
  },
  {
    value: '87cedee6-e290-4ea9-9434-baf09b3b1c35',
    label: 'Descent, The',
    subLabel: 'Adventure | Drama | Horror | Thriller',
  },
  {
    value: '348d57cd-4f3a-4ebf-84bb-0e01e4059b59',
    label: 'Desperately Seeking Susan',
    subLabel: 'Comedy | Drama | Romance',
  },
  {
    value: '72ee9769-2c9f-462b-8484-ce07a3eb05c6',
    label: 'Destiny in Space',
    subLabel: 'Documentary | IMAX',
  },
  {
    value: '54245f13-5b5c-4a85-a312-928bf2e413ba',
    label: 'Detachment',
    subLabel: 'Drama',
  },
  {
    value: '57bd06b9-4ca3-4439-9df9-745c31cedd7d',
    label: 'Detective Dee and the Mystery of the Phantom Flame (Di Renjie)',
    subLabel: 'Action | Crime | Mystery',
  },
  {
    value: '46e0a935-827f-4859-979f-9729a5229a2d',
    label: 'Detour ',
    subLabel: 'Thriller',
  },
  {
    value: '0dbfdee4-fbf0-4fcc-a04b-495084fbacf9',
    label: 'Detroit 9000',
    subLabel: 'Action | Crime',
  },
  {
    value: 'ec9b67aa-52ad-4fb8-b54f-7875ef716071',
    label: 'Deuce Bigalow: European Gigolo',
    subLabel: 'Comedy',
  },
  {
    value: '73533c9e-17ca-4088-9852-fbbcf70838bf',
    label: 'Deux mondes, Les',
    subLabel: 'Comedy | Fantasy',
  },
  {
    value: '22d90df1-5995-49f4-8f8f-067f13fd70ea',
    label: 'Devil Hides in Doubt (Sollbruchstelle)',
    subLabel: 'Documentary',
  },
  {
    value: '94d5d67d-8d6c-42c5-b4f5-f4e766fba3c6',
    label: 'Dialogues with Solzhenitsyn (Uzel)',
    subLabel: 'Documentary',
  },
  {
    value: '17bd517f-8815-4739-8d4b-1c3d1e3bfc4b',
    label: 'Die Frau des Frisörs',
    subLabel: 'Drama',
  },
  {
    value: 'dd01e998-3b94-4462-8cb3-593802a17bd6',
    label: 'Diggstown',
    subLabel: 'Drama',
  },
  {
    value: '2fc69d69-1449-49ef-85d6-67d05de65811',
    label: 'Dikkenek',
    subLabel: 'Comedy',
  },
  {
    value: '07007813-be5b-41e1-800d-1fc5cfeb05ca',
    label: 'Dinner, The (Cena, La)',
    subLabel: 'Comedy | Drama',
  },
  {
    value: 'a68d01a4-5903-4a30-a59a-b986ca593d4a',
    label: 'Dirty Shame, A',
    subLabel: 'Comedy',
  },
  {
    value: 'cbe80d65-1ea2-4d28-b050-270c165038ff',
    label: 'Dirty Wars',
    subLabel: 'Documentary | War',
  },
  {
    value: '8396606a-c665-432f-8e03-84a84b1f7a5b',
    label: 'Disaster Movie',
    subLabel: 'Comedy',
  },
  {
    value: '1adb2175-60ad-47ce-8b1e-062fcd4d771b',
    label: 'Distant (Uzak)',
    subLabel: 'Drama',
  },
  {
    value: '6c4b1ec7-bbcf-4a53-b836-379b24adb86c',
    label: 'Distant Thunder',
    subLabel: 'Drama',
  },
  {
    value: '823c9843-6e50-41a6-a5b3-d082610b1153',
    label: 'District 13: Ultimatum (Banlieue 13 - Ultimatum)',
    subLabel: 'Action | Sci-Fi',
  },
  {
    value: '3114a82b-4183-49d7-af26-94010d98128b',
    label: "Ditchdigger's Daughters, The",
    subLabel: 'Drama',
  },
  {
    value: 'ecb4c5e5-6f97-47eb-9425-92be1e57cee3',
    label: "Dive! (Dive!: Living off America's Waste)",
    subLabel: 'Documentary',
  },
  {
    value: 'f9800ed8-bccc-432c-a4b0-a4537878686b',
    label: 'Doctor, The',
    subLabel: 'Drama',
  },
  {
    value: '9675dec8-4033-4da9-91ae-d26c2d2e6792',
    label: 'Dogs in Space',
    subLabel: 'Drama',
  },
  {
    value: 'f2877847-5593-4062-a2e3-efeff5a93191',
    label: 'Doll Squad, The',
    subLabel: 'Action | Thriller',
  },
  {
    value: 'de62ba23-327a-4664-bd8f-aa5969e6dcaf',
    label: 'Doll, The (Lalka)',
    subLabel: 'Drama | Romance',
  },
  {
    value: '6b4b5b36-9942-46c4-8122-5c9ccae93638',
    label: 'Double, The',
    subLabel: 'Action | Crime | Drama | Mystery | Thriller',
  },
  {
    value: 'e1a8a13e-983d-4d65-bb4b-e9ee10282656',
    label: 'Down to the Cellar (Do pivnice)',
    subLabel: 'Adventure | Fantasy | Thriller',
  },
  {
    value: '8f8e80d8-7f0b-4377-872f-778d77feb520',
    label: 'Downeast',
    subLabel: 'Documentary',
  },
  {
    value: 'd589b51f-e95a-4044-b966-5f858fd97dfa',
    label: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
    subLabel: 'Comedy | War',
  },
  {
    value: 'cb910778-71ef-49c5-a6e9-a5737688f43e',
    label:
      "Dragon Ball Z the Movie: The World's Strongest (a.k.a. Dragon Ball Z: The Strongest Guy in The World) (Doragon bôru Z: Kono yo de ichiban tsuyoi yatsu)",
    subLabel: 'Action | Adventure | Animation | Sci-Fi | Thriller',
  },
  {
    value: '46173e6a-68b8-4941-89cf-449bc3b3af13',
    label: 'Dragonheart',
    subLabel: 'Action | Adventure | Fantasy',
  },
  {
    value: '40027e14-60b3-4aa8-8f1a-f2537bd83756',
    label: 'Dragons Forever',
    subLabel: 'Action | Comedy | Romance',
  },
  {
    value: '29eb1698-5840-41e1-80ab-61ff388f08cc',
    label: 'Dragons Forever',
    subLabel: 'Action | Comedy | Romance',
  },
  {
    value: '4feb37c0-4946-4741-a7a0-c35ec4f2749a',
    label: 'Dream Land',
    subLabel: '(no genres listed)',
  },
  {
    value: 'd7b71838-ad72-4759-8a9a-5f8ebda761b2',
    label: 'Dungeons & Dragons',
    subLabel: 'Adventure | Fantasy',
  },
  {
    value: '72b51827-d822-42a4-8767-094cfea61876',
    label: 'Dust',
    subLabel: 'Drama | Western',
  },
  {
    value: '3318404f-f6c7-40db-b5f9-3f44a552bcdd',
    label: 'Eaten Alive',
    subLabel: 'Horror',
  },
  {
    value: '270bcf7b-751b-4ff1-b8a2-6368a26ffe72',
    label: 'Eddy Duchin Story, The',
    subLabel: 'Drama | Musical | Romance',
  },
  {
    value: '39d422e1-e47e-4cb5-a198-219b0201fc59',
    label: 'El Cid',
    subLabel: 'Action | Adventure | Drama | Romance | War',
  },
  {
    value: 'b11c0f0d-df05-4189-9d2b-122f7c6ba7cf',
    label: 'Election Day',
    subLabel: 'Documentary',
  },
  {
    value: '6e8e4e88-e7c7-4f76-82e3-8d851efa1920',
    label: 'Elfie Hopkins: Cannibal Hunter',
    subLabel: 'Horror | Thriller',
  },
  {
    value: '2f41c665-846f-45f5-a057-4eb0b946cf72',
    label: 'Elizabethtown',
    subLabel: 'Comedy | Drama | Romance',
  },
  {
    value: '35b0dd85-4e63-45b4-ad5c-2e06cc172f3d',
    label: 'Ellie Parker',
    subLabel: 'Comedy | Drama',
  },
  {
    value: '04904c74-0496-435a-ab8a-3ca4bfe565ac',
    label: 'Endgame: Blueprint for Global Enslavement',
    subLabel: 'Documentary',
  },
  {
    value: '89cce09d-963c-452b-818d-0f8a1919640b',
    label: 'English Vinglish',
    subLabel: 'Comedy | Drama',
  },
  {
    value: '2cb45fed-08e7-4134-abf8-c43fa056e0da',
    label: 'Entertainer, The',
    subLabel: 'Drama',
  },
  {
    value: '222764ab-08d1-470b-b926-2a11e22b3026',
    label: 'Erkan & Stefan 2',
    subLabel: 'Comedy',
  },
  {
    value: 'eefbfb2e-f4d9-4fc0-9d91-5754795ad35a',
    label: 'Euridice BA 2O37 (Evridiki BA 2O37)',
    subLabel: 'Drama',
  },
  {
    value: '35869322-ae1d-4c5f-b9b5-727e52289a5c',
    label: 'Evangelion: 2.0 You Can (Not) Advance (Evangerion shin gekijôban: Ha)',
    subLabel: 'Action | Animation | Drama | Sci-Fi',
  },
  {
    value: '93d90aba-4d11-4b06-9bb5-4633fc3b4a2b',
    label: 'Event, The',
    subLabel: 'Drama',
  },
  {
    value: 'a94a5eb4-3b31-4eb8-8093-824b14c101a2',
    label: "Everybody's Fine",
    subLabel: 'Drama',
  },
  {
    value: '4161a3e0-f06c-4cdf-85d7-59ba19996a89',
    label: 'Everything',
    subLabel: 'Drama | Mystery',
  },
  {
    value: '8be8663f-ebeb-492c-a13e-d6aabb46a926',
    label: 'Evidence ',
    subLabel: 'Horror | Thriller',
  },
  {
    value: '15988e03-c747-439b-b894-e243db954e58',
    label: 'Evil Remains (Trespassing)',
    subLabel: 'Horror | Thriller',
  },
  {
    value: 'cc37d531-d754-4e12-b4e6-a6ecfc112a36',
    label: 'Executioner, The (Massacre Mafia Style)',
    subLabel: 'Crime | Drama | Thriller',
  },
  {
    value: 'd34a71ce-8b66-4c13-a28f-06a19f99eb4e',
    label: 'Exodus',
    subLabel: 'Drama | Romance | War',
  },
  {
    value: '11b9325e-6165-4157-9661-382128521073',
    label: 'Exodus: Gods and Kings',
    subLabel: 'Action | Adventure | Drama',
  },
  {
    value: 'cdccb04a-2a7b-410a-a598-8888beccd8d9',
    label: 'Exorcismus',
    subLabel: 'Horror',
  },
  {
    value: '0de4e7df-e0a0-4391-a080-dd7d6e3d5f7a',
    label: 'Experiment, The',
    subLabel: 'Drama | Thriller',
  },
  {
    value: '1379dce3-418a-4b07-b2fd-64e9e7e615f9',
    label: 'Eyes of Laura Mars',
    subLabel: 'Mystery | Thriller',
  },
  {
    value: '02f89d0b-193b-4e51-8acb-d3a9b55af81d',
    label: 'Face to Face (Ansikte mot ansikte)',
    subLabel: 'Drama | Fantasy | Horror | Mystery',
  },
  {
    value: '80781558-c23d-4fb5-8c73-842118741656',
    label: 'Face to Face (Faccia a faccia)',
    subLabel: 'Adventure | Western',
  },
  {
    value: '98870784-d4f9-4848-9edd-e82aa6201d58',
    label: 'Family Guy Presents: Blue Harvest',
    subLabel: 'Animation | Comedy',
  },
  {
    value: 'ee6cb712-7af3-48be-81a3-9eece01a9535',
    label: 'Family, The',
    subLabel: 'Action | Comedy | Crime',
  },
  {
    value: 'fae1c1c9-a504-4462-949b-7907ed07a142',
    label: 'Fantomas vs. Scotland Yard',
    subLabel: 'Adventure | Comedy | Crime | Fantasy',
  },
  {
    value: 'f9326c2a-295b-4d99-89d4-ae9f9371e653',
    label: 'Farewell My Concubine (Ba wang bie ji)',
    subLabel: 'Drama | Romance',
  },
  {
    value: '02c0aceb-aebb-4cdb-9e30-ec912412c97f',
    label: 'Fat, Sick & Nearly Dead 2',
    subLabel: 'Documentary',
  },
  {
    value: '82456739-605c-43e2-9143-951628c3e842',
    label: 'Fatal Hour, The',
    subLabel: 'Crime | Mystery | Thriller',
  },
  {
    value: '78d2789f-9e5f-4fe5-8126-3ad3a8e579d5',
    label: 'Fear Over the City',
    subLabel: 'Action | Crime | Drama',
  },
  {
    value: '79df1aea-0f96-4b0a-80f2-82543194b70b',
    label: 'Fern flowers (Fleur de fougère)',
    subLabel: 'Animation',
  },
  {
    value: '810db60d-b7bf-452e-9acb-58d2b0c3a814',
    label: 'Fiddle-de-dee',
    subLabel: 'Animation | Musical',
  },
  {
    value: 'c574e8e2-d7f0-4b25-8e2c-f258d5b89c79',
    label: 'First Shot',
    subLabel: 'Action',
  },
  {
    value: '9f8b6302-ff76-43f5-9d77-8e0315f1ee66',
    label: 'First Strike (Police Story 4: First Strike) (Ging chaat goo si 4: Ji gaan daan yam mo)',
    subLabel: 'Action | Adventure | Comedy | Thriller',
  },
  {
    value: 'a67ce941-adf8-4ec2-aeb9-19a16f2603d3',
    label: 'Flakes',
    subLabel: 'Comedy',
  },
  {
    value: '5670adf5-5c8a-4665-9384-51163a584460',
    label: 'Flashdance',
    subLabel: 'Drama | Romance',
  },
  {
    value: '7ed35ab4-bfc3-457e-b60f-073f3059a455',
    label: 'Flight',
    subLabel: 'Drama',
  },
  {
    value: '7fc68ec2-bea1-4bd5-9b14-de263920a7c0',
    label: 'Flight of the Phoenix, The',
    subLabel: 'Action | Adventure | Drama',
  },
  {
    value: 'b71b4eae-e5dd-40a8-8725-ea01b09e76fb',
    label: 'Flower of Evil, The (Fleur du mal, La)',
    subLabel: 'Drama',
  },
  {
    value: '5ec5d600-b7b7-4ca4-81ec-55080e1b4901',
    label: 'Flying Deuces, The',
    subLabel: 'Comedy',
  },
  {
    value: 'f0edf694-e4b1-4f99-89b4-728b7fbffa06',
    label: 'Flying Swords of Dragon Gate, The (Long men fei jia)',
    subLabel: 'Action | Adventure | IMAX',
  },
  {
    value: 'e7af13c2-71ce-4d18-b65c-27cc36df5398',
    label: 'Fog Over Frisco',
    subLabel: 'Crime | Mystery | Thriller',
  },
  {
    value: '041a15d9-03c4-48c4-bbb4-1a8caead1a2b',
    label: 'Following Sean',
    subLabel: 'Documentary',
  },
  {
    value: 'cf1cdc10-d993-4f33-8b9a-a6d8a05a937e',
    label: 'Food of the Gods II',
    subLabel: 'Horror | Sci-Fi',
  },
  {
    value: 'dac88bbf-0d1d-41f2-b266-e77d63011b6e',
    label: 'Food of the Gods II',
    subLabel: 'Horror | Sci-Fi',
  },
  {
    value: 'ff9337f5-aa8f-495a-a00d-b26edbd45eaa',
    label: 'For the Birds',
    subLabel: 'Animation | Children | Comedy',
  },
  {
    value: '45a5f6d0-cd66-41ec-a79b-9b1c408dc431',
    label: 'For Your Eyes Only',
    subLabel: 'Action | Adventure | Thriller',
  },
  {
    value: '21bbecdf-12b8-46a7-aa2d-e43b9b0e4009',
    label: 'Foreign Affair, A',
    subLabel: 'Comedy | Romance',
  },
  {
    value: 'a7abbcf1-e7f6-446d-b5f3-3b9dd5f31445',
    label: 'Forever Mine',
    subLabel: 'Crime | Drama | Romance | Thriller',
  },
  {
    value: '44402549-2058-4e1f-a8d0-64134c92d2e7',
    label: 'Forgetting the Girl',
    subLabel: 'Drama',
  },
  {
    value: '879f7295-6cba-42e5-aef2-89af6b520a96',
    label: 'Forsaking All Others',
    subLabel: 'Comedy | Drama | Romance',
  },
  {
    value: 'ba4c3874-9535-4584-8e49-6d103cb971ef',
    label: 'Forsyte Saga, The',
    subLabel: 'Drama',
  },
  {
    value: 'a0f8778c-7229-453a-ae20-b4b2bd3e4ed9',
    label: 'Fort Bliss',
    subLabel: 'Drama | War',
  },
  {
    value: '16dc83ef-19a9-4a7b-a1f0-b101f31b2b54',
    label: 'Four more years (Fyra år till)',
    subLabel: 'Comedy | Romance',
  },
  {
    value: 'e8f1a5db-e0e5-4f07-8721-1856d5af38a1',
    label: 'Four Sons',
    subLabel: 'Drama | War',
  },
  {
    value: '67b52dc4-5bec-4c18-a867-22eb367f51b5',
    label: 'Fracture',
    subLabel: 'Crime | Drama | Mystery | Thriller',
  },
  {
    value: '8cad8849-9196-41c0-b6e4-0de89bb0a770',
    label: 'Free Willy 3: The Rescue',
    subLabel: 'Adventure | Children | Drama',
  },
  {
    value: 'f6c86878-8dcf-4ad8-9983-1e745128780f',
    label: 'Freeheld',
    subLabel: 'Documentary',
  },
  {
    value: '0e62c368-5c87-451b-9ae7-79d89f281644',
    label: 'Friendly Persuasion',
    subLabel: 'Drama',
  },
  {
    value: '046b66a8-9347-4bcf-af2e-bd5bb562bdf2',
    label: 'From Prada to Nada',
    subLabel: 'Comedy | Romance',
  },
  {
    value: 'f1fa98e7-4d73-442a-a61a-a193c0126e72',
    label: 'Front Page, The',
    subLabel: 'Comedy',
  },
  {
    value: '966e7cd6-37fc-48d7-8ff4-0d2857a4b6e2',
    label: 'Frozen',
    subLabel: 'Drama | Horror | Thriller',
  },
  {
    value: 'de0d7e37-2cce-48e6-91d1-0816a9fe01a4',
    label: 'Fuel',
    subLabel: 'Documentary',
  },
  {
    value: '7b8fb2f2-3a99-43c5-aae7-f71250111fa9',
    label: 'Fun in Acapulco',
    subLabel: 'Comedy | Musical',
  },
  {
    value: 'ecb3bda4-6826-48c5-948c-fcf1c4bf17c1',
    label: 'G.I. Jane',
    subLabel: 'Action | Drama',
  },
  {
    value: '099b1252-83ce-4f7a-ac6e-fc090726ff09',
    label: 'Garbo the Spy (Garbo: El espía)',
    subLabel: 'Documentary | War',
  },
  {
    value: '3caba25a-56b5-4ac6-bdb8-65b20a031a83',
    label: 'Garden of the Finzi-Continis, The (Giardino dei Finzi-Contini, Il)',
    subLabel: 'Drama',
  },
  {
    value: '86e71bb4-2328-4375-8c02-107453a8d6b9',
    label: 'Garden State',
    subLabel: 'Comedy | Drama | Romance',
  },
  {
    value: 'e14a7ed4-ec30-4403-a577-bcce476cfcc4',
    label: 'General, The',
    subLabel: 'Crime',
  },
  {
    value: '7f68b7c1-d034-4fb6-903d-4af311b46cbf',
    label: 'Genius Within: The Inner Life of Glenn Gould',
    subLabel: 'Documentary',
  },
  {
    value: '25c96f93-94b7-4651-a308-c80e4f43e492',
    label: 'Genius Within: The Inner Life of Glenn Gould',
    subLabel: 'Documentary',
  },
  {
    value: '76361ce6-9ca4-4c5a-8655-0cbbe1309a89',
    label: "Gentleman's Game, A",
    subLabel: 'Drama',
  },
  {
    value: 'd223d3f7-6019-4e83-a2b7-c2896320357c',
    label: 'Geography Club',
    subLabel: 'Comedy | Drama | Romance',
  },
  {
    value: 'be0460a6-44c0-4561-ba05-e44ce86f7077',
    label: 'George & A.J.',
    subLabel: 'Animation | Children | Comedy',
  },
  {
    value: '78170d20-0caa-4ecd-83ea-4378db01216f',
    label: 'Ghoulies II',
    subLabel: 'Comedy | Horror',
  },
  {
    value: '0c0208e5-8ae1-4dfe-99a5-772ad058c86d',
    label: 'Girasoli, I (Sunflower)',
    subLabel: 'Drama',
  },
  {
    value: '0e59d19d-58e1-4cd1-8616-8bf96b28da61',
    label: 'Girls on the Road (a.k.a. Hot Summer Week)',
    subLabel: 'Comedy | Drama | Thriller',
  },
  {
    value: '096fd06c-3b81-4bfd-a556-25f3493f4c2e',
    label: "Glass-blower's Children, The (Glasblåsarns barn)",
    subLabel: 'Children | Drama',
  },
  {
    value: 'aa36f0a7-c0a7-420e-a036-f059d6be26c0',
    label: 'Glee: The 3D Concert Movie',
    subLabel: 'Documentary | Musical',
  },
  {
    value: '0b97867e-41a0-425d-81e0-d43f87b170a1',
    label: 'Goal! III',
    subLabel: 'Drama | Romance',
  },
  {
    value: '68ab7243-b0df-4df9-b3d2-01c6f17b851b',
    label: 'Goats',
    subLabel: 'Comedy',
  },
  {
    value: '2e37be80-1de5-4a80-a284-ab569b7ced5a',
    label: 'God told Me To',
    subLabel: 'Crime | Horror | Mystery | Sci-Fi | Thriller',
  },
  {
    value: 'b936a338-986f-4958-920e-43224185d89e',
    label: 'Golden Bowl, The',
    subLabel: 'Drama',
  },
  {
    value: '8e714f60-4dbc-474a-9dc7-e3ecf20e029f',
    label: 'Good Earth, The',
    subLabel: 'Drama',
  },
  {
    value: 'e414f7ba-ba38-4465-ab95-2870e933c66a',
    label: 'Good People',
    subLabel: 'Drama | Thriller',
  },
  {
    value: '979b0b56-9edb-4715-9dbe-3bcd5ed53311',
    label: 'Good Work (Beau travail)',
    subLabel: 'Drama',
  },
  {
    value: 'a37c4cef-a2cc-44b3-9ba3-5a978c9a55b0',
    label: 'Goodbye Again',
    subLabel: 'Drama | Romance',
  },
  {
    value: '944222de-4ecc-4030-aadf-a182b28ba5cc',
    label: 'Goodbye Girl, The',
    subLabel: 'Comedy | Romance',
  },
  {
    value: 'c91a113b-8225-49d5-bb76-d936e923cbe2',
    label: 'Goofy Movie, A',
    subLabel: 'Animation | Children | Comedy | Romance',
  },
  {
    value: 'ef08be43-00b2-474c-8a7c-5b9a8de5ad80',
    label: 'Grapes of Death, The (Raisins de la mort, Les)',
    subLabel: 'Horror',
  },
  {
    value: '290d79ec-500e-400d-90f1-dac2d203cb4d',
    label: 'Grateful Dead',
    subLabel: 'Documentary',
  },
  {
    value: '89af0205-fb90-44ff-aa1d-434b1c60fb15',
    label: 'Great Buck Howard, The',
    subLabel: 'Comedy',
  },
  {
    value: '1fa04ffa-5553-4c71-afce-172c0b59efe7',
    label: 'Great Expectations',
    subLabel: 'Drama',
  },
  {
    value: '3b7f0bc8-f1f9-4e76-9001-e3e252bf3224',
    label: 'Great Flamarion, The',
    subLabel: 'Drama | Film-Noir',
  },
  {
    value: '1b9e6467-f11a-40b0-a50a-cc1b7f421f12',
    label: 'Great Race, The',
    subLabel: 'Comedy | Musical',
  },
  {
    value: '87f02020-25fa-4817-864c-5092741f3b5b',
    label: 'Green Man, The',
    subLabel: 'Comedy',
  },
  {
    value: 'bf35038a-ec8c-4bc4-9714-dd3517c7c01c',
    label: 'Gretchen the Greenhorn',
    subLabel: 'Crime | Drama | Romance',
  },
  {
    value: 'bb2f0805-c14c-4ecc-bc4e-b682d9f525fb',
    label: 'Grey Gardens',
    subLabel: 'Drama',
  },
  {
    value: '07d0266b-1d59-416a-ad36-58ec040fe8f4',
    label: 'Gui Si (Silk)',
    subLabel: 'Drama | Horror | Mystery | Sci-Fi | Thriller',
  },
  {
    value: 'eb8c886a-498b-402d-9da5-9e0eb93c9aef',
    label: 'Gun the Man Down',
    subLabel: 'Western',
  },
  {
    value: 'a43373de-31b8-43d6-bdd0-baaebf8ddaa2',
    label: 'Guter Junge',
    subLabel: 'Drama',
  },
  {
    value: 'b0a2a52e-5e2e-4967-b026-d67dbaa6aaaa',
    label: 'Guter Junge',
    subLabel: 'Drama',
  },
  {
    value: '9d5f4a4f-8a49-4b69-9b28-4b0c2d6f27bd',
    label: "Hail Mary ('Je vous salue, Marie')",
    subLabel: 'Drama',
  },
  {
    value: '5897b60a-7e07-404e-8f2b-65f818051c5e',
    label: 'Halloween: Resurrection (Halloween 8)',
    subLabel: 'Horror | Thriller',
  },
  {
    value: '69068224-8710-46ba-83b5-842d1a2e0138',
    label: 'Hanussen',
    subLabel: 'Drama',
  },
  {
    value: 'bac27edf-7dd3-47e5-b8e2-90ec2309c13f',
    label: 'Hanzo the Razor: Sword of Justice (Goyôkiba)',
    subLabel: 'Action',
  },
  {
    value: 'f8d1c33c-1975-461d-90ad-d719ae74903f',
    label: 'Happy New Year',
    subLabel: 'Comedy | Crime | Romance',
  },
  {
    value: 'a93d84db-d14d-4dac-8154-0cb655b6a7bc',
    label: 'Hard, Fast and Beautiful',
    subLabel: 'Drama',
  },
  {
    value: '1842cfef-792f-4a3b-853c-c65822dd9857',
    label: 'Hardball',
    subLabel: 'Drama',
  },
  {
    value: 'c7073828-0743-40c0-8616-729c15ccd1d8',
    label: 'Harishchandrachi Factory',
    subLabel: 'Comedy | Drama',
  },
  {
    value: 'a6ef3b78-3db4-4fd5-a3fe-e8e5177b76f0',
    label: 'Harriet the Spy',
    subLabel: 'Children | Comedy',
  },
  {
    value: '66891a85-f75d-4d87-9342-89d7eba22e20',
    label: 'Haunt',
    subLabel: 'Horror | Mystery',
  },
  {
    value: '0333f94b-edb8-43f3-a9c3-6ceaa5316d8d',
    label: 'He Ran All the Way',
    subLabel: 'Crime | Drama | Film-Noir',
  },
  {
    value: '2c9c54e1-3fff-48e7-9aba-c37b7ed4fc85',
    label: 'Head Above Water',
    subLabel: 'Comedy | Thriller',
  },
  {
    value: '956cc8f7-9af6-4e63-8cd7-afb6db333ffd',
    label: "Heartbreaker (L'Arnacoeur)",
    subLabel: 'Comedy | Romance',
  },
  {
    value: '0a1d8aca-f2e2-44c1-8215-3bcaa14ac03f',
    label: 'Hearts of the West',
    subLabel: 'Comedy | Western',
  },
  {
    value: 'd0912b75-d253-43a3-a05f-adbfa79070cb',
    label: 'Heaven Can Wait',
    subLabel: 'Comedy | Fantasy | Romance',
  },
  {
    value: 'a530b43f-20c9-4a36-afaf-348555111356',
    label: 'Hell Is for Heroes',
    subLabel: 'Drama | War',
  },
  {
    value: 'e846ef2f-131b-4058-9c78-7f4e00950e0c',
    label: 'Hellboy II: The Golden Army',
    subLabel: 'Action | Adventure | Fantasy | Sci-Fi',
  },
  {
    value: '2aa2f3be-4010-43da-8cc3-a781a758a57b',
    label: 'Hello Again',
    subLabel: 'Comedy',
  },
  {
    value: 'a5e6baf1-269a-4e56-81d6-de600bd993ac',
    label: 'Hello, Friend',
    subLabel: 'Comedy | Horror',
  },
  {
    value: 'f63bf2ea-1ae4-41af-aa94-842fd3e95e02',
    label: "Hellzapoppin'",
    subLabel: 'Comedy | Musical',
  },
  {
    value: '60852a6e-f6c3-498b-9f23-90416f6ef76b',
    label: 'High Time (Big Daddy)',
    subLabel: 'Comedy | Musical',
  },
  {
    value: 'd4c4c3cc-23ee-4025-ab06-7575290eab81',
    label: 'Highlander: Endgame (Highlander IV)',
    subLabel: 'Action | Adventure | Fantasy',
  },
  {
    value: '84e74aec-9354-434e-b89b-a4c00aa7663e',
    label: 'Hills Have Eyes, The',
    subLabel: 'Horror',
  },
  {
    value: 'fadb5436-0f5c-43ca-b8bd-affc6ba127bd',
    label: 'History of the World: Part I',
    subLabel: 'Comedy | Musical',
  },
  {
    value: '79a44f37-f08b-4594-a394-c340c102ac27',
    label: 'Hitch',
    subLabel: 'Comedy | Romance',
  },
  {
    value: '1f6269ae-68e9-4275-80f3-7ffc51134c83',
    label: 'Hole in the Head, A',
    subLabel: 'Comedy | Musical',
  },
  {
    value: 'a49c9ce3-2b31-4b40-b03b-b269c631adf6',
    label: 'Holidaze',
    subLabel: 'Children | Drama | Romance',
  },
  {
    value: '0c4c39f0-d2b4-4283-bf85-8e2b36fcd3be',
    label: 'Holocaust',
    subLabel: 'Drama | Romance | War',
  },
  {
    value: '2c7a587e-dece-4dbe-9838-079e531457d8',
    label: 'Holy Innocents, The (Santos inocentes, Los)',
    subLabel: 'Drama',
  },
  {
    value: 'e5379c6f-183a-4aae-8468-c7eec1e7bcc0',
    label: 'Hombre',
    subLabel: 'Western',
  },
  {
    value: 'ad9b4229-1823-4d3a-b23c-eedc47a83663',
    label: 'Home Fries',
    subLabel: 'Comedy | Romance',
  },
  {
    value: 'd6d1b095-a2c0-48d3-9e71-24b4ade0a3b5',
    label: 'Hot Rods to Hell',
    subLabel: 'Action | Drama | Thriller',
  },
  {
    value: '93aae167-ba60-4b1c-bca4-a548029ef0a8',
    label: 'Hot Saturday',
    subLabel: 'Drama',
  },
  {
    value: 'a380cc35-e80c-42f3-9f72-f9d3dd42d021',
    label: 'Hotel Transylvania',
    subLabel: 'Animation | Children | Comedy',
  },
  {
    value: 'b7ef447b-ec76-4efe-b49b-0009d84c5cc6',
    label: 'Hotel Transylvania',
    subLabel: 'Animation | Children | Comedy',
  },
  {
    value: '55b14a1a-e203-4787-bde9-afe25a6c9a2e',
    label: 'House',
    subLabel: 'Drama | Horror | Thriller',
  },
  {
    value: 'b87140c9-fdcf-44a7-9766-4258d70852fe',
    label: 'Houseguest',
    subLabel: 'Comedy',
  },
  {
    value: '112d42b7-505c-4559-a08f-cea6282aa932',
    label: 'How I Got Into College',
    subLabel: 'Comedy | Romance',
  },
  {
    value: '86c7d2e4-4fbd-4013-b71a-8fb1211deec2',
    label: "How I Killed My Father (a.k.a. My Father and I) (Comment j'ai tué mon Père)",
    subLabel: 'Drama',
  },
  {
    value: '9da337dc-45f8-4ae7-9257-e76f29281b73',
    label: 'How to Steal a Million',
    subLabel: 'Comedy | Crime | Romance',
  },
  {
    value: '78fc77ab-8052-49a9-b602-113c9d6dbea7',
    label: 'Howards of Virginia, The',
    subLabel: 'Drama | War',
  },
  {
    value: '2a60b5b2-1836-42dd-908a-3ba4a4335b89',
    label: 'Hudson Hawk',
    subLabel: 'Action | Adventure | Comedy',
  },
  {
    value: '936a874c-00f5-42ca-bf7e-e8929dd84bfc',
    label: 'Human Failure (Menschliches Versagen)',
    subLabel: 'Documentary',
  },
  {
    value: '430ea931-34d8-45f2-a830-3eaf267a3fed',
    label: 'Human Resources (Ressources humaines)',
    subLabel: 'Drama',
  },
  {
    value: '15e8b440-5db2-42b7-b1ce-c5572176ff5c',
    label: 'Hundred-Foot Journey, The',
    subLabel: 'Drama',
  },
  {
    value: '10e10497-087e-49f2-8015-349ccf21d54a',
    label: 'Hunting Elephants',
    subLabel: 'Comedy | Crime',
  },
  {
    value: 'a14415d8-62f0-4d2b-aa18-44f2ef013848',
    label: 'I Live My Life',
    subLabel: 'Comedy | Romance',
  },
  {
    value: 'b90cb178-2039-432a-9959-8a28bc1fcb48',
    label: 'I Love You, Man',
    subLabel: 'Comedy',
  },
  {
    value: '71eda32d-e4f2-4ae6-8673-1ca6fbb7c05a',
    label: 'I Married a Monster from Outer Space',
    subLabel: 'Horror | Sci-Fi',
  },
  {
    value: 'af90ef28-253c-4126-a59d-9baff8dd84ff',
    label: 'I Shot Andy Warhol',
    subLabel: 'Drama',
  },
  {
    value: '14745dc8-6d1a-4322-9e07-d56cb27a34dd',
    label: 'I Wake Up Screaming',
    subLabel: 'Crime | Film-Noir | Mystery | Romance | Thriller',
  },
  {
    value: '74e15fd1-0f20-4124-8818-ffad2db97a77',
    label: 'I Want to Live!',
    subLabel: 'Crime | Drama',
  },
  {
    value: 'af7f7f60-7ef0-4fb0-b114-0d4d80d1ac78',
    label: "I Was Monty's Double",
    subLabel: 'Drama | War',
  },
  {
    value: '7e27b8df-78e6-4162-bf86-c3a4f97305f7',
    label: "I'll Be There",
    subLabel: 'Comedy | Musical | Romance',
  },
  {
    value: '92631e70-4e4a-4313-853a-4689b84520fc',
    label: "I'm Not Scared (Io non ho paura)",
    subLabel: 'Drama | Mystery | Thriller',
  },
  {
    value: 'c0c1ce71-68b3-48f1-bd9c-046a36c69676',
    label: "I'm Starting From Three (Ricomincio da Tre)",
    subLabel: 'Comedy',
  },
  {
    value: 'f9828915-111f-41ae-8f47-6c47c7d89a50',
    label: 'Ice Age Columbus: Who Were the First Americans?',
    subLabel: 'Documentary',
  },
  {
    value: 'df466fc3-843f-4ed4-b903-e3aea06c187f',
    label: 'Iceman, The',
    subLabel: 'Crime | Drama | Thriller',
  },
  {
    value: '8312f337-99c5-44ab-87ba-8c31fede0426',
    label: 'Ichi the Killer (Koroshiya 1)',
    subLabel: 'Action | Comedy | Crime | Drama | Horror | Thriller',
  },
  {
    value: '38251f53-a2ac-4045-829b-ad1e193e5f68',
    label: 'Imagine That',
    subLabel: 'Comedy | Drama | Fantasy',
  },
  {
    value: 'a84967c4-6f2c-4067-af69-33065911e0a9',
    label: 'In A Day',
    subLabel: 'Romance',
  },
  {
    value: 'd2b7fcd6-e9d2-4867-8cc8-9ae8aa7a93f4',
    label: 'In Between Days',
    subLabel: 'Drama',
  },
  {
    value: 'f7b0a6e4-3f19-4b45-882b-a21a80da4379',
    label: 'In Their Skin',
    subLabel: 'Horror | Thriller',
  },
  {
    value: '8ba64e01-c335-484a-887f-726766e1f284',
    label: 'In Two Minds',
    subLabel: '(no genres listed)',
  },
  {
    value: '275484b3-3842-46bb-912e-a3b3d7ddebed',
    label: 'In Which We Serve',
    subLabel: 'Drama | War',
  },
  {
    value: '1538c3d1-88f6-418f-84aa-cc9f6744ed90',
    label: 'In-Laws, The',
    subLabel: 'Comedy',
  },
  {
    value: '3b8fdd59-494a-41b5-b67a-9d8b790ae7e7',
    label: 'Infection (Kansen)',
    subLabel: 'Drama | Horror',
  },
  {
    value: '8d10bc02-d136-4b6c-bea4-88b2809f373f',
    label: 'Innerspace',
    subLabel: 'Action | Adventure | Comedy | Sci-Fi',
  },
  {
    value: 'e77cd068-7f13-4be9-94f2-1f208339fbef',
    label: 'Inside Man',
    subLabel: 'Crime | Drama | Thriller',
  },
  {
    value: '1723a065-25cf-419a-8f4f-ea9e9166cb3a',
    label: 'Interkosmos',
    subLabel: 'Drama',
  },
  {
    value: 'f86b25cd-0f74-4abd-bd96-90bfebdc116f',
    label: 'Invisible Sign, An',
    subLabel: 'Comedy | Drama',
  },
  {
    value: '55cc0ec3-5ddc-4dfb-b032-be2233696250',
    label: 'Invisible Woman, The',
    subLabel: 'Comedy | Romance | Sci-Fi',
  },
  {
    value: 'ad8c9d40-1958-4ec8-82e6-286f80033712',
    label: 'Iran Job, The',
    subLabel: 'Documentary',
  },
  {
    value: 'faab4f6a-8aa8-4c4c-be0e-69b623d66668',
    label: 'Island, The (a.k.a. Naked Island) (Hadaka no shima)',
    subLabel: 'Drama',
  },
  {
    value: '1e13f483-e6d3-4376-828d-5b8b90a18d1f',
    label: 'It Felt Like a Kiss',
    subLabel: 'Documentary',
  },
  {
    value: '50ee0bcd-e851-4f60-b0f8-fd12c4cf6ad2',
    label: 'It Felt Like Love',
    subLabel: 'Drama',
  },
  {
    value: '4dce99f3-1f24-438c-b01d-651c72e2f069',
    label: "It's Alive",
    subLabel: 'Horror',
  },
  {
    value: '852c9d7e-6c04-4635-8795-249603f2ec52',
    label: 'James and the Giant Peach',
    subLabel: 'Adventure | Animation | Children | Fantasy | Musical',
  },
  {
    value: '8f981344-b3e0-4bb5-afc7-ae821af1da58',
    label: 'Jane Eyre',
    subLabel: 'Drama | Romance',
  },
  {
    value: '92e46e3c-8159-4fe5-a811-73c4ddce166f',
    label: 'JCVD',
    subLabel: 'Action | Drama | Thriller',
  },
  {
    value: '30afe5a7-8f90-464b-9d70-b3f974ae7d7e',
    label: 'Jersey Boys',
    subLabel: 'Drama | Musical',
  },
  {
    value: '2689a420-2ed8-41f1-95b1-7fa67ad7b86e',
    label: "Jet Li's Fearless (Huo Yuan Jia)",
    subLabel: 'Action | Drama',
  },
  {
    value: 'c3632fe7-f9e4-452c-bd81-c3be091fa12e',
    label: 'Jet Pilot',
    subLabel: 'Drama',
  },
  {
    value: '98c4f4e8-e84f-4170-9b84-1bb465c1450b',
    label: 'Johnny Belinda',
    subLabel: 'Drama',
  },
  {
    value: '7d5ad452-ba8b-4752-9413-874e3a75a151',
    label: 'Journey from the Fall',
    subLabel: 'Drama',
  },
  {
    value: '6405bd7d-883d-40b5-9138-0a238c26ee09',
    label: 'Journey to the Far Side of the Sun (a.k.a. Doppelgänger)',
    subLabel: 'Fantasy | Mystery | Sci-Fi | Thriller',
  },
  {
    value: '195da6a2-8a81-48a2-88c7-66a6307d3612',
    label: 'Jurassic Park',
    subLabel: 'Action | Adventure | Sci-Fi | Thriller',
  },
  {
    value: '828b6fff-df1f-493a-92b3-d0eaf2ae44e1',
    label: 'Just Cause',
    subLabel: 'Mystery | Thriller',
  },
  {
    value: '56659c8a-e93a-423c-8604-f2eeeb9a49fc',
    label: 'Just Like Us',
    subLabel: 'Comedy | Documentary',
  },
  {
    value: '6381aaff-4a1e-4d34-bdc0-8c9176cb4453',
    label: 'Kaleidoscope',
    subLabel: 'Comedy | Crime',
  },
  {
    value: '48dfc94c-6247-4c14-b076-e8b99e34e5ab',
    label: 'Kanal',
    subLabel: 'Drama | War',
  },
  {
    value: 'a828c5b2-6b62-4947-8113-45ae751b9b74',
    label: 'Karan Arjun',
    subLabel: 'Drama',
  },
  {
    value: 'aac3e415-0441-4add-b2a2-78dc903b75ed',
    label: 'Karlsson on the Roof',
    subLabel: 'Children',
  },
  {
    value: '21586e6b-ee10-4961-a643-b131c75e72ba',
    label: 'Kedma',
    subLabel: 'Drama | War',
  },
  {
    value: '440e8330-2fbe-4aaa-b20f-2672382e22ef',
    label: 'Keeper, The',
    subLabel: 'Crime | Drama | Thriller',
  },
  {
    value: '6e08c617-1abe-405b-ba3d-0c1f32505921',
    label: 'Kid Millions',
    subLabel: 'Comedy | Musical',
  },
  {
    value: 'e27166bb-38a5-4615-8aa2-ab61da60354d',
    label: 'Kidnapping Mr. Heineken',
    subLabel: 'Action | Crime | Drama | Thriller',
  },
  {
    value: '4b90c490-1743-4f63-9f67-4365d0d06747',
    label: 'Kiki',
    subLabel: 'Musical',
  },
  {
    value: 'b1139282-e717-4089-b07f-158d7838a7b1',
    label: 'Kill the Irishman',
    subLabel: 'Action | Crime',
  },
  {
    value: 'ed33382c-7e99-43c4-878c-00fe91f58900',
    label: 'Killer Bean 2: The Party',
    subLabel: 'Action | Animation | Comedy',
  },
  {
    value: '9b620956-70d0-4110-b550-24aa318cceab',
    label: 'Killing Lincoln',
    subLabel: 'Drama | War',
  },
  {
    value: '07e92e0d-4a06-404b-8a33-a1fd6e486c20',
    label: 'Killing Them Softly',
    subLabel: 'Crime | Drama | Thriller',
  },
  {
    value: 'dad5f507-c184-4c25-8ddf-c7647a7e91f6',
    label: 'King Lear (Korol Lir)',
    subLabel: 'Drama',
  },
  {
    value: 'b3349e46-a142-4b13-9d2c-3afdf2cde6ba',
    label: 'King of Hearts',
    subLabel: 'Comedy | Drama | War',
  },
  {
    value: 'f2b921da-812c-4ed4-a051-c5b60064e079',
    label: "King's Speech, The",
    subLabel: 'Drama',
  },
  {
    value: '12e78e54-7558-4581-ad54-a72cb87412d2',
    label: 'Kinjite: Forbidden Subjects',
    subLabel: 'Crime | Thriller',
  },
  {
    value: 'b070d7ba-f7cd-4e57-83ed-4817f8b99075',
    label: 'Korczak',
    subLabel: 'Drama | War',
  },
  {
    value: '08cde309-33f6-46e5-bc93-ac3d8511f526',
    label: 'Kuffs',
    subLabel: 'Action | Comedy | Crime',
  },
  {
    value: 'cc564d1b-7ff1-4aa2-b050-c15c3dcf5f62',
    label: 'Kukuli',
    subLabel: 'Drama',
  },
  {
    value: 'f3a2f3b5-4625-4551-a5a9-900325724edb',
    label: 'Kumaré',
    subLabel: 'Documentary',
  },
  {
    value: '01b4f01b-ad0a-408e-b463-112d6af6824d',
    label: 'La cravate',
    subLabel: '(no genres listed)',
  },
  {
    value: '198a6d1c-228a-4429-879d-664a6337cc98',
    label: 'La dama boba',
    subLabel: 'Comedy',
  },
  {
    value: 'abd74a5d-906d-41c7-baaa-d26c22305a7f',
    label: 'Lambada',
    subLabel: 'Drama',
  },
  {
    value: '8c9fe6a0-3453-4f2a-86d0-318841b8916e',
    label: 'Lamp in the Dark; The Untold History of the Bible, A',
    subLabel: 'Documentary',
  },
  {
    value: '7de558c1-97ac-431d-bc95-e27fc9dc66e8',
    label: 'Last of Mrs. Cheyney, The',
    subLabel: 'Comedy | Drama',
  },
  {
    value: 'bd678837-3b20-4066-b526-f33e98f60c1a',
    label: 'Last of Mrs. Cheyney, The',
    subLabel: 'Comedy | Drama',
  },
  {
    value: 'cb721825-4fb1-4da5-a148-30bb9aa972b5',
    label: 'Last Remake of Beau Geste, The',
    subLabel: 'Adventure | Comedy',
  },
  {
    value: 'a30634cd-55a6-4c58-86b0-66f9738a902e',
    label: 'Last Ride',
    subLabel: 'Drama',
  },
  {
    value: 'b5ba1042-aa51-4b5f-ba34-687c9e04c4df',
    label: 'Last Seduction II, The',
    subLabel: 'Crime | Drama | Thriller',
  },
  {
    value: '748e33db-b6bb-4c43-93e3-71439542d325',
    label: 'Last Summer of La Boyita, The (El último verano de la Boyita)',
    subLabel: 'Drama',
  },
  {
    value: '02fed0e1-ea5e-42f2-9c56-9d0ac76036fb',
    label: 'Last Winter, The',
    subLabel: 'Horror',
  },
  {
    value: '67f59223-96c2-433a-a4c4-eab603282b39',
    label: "Last Year at Marienbad (L'Année dernière à Marienbad)",
    subLabel: 'Drama | Mystery | Romance',
  },
  {
    value: 'e48d2d69-9f0e-4462-b93a-89f8fe5b7382',
    label: 'Lawless',
    subLabel: 'Crime | Drama',
  },
  {
    value: 'c9b26695-e129-42d1-9b72-ec8ca7c95757',
    label: 'Lawless Frontier, The',
    subLabel: 'Romance | Western',
  },
  {
    value: 'c4a3c6d9-2822-4f05-bb25-cac57742bb33',
    label: 'Leave',
    subLabel: 'Drama | Thriller',
  },
  {
    value: '500cfa63-7528-4f5c-b8ed-031f9ea1536f',
    label: 'Left Behind: The Movie',
    subLabel: 'Action | Adventure | Drama | Thriller',
  },
  {
    value: '4bb2482e-2440-48b5-8344-cad7b110e4a8',
    label: "Legend of the Guardians: The Owls of Ga'Hoole",
    subLabel: 'Adventure | Animation | Fantasy | IMAX',
  },
  {
    value: '6ce54b79-ee15-4c5a-aa4b-85c7176948e1',
    label: 'Leif',
    subLabel: 'Comedy | Musical',
  },
  {
    value: 'a851acb0-fc58-4e06-9a5f-d45733897456',
    label: 'Leningrad Cowboys Meet Moses',
    subLabel: 'Adventure | Comedy',
  },
  {
    value: '9198859b-38a2-455c-9527-53891e53e87a',
    label: 'Letter From Death Row, A',
    subLabel: 'Crime | Drama',
  },
  {
    value: '05bbc74c-21f3-4474-94cf-2a20e9eefbf4',
    label: 'Libertine, The',
    subLabel: 'Drama',
  },
  {
    value: 'b0e30e37-2b3e-487f-acd2-000a8213100b',
    label: 'Lies My Father Told Me',
    subLabel: 'Children | Drama',
  },
  {
    value: 'bc9d4f7a-0d34-42d1-9d3e-2e26105f4805',
    label: 'Life On A String (Bian chang Bian Zou)',
    subLabel: 'Adventure | Drama | Fantasy | Musical',
  },
  {
    value: 'f94754de-a640-4292-a2df-274a17deac42',
    label: 'Lifeguard',
    subLabel: 'Comedy | Drama',
  },
  {
    value: 'f72bce39-5def-491e-8466-6a9dd6ecee17',
    label: 'Light Years Away',
    subLabel: 'Drama',
  },
  {
    value: 'f58e14ec-37d7-42ba-8dba-189264b58f9e',
    label: 'Lili Marleen',
    subLabel: 'Drama',
  },
  {
    value: 'be5e55a3-f7f1-47e2-8d31-b44df74337fb',
    label: "Lili's Apron",
    subLabel: 'Comedy',
  },
  {
    value: '0bf795c5-5367-49c9-ad47-a0ce3cf06874',
    label: 'Lincoln Lawyer, The',
    subLabel: 'Crime | Drama | Thriller',
  },
  {
    value: '3aad28ef-b835-4c2f-8fd7-1e65355698c6',
    label: 'Lion King, The',
    subLabel: 'Adventure | Animation | Children | Drama | Musical | IMAX',
  },
  {
    value: 'a6be848e-2cd6-40ea-a550-177f980ae818',
    label: 'Lions For Lambs',
    subLabel: 'Drama | Thriller | War',
  },
  {
    value: 'f764613a-473c-4e6e-a8f7-207fc3390fa3',
    label: 'Listy do M.',
    subLabel: 'Comedy | Romance',
  },
  {
    value: 'b411951a-c83c-4a50-87a7-65ce502c1b91',
    label: 'Little Dorrit',
    subLabel: 'Drama | Romance',
  },
  {
    value: '00159dc0-0f46-4e67-bd90-6aa0e3788dcc',
    label: 'Living Dead Girl, The (Morte Vivante, La)',
    subLabel: 'Horror',
  },
  {
    value: '6edd5759-58ec-43d1-a793-a38d8d28b9d9',
    label: 'Living Proof',
    subLabel: 'Drama',
  },
  {
    value: '21741c9d-67fe-49e0-8e25-dc637781498a',
    label: 'Living with Michael Jackson',
    subLabel: 'Documentary',
  },
  {
    value: '271f667d-fdfc-4608-9d49-36f0a2ea243c',
    label: 'LOL',
    subLabel: 'Comedy | Drama',
  },
  {
    value: 'c7d5ca13-1100-4478-aaa7-6c39d9f12aa0',
    label: 'Lola Montès',
    subLabel: 'Drama',
  },
  {
    value: '207166d3-09f1-43ba-b96d-192759a5603a',
    label: 'Lonely Are the Brave',
    subLabel: 'Drama | Western',
  },
  {
    value: '55357b14-75ad-4ba8-b618-3767a2ce8ea2',
    label: 'Lord Love a Duck',
    subLabel: 'Comedy',
  },
  {
    value: '253668ac-1b3f-40ef-aa66-c0827c24bb1c',
    label: 'Loss of Sexual Innocence, The',
    subLabel: 'Drama | Fantasy',
  },
  {
    value: 'd9cd89f3-71c5-49d0-9a34-cfaeae4e3eca',
    label: 'Lost Boundaries',
    subLabel: 'Drama',
  },
  {
    value: '2912efad-4988-4bd5-9482-84ce89d9b674',
    label: 'Louis C.K.: Chewed Up',
    subLabel: 'Comedy',
  },
  {
    value: 'ef553c61-813e-4b50-8b70-4048f7c8d7f4',
    label: 'Loulou',
    subLabel: 'Drama | Romance',
  },
  {
    value: '752096db-584a-4989-af72-5617e0fb9581',
    label: 'Love Actually',
    subLabel: 'Comedy | Drama | Romance',
  },
  {
    value: '8c75c5d3-17c3-4d49-a127-51a923417b2a',
    label: 'Love and Other Drugs',
    subLabel: 'Comedy | Drama | Romance',
  },
  {
    value: 'c07d563e-90f6-4104-977b-06de39594f34',
    label: 'Love at Large',
    subLabel: 'Romance | Thriller',
  },
  {
    value: '433ccb88-0a7c-4fbc-bedc-cc8a0e789f95',
    label: 'Love Life',
    subLabel: 'Comedy | Romance',
  },
  {
    value: 'd50e5857-40bc-4001-95aa-afc0ef34b4a1',
    label: "Love's Deadly Triangle: The Texas Cadet Murder",
    subLabel: 'Drama',
  },
  {
    value: '29b4e637-955b-4da4-9ebb-8db4370705d7',
    label: 'Lovely Bones, The',
    subLabel: 'Crime | Drama | Fantasy | Horror | Thriller',
  },
  {
    value: '3a266eb5-b3ef-414a-b20c-464c627be28a',
    label: "Lover, The (Amant, L')",
    subLabel: 'Drama | Romance',
  },
  {
    value: '86221cf4-82ea-4292-ac02-31f42147043d',
    label: 'Lullaby',
    subLabel: 'Drama',
  },
  {
    value: '39325562-9dcc-45c2-8049-427b0d645574',
    label: 'MacArthur',
    subLabel: 'Drama',
  },
  {
    value: 'cf6f6a34-e44e-426e-b002-38e59c8d876a',
    label: 'Mad Love',
    subLabel: 'Drama | Romance',
  },
  {
    value: '6ccd122e-5db4-4d09-b653-10dbbf8bf679',
    label: 'Mademoiselle',
    subLabel: 'Drama',
  },
  {
    value: 'dafe3a55-3581-424f-a603-4f8e3469342e',
    label: 'Magic Christmas Tree, The',
    subLabel: 'Children | Comedy | Fantasy',
  },
  {
    value: '53a4960e-c82e-4c93-a3b7-39ba964b3d08',
    label: 'Magic in the Moonlight',
    subLabel: 'Comedy | Drama | Romance',
  },
  {
    value: '7a0c5f0f-b58d-4077-a9a4-acf5df9415e8',
    label: 'Magical Mystery Tour',
    subLabel: 'Comedy | Musical',
  },
  {
    value: 'e8f79f53-191b-4549-afdb-c2df6dd7ff42',
    label: 'Magnetic Man, The (Magneettimies)',
    subLabel: 'Documentary',
  },
  {
    value: '70e6f3ce-283e-4711-b4d3-ca3bbd8b7f03',
    label: 'Maiden Heist, The',
    subLabel: 'Comedy | Crime',
  },
  {
    value: 'de55c17d-6546-4071-a44a-033ad5045513',
    label: 'Malaya',
    subLabel: 'Adventure | Drama',
  },
  {
    value: '17d88ee2-9de3-404a-ad52-3545cea3193c',
    label: 'Man Called Horse, A',
    subLabel: 'Adventure | Drama | Western',
  },
  {
    value: '0d4a4855-2b65-4f50-89a4-1386db11250d',
    label: 'Man from Beyond, The',
    subLabel: 'Mystery',
  },
  {
    value: '52cf76ec-2b31-43ca-a610-956f9b982a6f',
    label: 'Man in the Saddle',
    subLabel: 'Western',
  },
  {
    value: 'abc4bcd1-b682-43c1-ac73-638470664e90',
    label: "Man on a Mission: Richard Garriott's Road to the Stars",
    subLabel: 'Documentary',
  },
  {
    value: '0173e788-3f8f-49d4-b64d-9601fecb2afe',
    label: 'Man Who Sued God, The',
    subLabel: 'Comedy | Drama | Romance',
  },
  {
    value: 'd2e44bc9-1979-4376-a60d-d8065e037334',
    label: "Man with Bogart's Face, The",
    subLabel: 'Comedy',
  },
  {
    value: '718b17b3-0804-449a-9b9f-6ea352910b45',
    label: "Manual of Love 2 (Manuale d'amore (capitoli successivi))",
    subLabel: 'Comedy | Romance',
  },
  {
    value: 'b458b6f3-3a8f-4758-9cd7-cca0d6f03c7d',
    label: "Manual of Love 2 (Manuale d'amore (capitoli successivi))",
    subLabel: 'Comedy | Romance',
  },
  {
    value: 'bab2416c-55ef-44b6-b0bb-4f0b71b016ce',
    label: "March of the Penguins (Marche de l'empereur, La)",
    subLabel: 'Documentary',
  },
  {
    value: '582e68ed-e75b-410d-9976-c70bd9ac54cf',
    label: 'Marley',
    subLabel: 'Documentary',
  },
  {
    value: '58ffe971-c723-4752-92e1-6f6cfd15056a',
    label: 'Massacre at Central High',
    subLabel: 'Drama | Horror | Thriller',
  },
  {
    value: '74ce14f9-982a-41e7-aff2-3ae881f65ba6',
    label: 'Masters of the Universe',
    subLabel: 'Action | Adventure | Fantasy | Sci-Fi',
  },
  {
    value: '3a574b3f-1413-4a75-acf4-d82506757ccc',
    label: 'MatchMaker, The',
    subLabel: 'Comedy | Romance',
  },
  {
    value: '250a0dc8-8088-4c41-8771-335a66c92327',
    label: 'Material Girls',
    subLabel: 'Children | Comedy | Drama',
  },
  {
    value: '1e5e6c58-c3bf-45e8-9750-75759ef65784',
    label: 'Matrimonial Comedy (Komedia malzenska)',
    subLabel: 'Comedy',
  },
  {
    value: '6e6e0db3-1834-408d-964a-7247910ea1fa',
    label: 'Mayor of Hell, The',
    subLabel: 'Crime | Drama | Romance',
  },
  {
    value: '9b21422f-3fe7-4db1-9e2f-d6bb97f5380e',
    label: 'Me and Him (Ich und Er)',
    subLabel: 'Comedy',
  },
  {
    value: 'a9226a92-63e7-46d8-9893-853fb63dd15c',
    label: 'Me and My Sister',
    subLabel: 'Comedy',
  },
  {
    value: '6ed75186-eeee-4626-ae23-29e711f09b8a',
    label: 'Me and Orson Welles',
    subLabel: 'Drama',
  },
  {
    value: 'a41b09c1-1114-40da-a8b1-a20a2b490bd1',
    label: 'Mean Streets',
    subLabel: 'Crime | Drama',
  },
  {
    value: '49b119b8-626e-4ff9-aa95-0c66fae5a479',
    label: 'Memory Lane',
    subLabel: 'Drama',
  },
  {
    value: '334e6c9d-8b0f-4007-b75d-f1bb62e1fe15',
    label: 'Men, The',
    subLabel: 'Drama',
  },
  {
    value: '1d83e1fb-71ed-4b75-a2d9-06037121f4b2',
    label: 'Men, Women & Children',
    subLabel: 'Comedy | Drama',
  },
  {
    value: '64c3ddec-b952-46c2-a912-6d71c62cfb9f',
    label: 'Mermaid, The (Rusalka)',
    subLabel: 'Comedy | Drama | Fantasy',
  },
  {
    value: '84a2550a-48b1-4192-9d67-e28141bb5dda',
    label: 'Meu Passado Me Condena: O Filme',
    subLabel: 'Comedy | Romance',
  },
  {
    value: 'cc95f896-1eb4-43de-b491-91435aa54972',
    label: 'Michael Jackson: Life of a Superstar',
    subLabel: 'Documentary',
  },
  {
    value: '4386294d-d45a-4961-85d0-3fb1a31a4067',
    label: 'Michael Jackson: Life of a Superstar',
    subLabel: 'Documentary',
  },
  {
    value: 'cc932a99-3de9-4111-8ebb-fb029d6fef94',
    label: 'Microphone',
    subLabel: 'Comedy | Drama | Musical',
  },
  {
    value: '0160eedb-7a00-4deb-ac33-a4af0afe6cb7',
    label: 'Midnight Dancers (Sibak)',
    subLabel: 'Comedy | Drama',
  },
  {
    value: 'c5a57e7c-1613-4099-aa20-de3c6ebfc5ce',
    label: 'Mind Reader, The',
    subLabel: 'Drama | Romance',
  },
  {
    value: '4533e7df-1312-4454-ad98-71a862389e7f',
    label: 'Mind Reader, The',
    subLabel: 'Drama | Romance',
  },
  {
    value: '755d63e7-9961-4b97-98b1-d97f57ac71c1',
    label: 'Miss Austen Regrets',
    subLabel: 'Drama',
  },
  {
    value: '197fb74f-a772-4581-a168-164aae43ebf2',
    label: 'Mission London',
    subLabel: 'Comedy',
  },
  {
    value: '8bf853f8-7f4e-4d62-9b8e-21b5ea010991',
    label: 'Mo',
    subLabel: 'Horror',
  },
  {
    value: '00fbd071-48b7-403c-bbe1-167c93350e6d',
    label: 'Money as Debt',
    subLabel: 'Animation | Documentary',
  },
  {
    value: '6306437a-a534-43fc-b884-f2fefafc88cb',
    label: 'Moonwalker',
    subLabel: 'Musical',
  },
  {
    value: 'b1f8fd0b-3008-42f4-b1f2-8666e8c84ad0',
    label:
      'More About the Children of Noisy Village (a.k.a. More About the Children of Bullerby Village) (Mer om oss barn i Bullerbyn)',
    subLabel: 'Children',
  },
  {
    value: '9d5cb403-6d4e-4167-b52c-acbccf9beec1',
    label: 'Morons From Outer Space',
    subLabel: 'Comedy | Sci-Fi',
  },
  {
    value: '4aa2d61d-c0e7-4dba-93c0-03874d99c821',
    label: 'Mortadelo & Filemon: The Big Adventure (La gran aventura de Mortadelo y Filemón)',
    subLabel: 'Action | Adventure | Comedy',
  },
  {
    value: '4576838f-585f-4599-a1a5-daeb251d86cf',
    label: 'Mosquito Coast, The',
    subLabel: 'Adventure | Drama | Thriller',
  },
  {
    value: '4ea09643-319e-4652-accc-b6c47513b51e',
    label: 'Mother and Child',
    subLabel: 'Drama',
  },
  {
    value: '0386e7f5-a337-45f1-b4de-c95adb7c333b',
    label: 'Mother and Son (Mat i syn)',
    subLabel: 'Drama',
  },
  {
    value: '7de006d9-67da-4be9-87fd-09c2c5c0cf0b',
    label: 'Mothman Prophecies, The',
    subLabel: 'Drama | Fantasy | Horror | Mystery | Thriller',
  },
  {
    value: 'ca01b39d-f1e5-4e05-ad36-aad737d70e32',
    label: 'Mothman Prophecies, The',
    subLabel: 'Drama | Fantasy | Horror | Mystery | Thriller',
  },
  {
    value: '0d17f370-6c0a-44d0-ba30-da538d3e4f8a',
    label: 'Movie Days (Bíódagar)',
    subLabel: 'Comedy | Drama',
  },
  {
    value: 'f2f3b7a0-4afe-4aad-848e-7b5eb513c51a',
    label: 'Mr. & Mrs. Smith',
    subLabel: 'Action | Adventure | Comedy | Romance',
  },
  {
    value: '31f4da97-4b1d-44bd-88c4-90e6e6eb634d',
    label: 'Mr. Deeds Goes to Town',
    subLabel: 'Comedy | Romance',
  },
  {
    value: '1ad1c083-45dd-4e8b-bf5a-10dc2b75c3b7',
    label: 'Mr. Wonderful',
    subLabel: 'Comedy | Romance',
  },
  {
    value: '18bebbb0-aeaf-44d2-a526-c913bf3e1a84',
    label: 'Mummy, The',
    subLabel: 'Horror | Romance',
  },
  {
    value: 'bc74ff30-95ee-419e-8c8d-5683422b8524',
    label: 'Mummy, The',
    subLabel: 'Action | Adventure | Comedy | Fantasy | Horror | Thriller',
  },
  {
    value: 'a8ed5a52-2898-4488-8b44-8e23fde928c5',
    label: 'Music Lovers, The',
    subLabel: 'Drama',
  },
  {
    value: 'e2944897-237e-428f-aaa6-37b2de5f4cfb',
    label: 'Musikanten',
    subLabel: '(no genres listed)',
  },
  {
    value: 'de25faf3-ceec-4f68-abfe-834e8da45c6e',
    label: 'My Dog Skip',
    subLabel: 'Children | Drama',
  },
  {
    value: '2a4533cf-9248-4e22-b71b-a0d8d8655322',
    label: 'My Mother Likes Women (A mi madre le gustan las mujeres)',
    subLabel: 'Comedy',
  },
  {
    value: '696355a5-5b35-4a5a-b4e7-7e02dcde2615',
    label: 'My Son, My Son, What Have Ye Done',
    subLabel: 'Drama | Horror',
  },
  {
    value: '82a78f98-07ce-4021-8342-092dec199ea6',
    label: 'My Sucky Teen Romance',
    subLabel: 'Comedy',
  },
  {
    value: 'c4af43fe-08c1-4ed7-b8c9-58227bb59fe0',
    label: 'Naked Gun 2 1/2: The Smell of Fear, The',
    subLabel: 'Comedy',
  },
  {
    value: '3bcad7ef-5616-4fe1-a4ee-d538d7cf0910',
    label: "National Lampoon's Senior Trip",
    subLabel: 'Comedy',
  },
  {
    value: 'c862fcab-dc47-42c4-ac90-1c610662e9b9',
    label: 'Nazarin (Nazarín)',
    subLabel: 'Drama',
  },
  {
    value: 'ce2f6e39-f7b3-4f40-88f7-566f92d66fab',
    label: 'Ned Kelly',
    subLabel: 'Action | Crime | Western',
  },
  {
    value: 'e61c8686-608b-4322-9d89-c8c795528932',
    label: 'Next Stop Wonderland',
    subLabel: 'Comedy | Drama | Romance',
  },
  {
    value: '9ad41785-b3ce-4794-93f0-3caf18af4337',
    label: 'Night and Day',
    subLabel: 'Drama | Musical',
  },
  {
    value: '9b493817-8438-4ace-8ca8-41d484b85d61',
    label: 'Night and Day',
    subLabel: 'Drama | Musical',
  },
  {
    value: 'c0051cc5-df4a-48ff-b6e9-5978050eb827',
    label: 'Night Moves',
    subLabel: 'Crime | Thriller',
  },
  {
    value: '51fd7b28-c546-4d03-8cb1-dd8351b32066',
    label: 'Night Must Fall',
    subLabel: 'Thriller',
  },
  {
    value: 'e8eeabf5-bef5-423f-b294-9d399d8d190d',
    label: 'Night of the Following Day, The',
    subLabel: 'Crime | Drama',
  },
  {
    value: '7d131d0a-a867-4866-8886-6afcefc90e1d',
    label: 'Night of the Hunter, The',
    subLabel: 'Drama | Film-Noir | Thriller',
  },
  {
    value: '071c82fa-a1a0-49b8-8778-d71231281b65',
    label: 'Night We Never Met, The',
    subLabel: 'Comedy | Romance',
  },
  {
    value: '3d5f4725-e25e-4ac6-bb50-947408f68067',
    label: 'Nightmaster (Watch the Shadows Dance)',
    subLabel: 'Action',
  },
  {
    value: '5c568253-ed9d-4c89-b7ab-5939d7f02e14',
    label: 'Nightwatch',
    subLabel: 'Horror | Thriller',
  },
  {
    value: '6539c59c-bd7d-464b-b807-835e073c16e6',
    label: 'Ninja III: The Domination',
    subLabel: 'Action',
  },
  {
    value: '3454962f-b006-4216-b415-192cdf44a1d1',
    label: 'Nô',
    subLabel: 'Drama',
  },
  {
    value: 'c441ee7b-ae8f-4a76-8618-22dc4da09140',
    label: "No Man's Land",
    subLabel: 'Drama | War',
  },
  {
    value: '12f72d98-f8bf-4c15-bc7e-83e93c1c3ea4',
    label: "Noah's Ark",
    subLabel: 'Drama | War',
  },
  {
    value: 'cdbe3cbf-c809-4ca6-b8b0-38cd10530d6b',
    label:
      "Nobody Will Speak of Us When We're Dead (Nadie hablará de nosotras cuando hayamos muerto)",
    subLabel: 'Drama',
  },
  {
    value: '3a0f59f5-01d3-47eb-beff-83006950ad1b',
    label: 'Not Cool',
    subLabel: 'Comedy',
  },
  {
    value: 'b1bb49b7-59a1-4484-a998-0c4e1cc16c6c',
    label: 'Not Safe for Work',
    subLabel: 'Thriller',
  },
  {
    value: '760a2cf2-206d-404a-b2fc-c0f1303e298b',
    label: 'Nothing Lasts Forever ',
    subLabel: 'Comedy | Fantasy | Sci-Fi',
  },
  {
    value: '900cb73b-9db7-4b7f-a0b2-776bacf907a6',
    label: 'Now or Never',
    subLabel: 'Comedy',
  },
  {
    value: 'fdc4ad3a-67a7-4eb6-bd27-06171162d0fb',
    label: 'Nun, The (La monja) ',
    subLabel: 'Horror | Thriller',
  },
  {
    value: 'f4f68689-ddfe-4e8d-90f9-1fa477442834',
    label: 'Nymphomaniac: Volume II',
    subLabel: 'Drama | Mystery',
  },
  {
    value: '8e0f22f5-d397-4ce7-8bd6-6885b98e6356',
    label: 'Objective, The',
    subLabel: 'Horror | Sci-Fi | Thriller | War',
  },
  {
    value: '0d3decb8-b1da-4ae6-bf13-379925329b59',
    label: 'Obsessed',
    subLabel: 'Crime | Drama | Thriller',
  },
  {
    value: 'b3ec3e2e-fda6-4dfd-aa83-6e02c2d7525c',
    label: 'Offside',
    subLabel: 'Comedy | Drama',
  },
  {
    value: 'ac2e681d-6887-4557-8c43-80070dc597f5',
    label: 'Olivier, Olivier',
    subLabel: 'Drama',
  },
  {
    value: 'd6aeb512-bd60-465d-bc8c-dbb06b6defaf',
    label: 'On the Road to Emmaus (Emmauksen tiellä)',
    subLabel: 'Comedy | Drama | Musical',
  },
  {
    value: '17bc8cd6-e2ae-4295-be2b-079149db73ab',
    label: 'Once in a Lifetime',
    subLabel: 'Comedy',
  },
  {
    value: 'e128a026-da80-4c7a-aaa1-c431c5924986',
    label: 'One Fine Spring Day (Bomnaleun ganda)',
    subLabel: 'Drama',
  },
  {
    value: 'd5f4b1d6-e51c-4740-854a-3da4baf27a08',
    label: 'One of Our Dinosaurs Is Missing',
    subLabel: 'Adventure | Comedy',
  },
  {
    value: '1e875859-4ac3-42d0-97b8-9249612bbca5',
    label: 'Only the Strong Survive - A Celebration of Soul',
    subLabel: 'Documentary | Musical',
  },
  {
    value: 'bd38d6f0-d3c7-421c-941d-5508b7611d13',
    label: 'Only Yesterday (Omohide poro poro)',
    subLabel: 'Animation | Drama',
  },
  {
    value: '2fb4ba69-e729-41f7-898b-16f1fc549018',
    label: 'Open Windows',
    subLabel: 'Crime | Thriller',
  },
  {
    value: '2f7fd32e-cc80-48ce-9f53-e4e3f934b46b',
    label: 'Oranges',
    subLabel: 'Drama',
  },
  {
    value: 'a314e0e8-79d1-4670-861e-3db8da250c33',
    label: 'Oranges, The',
    subLabel: 'Comedy | Drama | Romance',
  },
  {
    value: '24829e21-a4b1-41c7-9f30-ae3a3276fbc2',
    label: 'Order, The',
    subLabel: 'Action | Adventure | Drama | Thriller',
  },
  {
    value: '41953a87-e756-4d95-81b6-e146e994d3ee',
    label: 'Orwell Rolls in His Grave',
    subLabel: 'Documentary',
  },
  {
    value: 'd3c8ed87-d3a1-40f3-b7a9-39018b93ae78',
    label: 'Other Dream Team, The',
    subLabel: 'Documentary',
  },
  {
    value: 'f7c83cda-300c-4d91-97e0-e6450a9bd9bc',
    label: 'Outsiders (Ceddo)',
    subLabel: 'Drama',
  },
  {
    value: '452e28c0-72d7-46ca-84db-5c7fbcfd4505',
    label: 'Overcoat, The (Il cappotto)',
    subLabel: 'Comedy | Drama | Fantasy',
  },
  {
    value: '48152234-eef0-47bf-bee0-9aa05a5cd14d',
    label: 'Paheli',
    subLabel: 'Drama | Fantasy | Musical | Romance',
  },
  {
    value: '48d603d7-3f56-4ae5-959d-10f72080aa03',
    label: 'Painted Fire (Chihwaseon)',
    subLabel: 'Drama',
  },
  {
    value: '15a14601-afce-4f10-ab52-7e3b52daf460',
    label: 'Pallbearer, The',
    subLabel: 'Comedy',
  },
  {
    value: '209bedfd-f6e9-47ca-bdd0-2116c6f2ab8f',
    label: 'Parasites, Les',
    subLabel: 'Comedy',
  },
  {
    value: '40abcbc5-3408-4d30-a147-fe7ecb9f93d6',
    label: 'Paris',
    subLabel: 'Documentary',
  },
  {
    value: 'fb9831f3-a767-4f4c-91f3-c1878089df3d',
    label: 'Paris by Night',
    subLabel: 'Crime | Drama',
  },
  {
    value: '566eb5a3-daa5-404e-8218-3b0157f41fec',
    label: 'Particle Fever',
    subLabel: 'Documentary',
  },
  {
    value: '8a680f56-e666-4e9f-a57b-3f71827bc6e7',
    label: "Passion of Joan of Arc, The (Passion de Jeanne d'Arc, La)",
    subLabel: 'Drama',
  },
  {
    value: '29efec93-aefb-40e4-9de4-f300080225c3',
    label: "Patrice O'Neal: Elephant in the Room",
    subLabel: 'Comedy',
  },
  {
    value: '5b6667e8-1b21-4000-bc9f-63abe0eb8e38',
    label: 'Pax Americana and the Weaponization of Space',
    subLabel: 'Documentary',
  },
  {
    value: 'e33869c0-df38-4898-a40f-89e5717dae5b',
    label: 'Pearls of the Crown, The (Les perles de la couronne)',
    subLabel: 'Comedy',
  },
  {
    value: 'd2494d24-a224-48c2-9dcf-a80309ef4cd4',
    label: "Pee-wee's Big Adventure",
    subLabel: 'Adventure | Comedy',
  },
  {
    value: '06be9700-8f22-4606-bc8f-e458458b9625',
    label: 'Pelican Brief, The',
    subLabel: 'Crime | Drama | Mystery | Romance | Thriller',
  },
  {
    value: '47ee3f93-f967-4544-883c-1d7f6b78f2c2',
    label: 'Penalty, The',
    subLabel: 'Crime | Drama | Horror',
  },
  {
    value: '73a79bf1-efeb-4176-8f21-954a09916731',
    label: 'Perfect Candidate, A',
    subLabel: 'Documentary',
  },
  {
    value: '7b04f398-d8e0-4922-af22-d92d7ba84645',
    label: 'Pericles on 31st Street',
    subLabel: 'Comedy | Drama',
  },
  {
    value: 'bc5151bc-abae-4fe4-8bc6-4bf879516697',
    label: 'Phantasm II',
    subLabel: 'Action | Fantasy | Horror | Sci-Fi | Thriller',
  },
  {
    value: '361204fe-2d96-4698-a745-3f368c8c889d',
    label: 'Physician, The',
    subLabel: 'Adventure | Drama',
  },
  {
    value: '5baa0c5b-b921-4757-b716-46d04e28e92c',
    label: "Pig's Tale, A",
    subLabel: 'Adventure | Comedy | Drama | Romance',
  },
  {
    value: '1e030379-94c9-4427-be12-2c95387a446b',
    label: "Pirates of the Caribbean: Dead Man's Chest",
    subLabel: 'Action | Adventure | Fantasy',
  },
  {
    value: '1378e290-cf6a-4a0d-936d-a7020961696a',
    label: 'Pitfall (Otoshiana)',
    subLabel: 'Crime | Drama | Fantasy',
  },
  {
    value: '4d0f906e-1cf3-4513-871e-c10bd16bed80',
    label: 'Play the Game',
    subLabel: 'Comedy | Romance',
  },
  {
    value: '647dc30a-42e5-4a51-a525-09ecb51ddb33',
    label: "Player's Club, The",
    subLabel: 'Comedy | Drama',
  },
  {
    value: '24d3b0dd-6e7e-46fa-8d93-576563ea46fc',
    label: 'Point Break',
    subLabel: 'Action | Crime | Thriller',
  },
  {
    value: '8624db67-75ff-4be7-8bab-e5182263d454',
    label: 'Pompeii',
    subLabel: 'Action | Adventure | Drama',
  },
  {
    value: '75a39583-784d-45d2-bd1d-7bd9fb1aac37',
    label: "Porky's II: The Next Day",
    subLabel: 'Comedy',
  },
  {
    value: '2699738f-205d-4602-92ee-18b89f244451',
    label: 'Portrait of Wally',
    subLabel: 'Documentary',
  },
  {
    value: '122129a9-363a-44fe-b222-5d07516d77a7',
    label: "Possession of David O'Reilly, The ",
    subLabel: 'Horror',
  },
  {
    value: '4ebb2af7-0fda-4bb6-a93d-46d023bf6021',
    label: 'Powers of Ten',
    subLabel: 'Documentary',
  },
  {
    value: 'c330004b-4c75-46f5-b2a9-99957425e2b5',
    label: 'Premature Burial, The',
    subLabel: 'Horror',
  },
  {
    value: 'cc257254-2aaf-4ab7-a4cd-3fa0a4124f61',
    label: 'Price Check',
    subLabel: 'Comedy | Drama',
  },
  {
    value: 'd1b21e4b-04e5-4afb-ac4b-89ed18544366',
    label: 'Pride and Glory',
    subLabel: 'Crime | Drama',
  },
  {
    value: 'ad24669d-d306-4ae3-b582-fbe6da071fc7',
    label: 'Princess Bride, The',
    subLabel: 'Action | Adventure | Comedy | Fantasy | Romance',
  },
  {
    value: 'a1f7610b-6f41-4c8f-af0e-4cb59b0d0a8d',
    label: "Princess O'Rourke",
    subLabel: 'Comedy | Romance',
  },
  {
    value: 'a5e53290-6dad-4022-afef-4afab3376eeb',
    label: 'Private Confessions',
    subLabel: 'Drama',
  },
  {
    value: '5a42ca3b-6ed6-45aa-b1b8-215d7248fa0c',
    label: 'Prodigal Son, The (Bai ga jai)',
    subLabel: 'Action | Adventure | Drama',
  },
  {
    value: 'dcad3e29-42bc-4c29-9985-2348a7308557',
    label: 'Producers, The',
    subLabel: 'Comedy | Musical',
  },
  {
    value: '09beed29-529f-4575-af74-0205552ec28f',
    label: 'Progression',
    subLabel: 'Adventure | Documentary',
  },
  {
    value: '979d3494-5dd7-4017-8dcd-ea3023b802a6',
    label: 'Proof',
    subLabel: 'Comedy | Drama | Romance',
  },
  {
    value: '30b51b1c-6240-4eef-a3fb-1a528ab7bdd1',
    label: 'Provocateur (Prowokator)',
    subLabel: 'Drama',
  },
  {
    value: 'b4d602b4-e597-4c43-9bc3-57d08fd49a52',
    label: 'Pruitt-Igoe Myth, The',
    subLabel: 'Documentary | Drama',
  },
  {
    value: '7c3d0345-b752-47ed-a902-c934dea7702c',
    label: 'PT 109',
    subLabel: 'Drama | War',
  },
  {
    value: '0ee4a330-a719-4339-b6bf-702047432d46',
    label: 'Pulling John',
    subLabel: 'Documentary',
  },
  {
    value: '564d5eb8-df28-4a93-8305-749257eb711c',
    label: 'Punk Syndrome, The (Kovasikajuttu)',
    subLabel: 'Documentary',
  },
  {
    value: '063c1467-7d99-46f8-a12a-30940177d82f',
    label: 'Q',
    subLabel: 'Drama',
  },
  {
    value: '8c6f68b9-34ad-4c48-8ba4-be42d9224615',
    label: 'Quand je serai petit',
    subLabel: 'Drama',
  },
  {
    value: '69e1fe05-716d-4269-995f-6ca28ddab23b',
    label: 'Rage (Rabia)',
    subLabel: 'Romance | Thriller',
  },
  {
    value: '8c8c3bfb-763e-4c71-8a17-b6804863cbca',
    label: 'Raise Your Voice',
    subLabel: 'Romance',
  },
  {
    value: 'f05614d2-f98f-403a-b966-abebb936552e',
    label: 'Rasen',
    subLabel: 'Drama | Fantasy | Horror | Mystery | Thriller',
  },
  {
    value: '4561dbad-096d-4d10-b511-421e586af692',
    label: 'Raspberry Boat Refugee',
    subLabel: 'Comedy',
  },
  {
    value: '0e431a39-ee68-478a-a34a-74a7f7030731',
    label: 'Rated X: A Journey Through Porn',
    subLabel: 'Documentary',
  },
  {
    value: 'c580f8fd-6fe6-4dd8-9f87-b4ac6868a96b',
    label: 'Raven, The',
    subLabel: 'Mystery | Thriller',
  },
  {
    value: 'a6f9c749-7eec-4bee-9f68-cc628ef9ed78',
    label: 'Ray Harryhausen: Special Effects Titan',
    subLabel: 'Documentary',
  },
  {
    value: '0e23143a-deab-4979-abdf-38863a819cf9',
    label: 'Ray Harryhausen: Special Effects Titan',
    subLabel: 'Documentary',
  },
  {
    value: 'f05dc03c-2fdb-40dc-937b-5e5099b50336',
    label: 'Razortooth',
    subLabel: 'Action | Horror | Sci-Fi | Thriller',
  },
  {
    value: 'd1949dbd-8b2c-4e78-b5c2-093db88502f8',
    label: 'Reagan',
    subLabel: 'Documentary',
  },
  {
    value: 'eb167479-4893-4ad1-aa33-445caa8b1784',
    label: 'Real McCoy, The',
    subLabel: 'Action | Crime | Drama | Thriller',
  },
  {
    value: '93e2ed88-c079-4f99-91eb-048a2f6f93f5',
    label: 'Reality',
    subLabel: 'Comedy | Drama',
  },
  {
    value: 'fb3f45ac-19d3-4051-87f6-0f12ca40e8e6',
    label: 'Rebirth of Mothra III',
    subLabel: 'Action | Fantasy | Sci-Fi',
  },
  {
    value: '29f8e631-53a4-495f-aa30-885f719d4132',
    label: 'Reclaim Your Brain (Free Rainer)',
    subLabel: 'Comedy | Crime | Drama | Romance',
  },
  {
    value: 'c2402024-38d4-4f25-9530-dcf93d211d73',
    label: 'Red Army',
    subLabel: 'Documentary',
  },
  {
    value: '243e6eee-1fd4-4711-bd37-2d636edde3c3',
    label: 'Red Beret, The',
    subLabel: 'Drama | War',
  },
  {
    value: 'def9a7d0-09fd-4125-88de-73b35a618097',
    label: 'Red Canyon',
    subLabel: 'Action | Horror | Thriller',
  },
  {
    value: '9a5651b8-6976-4d09-9467-1459e3b5c2d7',
    label: 'Red Chapel, The (Røde kapel, Det)',
    subLabel: 'Comedy | Documentary',
  },
  {
    value: '351c6a06-b342-4fdb-836a-0642be271428',
    label: 'Red Desert (Deserto rosso, Il)',
    subLabel: 'Drama',
  },
  {
    value: '9bb528ef-e9c9-476c-8e66-4e42d2d3affe',
    label: 'Red Eye',
    subLabel: 'Horror | Thriller',
  },
  {
    value: '48f5828d-6fb5-4da4-99ab-592d837da978',
    label: 'Red Riding Hood',
    subLabel: 'Fantasy | Horror | Mystery | Thriller',
  },
  {
    value: 'a84394a6-97d8-43c7-ba1c-880ac10f7d92',
    label: 'Reggie Watts: Why Shit So Crazy?',
    subLabel: 'Comedy',
  },
  {
    value: '8f48e3bb-006c-4ed0-be9e-6c97a6d0eeea',
    label: 'Regret to Inform',
    subLabel: 'Documentary',
  },
  {
    value: 'c9750dbf-721e-4b24-a99f-a6cde3772044',
    label: 'Reivers, The',
    subLabel: 'Comedy | Drama',
  },
  {
    value: 'ddaa8aaf-7c0e-4d4b-95a2-09771ecc1c73',
    label: 'Reivers, The',
    subLabel: 'Comedy | Drama',
  },
  {
    value: 'e3de7bb7-d16a-4323-849f-26e0784f276e',
    label: 'Remember Sunday',
    subLabel: 'Drama | Romance',
  },
  {
    value: '725eae1c-c2c7-4e2c-a2c1-59f3ac3dd283',
    label: 'Rent: Filmed Live on Broadway',
    subLabel: 'Drama | Musical',
  },
  {
    value: '1b2bb3d9-6160-4cd0-a84d-e81285c8bbb9',
    label: 'Repast (Meshi)',
    subLabel: 'Drama',
  },
  {
    value: '60e930b0-b69f-44c7-928e-4b51a2218783',
    label: 'Resident Evil',
    subLabel: 'Action | Horror | Sci-Fi | Thriller',
  },
  {
    value: '868fe3f8-6f54-4ac7-a552-604f53fc9a67',
    label: 'Resident Evil: Afterlife',
    subLabel: 'Action | Horror | Sci-Fi | Thriller | IMAX',
  },
  {
    value: '90d75e0a-763d-4ed7-adf3-0110a9ea29e8',
    label: 'Return Of The Ghostbusters',
    subLabel: 'Comedy',
  },
  {
    value: '873a8701-b07d-4229-9576-64e11055227f',
    label: 'Return to Sender',
    subLabel: 'Drama | Thriller',
  },
  {
    value: '2ca9be1d-ee73-4060-9b6e-236b55ba9ffd',
    label: 'Return to the Blue Lagoon',
    subLabel: 'Adventure | Romance',
  },
  {
    value: '348c8914-5c0d-4ece-9027-64824921bfa5',
    label: 'Revolution #9',
    subLabel: 'Thriller',
  },
  {
    value: 'a10965ce-9ee6-4118-a78c-4a04f575453f',
    label: 'Rick',
    subLabel: 'Comedy | Drama',
  },
  {
    value: '472bab62-1e1c-4ea7-ae45-4e956e9943c4',
    label: "Ring Finger, The (L'annulaire)",
    subLabel: 'Drama',
  },
  {
    value: '2fc0e2df-d045-424d-a53b-d1848005e654',
    label: 'Ringers: Lord of the Fans',
    subLabel: 'Comedy | Documentary',
  },
  {
    value: 'd5705d4b-c18d-4714-b77b-38487bada1e3',
    label: 'Rio 2',
    subLabel: 'Adventure | Animation | Children | Comedy',
  },
  {
    value: '844f26eb-e87c-45da-8095-92f8417cbc1e',
    label: 'Riot on Sunset Strip',
    subLabel: 'Drama',
  },
  {
    value: '9607e286-cdba-4860-a24a-aa2fdce2318e',
    label: 'Rise of Catherine the Great, The',
    subLabel: 'Drama',
  },
  {
    value: 'fa171584-b8c8-488b-8c77-c94a34a2af3d',
    label: 'Rising Sun',
    subLabel: 'Action | Drama | Mystery',
  },
  {
    value: '9041bf51-7188-4369-b882-45604a90644f',
    label: 'River of No Return',
    subLabel: 'Adventure | Western',
  },
  {
    value: 'ff8b97f0-80d2-4c9d-9e9d-13eebcfa05d3',
    label: 'Riverworld',
    subLabel: 'Drama | Sci-Fi',
  },
  {
    value: 'b6a432c3-031c-4d33-8575-15fca46de2d0',
    label: 'RoboCop 2',
    subLabel: 'Action | Crime | Sci-Fi | Thriller',
  },
  {
    value: 'b48c0b7b-bd16-4845-8cc6-847da5fc84cf',
    label: 'Rollo and the Woods Sprite (Rölli ja metsänhenki)',
    subLabel: 'Children | Fantasy',
  },
  {
    value: 'ec4b7236-ce5d-4f21-a5b9-7595b02a66e5',
    label: 'Romance & Cigarettes',
    subLabel: 'Comedy | Drama | Musical | Romance',
  },
  {
    value: '67258fdb-8a3f-43d8-bc14-387d4224fe58',
    label: 'Room for Romeo Brass, A',
    subLabel: 'Comedy | Drama',
  },
  {
    value: 'e0915d65-b963-4bd3-bf8b-8303724b3232',
    label: 'Rose Seller, The (La vendedora de rosas)',
    subLabel: 'Drama',
  },
  {
    value: '5c04b444-164d-4551-b849-a1c3e5f6d3c3',
    label: 'Rose, The',
    subLabel: 'Drama',
  },
  {
    value: '6b54371a-ddcd-4fd2-8ae0-b184dc586fbc',
    label: 'Rose, The',
    subLabel: 'Drama',
  },
  {
    value: 'a6bab858-6385-4769-9379-3fba91b319af',
    label: 'Ruins, The',
    subLabel: 'Horror | Thriller',
  },
  {
    value: 'af615569-d2e7-498c-8f35-886140c1db40',
    label: 'Rules of Single Life (Sinkkuelämän säännöt)',
    subLabel: 'Documentary',
  },
  {
    value: '06646fc8-80c7-419a-98de-e0ff0f204f54',
    label: 'Run Sister Run!',
    subLabel: 'Drama',
  },
  {
    value: '3a81a831-c8e0-410d-92cb-1d34e6f6ba2c',
    label: 'Russians Are Coming, the Russians Are Coming, The',
    subLabel: 'Comedy | War',
  },
  {
    value: '39926b08-cfda-4784-9043-2cf2d800e7dd',
    label: "Rust and Bone (De rouille et d'os)",
    subLabel: 'Drama | Romance',
  },
  {
    value: '46683e07-91f9-466c-89da-2ab35733c7b2',
    label: 'Safe in Hell',
    subLabel: 'Drama',
  },
  {
    value: '92b76774-61df-4fe4-80b0-71c9e07ad95f',
    label: "Sam Peckinpah's West: Legacy of a Hollywood Renegade",
    subLabel: 'Documentary',
  },
  {
    value: 'ba60d1f3-40e9-4a8c-a35a-b649337dafca',
    label: 'Samaritan Girl (Samaria)',
    subLabel: 'Drama',
  },
  {
    value: '1ba20d15-b822-43ac-89c2-69e78359bc8f',
    label: 'Samson and Delilah',
    subLabel: 'Adventure | Drama',
  },
  {
    value: 'a446b3e2-0f57-4ec7-8bf5-bcba44614669',
    label: 'Samurai Spy (Ibun Sarutobi Sasuke)',
    subLabel: 'Action | Drama',
  },
  {
    value: 'e9439ccf-4e10-423b-b1be-18474fecff86',
    label: 'Samurai Vendetta',
    subLabel: 'Action | Drama',
  },
  {
    value: 'e6097ab7-eb1c-4bff-9ee5-e4592edbf874',
    label: 'Samurai Vendetta',
    subLabel: 'Action | Drama',
  },
  {
    value: 'c7a097ed-94de-4e7d-be04-09e006c5d3a7',
    label: 'Santa Claus: The Movie',
    subLabel: 'Adventure | Children | Fantasy',
  },
  {
    value: '948052d7-aab0-46fc-9815-5f776fb6f316',
    label: 'Santa Clause, The',
    subLabel: 'Comedy | Drama | Fantasy',
  },
  {
    value: '026e5344-14df-49c6-9ee8-b73818ea960a',
    label: 'Satin Rouge',
    subLabel: 'Drama | Musical',
  },
  {
    value: 'cbfe4b12-368c-46ab-b2a0-f1a454f2ccfe',
    label: 'Scalphunters, The',
    subLabel: 'Comedy | Western',
  },
  {
    value: '1e9de542-7a0c-433e-a5a3-b38d7726b93a',
    label: 'Scarlet Letter, The',
    subLabel: 'Drama',
  },
  {
    value: '19ece708-3572-4e17-a6eb-ae3862a75f4e',
    label: 'Scarlet Pimpernel, The',
    subLabel: 'Adventure | Comedy',
  },
  {
    value: 'd2b79e60-99e2-4019-ac0f-2886c0d45a02',
    label: 'School For Scoundrels',
    subLabel: 'Comedy',
  },
  {
    value: 'f7d151d0-51e0-40e5-aeda-b4786a9da67e',
    label: 'Scorcher',
    subLabel: 'Action | Sci-Fi',
  },
  {
    value: 'e0b91cbd-17e8-4004-8c5a-57a3c76d75c3',
    label: 'Scout, The',
    subLabel: 'Comedy | Drama',
  },
  {
    value: 'afcf0993-4533-42bd-b80f-14a0a3e2c516',
    label: 'Seabiscuit',
    subLabel: 'Drama',
  },
  {
    value: '4182d312-c949-442e-b6b0-6b8eb925e6c0',
    label: 'Searching for Debra Winger',
    subLabel: 'Documentary',
  },
  {
    value: 'fdbe68cb-36ed-4b4c-879f-05c29ca0e519',
    label: 'Season of the Witch',
    subLabel: 'Adventure | Drama | Fantasy',
  },
  {
    value: 'b328acc8-0bce-43e7-8090-ae069855e20f',
    label: 'Second Skin (Segunda Piel)',
    subLabel: 'Drama | Romance',
  },
  {
    value: '496094e0-bc0e-4061-b545-032ffaff9f4a',
    label: 'Secret Ballot (Raye makhfi)',
    subLabel: 'Comedy',
  },
  {
    value: 'ff142bf5-7a6b-46b4-b4b6-b461c2fe00b7',
    label: 'Secret, A (Un secret)',
    subLabel: 'Drama | War',
  },
  {
    value: '08263a74-ff9b-41ea-9aef-f28e80902475',
    label: 'Secrets of a Soul (Geheimnisse einer Seele)',
    subLabel: 'Drama',
  },
  {
    value: '80cf17a9-9214-4637-be32-fbcbda783036',
    label: 'Semper Fi',
    subLabel: 'Action | Drama',
  },
  {
    value: '9a8243d1-e708-4207-9265-9ee524be15e2',
    label: 'Séraphine',
    subLabel: 'Drama | War',
  },
  {
    value: '6c46683b-bed2-45b1-8aef-7f403df7ba64',
    label: 'Seven Ways from Sundown',
    subLabel: 'Action | Adventure | Western',
  },
  {
    value: 'd799d625-3ea0-40a7-83e2-f96b8c592189',
    label: 'Shadrach',
    subLabel: 'Drama',
  },
  {
    value: '48a16a6c-b1f1-46f9-a373-b174be6571f3',
    label: 'Shamrock Handicap, The',
    subLabel: 'Drama | Romance',
  },
  {
    value: '38f556c4-b9e2-496e-9565-ed150bb94af0',
    label: 'Shanghaied',
    subLabel: 'Comedy',
  },
  {
    value: '0fc1a268-d052-43fc-9272-d88ac6bc0f9e',
    label: 'Shark Alarm at Müggelsee (Hai Alarm am Müggelsee)',
    subLabel: 'Comedy',
  },
  {
    value: '42d9061d-33fd-48bf-b7b7-205e2aeb621e',
    label: 'Shepherd',
    subLabel: 'Sci-Fi',
  },
  {
    value: 'e8e8cdfa-2538-4094-9c06-570a5ac163ec',
    label: 'Sherlock Holmes',
    subLabel: 'Action | Crime | Mystery | Thriller',
  },
  {
    value: '8ddce1ce-1ac3-4ca0-94e4-d22ae8dca751',
    label: 'Sherlock Holmes Faces Death',
    subLabel: 'Crime | Mystery',
  },
  {
    value: '3d54ad89-54d9-4f6b-aefa-89ff454bfdb7',
    label: 'Shivers (They Came from Within)',
    subLabel: 'Drama | Horror | Sci-Fi',
  },
  {
    value: '6bc568f0-f026-4f43-8979-e34254459106',
    label: 'Sholay',
    subLabel: 'Action | Adventure | Comedy | Musical | Romance | Thriller',
  },
  {
    value: 'fa8314fe-a735-490b-a25d-784600e2f1ed',
    label: 'Shooting Gallery',
    subLabel: 'Crime | Drama | Thriller',
  },
  {
    value: 'fac01ed8-610c-49aa-a11b-88440d9a3693',
    label: 'Show Boat',
    subLabel: 'Comedy | Drama | Musical | Romance',
  },
  {
    value: '5b1a0ba6-6ed7-4b62-bdd4-23e050ffffd8',
    label: 'Shrek the Halls',
    subLabel: 'Adventure | Animation | Comedy | Fantasy',
  },
  {
    value: '5d2b3194-02d7-4044-b25a-48250a2e760f',
    label: 'Shuttle',
    subLabel: 'Crime | Drama | Horror | Thriller',
  },
  {
    value: 'f48b5a74-44cd-4666-825d-4ca3b458ab9d',
    label: 'Sign of the Cross, The',
    subLabel: 'Drama',
  },
  {
    value: 'ebc4892f-e7c2-482c-a571-943e708f4b12',
    label: 'Signal, The (Señal, La)',
    subLabel: 'Drama | Film-Noir | Mystery | Romance',
  },
  {
    value: 'a4446f38-4a1d-4008-b99b-236d8be3a0c2',
    label: 'Silent Night, Deadly Night 5: The Toy Maker',
    subLabel: 'Horror | Sci-Fi',
  },
  {
    value: '47c3a588-7c3b-43f6-be22-e551e20ab119',
    label: 'Silmido',
    subLabel: 'Action | Drama | War',
  },
  {
    value: '179fc594-e3a1-415a-a2de-3c4234972e8c',
    label: 'Silver Chalice, The',
    subLabel: 'Drama | Romance',
  },
  {
    value: 'e1fb75fa-7a85-4caf-b88b-dea517945607',
    label: 'Six Shooter',
    subLabel: 'Comedy | Drama',
  },
  {
    value: '7a72cbf3-bc4a-4c7d-ab79-770f73354627',
    label: 'Skeleton Key, The',
    subLabel: 'Drama | Horror | Mystery | Thriller',
  },
  {
    value: 'd2b1e30a-e4ca-43f0-8a5d-9c8efdcf0db3',
    label: 'Ski Patrol',
    subLabel: 'Action | War',
  },
  {
    value: 'b7a41c64-32ea-40fb-8db1-933fb25f7229',
    label: 'Slave Ship',
    subLabel: 'Adventure | Drama',
  },
  {
    value: '65a6ff27-e504-435a-8afc-4ad2141d610e',
    label: 'Sleepless Night (Nuit blanche)',
    subLabel: 'Action | Crime | Thriller',
  },
  {
    value: 'eaf4e462-cbf1-4e47-adb6-c55d0dbc364d',
    label: 'Sleepwalk with Me',
    subLabel: 'Comedy | Drama',
  },
  {
    value: 'de34ce57-fc9f-4120-9ba4-07e7a3d67a94',
    label: 'Sling Blade',
    subLabel: 'Drama',
  },
  {
    value: '08883430-e180-430b-b59f-0c765252845b',
    label: 'Snowballs',
    subLabel: '(no genres listed)',
  },
  {
    value: 'f32d370d-01e4-41cc-970c-fa81caaf18d2',
    label: 'Solarbabies',
    subLabel: 'Action | Drama | Sci-Fi',
  },
  {
    value: '6b322bd2-6c99-40f1-8dcb-d7113251e22a',
    label: 'Soldier of Orange (a.k.a. Survival Run) (Soldaat van Oranje)',
    subLabel: 'Drama | Thriller | War',
  },
  {
    value: 'e854ab43-a330-4336-9981-c77e5ad0ea6e',
    label: 'Soldier, The',
    subLabel: 'Action',
  },
  {
    value: 'e4fc4056-8baa-4a67-89fd-760525b08a2e',
    label: 'Solo ',
    subLabel: 'Mystery | Thriller',
  },
  {
    value: '387e4127-f699-4e00-a07e-673cc5021235',
    label: "Solomon Northup's Odyssey",
    subLabel: '(no genres listed)',
  },
  {
    value: '1671af5a-bc20-467e-b0d8-828208ffffbb',
    label: 'Someone to Watch Over Me',
    subLabel: 'Action | Crime | Thriller',
  },
  {
    value: '11b45455-536f-40c5-a60c-099766c31062',
    label: 'Something Ventured',
    subLabel: 'Documentary',
  },
  {
    value: '942a87ef-5956-4a63-9b31-34013193b4fd',
    label: 'Son of a Gun',
    subLabel: 'Action | Crime | Drama',
  },
  {
    value: '9c475216-3d24-429a-88c6-a985fb3eb8e1',
    label: 'Soul Food',
    subLabel: 'Drama',
  },
  {
    value: '490ce22c-aab8-44f5-8fc8-ae2010bb4140',
    label: 'Soul Men',
    subLabel: 'Comedy | Musical',
  },
  {
    value: '5db48700-4245-49c2-98fb-cf469137c505',
    label: 'Space Is The Place',
    subLabel: 'Sci-Fi',
  },
  {
    value: 'a5b24ef6-86b5-4eef-9cff-bb0be547c4d4',
    label: 'Speed Of Thought, The',
    subLabel: 'Sci-Fi | Thriller',
  },
  {
    value: 'c4b1664c-66b4-4592-bedf-55259d56a7a7',
    label: 'Speed Racer',
    subLabel: 'Action | Children | Sci-Fi | IMAX',
  },
  {
    value: '30b9aa69-9f2e-4f52-b369-28f7bd150c01',
    label: 'Spider Forest (Geomi sup)',
    subLabel: 'Drama | Horror | Mystery | Thriller',
  },
  {
    value: '0628c8e9-0944-4af9-83e0-2509e2a3a485',
    label: 'Spring Break Shark Attack',
    subLabel: 'Adventure | Drama | Horror',
  },
  {
    value: '72a6e3db-e0eb-408a-bff6-078345242f62',
    label: "St. Elmo's Fire",
    subLabel: 'Drama | Romance',
  },
  {
    value: '4cea935c-04d3-4dcc-8d76-fb383d4c1a38',
    label: 'Stacy',
    subLabel: 'Comedy | Horror',
  },
  {
    value: '43c23c18-a847-427e-b420-936a118721a1',
    label: 'Stand by Me',
    subLabel: 'Adventure | Drama',
  },
  {
    value: 'a2902e71-9894-4a3d-8598-04c3043554d7',
    label: 'Stand by Me Doraemon',
    subLabel: 'Animation | Children | Drama | Fantasy',
  },
  {
    value: '934c4d29-1807-496f-ab45-1fbd1d5be5cf',
    label: 'Standard Operating Procedure',
    subLabel: 'Crime | Documentary | War',
  },
  {
    value: '7d859ddf-9953-4fc7-9ea2-25222ba2bc69',
    label: 'Standing Still',
    subLabel: 'Comedy | Drama | Romance',
  },
  {
    value: '7e5b8eb0-fc5c-4d24-a8ee-e1733354124e',
    label: 'Star Wars: Episode III - Revenge of the Sith',
    subLabel: 'Action | Adventure | Sci-Fi',
  },
  {
    value: '9411cf88-b7a5-4a67-a846-cfa039ea9cc5',
    label: 'Stars',
    subLabel: 'Drama | War',
  },
  {
    value: 'aad2c2ad-b70d-4da5-bcf9-621c25f2606e',
    label: 'Startup.com',
    subLabel: 'Documentary',
  },
  {
    value: 'dc5450b0-1ae9-435c-a293-1c18a7b54df5',
    label: 'Story of Ruth, The',
    subLabel: 'Drama',
  },
  {
    value: '4e21236a-a5b7-440d-a364-c38f61c76902',
    label: 'Stranger, The',
    subLabel: 'Drama | Film-Noir | Thriller',
  },
  {
    value: 'ac8f79f2-d623-4a15-87f0-92cdd66bcc13',
    label: 'Strike Up the Band',
    subLabel: 'Comedy | Musical | Romance',
  },
  {
    value: '8fa5ee94-c872-4d6f-aa90-eae0fffa5456',
    label: 'Stuart Little 2',
    subLabel: 'Children | Comedy',
  },
  {
    value: 'eff00e2c-9785-48af-8478-b47e5eebf73b',
    label: 'Submarine',
    subLabel: 'Comedy | Drama | Romance',
  },
  {
    value: '3b60c5fb-bffc-41fc-baaa-e5bf76c0b7ca',
    label: 'Subspecies',
    subLabel: 'Horror',
  },
  {
    value: 'ef9b1691-3930-4fdd-8920-c37e07a5c526',
    label:
      'Sudden Wealth of the Poor People of Kombach, The (Der plötzliche Reichtum der armen Leute von Kombach)',
    subLabel: 'Drama',
  },
  {
    value: '60c7e944-4cd2-429e-b687-6049037f7589',
    label: 'Sugar Curtain, The (El telón de azúcar)',
    subLabel: 'Documentary',
  },
  {
    value: 'e3b2326b-59d0-4bd9-8ff5-063e44b7dc7e',
    label: 'Superman IV: The Quest for Peace',
    subLabel: 'Action | Adventure | Sci-Fi',
  },
  {
    value: 'f4557d78-bfe8-4991-b5eb-f1831be68f79',
    label: 'Surviving Christmas',
    subLabel: 'Comedy',
  },
  {
    value: 'ce646f2e-7929-44fe-a119-6b00c97df1bb',
    label: 'Survivors, The',
    subLabel: 'Comedy',
  },
  {
    value: 'afd7f829-8763-4c2e-8391-f0e7ad65cb13',
    label: 'Swindle, The (Rien ne va plus)',
    subLabel: 'Comedy | Crime | Thriller',
  },
  {
    value: 'dc348967-3a58-470a-91d6-6fbcad989172',
    label: 'Swing',
    subLabel: 'Comedy | Drama | Musical',
  },
  {
    value: '967faec4-2042-4779-9bd3-c4649317110d',
    label: 'Swiss Family Robinson',
    subLabel: 'Adventure | Children',
  },
  {
    value: '82c39191-8327-4d75-9545-08927dab75f1',
    label: 'Swordfish',
    subLabel: 'Action | Crime | Drama',
  },
  {
    value: 'c601241f-b24d-45f7-8e1e-67c0da1d58fa',
    label: 'Table 7',
    subLabel: 'Comedy | Drama',
  },
  {
    value: 'b9932f4a-ecfa-46f3-aee6-473a1d915147',
    label: 'Take Me Home',
    subLabel: 'Comedy | Romance',
  },
  {
    value: '3b1119c1-de47-4e52-babc-b2adc2bf4919',
    label: 'Take Shelter',
    subLabel: 'Drama',
  },
  {
    value: '12d381f6-b50e-4810-8172-5217a00f8f76',
    label: 'Take the Lead',
    subLabel: 'Drama',
  },
  {
    value: '19727729-af9b-4353-9ddb-4d65b2d02e7c',
    label: 'Taking Chance',
    subLabel: 'Drama | War',
  },
  {
    value: 'f5ece6cc-5c95-46be-928c-7b97a7694bed',
    label: 'Tali-Ihantala 1944',
    subLabel: 'Action | Drama | War',
  },
  {
    value: '2180fbf7-d5c9-4c32-9913-36e692e10a0e',
    label: 'Tapped',
    subLabel: 'Documentary',
  },
  {
    value: 'aac664f5-65fa-423f-8b85-e1901cc95f0d',
    label: 'Tea with Mussolini',
    subLabel: 'Comedy | Drama | War',
  },
  {
    value: '9d13bcf0-f881-41ed-a16b-367010086d13',
    label: 'Teen Spirit',
    subLabel: 'Comedy',
  },
  {
    value: 'b3f62c2e-704b-43d9-81ad-b0115c192c78',
    label: 'Ten Minutes Older',
    subLabel: '(no genres listed)',
  },
  {
    value: '5526f705-7c2a-4dba-9faa-d58f0bbfc9c9',
    label: 'Tender Is the Night',
    subLabel: 'Drama',
  },
  {
    value: '909d5079-5def-49ea-8c6d-d6688b6c0cbb',
    label: 'Terror Train',
    subLabel: 'Horror',
  },
  {
    value: '9aae7c62-20bb-43a4-9f6f-b402ceff79d5',
    label: 'Thank Your Lucky Stars',
    subLabel: 'Comedy | Musical',
  },
  {
    value: '7d18d5ad-1d1d-42a4-9940-765869079ffd',
    label: 'That Sinking Feeling',
    subLabel: 'Comedy',
  },
  {
    value: 'f224aa54-ba9a-4723-8960-42e7e2fb6c50',
    label: 'That Touch of Mink',
    subLabel: 'Comedy | Romance',
  },
  {
    value: 'dfa24ffa-74f0-4661-bf27-8ecb8ff34cc0',
    label: 'The Adventure of Faustus Bidgood',
    subLabel: 'Comedy',
  },
  {
    value: 'ce2029b6-b123-4a2e-bd78-7c3d3075fca4',
    label: 'The Adventures of Tom Thumb & Thumbelina',
    subLabel: 'Animation',
  },
  {
    value: '3ea75a65-764f-4693-8737-076ba2b9ddfc',
    label: 'The Army',
    subLabel: 'Drama',
  },
  {
    value: '85795f68-146e-4440-8d77-42913e10621b',
    label: 'The Chaos Class Failed the Class',
    subLabel: 'Comedy',
  },
  {
    value: 'b7eb438c-f0eb-4f3d-8ae5-7381b3714a7b',
    label: 'The Elephant Man',
    subLabel: 'Drama',
  },
  {
    value: 'ca250ded-836d-4b46-8577-fda5bac14d67',
    label: 'The Gamma People',
    subLabel: 'Horror | Sci-Fi',
  },
  {
    value: '5100b905-84ba-4f8b-b617-22718b55234c',
    label: "The Ghost Story of Oiwa's Spirit",
    subLabel: 'Horror',
  },
  {
    value: '908c6196-874b-495b-9a4f-a2c09cacf554',
    label: 'The Heart of the World',
    subLabel: 'Drama | Fantasy',
  },
  {
    value: 'a466025a-60e9-4360-bebf-e99511be8215',
    label: 'The Iron Commissioner',
    subLabel: '(no genres listed)',
  },
  {
    value: '95fdf89a-2d16-4e7e-8dd9-295b5e2d57bb',
    label: 'The Kiss of Her Flesh',
    subLabel: 'Horror | Thriller',
  },
  {
    value: '99f797b2-c527-4f12-a73d-bb0555f570ec',
    label: 'The Loyal 47 Ronin',
    subLabel: 'Drama',
  },
  {
    value: '23787969-b433-491d-a4ca-1f1e6404262a',
    label: 'The Pool Boys',
    subLabel: 'Comedy',
  },
  {
    value: '847077e6-d00d-4b10-b34c-362971c7d2ec',
    label: 'The Princess Comes Across',
    subLabel: 'Comedy | Mystery | Romance | Thriller',
  },
  {
    value: 'c73b219e-c931-4be9-ac4a-b0cbdb6b4dfd',
    label: 'The Ravalue: Redemption',
    subLabel: 'Action | Crime',
  },
  {
    value: '181a81e2-8e6d-4696-b5ff-c9da88588798',
    label: 'The Son of the Sheik',
    subLabel: 'Action | Comedy',
  },
  {
    value: 'de2821c2-3b2a-4f5f-93ae-f2feab5bd4d0',
    label: 'Thérèse: The Story of Saint Thérèse of Lisieux',
    subLabel: 'Drama',
  },
  {
    value: '458f1fd7-0dd4-403d-ae05-24a424fa18b2',
    label: "They Shoot Horses, Don't They?",
    subLabel: 'Drama',
  },
  {
    value: '4304e37e-d650-4c62-bb92-0c3ad4f601f9',
    label: 'Thief and the Cobbler, The (a.k.a. Arabian Knight)',
    subLabel: 'Adventure | Animation | Comedy | Fantasy',
  },
  {
    value: 'a0395cb3-8d67-471d-925f-22be4ff936ed',
    label: 'Thieves (Voleurs, Les)',
    subLabel: 'Crime | Drama | Romance',
  },
  {
    value: '8c4fe644-a0b3-4074-8931-daf59df1ae88',
    label: 'Thirty-Two Short Films About Glenn Gould',
    subLabel: 'Drama | Musical',
  },
  {
    value: 'd5cca615-05c8-4545-bd9a-2cfbc2a0eb77',
    label: 'This Special Friendship (Les amitiés particulières)',
    subLabel: 'Drama',
  },
  {
    value: '13018d4e-4ec4-4856-ab5d-58d426d73c12',
    label: 'Thomas and the Magic Railroad',
    subLabel: 'Children',
  },
  {
    value: '0821e250-70a6-45a4-b027-5393d84de4ac',
    label: 'Three Little Words',
    subLabel: 'Comedy | Musical | Romance',
  },
  {
    value: '19afd696-1739-4a7b-8555-cea860663bde',
    label: "Three O'Clock High",
    subLabel: 'Comedy',
  },
  {
    value: '02a30a81-5ae4-4d3a-81ac-0faa4a6718d7',
    label: 'Three Quarter Moon',
    subLabel: 'Comedy | Drama',
  },
  {
    value: '98d41f3c-99b6-482e-be7f-e2c3dac5fba8',
    label: 'Thunderpants',
    subLabel: 'Children | Comedy | Sci-Fi',
  },
  {
    value: '42046118-4604-4297-b220-0598c44d5102',
    label: 'Time Machine, The',
    subLabel: 'Action | Adventure | Sci-Fi',
  },
  {
    value: 'f07296eb-aaa1-4122-9669-b7965fffddbb',
    label: 'Tipping the Velvet',
    subLabel: 'Comedy | Drama | Romance',
  },
  {
    value: '7580dc45-15d8-465d-b448-79e25bef30b6',
    label: 'To Sleep with Anger',
    subLabel: 'Drama',
  },
  {
    value: '409782ef-b3a4-44e2-a66e-8ea4f726b17a',
    label: 'Together Again',
    subLabel: 'Comedy',
  },
  {
    value: '8e7f66cd-648a-45aa-a5a1-7649458b938a',
    label: 'Tokyo Sonata',
    subLabel: 'Drama',
  },
  {
    value: 'c7f59f8c-2bad-475d-8e05-b2a1339a0490',
    label: 'Tomorrow, When the War Began',
    subLabel: 'Action | Adventure | Drama',
  },
  {
    value: '7e5deb1e-226b-4ae4-85a4-99a50d853521',
    label: 'Tortilla Flat',
    subLabel: 'Comedy | Drama | Romance',
  },
  {
    value: '5fde2319-08c0-49d6-96ec-267208b4fa3c',
    label: 'Train of Shadows (Tren de sombras)',
    subLabel: 'Drama',
  },
  {
    value: '538a85e1-16b2-486b-9a8c-4be0a752c8cf',
    label: 'Trash Humpers',
    subLabel: 'Drama',
  },
  {
    value: '3ecf99e3-431b-4241-a5ff-ccbc9e630b6e',
    label: 'Treasure of the Yankee Zephyr (Race for the Yankee Zephyr)',
    subLabel: 'Action | Adventure | Drama',
  },
  {
    value: '466cdf1c-49f5-45a7-8b66-9efd1c4b4589',
    label: 'Trekkies 2',
    subLabel: 'Documentary | Sci-Fi',
  },
  {
    value: '3a113794-6cd1-4a49-8822-0bbf8123bbb1',
    label: 'Tremors',
    subLabel: 'Comedy | Horror | Sci-Fi',
  },
  {
    value: 'e84df4c3-b969-4f69-a23a-239a2bf6fe05',
    label: 'Trials of Oscar Wilde, The',
    subLabel: 'Drama',
  },
  {
    value: '99c5818d-8eac-44bd-8150-118c71a8d20f',
    label: 'Tripper, The',
    subLabel: 'Horror',
  },
  {
    value: '0d38c89b-e33f-4ecc-b79d-b6e806122c19',
    label: 'Trog',
    subLabel: 'Horror | Sci-Fi',
  },
  {
    value: '3dd56a12-85a2-418e-bca8-33d27b61f0b6',
    label: 'Trouble Every Day',
    subLabel: 'Drama | Horror | Thriller',
  },
  {
    value: 'bfa02988-018f-4792-a80a-35590b3aca43',
    label: 'True Colors',
    subLabel: 'Drama',
  },
  {
    value: 'e52bdcc0-af78-4c4a-9898-1c9c03367731',
    label: 'Turin Horse, The (A Torinói ló)',
    subLabel: 'Drama',
  },
  {
    value: 'f2e1f200-74d3-4a43-aaa6-451dca66d35b',
    label: 'TWA Flight 800 ',
    subLabel: 'Documentary',
  },
  {
    value: 'ab04246c-0840-49b2-bfde-eccf4cd8faf7',
    label: 'Twenty Bucks',
    subLabel: 'Comedy',
  },
  {
    value: 'e17b51fa-2b8c-4f0b-af63-eab931a8109e',
    label: 'Twenty-Four Eyes (Nijûshi no hitomi)',
    subLabel: 'Drama',
  },
  {
    value: 'a1f902c5-fed9-40c1-9d4f-e44343cc2362',
    label: 'Twilight',
    subLabel: 'Crime | Drama | Thriller',
  },
  {
    value: '6af0f1ee-78f8-41ad-a435-279eb8a78d0e',
    label: 'Two Crimes (Dos crímenes)',
    subLabel: 'Comedy | Crime | Drama',
  },
  {
    value: 'd8c42afc-95be-41ab-b039-91c5295e8a0b',
    label: 'Two Lives (Zwei Leben)',
    subLabel: 'Drama | Thriller',
  },
  {
    value: 'a0fec7b4-d0be-4aa6-885a-4979bd854484',
    label: 'Two Much',
    subLabel: 'Comedy | Romance',
  },
  {
    value: 'd919c64e-57d7-47ba-b9fd-7f9c47e12d96',
    label: 'Ugetsu (Ugetsu monogatari)',
    subLabel: 'Drama | Thriller',
  },
  {
    value: '1b345049-b16d-4f79-9981-aeb6149c907f',
    label: 'Ultraman (Chôhen kaijû eiga: Urutoraman)',
    subLabel: 'Action | Fantasy | Sci-Fi',
  },
  {
    value: '40ae6ee5-0a3c-4720-abfd-a94a7b6ea7c2',
    label: 'Under the Volcano',
    subLabel: 'Drama',
  },
  {
    value: 'f980832a-d442-4bb8-bebb-4751dda818df',
    label: 'Underground',
    subLabel: 'Comedy | Drama | War',
  },
  {
    value: '504a3304-2266-417b-a8be-f63dcdefd77e',
    label: 'Underworld',
    subLabel: 'Crime | Drama | Film-Noir',
  },
  {
    value: '22ea46bd-7739-4f42-bcd6-665011520306',
    label: 'Unfaithful',
    subLabel: 'Drama | Thriller',
  },
  {
    value: '7e3ea4a0-f412-4331-8d6e-cfbc2cb29fdb',
    label: 'Unfaithful Wife, The (Femme infidèle, La)',
    subLabel: 'Drama | Thriller',
  },
  {
    value: '9c285cbe-e7c2-4c32-b908-45153c34c42a',
    label: 'Union: The Business Behind Getting High, The',
    subLabel: 'Comedy | Documentary',
  },
  {
    value: 'facb1932-6457-4037-9f21-9dfd384efbf1',
    label: 'Unknown Woman, The (Tuntematon emäntä)',
    subLabel: 'Documentary',
  },
  {
    value: '889805a8-6989-4199-a1b0-0ee03259c5f2',
    label: 'Unknown, The (a.k.a. Alonzo the Armless)',
    subLabel: 'Drama | Horror | Romance',
  },
  {
    value: 'f660cfd5-fd6a-46d6-81d5-c44ad5442e5a',
    label: 'Unspeakable Acts ',
    subLabel: 'Drama',
  },
  {
    value: '51836a7a-3dd6-4cb1-88cd-843cf16f1c2b',
    label: 'Up the River',
    subLabel: 'Comedy | Crime | Drama',
  },
  {
    value: 'de0eec2c-a9db-4575-9f00-5acc14892659',
    label: 'Upstairs and Downstairs',
    subLabel: 'Comedy',
  },
  {
    value: 'cf0f6226-46d7-457d-bd5a-9da557f8cc65',
    label: 'Varg Veum - Bitter Flowers (Varg Veum - Bitre Blomster)',
    subLabel: 'Crime | Drama | Thriller',
  },
  {
    value: '303e1d4c-359a-4a33-9c3d-035e29ca4a80',
    label: 'Veer Zaara',
    subLabel: 'Drama | Musical | Romance',
  },
  {
    value: 'f1d70fc8-f657-4930-9a8a-1870e90f350d',
    label: 'Vice',
    subLabel: 'Action | Adventure | Sci-Fi | Thriller',
  },
  {
    value: '2022b02c-427e-490e-8c89-3e27170f2947',
    label: 'Victim',
    subLabel: 'Crime | Drama',
  },
  {
    value: '034344a8-1ff6-46f4-a5d1-0d26e3d6e58a',
    label: 'Victor and the Secret of Crocodile Mansion',
    subLabel: 'Adventure | Children | Mystery',
  },
  {
    value: '1c33e8be-8767-4213-9480-342f1f440e2b',
    label: 'Vincent Wants to Sea (Vincent will meer)',
    subLabel: 'Drama',
  },
  {
    value: 'c889941a-0762-4d33-a2aa-8bb440f20679',
    label: 'Vinyl',
    subLabel: 'Documentary',
  },
  {
    value: 'a9bd0c8b-cbfc-41e3-9fec-31165e26eb1a',
    label: "Visiteurs du soir, Les (Devil's Envoys, The)",
    subLabel: 'Drama | Fantasy | Romance',
  },
  {
    value: '4d090be0-fea0-409c-aaf3-6ebbde9d4701',
    label: 'Visitors, The (Visiteurs, Les)',
    subLabel: 'Comedy | Fantasy | Sci-Fi',
  },
  {
    value: '2154692e-5403-4e31-a54d-e1e3633c7f87',
    label: 'Walker',
    subLabel: '(no genres listed)',
  },
  {
    value: '17c8196b-ee7d-4511-8d1d-44badda0e6e4',
    label: 'Walking Dead, The',
    subLabel: 'Crime | Horror | Sci-Fi',
  },
  {
    value: '2ffd1b03-99ef-4bb1-8e0d-e055d5930c96',
    label: 'Walking Tall',
    subLabel: 'Action',
  },
  {
    value: '10fb2b7b-7822-4386-8661-fc6d76db2813',
    label: 'Walking with Monsters',
    subLabel: 'Documentary',
  },
  {
    value: '426ea508-6ea7-4c04-86f1-72b850370972',
    label: 'War Comes to America (Why We Fight, 7)',
    subLabel: 'Documentary | War',
  },
  {
    value: '5fab5db1-598f-42be-9ffe-bac29c00d7f3',
    label: "War of the Dead - Stone's War ",
    subLabel: 'Action | Adventure | Horror | Sci-Fi | Thriller | War',
  },
  {
    value: '8a599fe3-d396-457e-b62f-464cc75bcadc',
    label: 'Warning for the Joensson Gang (Varning för Jönssonligan)',
    subLabel: 'Comedy | Crime',
  },
  {
    value: '6fb62a0b-aa35-4b47-b521-dc9db487fd62',
    label: 'Watchers',
    subLabel: 'Horror | Sci-Fi',
  },
  {
    value: 'c003b25b-c982-49a2-ab32-571966fa9086',
    label: 'Waterboys',
    subLabel: 'Comedy',
  },
  {
    value: '596ffa93-370f-4724-8cd6-c0c82478a878',
    label: 'We Are the Best! (Vi är bäst!)',
    subLabel: 'Children | Comedy | Drama',
  },
  {
    value: '1b05008e-d023-46cc-84a8-7f28efdb5451',
    label: "We're Not Dressing",
    subLabel: 'Comedy | Musical',
  },
  {
    value: '695e1588-bd35-4a3b-99ec-2caa18b4471b',
    label: 'Wednesday!, A',
    subLabel: 'Action | Drama | Thriller',
  },
  {
    value: '92ee64b3-a99a-4341-9a38-247e5215eca1',
    label: 'Weeds',
    subLabel: 'Drama',
  },
  {
    value: '336adaae-1e15-4316-9e85-27d541f39d6b',
    label: "Weekend at Bernie's",
    subLabel: 'Comedy',
  },
  {
    value: 'f0193ecc-e5df-491c-aca0-24725c7c2c85',
    label: 'Welcome to Collinwood',
    subLabel: 'Comedy | Crime',
  },
  {
    value: 'b119b28c-fb43-4ca6-9b71-690a319c280d',
    label: 'Welcome to the Jungle',
    subLabel: 'Horror',
  },
  {
    value: 'cb56f5c0-fe85-49c1-872b-4f2966308981',
    label: 'What Price Hollywood?',
    subLabel: 'Drama',
  },
  {
    value: 'f14e0923-6eba-48d1-ad8e-b42f1e426a7e',
    label: 'What Will You Do When You Catch Me? (Co mi zrobisz jak mnie zlapiesz?)',
    subLabel: 'Comedy | Crime',
  },
  {
    value: '8d740e5a-aaab-4c62-8036-2095f37d9e84',
    label: 'When a Stranger Calls',
    subLabel: 'Horror | Thriller',
  },
  {
    value: '99d0834e-76b7-4ac7-b70a-82ed073b9a65',
    label: 'When Harry Met Sally...',
    subLabel: 'Comedy | Romance',
  },
  {
    value: '6498f63a-7035-4b90-b94d-f800e4b398d7',
    label: 'When Love Is Not Enough: The Lois Wilson Story',
    subLabel: 'Drama',
  },
  {
    value: '1cf94124-b7e5-4b57-9dbc-c2bb95bb8dbc',
    label: 'When Pigs Have Wings',
    subLabel: 'Comedy',
  },
  {
    value: '70e2c9a4-df36-4cbc-a449-a9e60835d0dd',
    label: 'When Trumpets Fade',
    subLabel: 'Drama | War',
  },
  {
    value: 'dfb0be76-bde6-4a86-810c-88a11291296d',
    label: 'Where the Red Fern Grows',
    subLabel: 'Drama',
  },
  {
    value: 'ba6986ad-5586-4c65-95a5-a0356b097296',
    label: 'Where Were You When the Lights Went Out?',
    subLabel: 'Comedy',
  },
  {
    value: '01d3d9a6-1539-48b0-97d5-9fe963d272b6',
    label: 'Whirlpool',
    subLabel: 'Crime | Drama | Film-Noir | Mystery',
  },
  {
    value: '820a1c87-d780-45cd-a914-8bfba9de862e',
    label: 'Whistle Blower, The',
    subLabel: 'Thriller',
  },
  {
    value: '80e4270d-3a67-45cb-8b5c-8fbe349e9586',
    label: 'White Balloon, The (Badkonake sefid)',
    subLabel: 'Children | Drama',
  },
  {
    value: '9ed9bd20-463e-4fa6-bc2e-5107e99864ea',
    label: 'White Elephant',
    subLabel: 'Drama',
  },
  {
    value: '9f4fcce6-24b5-4f7a-b4f8-a2f16b993e4d',
    label: "White Men Can't Jump",
    subLabel: 'Comedy | Drama',
  },
  {
    value: '70e698e5-f82a-46ae-96a8-c036b90084c4',
    label: 'White Mountains (Belyie gory)',
    subLabel: 'Drama',
  },
  {
    value: 'ab8a0834-3de3-40ba-937e-b106dde9d5e9',
    label: 'White Oleander',
    subLabel: 'Drama',
  },
  {
    value: '866869e9-6b73-4064-846a-575560bf5045',
    label: 'White Rose, The (Weiße Rose, Die)',
    subLabel: 'Drama | Film-Noir',
  },
  {
    value: '02653ce2-c9b6-4a5d-9027-3b3fef6aef4c',
    label: 'Wild Party, The',
    subLabel: 'Comedy | Drama',
  },
  {
    value: 'c97068e9-6a19-432b-b7ea-3c11e3112f95',
    label: 'Wild Target',
    subLabel: 'Comedy | Drama | Romance | Thriller',
  },
  {
    value: '8ed90d53-21d0-41ed-a872-6ac231779f6b',
    label: 'Wildflowers',
    subLabel: 'Drama',
  },
  {
    value: 'c373338d-c63d-4185-8663-894f732c13a4',
    label: 'Wind Chill',
    subLabel: 'Drama | Horror | Thriller',
  },
  {
    value: 'ec20b841-7370-4124-b392-b9b4ddb1c2f6',
    label: 'Wind Rises, The (Kaze tachinu)',
    subLabel: 'Animation | Drama | Romance',
  },
  {
    value: '045f670c-f339-45cc-bf7f-b8fdb5873a91',
    label: 'Winged Creatures (Fragments)',
    subLabel: 'Crime | Drama',
  },
  {
    value: '01939757-0b3c-4085-8fde-0ee769e892f0',
    label: 'Without Warning (a.k.a. Alien Warning) (a.k.a. It Came Without Warning)',
    subLabel: 'Horror | Sci-Fi',
  },
  {
    value: '731545b5-8b59-4824-8d70-ea00fc113be9',
    label: 'Witness for the Prosecution',
    subLabel: 'Drama | Mystery | Thriller',
  },
  {
    value: 'e1688497-b16d-42c3-bce2-029b5ad5819a',
    label: 'Woman in the Meadow (Nainen kedolla)',
    subLabel: 'Drama | Romance | Thriller',
  },
  {
    value: '5d167a25-1072-4f49-9f6c-abb38b848edb',
    label: 'Woman Is a Woman, A (femme est une femme, Une)',
    subLabel: 'Comedy | Drama | Musical | Romance',
  },
  {
    value: '6343a755-81f3-4d2e-8513-302f811d3146',
    label: 'Woman of Affairs, A',
    subLabel: 'Drama',
  },
  {
    value: 'dad2ff91-05be-49df-8358-0a445e91d58c',
    label: 'Woman of Affairs, A',
    subLabel: 'Drama',
  },
  {
    value: '8ac73d27-22fd-40a5-b280-7feb0f6db7dc',
    label: 'Woman of Antwerp',
    subLabel: 'Drama',
  },
  {
    value: 'ec382368-3426-4b49-9c3a-6dc332808b89',
    label: 'Women, The',
    subLabel: 'Comedy | Drama',
  },
  {
    value: '36abfecc-0251-422c-890b-d8f7e167f77a',
    label: 'Word Wars',
    subLabel: 'Comedy | Documentary | Drama',
  },
  {
    value: '5be53f12-66bd-407c-bffd-308bb29b2686',
    label: 'Wordplay',
    subLabel: 'Documentary',
  },
  {
    value: 'e125caa3-5af1-424e-a37f-c49221f87ee9',
    label: 'World of Henry Orient, The',
    subLabel: 'Comedy',
  },
  {
    value: '547692d0-4f74-4bbb-b53d-8095a1bbc7b7',
    label: "World's Greatest Athlete, The",
    subLabel: 'Comedy | Romance',
  },
  {
    value: '85ad8a7a-40a2-429f-befa-91e5683f29da',
    label: 'Wrong Cops',
    subLabel: 'Comedy | Crime',
  },
  {
    value: '6d141c93-d715-4b2e-846e-9b76195456ab',
    label: 'Wrong Side Up (Pribehy obycejneho silenstvi)',
    subLabel: 'Comedy | Drama',
  },
  {
    value: '9b89ca91-592f-471e-b1a2-2468cdceef02',
    label: 'WW III: World War III (Der 3. Weltkrieg)',
    subLabel: 'Documentary | War',
  },
  {
    value: 'd32d1e59-6f12-4f9a-85f0-397d658ef3d8',
    label: 'X, Y and Zee (Zee and Co.)',
    subLabel: 'Drama',
  },
  {
    value: 'df3c0ab9-44c8-4275-9bad-a6afd0e45da7',
    label: 'Xtro',
    subLabel: 'Horror | Sci-Fi',
  },
  {
    value: '0f63b5ed-1ccd-4188-9aef-ac2325dc8a39',
    label: 'Year of the Wolf, The (Suden vuosi)',
    subLabel: 'Drama | Romance',
  },
  {
    value: '9f653820-5e4a-4434-b28c-8e152ab77b50',
    label: 'Yentl',
    subLabel: 'Drama | Musical | Romance',
  },
  {
    value: '24a92b06-3361-463a-86c2-5099e0ed7d5d',
    label: 'Yeti: The Giant of the 20th Century',
    subLabel: 'Adventure | Fantasy',
  },
  {
    value: 'e50d0e69-87c9-44a9-93d6-a52b8763d95f',
    label: 'Yo Yo (Yoyo)',
    subLabel: 'Comedy | Drama | Romance',
  },
  {
    value: '51efb070-532d-4772-a1a9-167d14155076',
    label: 'Yolki 2',
    subLabel: 'Comedy',
  },
  {
    value: 'fb159c77-c0ab-4ab0-9dac-69af91c19202',
    label: 'You and Me (Ty i ya)',
    subLabel: 'Drama',
  },
  {
    value: '62aea3ca-73c6-428c-856f-2656ad4ff4b2',
    label: 'Young in Heart, The',
    subLabel: 'Comedy | Drama',
  },
  {
    value: '0bd8f056-df1a-4c23-983a-3e0ed2fa024c',
    label: 'Z',
    subLabel: 'Drama | Mystery | Thriller',
  },
  {
    value: '0a5b49c4-e6a9-4fab-ad73-a5549d4becdd',
    label: 'Zandalee',
    subLabel: 'Drama | Thriller',
  },
  {
    value: '7a550901-0d36-40ad-b595-030df6bdc475',
    label: 'Zatoichi Goes to the Fire Festival (Zatôichi abare-himatsuri) (Zatôichi 21)',
    subLabel: 'Action | Drama',
  },
  {
    value: 'e1eb6e64-87a2-48f4-a6cf-5a21075128ae',
    label: 'Zatoichi Meets Yojimbo (Zatôichi to Yôjinbô) (Zatôichi 20)',
    subLabel: 'Action | Adventure | Drama',
  },
  {
    value: '4ce27395-1ee1-47f1-9972-018ef4c13872',
    label: 'Zombie Girl: The Movie',
    subLabel: 'Documentary',
  },
];

export const selectMockData: FudisSelectOption<TestAnimalScience>[] = [
  {
    value: '4257d865-872c-4ea6-80e6-8bd04ce56ad7',
    label: 'Golden jackal',
    subLabel: 'Canis aureus',
  },
  {
    value: 'e2fa6f0a-632a-485f-8ccf-b984311fe3b4',
    label: 'Mountain lion',
    subLabel: 'Felis concolor',
  },
  {
    value: '0cf7dff9-10e4-400b-b8e0-828b2e0baf30',
    label: 'Cat, european wild',
    subLabel: 'Felis silvestris lybica',
  },
  {
    value: 'd2e85262-d477-4485-8dd8-658d37adbd55',
    label: 'Black-faced kangaroo',
    subLabel: 'Macropus fuliginosus',
    disabled: true,
  },
  {
    value: '4afa4f18-575b-4272-a2c3-f75a8e564350',
    label: 'Snake, western patch-nosed',
    subLabel: 'Salvadora hexalepis',
  },
  {
    value: '4ae756e1-3ace-43a4-8c47-7081328970b1',
    label: 'Small Indian mongoose',
    subLabel: 'Herpestes javanicus',
  },
  {
    value: 'c0cba653-c8eb-410d-bf65-32d2353e1fca',
    label: 'Falcon, prairie',
    subLabel: 'Falco mexicanus',
  },
  {
    value: 'cc5a789e-6a7c-471a-a931-40edd734cbad',
    label: 'Spotted hyena',
    subLabel: 'Crocuta crocuta',
  },
  {
    value: 'f78a9645-d320-42a0-a492-b1c2502ac89c',
    label: 'Little brown bat',
    subLabel: 'Myotis lucifugus',
  },
  {
    value: '47ffe62a-fe74-41c2-a3ea-607c29d04a1f',
    label: 'Golden eagle',
    subLabel: 'Aquila chrysaetos',
  },
  {
    value: '4c08f813-45b6-4a32-99de-eee6a80a555a',
    label: 'Salmon pink bird eater tarantula',
    subLabel: 'Lasiodora parahybana',
  },
  {
    value: '98bd0882-5bc8-435f-932d-0bf7495b0608',
    label: 'Crane, sandhill',
    subLabel: 'Grus canadensis',
  },
  {
    value: '967d39b8-f85a-45aa-952e-8d0607dde1f6',
    label: 'Arctic fox',
    subLabel: 'Alopex lagopus',
  },
  {
    value: '80a3f1d5-8faa-4010-864b-22635742523b',
    label: 'Black-crowned crane',
    subLabel: 'Balearica pavonina',
  },
  {
    value: '8bfaf344-19e9-4c08-bddb-0bc63e0fba68',
    label: 'Olive baboon',
    subLabel: 'Papio cynocephalus',
  },
  {
    value: '6016e625-a51e-4ba2-86df-2f242cbd6576',
    label: 'Duck, comb',
    subLabel: 'Sarkidornis melanotos',
  },
  {
    value: '6e7c3846-625a-44e5-a6b8-ef051f2560b8',
    label: 'Brown pelican',
    subLabel: 'Pelecanus occidentalis',
  },
  {
    value: '129ddb5c-0eb8-40f2-9b0b-79fe66646c8b',
    label: 'Porcupine, crested',
    subLabel: 'Hystrix cristata',
  },
  {
    value: 'adc54363-0f1c-49ea-b08a-7a46754ff252',
    label: 'Porcupine, tree',
    subLabel: 'Coendou prehensilis',
  },
  {
    value: '2b9f2bc3-2603-4842-932f-c935f765cf74',
    label: 'Dark-winged trumpeter',
    subLabel: 'Psophia viridis',
  },
  {
    value: 'b245eab0-4fc2-4326-a410-5c73137e77ce',
    label: 'Skunk, western spotted',
    subLabel: 'Spilogale gracilis',
  },
  {
    value: '11e6ac61-5983-41d7-8a2f-884211068f21',
    label: 'White-cheeked pintail',
    subLabel: 'Anas bahamensis',
  },
  {
    value: 'e6700299-9021-4388-b304-e17175d65fa1',
    label: 'Painted stork',
    subLabel: 'Mycteria leucocephala',
  },
  {
    value: 'b5d46f6f-c1bd-4658-abe9-5907b7525d72',
    label: 'Ostrich',
    subLabel: 'Struthio camelus',
  },
  {
    value: '7124bc46-d0bf-4195-873e-00e562052b4b',
    label: 'Heron, goliath',
    subLabel: 'Ardea golieth',
  },
  {
    value: 'ab53b639-c94d-4b6b-8b62-bdbfeae24138',
    label: 'Ringtail cat',
    subLabel: 'Bassariscus astutus',
  },
  {
    value: 'e0051452-f1e3-4aa0-b206-eee538d2fb41',
    label: 'Kangaroo, western grey',
    subLabel: 'Macropus fuliginosus',
  },
  {
    value: '6e9d72b4-baf3-41bb-8547-775329bcfded',
    label: 'Deer, spotted',
    subLabel: 'Axis axis',
  },
  {
    value: 'd2306f4f-0093-444e-8f92-5d6f2173f6e0',
    label: 'Hoopoe, eurasian',
    subLabel: 'Upupa epops',
  },
  {
    value: '3213af0c-f256-4fad-a01f-1b3527799976',
    label: 'Black vulture',
    subLabel: 'Aegypius tracheliotus',
  },
  {
    value: '023265a1-3286-44a7-a253-91a0b37b6dce',
    label: 'Asian elephant',
    subLabel: 'Elephas maximus bengalensis',
  },
  {
    value: 'f6777bbd-b234-4a0b-8232-f70367986688',
    label: 'Cat, african wild',
    subLabel: 'Felis silvestris lybica',
  },
  {
    value: '925e74ab-9e00-49ff-a301-300bade8ff21',
    label: 'Pheasant, ring-necked',
    subLabel: 'Phasianus colchicus',
  },
  {
    value: '32771685-0a4b-4d52-a27f-2477c50bb051',
    label: 'Mouflon',
    subLabel: 'Ovis musimon',
  },
  {
    value: '60747b93-2f8e-40f6-8063-cc79d01d5205',
    label: 'Gecko, tokay',
    subLabel: 'Gekko gecko',
  },
  {
    value: '14679bf6-7e43-4897-8c83-82d267ebdb33',
    label: 'Weaver, lesser masked',
    subLabel: 'Ploceus intermedius',
  },
  {
    value: '3b1e2e1e-f20e-4683-9a3f-5b54665c32dd',
    label: 'Striped hyena',
    subLabel: 'Hyaena hyaena',
  },
  {
    value: 'd63bd6c6-97ea-4aa6-993e-6c46d6b2cd80',
    label: 'Pronghorn',
    subLabel: 'Antilocapra americana',
  },
  {
    value: '26cce89a-924a-44c6-93a6-6e14320e8b6f',
    label: 'Blue fox',
    subLabel: 'Alopex lagopus',
  },
  {
    value: 'a6d0bc83-54f3-4979-b235-0511947888f4',
    label: 'Admiral, indian red',
    subLabel: 'Vanessa indica',
  },
  {
    value: '1ef74dd7-9fcb-4436-a1cd-1c0ba4727f59',
    label: 'California sea lion',
    subLabel: 'Zalophus californicus',
  },
  {
    value: '8680e372-1f3c-48ff-a7c1-e466e249bb9a',
    label: 'Galapagos hawk',
    subLabel: 'Buteo galapagoensis',
  },
  {
    value: '6cfae7fe-81e5-4e11-8efc-056a0f3c6ee4',
    label: 'North American porcupine',
    subLabel: 'Erethizon dorsatum',
  },
  {
    value: '4bbddf78-c926-476e-af39-8dcff511bac0',
    label: 'Common rhea',
    subLabel: 'Rhea americana',
  },
  {
    value: 'eef11e08-e30b-42f7-ad92-0bd8f129e108',
    label: 'River wallaby',
    subLabel: 'Macropus agilis',
  },
  {
    value: '3a2860af-88d1-4d9e-ba14-f290fce32a26',
    label: 'Alligator, mississippi',
    subLabel: 'Alligator mississippiensis',
  },
  {
    value: 'e4cb0061-020c-4a5f-b6d9-8acb9a3bb0bb',
    label: 'Dolphin, common',
    subLabel: 'Delphinus delphis',
  },
  {
    value: 'bbf08d11-88cf-4d3e-b411-5409db3cb57c',
    label: 'Goldeneye, barrows',
    subLabel: 'Bucephala clangula',
  },
  {
    value: 'b1fb350c-5977-4e81-b25c-c2507181ebd0',
    label: 'Bateleur eagle',
    subLabel: 'Terathopius ecaudatus',
  },
  {
    value: 'f00849ca-38fd-4255-b833-ce23e8f17058',
    label: 'Macaw, scarlet',
    subLabel: 'Ara macao',
  },
  {
    value: '69c65883-fb18-4797-a0d2-759fe5b004b1',
    label: 'Anteater, australian spiny',
    subLabel: 'Tachyglossus aculeatus',
  },
  {
    value: 'd122e373-f068-4ee0-a32f-ba21661642c1',
    label: 'Secretary bird',
    subLabel: 'Sagittarius serpentarius',
  },
  {
    value: 'f4e455c7-acb8-4f0c-826d-e1b0964fefe2',
    label: 'Heron, little',
    subLabel: 'Butorides striatus',
  },
  {
    value: '335cff54-abd6-4a40-a528-401490c4ece9',
    label: 'Tiger snake',
    subLabel: 'Notechis semmiannulatus',
  },
  {
    value: '381453be-9d58-406d-b052-f7a4f18bea43',
    label: 'Gecko, bent-toed',
    subLabel: 'Cyrtodactylus louisiadensis',
  },
  {
    value: 'f9fb00d8-f741-49c4-b3bb-b93b12f35c4f',
    label: 'Whale, southern right',
    subLabel: 'Eubalaena australis',
  },
  {
    value: 'e61d8d16-57b1-4de0-b518-7349ad39b802',
    label: 'Eurasian beaver',
    subLabel: 'Castor fiber',
  },
  {
    value: 'e88c321f-8692-46fd-a4f0-96e4034e0467',
    label: 'Raven, white-necked',
    subLabel: 'Corvus albicollis',
  },
  {
    value: 'b8a90193-bfe8-4145-92d9-386f923ef567',
    label: 'Hawk-eagle, crowned',
    subLabel: 'Spizaetus coronatus',
  },
  {
    value: 'b4cf080d-12e2-4808-b419-df0ab881e79f',
    label: 'Red-tailed hawk',
    subLabel: 'Buteo jamaicensis',
  },
  {
    value: '637d86a6-dd93-4d7a-955a-3a910ae552e7',
    label: 'Eland, common',
    subLabel: 'Taurotagus oryx',
  },
  {
    value: '3496a809-a782-46df-8063-3bf385f3a574',
    label: 'Argalis',
    subLabel: 'Ovis ammon',
  },
  {
    value: 'a2f507a3-57d7-4ac3-a5f9-2c5022687246',
    label: 'Grison',
    subLabel: 'Galictis vittata',
  },
  {
    value: '35002faa-3a9b-4047-b084-97cdb23659db',
    label: 'Egyptian goose',
    subLabel: 'Alopochen aegyptiacus',
  },
  {
    value: 'e8a82a67-e9fc-4d37-8387-5bf8f1c70fb4',
    label: 'Green-winged trumpeter',
    subLabel: 'Psophia viridis',
  },
  {
    value: 'b9eb80d8-56da-478f-b7ea-14a17d2ee3ef',
    label: 'Quoll, eastern',
    subLabel: 'Dasyurus viverrinus',
  },
  {
    value: '34867681-c8ab-4655-be39-ae3e80b8992b',
    label: 'Galapagos dove',
    subLabel: 'Zenaida galapagoensis',
  },
  {
    value: 'dfa451dc-73a1-4dca-bd94-f786445bb53e',
    label: 'Honey badger',
    subLabel: 'Mellivora capensis',
  },
  {
    value: 'e22b9c65-6bfb-46a7-8959-364bf1e7c22e',
    label: 'Ferret, black-footed',
    subLabel: 'Mustela nigripes',
  },
  {
    value: 'd6753f96-ff13-45c3-925d-a7978a9276c1',
    label: 'Porcupine, indian',
    subLabel: 'Hystrix indica',
  },
  {
    value: 'e2e1c19e-32fe-4652-8d1d-ca63dedd8eb7',
    label: 'Bontebok',
    subLabel: 'Damaliscus dorcas',
  },
  {
    value: 'ad632065-009c-46e6-a417-3f94bac42450',
    label: 'Mexican wolf',
    subLabel: 'Canis lupus baileyi',
  },
  {
    value: '05125644-050d-4758-a19a-95348ca21f93',
    label: 'Squirrel, arctic ground',
    subLabel: 'Spermophilus parryii',
  },
  {
    value: '08d96def-32c8-4864-bb26-b94c25d0899b',
    label: 'Arctic lemming',
    subLabel: 'Dicrostonyx groenlandicus',
  },
  {
    value: '032b1ae2-d778-4a11-9f7d-ae2a04ef04d9',
    label: 'Dassie',
    subLabel: 'Dendrohyrax brucel',
  },
  {
    value: 'b2ac5716-4e94-4088-90d8-7f183b49c24b',
    label: 'Ocelot',
    subLabel: 'Felis pardalis',
  },
  {
    value: '6ee6d521-bf62-491d-90d8-722c802c35b0',
    label: 'Toddy cat',
    subLabel: 'Paradoxurus hermaphroditus',
  },
  {
    value: 'da3a575f-838b-4d1e-92f2-610f12f0650d',
    label: 'Tarantula, salmon pink bird eater',
    subLabel: 'Lasiodora parahybana',
  },
  {
    value: 'd2502ddf-ee92-480c-b3f3-478760b70d4e',
    label: 'Cardinal, red-capped',
    subLabel: 'Paroaria gularis',
  },
  {
    value: '7e844f55-658d-41d3-a623-cb133ffc10f7',
    label: 'Heron, boat-billed',
    subLabel: 'Cochlearius cochlearius',
  },
  {
    value: '13a0be0e-acce-4475-8467-d71981c9a364',
    label: 'Camel, dromedary',
    subLabel: 'Camelus dromedarius',
  },
  {
    value: '0aa92ce7-1509-47ca-80ae-9f1fd038848f',
    label: 'Silver-backed fox',
    subLabel: 'Vulpes chama',
  },
  {
    value: 'f8dadc5f-25e5-445c-995e-ac34d8331174',
    label: 'Black swan',
    subLabel: 'Cygnus atratus',
  },
  {
    value: 'ad4badca-9ba5-4e8a-aa32-ec1aabd4c9ab',
    label: 'Possum, golden brush-tailed',
    subLabel: 'Trichosurus vulpecula',
  },
  {
    value: '7c865a18-7828-4649-88fd-1f3eac61275c',
    label: 'Puma',
    subLabel: 'Felis concolor',
  },
  {
    value: '1eb55202-2cf7-4a5c-8c9c-3dc893fd0d5a',
    label: 'Cape clawless otter',
    subLabel: 'Aonyx capensis',
  },
  {
    value: 'a9ee4847-7dd8-4fab-8375-bfcfbf3c4b2f',
    label: 'Kudu, greater',
    subLabel: 'Tragelaphus strepsiceros',
  },
  {
    value: '4082c986-4d25-4e40-be42-700d89a12be2',
    label: 'Blue-faced booby',
    subLabel: 'Sula dactylatra',
  },
  {
    value: '384c1bb6-f3cf-42e5-9f8a-b3f3e4012695',
    label: 'White-fronted bee-eater',
    subLabel: 'Merops bullockoides',
  },
  {
    value: '3f3192c4-7848-46d4-8758-eb9047dd998c',
    label: 'Sloth, two-toed',
    subLabel: 'Choloepus hoffmani',
  },
  {
    value: 'f8f5cd29-5fcd-4578-82af-1c3feae51f4f',
    label: 'Caribou',
    subLabel: 'Rangifer tarandus',
  },
  {
    value: '45b71ecf-c3c3-4dfd-8ee4-a8596876ac8c',
    label: 'Wagtail, african pied',
    subLabel: 'Motacilla aguimp',
  },
  {
    value: '9ab4dbfa-9692-4d1c-8486-6bad752719ab',
    label: 'Prairie falcon',
    subLabel: 'Falco mexicanus',
  },
  {
    value: 'cce5b4fc-a04a-4e27-81bb-6a0e50b484f9',
    label: 'Springhare',
    subLabel: 'Pedetes capensis',
  },
  {
    value: '75fbf0ae-cfaf-472b-9774-38b7ad34e25b',
    label: 'Deer, swamp',
    subLabel: 'Cervus duvauceli',
  },
  {
    value: '58d83c5c-7084-495e-8915-ac269861b185',
    label: 'Seal, common',
    subLabel: 'Phoca vitulina',
  },
  {
    value: 'ade72864-63a9-4df6-bfc2-ed4a83cb5f65',
    label: 'Wombat, common',
    subLabel: 'Vombatus ursinus',
  },
  {
    value: '32fbfa2d-54db-4ef8-847d-b18268eab82c',
    label: 'White-lipped peccary',
    subLabel: 'Tayassu pecari',
  },
  {
    value: '118b061f-04df-4d65-aa4a-6836b3e01d78',
    label: 'Phalarope, red',
    subLabel: 'Phalaropus fulicarius',
  },
  {
    value: 'e469787a-8cfe-4929-a019-1a466b5ca8c9',
    label: 'Blue peacock',
    subLabel: 'Pavo cristatus',
  },
  {
    value: '78c7f7bb-5075-441b-b923-4f706a809260',
    label: 'Plains zebra',
    subLabel: 'Equus burchelli',
  },
  {
    value: 'f0f115e2-e93c-4ab4-8b23-5b0719f1b95d',
    label: 'Pheasant, common',
    subLabel: 'Phasianus colchicus',
  },
  {
    value: '7a4462e4-22f2-4426-8a19-bfd8a5fee829',
    label: 'Brown capuchin',
    subLabel: 'Cebus apella',
  },
  {
    value: '6f24b762-2a54-4ae6-b03c-65ca85b9fc5a',
    label: 'White-winged dove',
    subLabel: 'Zenaida asiatica',
  },
  {
    value: 'aabc9b50-a60d-4b85-916b-05d4f2452a8e',
    label: 'Pintail, bahama',
    subLabel: 'Anas bahamensis',
  },
  {
    value: 'a03ba637-3733-42b7-98ca-5847ab8a2e95',
    label: 'Macaw, blue and gold',
    subLabel: 'Ara ararauna',
  },
  {
    value: 'ad11a271-454e-4a15-9fa1-8542012278b2',
    label: 'Gecko (unidentified)',
    subLabel: 'unavailable',
  },
  {
    value: '26430ad4-c8c6-4376-aaaa-990a26ec5de9',
    label: 'Cormorant, javanese',
    subLabel: 'Phalacrocorax niger',
  },
  {
    value: 'bc653d0b-9493-4e77-90d8-84a67072183d',
    label: 'Squirrel, uinta ground',
    subLabel: 'Spermophilus armatus',
  },
  {
    value: '83b21dcd-6480-4a31-860c-2468340840c6',
    label: 'Heron, giant',
    subLabel: 'Ardea golieth',
  },
  {
    value: 'ba355040-6ba8-49a4-ba14-6637f2e5c63f',
    label: 'Common turkey',
    subLabel: 'Meleagris gallopavo',
  },
  {
    value: '96842ed2-9363-42ae-988d-6b89ef6ddd7f',
    label: 'Macaw, green-winged',
    subLabel: 'Ara chloroptera',
  },
  {
    value: '6d811f5f-8094-48b8-8b4d-5f4a4ce45caf',
    label: 'Water legaan',
    subLabel: 'Varanus salvator',
  },
  {
    value: 'ec642cfb-fbba-41ba-96ae-65c8631d6c7b',
    label: 'Woodcock, american',
    subLabel: 'Scolopax minor',
  },
  {
    value: '535809e1-e801-4e9c-a635-d8e3f63d51c9',
    label: 'Flying fox (unidentified)',
    subLabel: 'unavailable',
  },
  {
    value: '74702bba-2dbe-42e9-94e8-d40fa16c64bb',
    label: 'Lappet-faced vulture',
    subLabel: 'Aegypius tracheliotus',
  },
  {
    value: '55a068f5-5f81-4c56-921c-5487d0c430b8',
    label: 'Bushbuck',
    subLabel: 'Tragelaphus scriptus',
  },
  {
    value: 'c4598372-655f-45fa-81a6-01caf4800cf2',
    label: 'Shark, blue',
    subLabel: 'Prionace glauca',
  },
  {
    value: 'e9dc391c-5f76-4aff-bfd8-9b4b11aa6549',
    label: 'Madagascar fruit bat',
    subLabel: 'Pteropus rufus',
  },
  {
    value: '76765959-44d8-4fed-8e62-df3193debe00',
    label: 'Fisher',
    subLabel: 'Martes pennanti',
  },
  {
    value: 'ce99a7e9-2ebb-4e3f-beae-16683eea5bf4',
    label: 'Eagle, long-crested hawk',
    subLabel: 'Lophoaetus occipitalis',
  },
  {
    value: 'd149ca69-c376-42c7-9243-03e97fa09e8a',
    label: 'Beaver, american',
    subLabel: 'Castor canadensis',
  },
  {
    value: 'd27c2349-41b8-4b1d-aadb-fcd1a6e1be58',
    label: 'Otter, north american river',
    subLabel: 'Lutra canadensis',
  },
  {
    value: '70d02ddf-1ca1-418b-bc80-ff478502c909',
    label: 'Woodpecker, red-headed',
    subLabel: 'Melanerpes erythrocephalus',
  },
  {
    value: '732b36e5-29cb-4b4c-ac56-f17250522615',
    label: 'Shrew, mandras tree',
    subLabel: 'Anathana ellioti',
  },
  {
    value: '548d78da-ec05-4b55-b959-3c16d050e04a',
    label: 'Peregrine falcon',
    subLabel: 'Falco peregrinus',
  },
  {
    value: 'b6025cab-d79d-41cf-8d04-2675eaab84a8',
    label: 'Two-toed sloth',
    subLabel: 'Choloepus hoffmani',
  },
  {
    value: 'e35a2e38-42e5-4ddf-b4c8-dc1f6d4c792f',
    label: 'House crow',
    subLabel: 'Corvus brachyrhynchos',
  },
  {
    value: 'ce6e0495-ba74-4db1-827a-4899187ed51d',
    label: 'Superb starling',
    subLabel: 'Lamprotornis superbus',
  },
  {
    value: '28eedda1-6255-4e74-bc91-855a323c3eb4',
    label: 'Serval',
    subLabel: 'Felis serval',
  },
  {
    value: '4b9d6ddc-3e75-4cb4-9fac-ec374cd6f96e',
    label: 'Coqui partridge',
    subLabel: 'Francolinus coqui',
  },
  {
    value: 'd6fec124-4349-46f8-ae10-9da6274cb7fa',
    label: 'Gray rhea',
    subLabel: 'Rhea americana',
  },
  {
    value: '87bef4c3-7fab-49dd-a21f-ec0fc67edb25',
    label: 'American black bear',
    subLabel: 'Ursus americanus',
  },
  {
    value: '9c305438-d61a-4b71-9bb3-863a39ca3582',
    label: 'Little blue penguin',
    subLabel: 'Eudyptula minor',
  },
  {
    value: '30b2bc16-9017-40d9-a3af-667771cfcd61',
    label: 'Potoroo',
    subLabel: 'Potorous tridactylus',
  },
  {
    value: 'ba897b7f-0a9f-4248-89cd-7d803f014a51',
    label: 'Booby, masked',
    subLabel: 'Sula dactylatra',
  },
  {
    value: '9afd3df5-9ca8-4b14-908c-94f737cac644',
    label: 'Phascogale, brush-tailed',
    subLabel: 'Phascogale tapoatafa',
  },
  {
    value: 'b5fd0fbd-31bc-4cb3-9eca-7c408156aed2',
    label: 'Cape fox',
    subLabel: 'Vulpes chama',
  },
  {
    value: '2d4314d7-fbac-45dd-a2e3-40382482aac2',
    label: 'Rat, white-faced tree',
    subLabel: 'Echimys chrysurus',
  },
  {
    value: '063e1a09-2d40-4a8a-ae1f-0b60a844d47d',
    label: 'Hottentot teal',
    subLabel: 'Anas punctata',
  },
  {
    value: '93c7730a-95e5-4d2b-8d65-8b1372a2d199',
    label: 'Gorilla, western lowland',
    subLabel: 'Gorilla gorilla',
  },
  {
    value: '4144359e-76e9-4113-b6ab-d8f5ec7ac36a',
    label: 'Genoveva',
    subLabel: 'Junonia genoveua',
  },
  {
    value: '553513a0-ae16-4dfa-b250-d9c52642fa8f',
    label: 'Wapiti, elk,',
    subLabel: 'Cervus canadensis',
  },
  {
    value: '333fba4c-423e-4748-84f6-268f9b9a05bc',
    label: 'Red squirrel',
    subLabel: 'Tamiasciurus hudsonicus',
  },
  {
    value: '78ba2cb2-9264-495d-886a-e0980fb71989',
    label: 'Porcupine, north american',
    subLabel: 'Erethizon dorsatum',
  },
  {
    value: '9172fecc-f0b7-4bc0-931f-2fde2c57f7a3',
    label: 'Buffalo, asian water',
    subLabel: 'Bubalus arnee',
  },
  {
    value: 'd5585c5b-afbc-48f5-b608-37ab074e0aed',
    label: 'Kingfisher, malachite',
    subLabel: 'Corythornis cristata',
  },
  {
    value: '495617dd-9bcc-4b61-939e-645f08826aef',
    label: 'Lizard, frilled',
    subLabel: 'Chlamydosaurus kingii',
  },
  {
    value: '0a52f284-c438-4645-9315-4f6a9b25e01e',
    label: 'Common mynah',
    subLabel: 'Acridotheres tristis',
  },
  {
    value: 'ec0be067-b20e-484a-ae91-73c28d2ac086',
    label: 'Antelope ground squirrel',
    subLabel: 'Ammospermophilus nelsoni',
  },
  {
    value: '80fb6818-8932-4c30-85d3-1b1bad65edcf',
    label: 'Timber wolf',
    subLabel: 'Canis lupus lycaon',
  },
  {
    value: '78cbfde5-5b25-46de-8c7c-a3340ae513b0',
    label: 'White-throated kingfisher',
    subLabel: 'Halcyon smyrnesis',
  },
  {
    value: '875d924b-0722-4890-932e-da705e4040ca',
    label: 'Black-necked stork',
    subLabel: 'Ephippiorhynchus mycteria',
  },
  {
    value: 'e4784a90-b486-4386-b89c-f66407cebd3e',
    label: 'Woylie',
    subLabel: 'Bettongia penicillata',
  },
  {
    value: 'ca641e5d-37e2-43d1-8785-6cc783482969',
    label: 'Gnu, brindled',
    subLabel: 'Connochaetus taurinus',
  },
  {
    value: '8e9f0d5c-cdc8-4678-a4d8-c3e62fa35389',
    label: 'Swamp deer',
    subLabel: 'Cervus duvauceli',
  },
  {
    value: '81a25200-fff2-44a5-af6c-a3e6bfb87b75',
    label: 'Greater adjutant stork',
    subLabel: 'Leptoptilus dubius',
  },
  {
    value: '423b43d0-41a9-40b9-b253-0fb2f35c9be5',
    label: 'Laughing dove',
    subLabel: 'Streptopelia senegalensis',
  },
  {
    value: '83d82ba5-60d4-4d4b-9845-bd44a19b76b4',
    label: 'Fox, silver-backed',
    subLabel: 'Vulpes chama',
  },
  {
    value: 'ac222ae0-2364-4c70-a8e2-91b8849b1b0a',
    label: 'Cobra, cape',
    subLabel: 'Naja nivea',
  },
  {
    value: 'd81a27c2-50de-4bb0-aafd-369dc0fb9b36',
    label: 'Hornbill, yellow-billed',
    subLabel: 'Tockus flavirostris',
  },
  {
    value: '93d97bcf-298b-4c45-bc35-887d245ed323',
    label: 'Cat, ringtail',
    subLabel: 'Bassariscus astutus',
  },
  {
    value: '036d3dfc-d70b-44d1-98c6-2d75bc57d5a6',
    label: 'Common zorro',
    subLabel: 'Dusicyon thous',
  },
  {
    value: '79edacf2-2356-4c2c-b9be-b3879dffcf81',
    label: 'Legaan, ground',
    subLabel: 'Varanus sp.',
  },
];

export const smallGroupedMockData: MockSelectOptionGroupData[] = [
  {
    country: 'Netherlands',
    options: [
      {
        value: '4257d865-872c-4ea6-80e6-8bd04ce56ad7',
        label: 'Golden jackal',
        subLabel: 'Canis aureus',
      },
      {
        value: 'e2fa6f0a-632a-485f-8ccf-b984311fe3b4',
        label: 'Mountain lion',
        subLabel: 'Felis concolor',
      },
    ],
  },
];

export const groupedMockData: MockSelectOptionGroupData[] = [
  {
    country: 'Netherlands',
    options: [
      {
        value: '4257d865-872c-4ea6-80e6-8bd04ce56ad7',
        label: 'Golden jackal',
        subLabel: 'Canis aureus',
      },
      {
        value: 'e2fa6f0a-632a-485f-8ccf-b984311fe3b4',
        label: 'Mountain lion',
        subLabel: 'Felis concolor',
      },
      {
        value: '0cf7dff9-10e4-400b-b8e0-828b2e0baf30',
        label: 'Cat, european wild',
        subLabel: 'Felis silvestris lybica',
      },
      {
        value: 'd2e85262-d477-4485-8dd8-658d37adbd55',
        label: 'Black-faced kangaroo',
        subLabel: 'Macropus fuliginosus',
        disabled: true,
      },
      {
        value: '4afa4f18-575b-4272-a2c3-f75a8e564350',
        label: 'Snake, western patch-nosed',
        subLabel: 'Salvadora hexalepis',
      },
    ],
  },
  {
    country: 'Brazil',
    options: [
      {
        value: '4ae756e1-3ace-43a4-8c47-7081328970b1',
        label: 'Small Indian mongoose',
        subLabel: 'Herpestes javanicus',
      },
      {
        value: 'c0cba653-c8eb-410d-bf65-32d2353e1fca',
        label: 'Falcon, prairie',
        subLabel: 'Falco mexicanus',
      },
      {
        value: 'cc5a789e-6a7c-471a-a931-40edd734cbad',
        label: 'Spotted hyena',
        subLabel: 'Crocuta crocuta',
      },
      {
        value: 'f78a9645-d320-42a0-a492-b1c2502ac89c',
        label: 'Little brown bat',
        subLabel: 'Myotis lucifugus',
      },
      {
        value: '47ffe62a-fe74-41c2-a3ea-607c29d04a1f',
        label: 'Golden eagle',
        subLabel: 'Aquila chrysaetos',
      },
    ],
  },
  {
    country: 'China',
    options: [
      {
        value: '4c08f813-45b6-4a32-99de-eee6a80a555a',
        label: 'Salmon pink bird eater tarantula',
        subLabel: 'Lasiodora parahybana',
      },
      {
        value: '98bd0882-5bc8-435f-932d-0bf7495b0608',
        label: 'Crane, sandhill',
        subLabel: 'Grus canadensis',
      },
      {
        value: '967d39b8-f85a-45aa-952e-8d0607dde1f6',
        label: 'Arctic fox',
        subLabel: 'Alopex lagopus',
      },
      {
        value: '80a3f1d5-8faa-4010-864b-22635742523b',
        label: 'Black-crowned crane',
        subLabel: 'Balearica pavonina',
      },
      {
        value: '8bfaf344-19e9-4c08-bddb-0bc63e0fba68',
        label: 'Olive baboon',
        subLabel: 'Papio cynocephalus',
      },
    ],
  },
  {
    country: 'Indonesia',
    options: [
      {
        value: '6016e625-a51e-4ba2-86df-2f242cbd6576',
        label: 'Duck, comb',
        subLabel: 'Sarkidornis melanotos',
      },
      {
        value: '6e7c3846-625a-44e5-a6b8-ef051f2560b8',
        label: 'Brown pelican',
        subLabel: 'Pelecanus occidentalis',
      },
      {
        value: '129ddb5c-0eb8-40f2-9b0b-79fe66646c8b',
        label: 'Porcupine, crested',
        subLabel: 'Hystrix cristata',
      },
      {
        value: 'adc54363-0f1c-49ea-b08a-7a46754ff252',
        label: 'Porcupine, tree',
        subLabel: 'Coendou prehensilis',
      },
      {
        value: '2b9f2bc3-2603-4842-932f-c935f765cf74',
        label: 'Dark-winged trumpeter',
        subLabel: 'Psophia viridis',
      },
    ],
  },
  {
    country: 'Colombia',
    options: [
      {
        value: 'b245eab0-4fc2-4326-a410-5c73137e77ce',
        label: 'Skunk, western spotted',
        subLabel: 'Spilogale gracilis',
      },
      {
        value: '11e6ac61-5983-41d7-8a2f-884211068f21',
        label: 'White-cheeked pintail',
        subLabel: 'Anas bahamensis',
      },
      {
        value: 'e6700299-9021-4388-b304-e17175d65fa1',
        label: 'Painted stork',
        subLabel: 'Mycteria leucocephala',
      },
      {
        value: 'b5d46f6f-c1bd-4658-abe9-5907b7525d72',
        label: 'Ostrich',
        subLabel: 'Struthio camelus',
      },
      {
        value: '7124bc46-d0bf-4195-873e-00e562052b4b',
        label: 'Heron, goliath',
        subLabel: 'Ardea golieth',
      },
    ],
  },
  {
    country: 'Canada',
    options: [
      {
        value: 'ab53b639-c94d-4b6b-8b62-bdbfeae24138',
        label: 'Ringtail cat',
        subLabel: 'Bassariscus astutus',
      },
      {
        value: 'e0051452-f1e3-4aa0-b206-eee538d2fb41',
        label: 'Kangaroo, western grey',
        subLabel: 'Macropus fuliginosus',
      },
      {
        value: '6e9d72b4-baf3-41bb-8547-775329bcfded',
        label: 'Deer, spotted',
        subLabel: 'Axis axis',
      },
      {
        value: 'd2306f4f-0093-444e-8f92-5d6f2173f6e0',
        label: 'Hoopoe, eurasian',
        subLabel: 'Upupa epops',
      },
      {
        value: '3213af0c-f256-4fad-a01f-1b3527799976',
        label: 'Black vulture',
        subLabel: 'Aegypius tracheliotus',
      },
    ],
  },
  {
    country: 'Malaysia',
    options: [
      {
        value: '023265a1-3286-44a7-a253-91a0b37b6dce',
        label: 'Asian elephant',
        subLabel: 'Elephas maximus bengalensis',
      },
      {
        value: 'f6777bbd-b234-4a0b-8232-f70367986688',
        label: 'Cat, african wild',
        subLabel: 'Felis silvestris lybica',
      },
      {
        value: '925e74ab-9e00-49ff-a301-300bade8ff21',
        label: 'Pheasant, ring-necked',
        subLabel: 'Phasianus colchicus',
      },
      {
        value: '32771685-0a4b-4d52-a27f-2477c50bb051',
        label: 'Mouflon',
        subLabel: 'Ovis musimon',
      },
      {
        value: '60747b93-2f8e-40f6-8063-cc79d01d5205',
        label: 'Gecko, tokay',
        subLabel: 'Gekko gecko',
      },
    ],
  },
  {
    country: 'Austria',
    options: [
      {
        value: '14679bf6-7e43-4897-8c83-82d267ebdb33',
        label: 'Weaver, lesser masked',
        subLabel: 'Ploceus intermedius',
      },
      {
        value: '3b1e2e1e-f20e-4683-9a3f-5b54665c32dd',
        label: 'Striped hyena',
        subLabel: 'Hyaena hyaena',
      },
      {
        value: 'd63bd6c6-97ea-4aa6-993e-6c46d6b2cd80',
        label: 'Pronghorn',
        subLabel: 'Antilocapra americana',
      },
      {
        value: '26cce89a-924a-44c6-93a6-6e14320e8b6f',
        label: 'Blue fox',
        subLabel: 'Alopex lagopus',
      },
      {
        value: 'a6d0bc83-54f3-4979-b235-0511947888f4',
        label: 'Admiral, indian red',
        subLabel: 'Vanessa indica',
      },
    ],
  },
  {
    country: 'United States',
    options: [
      {
        value: '1ef74dd7-9fcb-4436-a1cd-1c0ba4727f59',
        label: 'California sea lion',
        subLabel: 'Zalophus californicus',
      },
      {
        value: '8680e372-1f3c-48ff-a7c1-e466e249bb9a',
        label: 'Galapagos hawk',
        subLabel: 'Buteo galapagoensis',
      },
      {
        value: '6cfae7fe-81e5-4e11-8efc-056a0f3c6ee4',
        label: 'North American porcupine',
        subLabel: 'Erethizon dorsatum',
      },
      {
        value: '4bbddf78-c926-476e-af39-8dcff511bac0',
        label: 'Common rhea',
        subLabel: 'Rhea americana',
      },
      {
        value: 'eef11e08-e30b-42f7-ad92-0bd8f129e108',
        label: 'River wallaby',
        subLabel: 'Macropus agilis',
      },
    ],
  },
  {
    country: 'Sweden',
    options: [
      {
        value: '3a2860af-88d1-4d9e-ba14-f290fce32a26',
        label: 'Alligator, mississippi',
        subLabel: 'Alligator mississippiensis',
      },
      {
        value: 'e4cb0061-020c-4a5f-b6d9-8acb9a3bb0bb',
        label: 'Dolphin, common',
        subLabel: 'Delphinus delphis',
      },
      {
        value: 'bbf08d11-88cf-4d3e-b411-5409db3cb57c',
        label: 'Goldeneye, barrows',
        subLabel: 'Bucephala clangula',
      },
      {
        value: 'b1fb350c-5977-4e81-b25c-c2507181ebd0',
        label: 'Bateleur eagle',
        subLabel: 'Terathopius ecaudatus',
      },
      {
        value: 'f00849ca-38fd-4255-b833-ce23e8f17058',
        label: 'Macaw, scarlet',
        subLabel: 'Ara macao',
      },
    ],
  },
];
