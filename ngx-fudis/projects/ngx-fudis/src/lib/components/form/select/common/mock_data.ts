import { FudisSelectOption } from '../../../../types/forms';

interface MockSelectOptionGroupData {
  country: string;
  options: FudisSelectOption[];
}

export const defaultOptions: FudisSelectOption[] = [
  { value: 'value-1-dog', label: 'Dog' },
  { value: 'value-2-capybara', label: 'Capybara' },
  { value: 'value-3-platypys', label: 'Platypus' },
  { value: 'value-4-cat', label: 'Really dangerous cat', disabled: true },
  { value: 'value-5-armadillo', label: 'Screaming hairy armadillo' },
  { value: 'value-6-gecko', label: 'Southern Titiwangsa Bent-Toed Gecko' },
];

export const multiselectChipListMockData: FudisSelectOption[] = [
  { value: 'hereford', label: 'Hereford' },
  { value: 'texas-longhorn', label: 'Texas Longhorn' },
  { value: 'ayrshire', label: 'Ayrshire' },
  { value: 'wagyu', label: 'Wagyu' },
];

export const selectMockData: FudisSelectOption[] = [
  {
    value: '4257d865-872c-4ea6-80e6-8bd04ce56ad7',
    label: 'Golden jackal',
    scienceName: 'Canis aureus',
  },
  {
    value: 'e2fa6f0a-632a-485f-8ccf-b984311fe3b4',
    label: 'Mountain lion',
    scienceName: 'Felis concolor',
  },
  {
    value: '0cf7dff9-10e4-400b-b8e0-828b2e0baf30',
    label: 'Cat, european wild',
    scienceName: 'Felis silvestris lybica',
  },
  {
    value: 'd2e85262-d477-4485-8dd8-658d37adbd55',
    label: 'Black-faced kangaroo',
    scienceName: 'Macropus fuliginosus',
  },
  {
    value: '4afa4f18-575b-4272-a2c3-f75a8e564350',
    label: 'Snake, western patch-nosed',
    scienceName: 'Salvadora hexalepis',
  },
  {
    value: '4ae756e1-3ace-43a4-8c47-7081328970b1',
    label: 'Small Indian mongoose',
    scienceName: 'Herpestes javanicus',
  },
  {
    value: 'c0cba653-c8eb-410d-bf65-32d2353e1fca',
    label: 'Falcon, prairie',
    scienceName: 'Falco mexicanus',
  },
  {
    value: 'cc5a789e-6a7c-471a-a931-40edd734cbad',
    label: 'Spotted hyena',
    scienceName: 'Crocuta crocuta',
  },
  {
    value: 'f78a9645-d320-42a0-a492-b1c2502ac89c',
    label: 'Little brown bat',
    scienceName: 'Myotis lucifugus',
  },
  {
    value: '47ffe62a-fe74-41c2-a3ea-607c29d04a1f',
    label: 'Golden eagle',
    scienceName: 'Aquila chrysaetos',
  },
  {
    value: '4c08f813-45b6-4a32-99de-eee6a80a555a',
    label: 'Salmon pink bird eater tarantula',
    scienceName: 'Lasiodora parahybana',
  },
  {
    value: '98bd0882-5bc8-435f-932d-0bf7495b0608',
    label: 'Crane, sandhill',
    scienceName: 'Grus canadensis',
  },
  {
    value: '967d39b8-f85a-45aa-952e-8d0607dde1f6',
    label: 'Arctic fox',
    scienceName: 'Alopex lagopus',
  },
  {
    value: '80a3f1d5-8faa-4010-864b-22635742523b',
    label: 'Black-crowned crane',
    scienceName: 'Balearica pavonina',
  },
  {
    value: '8bfaf344-19e9-4c08-bddb-0bc63e0fba68',
    label: 'Olive baboon',
    scienceName: 'Papio cynocephalus',
  },
  {
    value: '6016e625-a51e-4ba2-86df-2f242cbd6576',
    label: 'Duck, comb',
    scienceName: 'Sarkidornis melanotos',
  },
  {
    value: '6e7c3846-625a-44e5-a6b8-ef051f2560b8',
    label: 'Brown pelican',
    scienceName: 'Pelecanus occidentalis',
  },
  {
    value: '129ddb5c-0eb8-40f2-9b0b-79fe66646c8b',
    label: 'Porcupine, crested',
    scienceName: 'Hystrix cristata',
  },
  {
    value: 'adc54363-0f1c-49ea-b08a-7a46754ff252',
    label: 'Porcupine, tree',
    scienceName: 'Coendou prehensilis',
  },
  {
    value: '2b9f2bc3-2603-4842-932f-c935f765cf74',
    label: 'Dark-winged trumpeter',
    scienceName: 'Psophia viridis',
  },
  {
    value: 'b245eab0-4fc2-4326-a410-5c73137e77ce',
    label: 'Skunk, western spotted',
    scienceName: 'Spilogale gracilis',
  },
  {
    value: '11e6ac61-5983-41d7-8a2f-884211068f21',
    label: 'White-cheeked pintail',
    scienceName: 'Anas bahamensis',
  },
  {
    value: 'e6700299-9021-4388-b304-e17175d65fa1',
    label: 'Painted stork',
    scienceName: 'Mycteria leucocephala',
  },
  {
    value: 'b5d46f6f-c1bd-4658-abe9-5907b7525d72',
    label: 'Ostrich',
    scienceName: 'Struthio camelus',
  },
  {
    value: '7124bc46-d0bf-4195-873e-00e562052b4b',
    label: 'Heron, goliath',
    scienceName: 'Ardea golieth',
  },
  {
    value: 'ab53b639-c94d-4b6b-8b62-bdbfeae24138',
    label: 'Ringtail cat',
    scienceName: 'Bassariscus astutus',
  },
  {
    value: 'e0051452-f1e3-4aa0-b206-eee538d2fb41',
    label: 'Kangaroo, western grey',
    scienceName: 'Macropus fuliginosus',
  },
  {
    value: '6e9d72b4-baf3-41bb-8547-775329bcfded',
    label: 'Deer, spotted',
    scienceName: 'Axis axis',
  },
  {
    value: 'd2306f4f-0093-444e-8f92-5d6f2173f6e0',
    label: 'Hoopoe, eurasian',
    scienceName: 'Upupa epops',
  },
  {
    value: '3213af0c-f256-4fad-a01f-1b3527799976',
    label: 'Black vulture',
    scienceName: 'Aegypius tracheliotus',
  },
  {
    value: '023265a1-3286-44a7-a253-91a0b37b6dce',
    label: 'Asian elephant',
    scienceName: 'Elephas maximus bengalensis',
  },
  {
    value: 'f6777bbd-b234-4a0b-8232-f70367986688',
    label: 'Cat, african wild',
    scienceName: 'Felis silvestris lybica',
  },
  {
    value: '925e74ab-9e00-49ff-a301-300bade8ff21',
    label: 'Pheasant, ring-necked',
    scienceName: 'Phasianus colchicus',
  },
  {
    value: '32771685-0a4b-4d52-a27f-2477c50bb051',
    label: 'Mouflon',
    scienceName: 'Ovis musimon',
  },
  {
    value: '60747b93-2f8e-40f6-8063-cc79d01d5205',
    label: 'Gecko, tokay',
    scienceName: 'Gekko gecko',
  },
  {
    value: '14679bf6-7e43-4897-8c83-82d267ebdb33',
    label: 'Weaver, lesser masked',
    scienceName: 'Ploceus intermedius',
  },
  {
    value: '3b1e2e1e-f20e-4683-9a3f-5b54665c32dd',
    label: 'Striped hyena',
    scienceName: 'Hyaena hyaena',
  },
  {
    value: 'd63bd6c6-97ea-4aa6-993e-6c46d6b2cd80',
    label: 'Pronghorn',
    scienceName: 'Antilocapra americana',
  },
  {
    value: '26cce89a-924a-44c6-93a6-6e14320e8b6f',
    label: 'Blue fox',
    scienceName: 'Alopex lagopus',
  },
  {
    value: 'a6d0bc83-54f3-4979-b235-0511947888f4',
    label: 'Admiral, indian red',
    scienceName: 'Vanessa indica',
  },
  {
    value: '1ef74dd7-9fcb-4436-a1cd-1c0ba4727f59',
    label: 'California sea lion',
    scienceName: 'Zalophus californicus',
  },
  {
    value: '8680e372-1f3c-48ff-a7c1-e466e249bb9a',
    label: 'Galapagos hawk',
    scienceName: 'Buteo galapagoensis',
  },
  {
    value: '6cfae7fe-81e5-4e11-8efc-056a0f3c6ee4',
    label: 'North American porcupine',
    scienceName: 'Erethizon dorsatum',
  },
  {
    value: '4bbddf78-c926-476e-af39-8dcff511bac0',
    label: 'Common rhea',
    scienceName: 'Rhea americana',
  },
  {
    value: 'eef11e08-e30b-42f7-ad92-0bd8f129e108',
    label: 'River wallaby',
    scienceName: 'Macropus agilis',
  },
  {
    value: '3a2860af-88d1-4d9e-ba14-f290fce32a26',
    label: 'Alligator, mississippi',
    scienceName: 'Alligator mississippiensis',
  },
  {
    value: 'e4cb0061-020c-4a5f-b6d9-8acb9a3bb0bb',
    label: 'Dolphin, common',
    scienceName: 'Delphinus delphis',
  },
  {
    value: 'bbf08d11-88cf-4d3e-b411-5409db3cb57c',
    label: 'Goldeneye, barrows',
    scienceName: 'Bucephala clangula',
  },
  {
    value: 'b1fb350c-5977-4e81-b25c-c2507181ebd0',
    label: 'Bateleur eagle',
    scienceName: 'Terathopius ecaudatus',
  },
  {
    value: 'f00849ca-38fd-4255-b833-ce23e8f17058',
    label: 'Macaw, scarlet',
    scienceName: 'Ara macao',
  },
  {
    value: '69c65883-fb18-4797-a0d2-759fe5b004b1',
    label: 'Anteater, australian spiny',
    scienceName: 'Tachyglossus aculeatus',
  },
  {
    value: 'd122e373-f068-4ee0-a32f-ba21661642c1',
    label: 'Secretary bird',
    scienceName: 'Sagittarius serpentarius',
  },
  {
    value: 'f4e455c7-acb8-4f0c-826d-e1b0964fefe2',
    label: 'Heron, little',
    scienceName: 'Butorides striatus',
  },
  {
    value: '335cff54-abd6-4a40-a528-401490c4ece9',
    label: 'Tiger snake',
    scienceName: 'Notechis semmiannulatus',
  },
  {
    value: '381453be-9d58-406d-b052-f7a4f18bea43',
    label: 'Gecko, bent-toed',
    scienceName: 'Cyrtodactylus louisiadensis',
  },
  {
    value: 'f9fb00d8-f741-49c4-b3bb-b93b12f35c4f',
    label: 'Whale, southern right',
    scienceName: 'Eubalaena australis',
  },
  {
    value: 'e61d8d16-57b1-4de0-b518-7349ad39b802',
    label: 'Eurasian beaver',
    scienceName: 'Castor fiber',
  },
  {
    value: 'e88c321f-8692-46fd-a4f0-96e4034e0467',
    label: 'Raven, white-necked',
    scienceName: 'Corvus albicollis',
  },
  {
    value: 'b8a90193-bfe8-4145-92d9-386f923ef567',
    label: 'Hawk-eagle, crowned',
    scienceName: 'Spizaetus coronatus',
  },
  {
    value: 'b4cf080d-12e2-4808-b419-df0ab881e79f',
    label: 'Red-tailed hawk',
    scienceName: 'Buteo jamaicensis',
  },
  {
    value: '637d86a6-dd93-4d7a-955a-3a910ae552e7',
    label: 'Eland, common',
    scienceName: 'Taurotagus oryx',
  },
  {
    value: '3496a809-a782-46df-8063-3bf385f3a574',
    label: 'Argalis',
    scienceName: 'Ovis ammon',
  },
  {
    value: 'a2f507a3-57d7-4ac3-a5f9-2c5022687246',
    label: 'Grison',
    scienceName: 'Galictis vittata',
  },
  {
    value: '35002faa-3a9b-4047-b084-97cdb23659db',
    label: 'Egyptian goose',
    scienceName: 'Alopochen aegyptiacus',
  },
  {
    value: 'e8a82a67-e9fc-4d37-8387-5bf8f1c70fb4',
    label: 'Green-winged trumpeter',
    scienceName: 'Psophia viridis',
  },
  {
    value: 'b9eb80d8-56da-478f-b7ea-14a17d2ee3ef',
    label: 'Quoll, eastern',
    scienceName: 'Dasyurus viverrinus',
  },
  {
    value: '34867681-c8ab-4655-be39-ae3e80b8992b',
    label: 'Galapagos dove',
    scienceName: 'Zenaida galapagoensis',
  },
  {
    value: 'dfa451dc-73a1-4dca-bd94-f786445bb53e',
    label: 'Honey badger',
    scienceName: 'Mellivora capensis',
  },
  {
    value: 'e22b9c65-6bfb-46a7-8959-364bf1e7c22e',
    label: 'Ferret, black-footed',
    scienceName: 'Mustela nigripes',
  },
  {
    value: 'd6753f96-ff13-45c3-925d-a7978a9276c1',
    label: 'Porcupine, indian',
    scienceName: 'Hystrix indica',
  },
  {
    value: 'e2e1c19e-32fe-4652-8d1d-ca63dedd8eb7',
    label: 'Bontebok',
    scienceName: 'Damaliscus dorcas',
  },
  {
    value: 'ad632065-009c-46e6-a417-3f94bac42450',
    label: 'Mexican wolf',
    scienceName: 'Canis lupus baileyi',
  },
  {
    value: '05125644-050d-4758-a19a-95348ca21f93',
    label: 'Squirrel, arctic ground',
    scienceName: 'Spermophilus parryii',
  },
  {
    value: '08d96def-32c8-4864-bb26-b94c25d0899b',
    label: 'Arctic lemming',
    scienceName: 'Dicrostonyx groenlandicus',
  },
  {
    value: '032b1ae2-d778-4a11-9f7d-ae2a04ef04d9',
    label: 'Dassie',
    scienceName: 'Dendrohyrax brucel',
  },
  {
    value: 'b2ac5716-4e94-4088-90d8-7f183b49c24b',
    label: 'Ocelot',
    scienceName: 'Felis pardalis',
  },
  {
    value: '6ee6d521-bf62-491d-90d8-722c802c35b0',
    label: 'Toddy cat',
    scienceName: 'Paradoxurus hermaphroditus',
  },
  {
    value: 'da3a575f-838b-4d1e-92f2-610f12f0650d',
    label: 'Tarantula, salmon pink bird eater',
    scienceName: 'Lasiodora parahybana',
  },
  {
    value: 'd2502ddf-ee92-480c-b3f3-478760b70d4e',
    label: 'Cardinal, red-capped',
    scienceName: 'Paroaria gularis',
  },
  {
    value: '7e844f55-658d-41d3-a623-cb133ffc10f7',
    label: 'Heron, boat-billed',
    scienceName: 'Cochlearius cochlearius',
  },
  {
    value: '13a0be0e-acce-4475-8467-d71981c9a364',
    label: 'Camel, dromedary',
    scienceName: 'Camelus dromedarius',
  },
  {
    value: '0aa92ce7-1509-47ca-80ae-9f1fd038848f',
    label: 'Silver-backed fox',
    scienceName: 'Vulpes chama',
  },
  {
    value: 'f8dadc5f-25e5-445c-995e-ac34d8331174',
    label: 'Black swan',
    scienceName: 'Cygnus atratus',
  },
  {
    value: 'ad4badca-9ba5-4e8a-aa32-ec1aabd4c9ab',
    label: 'Possum, golden brush-tailed',
    scienceName: 'Trichosurus vulpecula',
  },
  {
    value: '7c865a18-7828-4649-88fd-1f3eac61275c',
    label: 'Puma',
    scienceName: 'Felis concolor',
  },
  {
    value: '1eb55202-2cf7-4a5c-8c9c-3dc893fd0d5a',
    label: 'Cape clawless otter',
    scienceName: 'Aonyx capensis',
  },
  {
    value: 'a9ee4847-7dd8-4fab-8375-bfcfbf3c4b2f',
    label: 'Kudu, greater',
    scienceName: 'Tragelaphus strepsiceros',
  },
  {
    value: '4082c986-4d25-4e40-be42-700d89a12be2',
    label: 'Blue-faced booby',
    scienceName: 'Sula dactylatra',
  },
  {
    value: '384c1bb6-f3cf-42e5-9f8a-b3f3e4012695',
    label: 'White-fronted bee-eater',
    scienceName: 'Merops bullockoides',
  },
  {
    value: '3f3192c4-7848-46d4-8758-eb9047dd998c',
    label: 'Sloth, two-toed',
    scienceName: 'Choloepus hoffmani',
  },
  {
    value: 'f8f5cd29-5fcd-4578-82af-1c3feae51f4f',
    label: 'Caribou',
    scienceName: 'Rangifer tarandus',
  },
  {
    value: '45b71ecf-c3c3-4dfd-8ee4-a8596876ac8c',
    label: 'Wagtail, african pied',
    scienceName: 'Motacilla aguimp',
  },
  {
    value: '9ab4dbfa-9692-4d1c-8486-6bad752719ab',
    label: 'Prairie falcon',
    scienceName: 'Falco mexicanus',
  },
  {
    value: 'cce5b4fc-a04a-4e27-81bb-6a0e50b484f9',
    label: 'Springhare',
    scienceName: 'Pedetes capensis',
  },
  {
    value: '75fbf0ae-cfaf-472b-9774-38b7ad34e25b',
    label: 'Deer, swamp',
    scienceName: 'Cervus duvauceli',
  },
  {
    value: '58d83c5c-7084-495e-8915-ac269861b185',
    label: 'Seal, common',
    scienceName: 'Phoca vitulina',
  },
  {
    value: 'ade72864-63a9-4df6-bfc2-ed4a83cb5f65',
    label: 'Wombat, common',
    scienceName: 'Vombatus ursinus',
  },
  {
    value: '32fbfa2d-54db-4ef8-847d-b18268eab82c',
    label: 'White-lipped peccary',
    scienceName: 'Tayassu pecari',
  },
  {
    value: '118b061f-04df-4d65-aa4a-6836b3e01d78',
    label: 'Phalarope, red',
    scienceName: 'Phalaropus fulicarius',
  },
  {
    value: 'e469787a-8cfe-4929-a019-1a466b5ca8c9',
    label: 'Blue peacock',
    scienceName: 'Pavo cristatus',
  },
  {
    value: '78c7f7bb-5075-441b-b923-4f706a809260',
    label: 'Plains zebra',
    scienceName: 'Equus burchelli',
  },
  {
    value: 'f0f115e2-e93c-4ab4-8b23-5b0719f1b95d',
    label: 'Pheasant, common',
    scienceName: 'Phasianus colchicus',
  },
  {
    value: '7a4462e4-22f2-4426-8a19-bfd8a5fee829',
    label: 'Brown capuchin',
    scienceName: 'Cebus apella',
  },
  {
    value: '6f24b762-2a54-4ae6-b03c-65ca85b9fc5a',
    label: 'White-winged dove',
    scienceName: 'Zenaida asiatica',
  },
  {
    value: 'aabc9b50-a60d-4b85-916b-05d4f2452a8e',
    label: 'Pintail, bahama',
    scienceName: 'Anas bahamensis',
  },
  {
    value: 'a03ba637-3733-42b7-98ca-5847ab8a2e95',
    label: 'Macaw, blue and gold',
    scienceName: 'Ara ararauna',
  },
  {
    value: 'ad11a271-454e-4a15-9fa1-8542012278b2',
    label: 'Gecko (unidentified)',
    scienceName: 'unavailable',
  },
  {
    value: '26430ad4-c8c6-4376-aaaa-990a26ec5de9',
    label: 'Cormorant, javanese',
    scienceName: 'Phalacrocorax niger',
  },
  {
    value: 'bc653d0b-9493-4e77-90d8-84a67072183d',
    label: 'Squirrel, uinta ground',
    scienceName: 'Spermophilus armatus',
  },
  {
    value: '83b21dcd-6480-4a31-860c-2468340840c6',
    label: 'Heron, giant',
    scienceName: 'Ardea golieth',
  },
  {
    value: 'ba355040-6ba8-49a4-ba14-6637f2e5c63f',
    label: 'Common turkey',
    scienceName: 'Meleagris gallopavo',
  },
  {
    value: '96842ed2-9363-42ae-988d-6b89ef6ddd7f',
    label: 'Macaw, green-winged',
    scienceName: 'Ara chloroptera',
  },
  {
    value: '6d811f5f-8094-48b8-8b4d-5f4a4ce45caf',
    label: 'Water legaan',
    scienceName: 'Varanus salvator',
  },
  {
    value: 'ec642cfb-fbba-41ba-96ae-65c8631d6c7b',
    label: 'Woodcock, american',
    scienceName: 'Scolopax minor',
  },
  {
    value: '535809e1-e801-4e9c-a635-d8e3f63d51c9',
    label: 'Flying fox (unidentified)',
    scienceName: 'unavailable',
  },
  {
    value: '74702bba-2dbe-42e9-94e8-d40fa16c64bb',
    label: 'Lappet-faced vulture',
    scienceName: 'Aegypius tracheliotus',
  },
  {
    value: '55a068f5-5f81-4c56-921c-5487d0c430b8',
    label: 'Bushbuck',
    scienceName: 'Tragelaphus scriptus',
  },
  {
    value: 'c4598372-655f-45fa-81a6-01caf4800cf2',
    label: 'Shark, blue',
    scienceName: 'Prionace glauca',
  },
  {
    value: 'e9dc391c-5f76-4aff-bfd8-9b4b11aa6549',
    label: 'Madagascar fruit bat',
    scienceName: 'Pteropus rufus',
  },
  {
    value: '76765959-44d8-4fed-8e62-df3193debe00',
    label: 'Fisher',
    scienceName: 'Martes pennanti',
  },
  {
    value: 'ce99a7e9-2ebb-4e3f-beae-16683eea5bf4',
    label: 'Eagle, long-crested hawk',
    scienceName: 'Lophoaetus occipitalis',
  },
  {
    value: 'd149ca69-c376-42c7-9243-03e97fa09e8a',
    label: 'Beaver, american',
    scienceName: 'Castor canadensis',
  },
  {
    value: 'd27c2349-41b8-4b1d-aadb-fcd1a6e1be58',
    label: 'Otter, north american river',
    scienceName: 'Lutra canadensis',
  },
  {
    value: '70d02ddf-1ca1-418b-bc80-ff478502c909',
    label: 'Woodpecker, red-headed',
    scienceName: 'Melanerpes erythrocephalus',
  },
  {
    value: '732b36e5-29cb-4b4c-ac56-f17250522615',
    label: 'Shrew, mandras tree',
    scienceName: 'Anathana ellioti',
  },
  {
    value: '548d78da-ec05-4b55-b959-3c16d050e04a',
    label: 'Peregrine falcon',
    scienceName: 'Falco peregrinus',
  },
  {
    value: 'b6025cab-d79d-41cf-8d04-2675eaab84a8',
    label: 'Two-toed sloth',
    scienceName: 'Choloepus hoffmani',
  },
  {
    value: 'e35a2e38-42e5-4ddf-b4c8-dc1f6d4c792f',
    label: 'House crow',
    scienceName: 'Corvus brachyrhynchos',
  },
  {
    value: 'ce6e0495-ba74-4db1-827a-4899187ed51d',
    label: 'Superb starling',
    scienceName: 'Lamprotornis superbus',
  },
  {
    value: '28eedda1-6255-4e74-bc91-855a323c3eb4',
    label: 'Serval',
    scienceName: 'Felis serval',
  },
  {
    value: '4b9d6ddc-3e75-4cb4-9fac-ec374cd6f96e',
    label: 'Coqui partridge',
    scienceName: 'Francolinus coqui',
  },
  {
    value: 'd6fec124-4349-46f8-ae10-9da6274cb7fa',
    label: 'Gray rhea',
    scienceName: 'Rhea americana',
  },
  {
    value: '87bef4c3-7fab-49dd-a21f-ec0fc67edb25',
    label: 'American black bear',
    scienceName: 'Ursus americanus',
  },
  {
    value: '9c305438-d61a-4b71-9bb3-863a39ca3582',
    label: 'Little blue penguin',
    scienceName: 'Eudyptula minor',
  },
  {
    value: '30b2bc16-9017-40d9-a3af-667771cfcd61',
    label: 'Potoroo',
    scienceName: 'Potorous tridactylus',
  },
  {
    value: 'ba897b7f-0a9f-4248-89cd-7d803f014a51',
    label: 'Booby, masked',
    scienceName: 'Sula dactylatra',
  },
  {
    value: '9afd3df5-9ca8-4b14-908c-94f737cac644',
    label: 'Phascogale, brush-tailed',
    scienceName: 'Phascogale tapoatafa',
  },
  {
    value: 'b5fd0fbd-31bc-4cb3-9eca-7c408156aed2',
    label: 'Cape fox',
    scienceName: 'Vulpes chama',
  },
  {
    value: '2d4314d7-fbac-45dd-a2e3-40382482aac2',
    label: 'Rat, white-faced tree',
    scienceName: 'Echimys chrysurus',
  },
  {
    value: '063e1a09-2d40-4a8a-ae1f-0b60a844d47d',
    label: 'Hottentot teal',
    scienceName: 'Anas punctata',
  },
  {
    value: '93c7730a-95e5-4d2b-8d65-8b1372a2d199',
    label: 'Gorilla, western lowland',
    scienceName: 'Gorilla gorilla',
  },
  {
    value: '4144359e-76e9-4113-b6ab-d8f5ec7ac36a',
    label: 'Genoveva',
    scienceName: 'Junonia genoveua',
  },
  {
    value: '553513a0-ae16-4dfa-b250-d9c52642fa8f',
    label: 'Wapiti, elk,',
    scienceName: 'Cervus canadensis',
  },
  {
    value: '333fba4c-423e-4748-84f6-268f9b9a05bc',
    label: 'Red squirrel',
    scienceName: 'Tamiasciurus hudsonicus',
  },
  {
    value: '78ba2cb2-9264-495d-886a-e0980fb71989',
    label: 'Porcupine, north american',
    scienceName: 'Erethizon dorsatum',
  },
  {
    value: '9172fecc-f0b7-4bc0-931f-2fde2c57f7a3',
    label: 'Buffalo, asian water',
    scienceName: 'Bubalus arnee',
  },
  {
    value: 'd5585c5b-afbc-48f5-b608-37ab074e0aed',
    label: 'Kingfisher, malachite',
    scienceName: 'Corythornis cristata',
  },
  {
    value: '495617dd-9bcc-4b61-939e-645f08826aef',
    label: 'Lizard, frilled',
    scienceName: 'Chlamydosaurus kingii',
  },
  {
    value: '0a52f284-c438-4645-9315-4f6a9b25e01e',
    label: 'Common mynah',
    scienceName: 'Acridotheres tristis',
  },
  {
    value: 'ec0be067-b20e-484a-ae91-73c28d2ac086',
    label: 'Antelope ground squirrel',
    scienceName: 'Ammospermophilus nelsoni',
  },
  {
    value: '80fb6818-8932-4c30-85d3-1b1bad65edcf',
    label: 'Timber wolf',
    scienceName: 'Canis lupus lycaon',
  },
  {
    value: '78cbfde5-5b25-46de-8c7c-a3340ae513b0',
    label: 'White-throated kingfisher',
    scienceName: 'Halcyon smyrnesis',
  },
  {
    value: '875d924b-0722-4890-932e-da705e4040ca',
    label: 'Black-necked stork',
    scienceName: 'Ephippiorhynchus mycteria',
  },
  {
    value: 'e4784a90-b486-4386-b89c-f66407cebd3e',
    label: 'Woylie',
    scienceName: 'Bettongia penicillata',
  },
  {
    value: 'ca641e5d-37e2-43d1-8785-6cc783482969',
    label: 'Gnu, brindled',
    scienceName: 'Connochaetus taurinus',
  },
  {
    value: '8e9f0d5c-cdc8-4678-a4d8-c3e62fa35389',
    label: 'Swamp deer',
    scienceName: 'Cervus duvauceli',
  },
  {
    value: '81a25200-fff2-44a5-af6c-a3e6bfb87b75',
    label: 'Greater adjutant stork',
    scienceName: 'Leptoptilus dubius',
  },
  {
    value: '423b43d0-41a9-40b9-b253-0fb2f35c9be5',
    label: 'Laughing dove',
    scienceName: 'Streptopelia senegalensis',
  },
  {
    value: '83d82ba5-60d4-4d4b-9845-bd44a19b76b4',
    label: 'Fox, silver-backed',
    scienceName: 'Vulpes chama',
  },
  {
    value: 'ac222ae0-2364-4c70-a8e2-91b8849b1b0a',
    label: 'Cobra, cape',
    scienceName: 'Naja nivea',
  },
  {
    value: 'd81a27c2-50de-4bb0-aafd-369dc0fb9b36',
    label: 'Hornbill, yellow-billed',
    scienceName: 'Tockus flavirostris',
  },
  {
    value: '93d97bcf-298b-4c45-bc35-887d245ed323',
    label: 'Cat, ringtail',
    scienceName: 'Bassariscus astutus',
  },
  {
    value: '036d3dfc-d70b-44d1-98c6-2d75bc57d5a6',
    label: 'Common zorro',
    scienceName: 'Dusicyon thous',
  },
  {
    value: '79edacf2-2356-4c2c-b9be-b3879dffcf81',
    label: 'Legaan, ground',
    scienceName: 'Varanus sp.',
  },
];

export const smallGroupedMockData: MockSelectOptionGroupData[] = [
  {
    country: 'Netherlands',
    options: [
      {
        value: '4257d865-872c-4ea6-80e6-8bd04ce56ad7',
        label: 'Golden jackal',
        scienceName: 'Canis aureus',
      },
      {
        value: 'e2fa6f0a-632a-485f-8ccf-b984311fe3b4',
        label: 'Mountain lion',
        scienceName: 'Felis concolor',
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
        scienceName: 'Canis aureus',
      },
      {
        value: 'e2fa6f0a-632a-485f-8ccf-b984311fe3b4',
        label: 'Mountain lion',
        scienceName: 'Felis concolor',
      },
      {
        value: '0cf7dff9-10e4-400b-b8e0-828b2e0baf30',
        label: 'Cat, european wild',
        scienceName: 'Felis silvestris lybica',
      },
      {
        value: 'd2e85262-d477-4485-8dd8-658d37adbd55',
        label: 'Black-faced kangaroo',
        scienceName: 'Macropus fuliginosus',
      },
      {
        value: '4afa4f18-575b-4272-a2c3-f75a8e564350',
        label: 'Snake, western patch-nosed',
        scienceName: 'Salvadora hexalepis',
      },
    ],
  },
  {
    country: 'Brazil',
    options: [
      {
        value: '4ae756e1-3ace-43a4-8c47-7081328970b1',
        label: 'Small Indian mongoose',
        scienceName: 'Herpestes javanicus',
      },
      {
        value: 'c0cba653-c8eb-410d-bf65-32d2353e1fca',
        label: 'Falcon, prairie',
        scienceName: 'Falco mexicanus',
      },
      {
        value: 'cc5a789e-6a7c-471a-a931-40edd734cbad',
        label: 'Spotted hyena',
        scienceName: 'Crocuta crocuta',
      },
      {
        value: 'f78a9645-d320-42a0-a492-b1c2502ac89c',
        label: 'Little brown bat',
        scienceName: 'Myotis lucifugus',
      },
      {
        value: '47ffe62a-fe74-41c2-a3ea-607c29d04a1f',
        label: 'Golden eagle',
        scienceName: 'Aquila chrysaetos',
      },
    ],
  },
  {
    country: 'China',
    options: [
      {
        value: '4c08f813-45b6-4a32-99de-eee6a80a555a',
        label: 'Salmon pink bird eater tarantula',
        scienceName: 'Lasiodora parahybana',
      },
      {
        value: '98bd0882-5bc8-435f-932d-0bf7495b0608',
        label: 'Crane, sandhill',
        scienceName: 'Grus canadensis',
      },
      {
        value: '967d39b8-f85a-45aa-952e-8d0607dde1f6',
        label: 'Arctic fox',
        scienceName: 'Alopex lagopus',
      },
      {
        value: '80a3f1d5-8faa-4010-864b-22635742523b',
        label: 'Black-crowned crane',
        scienceName: 'Balearica pavonina',
      },
      {
        value: '8bfaf344-19e9-4c08-bddb-0bc63e0fba68',
        label: 'Olive baboon',
        scienceName: 'Papio cynocephalus',
      },
    ],
  },
  {
    country: 'Indonesia',
    options: [
      {
        value: '6016e625-a51e-4ba2-86df-2f242cbd6576',
        label: 'Duck, comb',
        scienceName: 'Sarkidornis melanotos',
      },
      {
        value: '6e7c3846-625a-44e5-a6b8-ef051f2560b8',
        label: 'Brown pelican',
        scienceName: 'Pelecanus occidentalis',
      },
      {
        value: '129ddb5c-0eb8-40f2-9b0b-79fe66646c8b',
        label: 'Porcupine, crested',
        scienceName: 'Hystrix cristata',
      },
      {
        value: 'adc54363-0f1c-49ea-b08a-7a46754ff252',
        label: 'Porcupine, tree',
        scienceName: 'Coendou prehensilis',
      },
      {
        value: '2b9f2bc3-2603-4842-932f-c935f765cf74',
        label: 'Dark-winged trumpeter',
        scienceName: 'Psophia viridis',
      },
    ],
  },
  {
    country: 'Colombia',
    options: [
      {
        value: 'b245eab0-4fc2-4326-a410-5c73137e77ce',
        label: 'Skunk, western spotted',
        scienceName: 'Spilogale gracilis',
      },
      {
        value: '11e6ac61-5983-41d7-8a2f-884211068f21',
        label: 'White-cheeked pintail',
        scienceName: 'Anas bahamensis',
      },
      {
        value: 'e6700299-9021-4388-b304-e17175d65fa1',
        label: 'Painted stork',
        scienceName: 'Mycteria leucocephala',
      },
      {
        value: 'b5d46f6f-c1bd-4658-abe9-5907b7525d72',
        label: 'Ostrich',
        scienceName: 'Struthio camelus',
      },
      {
        value: '7124bc46-d0bf-4195-873e-00e562052b4b',
        label: 'Heron, goliath',
        scienceName: 'Ardea golieth',
      },
    ],
  },
  {
    country: 'Canada',
    options: [
      {
        value: 'ab53b639-c94d-4b6b-8b62-bdbfeae24138',
        label: 'Ringtail cat',
        scienceName: 'Bassariscus astutus',
      },
      {
        value: 'e0051452-f1e3-4aa0-b206-eee538d2fb41',
        label: 'Kangaroo, western grey',
        scienceName: 'Macropus fuliginosus',
      },
      {
        value: '6e9d72b4-baf3-41bb-8547-775329bcfded',
        label: 'Deer, spotted',
        scienceName: 'Axis axis',
      },
      {
        value: 'd2306f4f-0093-444e-8f92-5d6f2173f6e0',
        label: 'Hoopoe, eurasian',
        scienceName: 'Upupa epops',
      },
      {
        value: '3213af0c-f256-4fad-a01f-1b3527799976',
        label: 'Black vulture',
        scienceName: 'Aegypius tracheliotus',
      },
    ],
  },
  {
    country: 'Malaysia',
    options: [
      {
        value: '023265a1-3286-44a7-a253-91a0b37b6dce',
        label: 'Asian elephant',
        scienceName: 'Elephas maximus bengalensis',
      },
      {
        value: 'f6777bbd-b234-4a0b-8232-f70367986688',
        label: 'Cat, african wild',
        scienceName: 'Felis silvestris lybica',
      },
      {
        value: '925e74ab-9e00-49ff-a301-300bade8ff21',
        label: 'Pheasant, ring-necked',
        scienceName: 'Phasianus colchicus',
      },
      {
        value: '32771685-0a4b-4d52-a27f-2477c50bb051',
        label: 'Mouflon',
        scienceName: 'Ovis musimon',
      },
      {
        value: '60747b93-2f8e-40f6-8063-cc79d01d5205',
        label: 'Gecko, tokay',
        scienceName: 'Gekko gecko',
      },
    ],
  },
  {
    country: 'Austria',
    options: [
      {
        value: '14679bf6-7e43-4897-8c83-82d267ebdb33',
        label: 'Weaver, lesser masked',
        scienceName: 'Ploceus intermedius',
      },
      {
        value: '3b1e2e1e-f20e-4683-9a3f-5b54665c32dd',
        label: 'Striped hyena',
        scienceName: 'Hyaena hyaena',
      },
      {
        value: 'd63bd6c6-97ea-4aa6-993e-6c46d6b2cd80',
        label: 'Pronghorn',
        scienceName: 'Antilocapra americana',
      },
      {
        value: '26cce89a-924a-44c6-93a6-6e14320e8b6f',
        label: 'Blue fox',
        scienceName: 'Alopex lagopus',
      },
      {
        value: 'a6d0bc83-54f3-4979-b235-0511947888f4',
        label: 'Admiral, indian red',
        scienceName: 'Vanessa indica',
      },
    ],
  },
  {
    country: 'United States',
    options: [
      {
        value: '1ef74dd7-9fcb-4436-a1cd-1c0ba4727f59',
        label: 'California sea lion',
        scienceName: 'Zalophus californicus',
      },
      {
        value: '8680e372-1f3c-48ff-a7c1-e466e249bb9a',
        label: 'Galapagos hawk',
        scienceName: 'Buteo galapagoensis',
      },
      {
        value: '6cfae7fe-81e5-4e11-8efc-056a0f3c6ee4',
        label: 'North American porcupine',
        scienceName: 'Erethizon dorsatum',
      },
      {
        value: '4bbddf78-c926-476e-af39-8dcff511bac0',
        label: 'Common rhea',
        scienceName: 'Rhea americana',
      },
      {
        value: 'eef11e08-e30b-42f7-ad92-0bd8f129e108',
        label: 'River wallaby',
        scienceName: 'Macropus agilis',
      },
    ],
  },
  {
    country: 'Sweden',
    options: [
      {
        value: '3a2860af-88d1-4d9e-ba14-f290fce32a26',
        label: 'Alligator, mississippi',
        scienceName: 'Alligator mississippiensis',
      },
      {
        value: 'e4cb0061-020c-4a5f-b6d9-8acb9a3bb0bb',
        label: 'Dolphin, common',
        scienceName: 'Delphinus delphis',
      },
      {
        value: 'bbf08d11-88cf-4d3e-b411-5409db3cb57c',
        label: 'Goldeneye, barrows',
        scienceName: 'Bucephala clangula',
      },
      {
        value: 'b1fb350c-5977-4e81-b25c-c2507181ebd0',
        label: 'Bateleur eagle',
        scienceName: 'Terathopius ecaudatus',
      },
      {
        value: 'f00849ca-38fd-4255-b833-ce23e8f17058',
        label: 'Macaw, scarlet',
        scienceName: 'Ara macao',
      },
    ],
  },
];
