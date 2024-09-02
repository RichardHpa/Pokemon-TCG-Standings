export type SetCodes =
  // Scarlet & Violet
  | 'SFA' // Shrouded Fable
  | 'TWM' // Twilight Masquerade
  | 'TEF' // Temporal Forces
  | 'PAF' // Paldean Fates
  | 'PAR' // Paradox Rift
  | 'MEW' // 151
  | 'OBF' // Obsidian Flames
  | 'PAL' // Paldea Evolved
  | 'SVI' // Scarlet & Violet
  | 'SVE' // Scarlet & Violet Energies
  // Sword & Shield
  | 'CRZ' // Crown Zenith
  | 'PR-SV' // Scarlet & Violet Black Star Promos
  | 'SIT' // Silver Tempest
  | 'SIT' // Silver Tempest Trainer Gallery
  | 'LOR' // Lost Origin Trainer Gallery
  | 'LOR' // Lost Origin
  | 'PGO' // Pokémon GO
  | 'ASR' // Astral Radiance
  | 'BRS' // Brilliant Stars
  | 'FST' // Fusion Strike
  | 'CEL' // Celebrations
  | 'EVS' // Evolving Skies
  | 'CRE' // Chilling Reign
  | 'BST' // Battle Styles
  | 'SHF' // Shining Fates Shiny Vault
  | 'SHF' // Shining Fates
  | 'VIV' // Vivid Voltage
  | 'CPA' // Champion's Path
  | 'FUT20' // Pokémon Futsal Collection
  | 'DAA' // Darkness Ablaze
  | 'RCL' // Rebel Clash
  | 'SSH' // Sword & Shield
  | 'PR-SW' // SWSH Black Star Promos
  // Sun & Moon
  | 'CEC' // Cosmic Eclipse
  | 'HIF' // Hidden Fates
  | 'UNM' // Unified Minds
  | 'UNB' // Unbroken Bonds
  | 'DET' // Detective Pikachu
  | 'TEU' // Team Up
  | 'LOT' // Lost Thunder
  | 'DRM' // Dragon Majesty
  | 'CES' // Celestial Storm
  | 'FLI' // Forbidden Light
  | 'UPR' // Ultra Prism
  | 'CIN' // Crimson Invasion
  | 'SLG' // Shining Legends
  | 'BUS' // Burning Shadows
  | 'GRI' // Guardians Rising
  | 'PR-SM' // SM Black Star Promos
  | 'SUM' // Sun & Moon
  // XY
  | 'EVO' // Evolutions
  | 'STS' // Steam Siege
  | 'FCO' // Fates Collide
  | 'GEN' // Generations
  | 'BKP' // BREAKpoint
  | 'BKT' // BREAKthrough
  | 'AOR' // Ancient Origins
  | 'ROS' // Roaring Skies
  | 'DCR' // Double Crisis
  | 'PRC' // Primal Clash
  | 'PHF' // Phantom Forces
  | 'FFI' // Furious Fists
  | 'FLF' // Flashfire
  | 'XY' // XY
  | 'KSS' // Kalos Starter Set
  // Black & White
  | 'LTR' // Legendary Treasures
  | 'PR-XY' // XY Black Star Promos
  | 'PLB' // Plasma Blast
  | 'PLF' // Plasma Freeze
  | 'PLS' // Plasma Storm
  | 'BCR' // Boundaries Crossed
  | 'DRV' // Dragon Vault
  | 'DRX' // Dragons Exalted
  | 'DEX' // Dark Explorers
  | 'NXD' // Next Destinies
  | 'NVI' // Noble Victories
  | 'EPO' // Emerging Powers
  | 'BLW' // Black & White
  | 'PR-BLW' // BW Black Star Promos
  // HeartGold & SoulSilver
  | 'CL' // Call of Legends
  | 'TM' // HS—Triumphant
  | 'UD' // HS—Undaunted
  | 'UL' // HS—Unleashed
  | 'HS' // HeartGold & SoulSilver
  | 'PR-HS' // HGSS Black Star Promos
  // Diamond & Pearl / Platinum
  | 'AR' // Arceus
  | 'SV' // Supreme Victors
  | 'RR' // Rising Rivals
  | 'PL' // Platinum
  | 'SF' // Stormfront
  | 'LA' // Legends Awakened
  | 'MD' // Majestic Dawn
  | 'GE' // Great Encounters
  | 'SW' // Secret Wonders
  | 'MT' // Mysterious Treasures
  | 'DP' // Diamond & Pearl
  | 'PR-DPP' // DP Black Star Promos
  // EX
  | 'PK' // Power Keepers
  | 'DF' // Dragon Frontiers
  | 'CG' // Crystal Guardians
  | 'HP' // Holon Phantoms
  | 'LM' // Legend Maker
  | 'DS' // Delta Species
  | 'UF' // Unseen Forces
  | 'EM' // Emerald
  | 'DX' // Deoxys
  | 'TRR' // Team Rocket Returns
  | 'RG' // FireRed & LeafGreen
  | 'HL' // Hidden Legends
  | 'MA' // Team Magma vs Team Aqua
  | 'DR' // Dragon
  | 'SS' // Sandstorm
  | 'RS' // Ruby & Sapphire
  | 'PR-NP' // Nintendo Black Star Promos
  // Wizards of the Coast sets
  | 'SK' // Skyridge
  | 'AQ' // Aquapolis
  | 'BP' // Best of Game
  | 'EX' // Expedition Base Set
  | 'LC' // Legendary Collection
  | 'N4' // Neo Destiny
  | 'N3' // Neo Revelation
  | 'N2' // Neo Discovery
  | 'N1' // Neo Genesis
  | 'G2' // Gym Challenge
  | 'G1' // Gym Heroes
  | 'TR' // Team Rocket
  | 'B2' // Base Set 2
  | 'FO' // Fossil
  | 'PR' // Wizards Black Star Promos
  | 'JU' // Jungle
  | 'BS'; // Base Set

interface Set {
  name: string;
  ptcgoCode: SetCodes;
  setCode: string;
  images: {
    symbol: string;
    logo: string;
  };
  releaseDate: string;
}

export const sets: Set[] = [
  // Scarlet and Violet
  {
    name: 'Shrouded Fable',
    ptcgoCode: 'SFA',
    setCode: 'sv6pt5',
    images: {
      symbol: 'https://images.pokemontcg.io/sv6pt5/symbol.png',
      logo: 'https://images.pokemontcg.io/sv6pt5/logo.png',
    },
    releaseDate: '2024/08/02',
  },
  {
    name: 'Twilight Masquerade',
    ptcgoCode: 'TWM',
    setCode: 'sv6',
    images: {
      symbol: 'https://images.pokemontcg.io/sv6/symbol.png',
      logo: 'https://images.pokemontcg.io/sv6/logo.png',
    },
    releaseDate: '2024/05/24',
  },
  {
    name: 'Temporal Forces',
    ptcgoCode: 'TEF',
    setCode: 'sv5',
    images: {
      symbol: 'https://images.pokemontcg.io/sv5/symbol.png',
      logo: 'https://images.pokemontcg.io/sv5/logo.png',
    },
    releaseDate: '2024/03/22',
  },
  {
    name: 'Paldean Fates',
    ptcgoCode: 'PAF',
    setCode: 'sv4pt5',
    images: {
      symbol: 'https://images.pokemontcg.io/sv4pt5/symbol.png',
      logo: 'https://images.pokemontcg.io/sv4pt5/logo.png',
    },
    releaseDate: '2024/01/26',
  },
  {
    name: 'Paradox Rift',
    ptcgoCode: 'PAR',
    setCode: 'sv4',
    images: {
      symbol: 'https://images.pokemontcg.io/sv4/symbol.png',
      logo: 'https://images.pokemontcg.io/sv4/logo.png',
    },
    releaseDate: '2023/11/03',
  },
  {
    name: '151',
    ptcgoCode: 'MEW',
    setCode: 'sv3pt5',
    images: {
      symbol: 'https://images.pokemontcg.io/sv3pt5/symbol.png',
      logo: 'https://images.pokemontcg.io/sv3pt5/logo.png',
    },
    releaseDate: '2023/09/22',
  },
  {
    name: 'Obsidian Flames',
    ptcgoCode: 'OBF',
    setCode: 'sv3',
    images: {
      symbol: 'https://images.pokemontcg.io/sv3/symbol.png',
      logo: 'https://images.pokemontcg.io/sv3/logo.png',
    },
    releaseDate: '2023/08/11',
  },
  {
    name: 'Paldea Evolved',
    ptcgoCode: 'PAL',
    setCode: 'sv2',
    images: {
      symbol: 'https://images.pokemontcg.io/sv2/symbol.png',
      logo: 'https://images.pokemontcg.io/sv2/logo.png',
    },
    releaseDate: '2023/06/09',
  },
  {
    name: 'Scarlet & Violet',
    ptcgoCode: 'SVI',
    setCode: 'sv1',
    images: {
      symbol: 'https://images.pokemontcg.io/sv1/symbol.png',
      logo: 'https://images.pokemontcg.io/sv1/logo.png',
    },
    releaseDate: '2023/03/31',
  },
  {
    name: 'Scarlet & Violet Energies',
    ptcgoCode: 'SVE',
    setCode: 'sve',
    images: {
      symbol: 'https://images.pokemontcg.io/sve/symbol.png',
      logo: 'https://images.pokemontcg.io/sve/logo.png',
    },
    releaseDate: '2023/03/31',
  },
  // Sword and Shield
  {
    name: 'Crown Zenith Galarian Gallery',
    ptcgoCode: 'CRZ',
    setCode: 'swsh12pt5gg',
    images: {
      symbol: 'https://images.pokemontcg.io/swsh12pt5gg/symbol.png',
      logo: 'https://images.pokemontcg.io/swsh12pt5gg/logo.png',
    },
    releaseDate: '2023/01/20',
  },
  {
    name: 'Crown Zenith',
    ptcgoCode: 'CRZ',
    setCode: 'swsh12pt5',
    images: {
      symbol: 'https://images.pokemontcg.io/swsh12pt5/symbol.png',
      logo: 'https://images.pokemontcg.io/swsh12pt5/logo.png',
    },
    releaseDate: '2023/01/20',
  },
  {
    name: 'Scarlet & Violet Black Star Promos',
    ptcgoCode: 'PR-SV',
    setCode: 'svp',
    images: {
      symbol: 'https://images.pokemontcg.io/svp/symbol.png',
      logo: 'https://images.pokemontcg.io/svp/logo.png',
    },
    releaseDate: '2023/01/01',
  },
  {
    name: 'Silver Tempest',
    ptcgoCode: 'SIT',
    setCode: 'swsh12',
    images: {
      symbol: 'https://images.pokemontcg.io/swsh12/symbol.png',
      logo: 'https://images.pokemontcg.io/swsh12/logo.png',
    },
    releaseDate: '2022/11/11',
  },
  {
    name: 'Silver Tempest Trainer Gallery',
    ptcgoCode: 'SIT',
    setCode: 'swsh12tg',
    images: {
      symbol: 'https://images.pokemontcg.io/swsh12tg/symbol.png',
      logo: 'https://images.pokemontcg.io/swsh12tg/logo.png',
    },
    releaseDate: '2022/11/11',
  },
  {
    name: 'Lost Origin Trainer Gallery',
    ptcgoCode: 'LOR',
    setCode: 'swsh11tg',
    images: {
      symbol: 'https://images.pokemontcg.io/swsh11tg/symbol.png',
      logo: 'https://images.pokemontcg.io/swsh11tg/logo.png',
    },
    releaseDate: '2022/09/09',
  },
  {
    name: 'Lost Origin',
    ptcgoCode: 'LOR',
    setCode: 'swsh11',
    images: {
      symbol: 'https://images.pokemontcg.io/swsh11/symbol.png',
      logo: 'https://images.pokemontcg.io/swsh11/logo.png',
    },
    releaseDate: '2022/09/09',
  },
  {
    name: 'Pokémon GO',
    ptcgoCode: 'PGO',
    setCode: 'pgo',
    images: {
      symbol: 'https://images.pokemontcg.io/pgo/symbol.png',
      logo: 'https://images.pokemontcg.io/pgo/logo.png',
    },
    releaseDate: '2022/07/01',
  },
  {
    name: 'Astral Radiance',
    ptcgoCode: 'ASR',
    setCode: 'swsh10',
    images: {
      symbol: 'https://images.pokemontcg.io/swsh10/symbol.png',
      logo: 'https://images.pokemontcg.io/swsh10/logo.png',
    },
    releaseDate: '2022/05/27',
  },
  {
    name: 'Astral Radiance Trainer Gallery',
    ptcgoCode: 'ASR',
    setCode: 'swsh10tg',
    images: {
      symbol: 'https://images.pokemontcg.io/swsh10tg/symbol.png',
      logo: 'https://images.pokemontcg.io/swsh10tg/logo.png',
    },
    releaseDate: '2022/05/27',
  },
  {
    name: 'Brilliant Stars',
    ptcgoCode: 'BRS',
    setCode: 'swsh9',
    images: {
      symbol: 'https://images.pokemontcg.io/swsh9/symbol.png',
      logo: 'https://images.pokemontcg.io/swsh9/logo.png',
    },
    releaseDate: '2022/02/25',
  },
  {
    name: 'Brilliant Stars Trainer Gallery',
    ptcgoCode: 'BRS',
    setCode: 'swsh9tg',
    images: {
      symbol: 'https://images.pokemontcg.io/swsh9tg/symbol.png',
      logo: 'https://images.pokemontcg.io/swsh9tg/logo.png',
    },
    releaseDate: '2022/02/25',
  },
  {
    name: 'Fusion Strike',
    ptcgoCode: 'FST',
    setCode: 'swsh8',
    images: {
      symbol: 'https://images.pokemontcg.io/swsh8/symbol.png',
      logo: 'https://images.pokemontcg.io/swsh8/logo.png',
    },
    releaseDate: '2021/11/12',
  },
  {
    name: 'Celebrations: Classic Collection',
    ptcgoCode: 'CEL',
    setCode: 'cel25c',
    images: {
      symbol: 'https://images.pokemontcg.io/cel25c/symbol.png',
      logo: 'https://images.pokemontcg.io/cel25c/logo.png',
    },
    releaseDate: '2021/10/08',
  },
  {
    name: 'Celebrations',
    ptcgoCode: 'CEL',
    setCode: 'cel25',
    images: {
      symbol: 'https://images.pokemontcg.io/cel25/symbol.png',
      logo: 'https://images.pokemontcg.io/cel25/logo.png',
    },
    releaseDate: '2021/10/08',
  },
  {
    name: 'Evolving Skies',
    ptcgoCode: 'EVS',
    setCode: 'swsh7',
    images: {
      symbol: 'https://images.pokemontcg.io/swsh7/symbol.png',
      logo: 'https://images.pokemontcg.io/swsh7/logo.png',
    },
    releaseDate: '2021/08/27',
  },
  {
    name: 'Chilling Reign',
    ptcgoCode: 'CRE',
    setCode: 'swsh6',
    images: {
      symbol: 'https://images.pokemontcg.io/swsh6/symbol.png',
      logo: 'https://images.pokemontcg.io/swsh6/logo.png',
    },
    releaseDate: '2021/06/18',
  },
  {
    name: 'Battle Styles',
    ptcgoCode: 'BST',
    setCode: 'swsh5',
    images: {
      symbol: 'https://images.pokemontcg.io/swsh5/symbol.png',
      logo: 'https://images.pokemontcg.io/swsh5/logo.png',
    },
    releaseDate: '2021/03/19',
  },
  {
    name: 'Shining Fates Shiny Vault',
    ptcgoCode: 'SHF',
    setCode: 'swsh45sv',
    images: {
      symbol: 'https://images.pokemontcg.io/swsh45sv/symbol.png',
      logo: 'https://images.pokemontcg.io/swsh45sv/logo.png',
    },
    releaseDate: '2021/02/19',
  },
  {
    name: 'Shining Fates',
    ptcgoCode: 'SHF',
    setCode: 'swsh45',
    images: {
      symbol: 'https://images.pokemontcg.io/swsh45/symbol.png',
      logo: 'https://images.pokemontcg.io/swsh45/logo.png',
    },
    releaseDate: '2021/02/19',
  },
  {
    name: 'Vivid Voltage',
    ptcgoCode: 'VIV',
    setCode: 'swsh4',
    images: {
      symbol: 'https://images.pokemontcg.io/swsh4/symbol.png',
      logo: 'https://images.pokemontcg.io/swsh4/logo.png',
    },
    releaseDate: '2020/11/13',
  },
  {
    name: "Champion's Path",
    ptcgoCode: 'CPA',
    setCode: 'swsh35',
    images: {
      symbol: 'https://images.pokemontcg.io/swsh35/symbol.png',
      logo: 'https://images.pokemontcg.io/swsh35/logo.png',
    },
    releaseDate: '2020/09/25',
  },
  {
    name: 'Pokémon Futsal Collection',
    ptcgoCode: 'FUT20',
    setCode: 'fut20',
    images: {
      symbol: 'https://images.pokemontcg.io/fut20/symbol.png',
      logo: 'https://images.pokemontcg.io/fut20/logo.png',
    },
    releaseDate: '2020/09/11',
  },
  {
    name: 'Darkness Ablaze',
    ptcgoCode: 'DAA',
    setCode: 'swsh3',
    images: {
      symbol: 'https://images.pokemontcg.io/swsh3/symbol.png',
      logo: 'https://images.pokemontcg.io/swsh3/logo.png',
    },
    releaseDate: '2020/08/14',
  },
  {
    name: 'Rebel Clash',
    ptcgoCode: 'RCL',
    setCode: 'swsh2',
    images: {
      symbol: 'https://images.pokemontcg.io/swsh2/symbol.png',
      logo: 'https://images.pokemontcg.io/swsh2/logo.png',
    },
    releaseDate: '2020/05/01',
  },
  {
    name: 'Sword & Shield',
    ptcgoCode: 'SSH',
    setCode: 'swsh1',
    images: {
      symbol: 'https://images.pokemontcg.io/swsh1/symbol.png',
      logo: 'https://images.pokemontcg.io/swsh1/logo.png',
    },
    releaseDate: '2020/02/07',
  },
  {
    name: 'SWSH Black Star Promos',
    ptcgoCode: 'PR-SW',
    setCode: 'swshp',
    images: {
      symbol: 'https://images.pokemontcg.io/swshp/symbol.png',
      logo: 'https://images.pokemontcg.io/swshp/logo.png',
    },
    releaseDate: '2019/11/15',
  },
  // Sun & Moon
  {
    name: 'Cosmic Eclipse',
    ptcgoCode: 'CEC',
    setCode: 'sm12',
    images: {
      symbol: 'https://images.pokemontcg.io/sm12/symbol.png',
      logo: 'https://images.pokemontcg.io/sm12/logo.png',
    },
    releaseDate: '2019/11/01',
  },
  {
    name: 'Hidden Fates',
    ptcgoCode: 'HIF',
    setCode: 'sm115',
    images: {
      symbol: 'https://images.pokemontcg.io/sm115/symbol.png',
      logo: 'https://images.pokemontcg.io/sm115/logo.png',
    },
    releaseDate: '2019/08/23',
  },
  {
    name: 'Unified Minds',
    ptcgoCode: 'UNM',
    setCode: 'sm11',
    images: {
      symbol: 'https://images.pokemontcg.io/sm11/symbol.png',
      logo: 'https://images.pokemontcg.io/sm11/logo.png',
    },
    releaseDate: '2019/08/02',
  },
  {
    name: 'Unbroken Bonds',
    ptcgoCode: 'UNB',
    setCode: 'sm10',
    images: {
      symbol: 'https://images.pokemontcg.io/sm10/symbol.png',
      logo: 'https://images.pokemontcg.io/sm10/logo.png',
    },
    releaseDate: '2019/05/03',
  },
  {
    name: 'Detective Pikachu',
    ptcgoCode: 'DET',
    setCode: 'det1',
    images: {
      symbol: 'https://images.pokemontcg.io/det1/symbol.png',
      logo: 'https://images.pokemontcg.io/det1/logo.png',
    },
    releaseDate: '2019/04/05',
  },
  {
    name: 'Team Up',
    ptcgoCode: 'TEU',
    setCode: 'sm9',
    images: {
      symbol: 'https://images.pokemontcg.io/sm9/symbol.png',
      logo: 'https://images.pokemontcg.io/sm9/logo.png',
    },
    releaseDate: '2019/02/01',
  },
  {
    name: 'Lost Thunder',
    ptcgoCode: 'LOT',
    setCode: 'sm8',
    images: {
      symbol: 'https://images.pokemontcg.io/sm8/symbol.png',
      logo: 'https://images.pokemontcg.io/sm8/logo.png',
    },
    releaseDate: '2018/11/02',
  },
  {
    name: 'Dragon Majesty',
    ptcgoCode: 'DRM',
    setCode: 'sm75',
    images: {
      symbol: 'https://images.pokemontcg.io/sm75/symbol.png',
      logo: 'https://images.pokemontcg.io/sm75/logo.png',
    },
    releaseDate: '2018/09/07',
  },
  {
    name: 'Celestial Storm',
    ptcgoCode: 'CES',
    setCode: 'sm7',
    images: {
      symbol: 'https://images.pokemontcg.io/sm7/symbol.png',
      logo: 'https://images.pokemontcg.io/sm7/logo.png',
    },
    releaseDate: '2018/08/03',
  },
  {
    name: 'Forbidden Light',
    ptcgoCode: 'FLI',
    setCode: 'sm6',
    images: {
      symbol: 'https://images.pokemontcg.io/sm6/symbol.png',
      logo: 'https://images.pokemontcg.io/sm6/logo.png',
    },
    releaseDate: '2018/05/04',
  },
  {
    name: 'Ultra Prism',
    ptcgoCode: 'UPR',
    setCode: 'sm5',
    images: {
      symbol: 'https://images.pokemontcg.io/sm5/symbol.png',
      logo: 'https://images.pokemontcg.io/sm5/logo.png',
    },
    releaseDate: '2018/02/02',
  },
  {
    name: 'Crimson Invasion',
    ptcgoCode: 'CIN',
    setCode: 'sm4',
    images: {
      symbol: 'https://images.pokemontcg.io/sm4/symbol.png',
      logo: 'https://images.pokemontcg.io/sm4/logo.png',
    },
    releaseDate: '2017/11/03',
  },
  {
    name: 'Shining Legends',
    ptcgoCode: 'SLG',
    setCode: 'sm35',
    images: {
      symbol: 'https://images.pokemontcg.io/sm35/symbol.png',
      logo: 'https://images.pokemontcg.io/sm35/logo.png',
    },
    releaseDate: '2017/10/06',
  },
  {
    name: 'Burning Shadows',
    ptcgoCode: 'BUS',
    setCode: 'sm3',
    images: {
      symbol: 'https://images.pokemontcg.io/sm3/symbol.png',
      logo: 'https://images.pokemontcg.io/sm3/logo.png',
    },
    releaseDate: '2017/08/05',
  },
  {
    name: 'Guardians Rising',
    ptcgoCode: 'GRI',
    setCode: 'sm2',
    images: {
      symbol: 'https://images.pokemontcg.io/sm2/symbol.png',
      logo: 'https://images.pokemontcg.io/sm2/logo.png',
    },
    releaseDate: '2017/05/05',
  },
  {
    name: 'SM Black Star Promos',
    ptcgoCode: 'PR-SM',
    setCode: 'smp',
    images: {
      symbol: 'https://images.pokemontcg.io/smp/symbol.png',
      logo: 'https://images.pokemontcg.io/smp/logo.png',
    },
    releaseDate: '2017/02/03',
  },
  {
    name: 'Sun & Moon',
    ptcgoCode: 'SUM',
    setCode: 'sm1',
    images: {
      symbol: 'https://images.pokemontcg.io/sm1/symbol.png',
      logo: 'https://images.pokemontcg.io/sm1/logo.png',
    },
    releaseDate: '2017/02/03',
  },
  {
    name: 'Evolutions',
    ptcgoCode: 'EVO',
    setCode: 'xy12',
    images: {
      symbol: 'https://images.pokemontcg.io/xy12/symbol.png',
      logo: 'https://images.pokemontcg.io/xy12/logo.png',
    },
    releaseDate: '2016/11/02',
  },
  {
    name: 'Steam Siege',
    ptcgoCode: 'STS',
    setCode: 'xy11',
    images: {
      symbol: 'https://images.pokemontcg.io/xy11/symbol.png',
      logo: 'https://images.pokemontcg.io/xy11/logo.png',
    },
    releaseDate: '2016/08/03',
  },
  {
    name: 'Fates Collide',
    ptcgoCode: 'FCO',
    setCode: 'xy10',
    images: {
      symbol: 'https://images.pokemontcg.io/xy10/symbol.png',
      logo: 'https://images.pokemontcg.io/xy10/logo.png',
    },
    releaseDate: '2016/05/02',
  },
  {
    name: 'Generations',
    ptcgoCode: 'GEN',
    setCode: 'g1',
    images: {
      symbol: 'https://images.pokemontcg.io/g1/symbol.png',
      logo: 'https://images.pokemontcg.io/g1/logo.png',
    },
    releaseDate: '2016/02/22',
  },
  {
    name: 'BREAKpoint',
    ptcgoCode: 'BKP',
    setCode: 'xy9',
    images: {
      symbol: 'https://images.pokemontcg.io/xy9/symbol.png',
      logo: 'https://images.pokemontcg.io/xy9/logo.png',
    },
    releaseDate: '2016/02/03',
  },
  {
    name: 'BREAKthrough',
    ptcgoCode: 'BKT',
    setCode: 'xy8',
    images: {
      symbol: 'https://images.pokemontcg.io/xy8/symbol.png',
      logo: 'https://images.pokemontcg.io/xy8/logo.png',
    },
    releaseDate: '2015/11/04',
  },
  {
    name: 'Ancient Origins',
    ptcgoCode: 'AOR',
    setCode: 'xy7',
    images: {
      symbol: 'https://images.pokemontcg.io/xy7/symbol.png',
      logo: 'https://images.pokemontcg.io/xy7/logo.png',
    },
    releaseDate: '2015/08/12',
  },
  {
    name: 'Roaring Skies',
    ptcgoCode: 'ROS',
    setCode: 'xy6',
    images: {
      symbol: 'https://images.pokemontcg.io/xy6/symbol.png',
      logo: 'https://images.pokemontcg.io/xy6/logo.png',
    },
    releaseDate: '2015/05/06',
  },
  {
    name: 'Double Crisis',
    ptcgoCode: 'DCR',
    setCode: 'dc1',
    images: {
      symbol: 'https://images.pokemontcg.io/dc1/symbol.png',
      logo: 'https://images.pokemontcg.io/dc1/logo.png',
    },
    releaseDate: '2015/03/25',
  },
  {
    name: 'Primal Clash',
    ptcgoCode: 'PRC',
    setCode: 'xy5',
    images: {
      symbol: 'https://images.pokemontcg.io/xy5/symbol.png',
      logo: 'https://images.pokemontcg.io/xy5/logo.png',
    },
    releaseDate: '2015/02/04',
  },
  {
    name: 'Phantom Forces',
    ptcgoCode: 'PHF',
    setCode: 'xy4',
    images: {
      symbol: 'https://images.pokemontcg.io/xy4/symbol.png',
      logo: 'https://images.pokemontcg.io/xy4/logo.png',
    },
    releaseDate: '2014/11/05',
  },
  {
    name: 'Furious Fists',
    ptcgoCode: 'FFI',
    setCode: 'xy3',
    images: {
      symbol: 'https://images.pokemontcg.io/xy3/symbol.png',
      logo: 'https://images.pokemontcg.io/xy3/logo.png',
    },
    releaseDate: '2014/08/13',
  },
  {
    name: 'Flashfire',
    ptcgoCode: 'FLF',
    setCode: 'xy2',
    images: {
      symbol: 'https://images.pokemontcg.io/xy2/symbol.png',
      logo: 'https://images.pokemontcg.io/xy2/logo.png',
    },
    releaseDate: '2014/05/07',
  },
  {
    name: 'XY',
    ptcgoCode: 'XY',
    setCode: 'xy1',
    images: {
      symbol: 'https://images.pokemontcg.io/xy1/symbol.png',
      logo: 'https://images.pokemontcg.io/xy1/logo.png',
    },
    releaseDate: '2014/02/05',
  },
  {
    name: 'Kalos Starter Set',
    ptcgoCode: 'KSS',
    setCode: 'xy0',
    images: {
      symbol: 'https://images.pokemontcg.io/xy0/symbol.png',
      logo: 'https://images.pokemontcg.io/xy0/logo.png',
    },
    releaseDate: '2013/11/08',
  },
  {
    name: 'Legendary Treasures',
    ptcgoCode: 'LTR',
    setCode: 'bw11',
    images: {
      symbol: 'https://images.pokemontcg.io/bw11/symbol.png',
      logo: 'https://images.pokemontcg.io/bw11/logo.png',
    },
    releaseDate: '2013/11/06',
  },
  {
    name: 'XY Black Star Promos',
    ptcgoCode: 'PR-XY',
    setCode: 'xyp',
    images: {
      symbol: 'https://images.pokemontcg.io/xyp/symbol.png',
      logo: 'https://images.pokemontcg.io/xyp/logo.png',
    },
    releaseDate: '2013/10/12',
  },
  {
    name: 'Plasma Blast',
    ptcgoCode: 'PLB',
    setCode: 'bw10',
    images: {
      symbol: 'https://images.pokemontcg.io/bw10/symbol.png',
      logo: 'https://images.pokemontcg.io/bw10/logo.png',
    },
    releaseDate: '2013/08/14',
  },
  {
    name: 'Plasma Freeze',
    ptcgoCode: 'PLF',
    setCode: 'bw9',
    images: {
      symbol: 'https://images.pokemontcg.io/bw9/symbol.png',
      logo: 'https://images.pokemontcg.io/bw9/logo.png',
    },
    releaseDate: '2013/05/08',
  },
  {
    name: 'Plasma Storm',
    ptcgoCode: 'PLS',
    setCode: 'bw8',
    images: {
      symbol: 'https://images.pokemontcg.io/bw8/symbol.png',
      logo: 'https://images.pokemontcg.io/bw8/logo.png',
    },
    releaseDate: '2013/02/06',
  },
  {
    name: 'Boundaries Crossed',
    ptcgoCode: 'BCR',
    setCode: 'bw7',
    images: {
      symbol: 'https://images.pokemontcg.io/bw7/symbol.png',
      logo: 'https://images.pokemontcg.io/bw7/logo.png',
    },
    releaseDate: '2012/11/07',
  },
  {
    name: 'Dragon Vault',
    ptcgoCode: 'DRV',
    setCode: 'dv1',
    images: {
      symbol: 'https://images.pokemontcg.io/dv1/symbol.png',
      logo: 'https://images.pokemontcg.io/dv1/logo.png',
    },
    releaseDate: '2012/10/05',
  },
  {
    name: 'Dragons Exalted',
    ptcgoCode: 'DRX',
    setCode: 'bw6',
    images: {
      symbol: 'https://images.pokemontcg.io/bw6/symbol.png',
      logo: 'https://images.pokemontcg.io/bw6/logo.png',
    },
    releaseDate: '2012/08/15',
  },
  {
    name: 'Dark Explorers',
    ptcgoCode: 'DEX',
    setCode: 'bw5',
    images: {
      symbol: 'https://images.pokemontcg.io/bw5/symbol.png',
      logo: 'https://images.pokemontcg.io/bw5/logo.png',
    },
    releaseDate: '2012/05/09',
  },
  {
    name: 'Next Destinies',
    ptcgoCode: 'NXD',
    setCode: 'bw4',
    images: {
      symbol: 'https://images.pokemontcg.io/bw4/symbol.png',
      logo: 'https://images.pokemontcg.io/bw4/logo.png',
    },
    releaseDate: '2012/02/08',
  },
  {
    name: 'Noble Victories',
    ptcgoCode: 'NVI',
    setCode: 'bw3',
    images: {
      symbol: 'https://images.pokemontcg.io/bw3/symbol.png',
      logo: 'https://images.pokemontcg.io/bw3/logo.png',
    },
    releaseDate: '2011/11/16',
  },
  {
    name: 'Emerging Powers',
    ptcgoCode: 'EPO',
    setCode: 'bw2',
    images: {
      symbol: 'https://images.pokemontcg.io/bw2/symbol.png',
      logo: 'https://images.pokemontcg.io/bw2/logo.png',
    },
    releaseDate: '2011/08/31',
  },
  {
    name: 'Black & White',
    ptcgoCode: 'BLW',
    setCode: 'bw1',
    images: {
      symbol: 'https://images.pokemontcg.io/bw1/symbol.png',
      logo: 'https://images.pokemontcg.io/bw1/logo.png',
    },
    releaseDate: '2011/04/25',
  },
  {
    name: 'BW Black Star Promos',
    ptcgoCode: 'PR-BLW',
    setCode: 'bwp',
    images: {
      symbol: 'https://images.pokemontcg.io/bwp/symbol.png',
      logo: 'https://images.pokemontcg.io/bwp/logo.png',
    },
    releaseDate: '2011/03/01',
  },
  {
    name: 'Call of Legends',
    ptcgoCode: 'CL',
    setCode: 'col1',
    images: {
      symbol: 'https://images.pokemontcg.io/col1/symbol.png',
      logo: 'https://images.pokemontcg.io/col1/logo.png',
    },
    releaseDate: '2011/02/09',
  },
  {
    name: 'HS—Triumphant',
    ptcgoCode: 'TM',
    setCode: 'hgss4',
    images: {
      symbol: 'https://images.pokemontcg.io/hgss4/symbol.png',
      logo: 'https://images.pokemontcg.io/hgss4/logo.png',
    },
    releaseDate: '2010/11/03',
  },
  {
    name: 'HS—Undaunted',
    ptcgoCode: 'UD',
    setCode: 'hgss3',
    images: {
      symbol: 'https://images.pokemontcg.io/hgss3/symbol.png',
      logo: 'https://images.pokemontcg.io/hgss3/logo.png',
    },
    releaseDate: '2010/08/18',
  },
  {
    name: 'HS—Unleashed',
    ptcgoCode: 'UL',
    setCode: 'hgss2',
    images: {
      symbol: 'https://images.pokemontcg.io/hgss2/symbol.png',
      logo: 'https://images.pokemontcg.io/hgss2/logo.png',
    },
    releaseDate: '2010/05/12',
  },
  {
    name: 'HeartGold & SoulSilver',
    ptcgoCode: 'HS',
    setCode: 'hgss1',
    images: {
      symbol: 'https://images.pokemontcg.io/hgss1/symbol.png',
      logo: 'https://images.pokemontcg.io/hgss1/logo.png',
    },
    releaseDate: '2010/02/10',
  },
  {
    name: 'HGSS Black Star Promos',
    ptcgoCode: 'PR-HS',
    setCode: 'hsp',
    images: {
      symbol: 'https://images.pokemontcg.io/hsp/symbol.png',
      logo: 'https://images.pokemontcg.io/hsp/logo.png',
    },
    releaseDate: '2010/02/10',
  },
  {
    name: 'Arceus',
    ptcgoCode: 'AR',
    setCode: 'pl4',
    images: {
      symbol: 'https://images.pokemontcg.io/pl4/symbol.png',
      logo: 'https://images.pokemontcg.io/pl4/logo.png',
    },
    releaseDate: '2009/11/04',
  },
  {
    name: 'Supreme Victors',
    ptcgoCode: 'SV',
    setCode: 'pl3',
    images: {
      symbol: 'https://images.pokemontcg.io/pl3/symbol.png',
      logo: 'https://images.pokemontcg.io/pl3/logo.png',
    },
    releaseDate: '2009/08/19',
  },
  {
    name: 'Rising Rivals',
    ptcgoCode: 'RR',
    setCode: 'pl2',
    images: {
      symbol: 'https://images.pokemontcg.io/pl2/symbol.png',
      logo: 'https://images.pokemontcg.io/pl2/logo.png',
    },
    releaseDate: '2009/05/16',
  },
  {
    name: 'Platinum',
    ptcgoCode: 'PL',
    setCode: 'pl1',
    images: {
      symbol: 'https://images.pokemontcg.io/pl1/symbol.png',
      logo: 'https://images.pokemontcg.io/pl1/logo.png',
    },
    releaseDate: '2009/02/11',
  },
  {
    name: 'Stormfront',
    ptcgoCode: 'SF',
    setCode: 'dp7',
    images: {
      symbol: 'https://images.pokemontcg.io/dp7/symbol.png',
      logo: 'https://images.pokemontcg.io/dp7/logo.png',
    },
    releaseDate: '2008/11/01',
  },
  {
    name: 'Legends Awakened',
    ptcgoCode: 'LA',
    setCode: 'dp6',
    images: {
      symbol: 'https://images.pokemontcg.io/dp6/symbol.png',
      logo: 'https://images.pokemontcg.io/dp6/logo.png',
    },
    releaseDate: '2008/08/01',
  },
  {
    name: 'Majestic Dawn',
    ptcgoCode: 'MD',
    setCode: 'dp5',
    images: {
      symbol: 'https://images.pokemontcg.io/dp5/symbol.png',
      logo: 'https://images.pokemontcg.io/dp5/logo.png',
    },
    releaseDate: '2008/05/01',
  },
  {
    name: 'Great Encounters',
    ptcgoCode: 'GE',
    setCode: 'dp4',
    images: {
      symbol: 'https://images.pokemontcg.io/dp4/symbol.png',
      logo: 'https://images.pokemontcg.io/dp4/logo.png',
    },
    releaseDate: '2008/02/01',
  },
  {
    name: 'Secret Wonders',
    ptcgoCode: 'SW',
    setCode: 'dp3',
    images: {
      symbol: 'https://images.pokemontcg.io/dp3/symbol.png',
      logo: 'https://images.pokemontcg.io/dp3/logo.png',
    },
    releaseDate: '2007/11/01',
  },
  {
    name: 'Mysterious Treasures',
    ptcgoCode: 'MT',
    setCode: 'dp2',
    images: {
      symbol: 'https://images.pokemontcg.io/dp2/symbol.png',
      logo: 'https://images.pokemontcg.io/dp2/logo.png',
    },
    releaseDate: '2007/08/01',
  },
  {
    name: 'DP Black Star Promos',
    ptcgoCode: 'PR-DPP',
    setCode: 'dpp',
    images: {
      symbol: 'https://images.pokemontcg.io/dpp/symbol.png',
      logo: 'https://images.pokemontcg.io/dpp/logo.png',
    },
    releaseDate: '2007/05/01',
  },
  {
    name: 'Diamond & Pearl',
    ptcgoCode: 'DP',
    setCode: 'dp1',
    images: {
      symbol: 'https://images.pokemontcg.io/dp1/symbol.png',
      logo: 'https://images.pokemontcg.io/dp1/logo.png',
    },
    releaseDate: '2007/05/01',
  },
  {
    name: 'Power Keepers',
    ptcgoCode: 'PK',
    setCode: 'ex16',
    images: {
      symbol: 'https://images.pokemontcg.io/ex16/symbol.png',
      logo: 'https://images.pokemontcg.io/ex16/logo.png',
    },
    releaseDate: '2007/02/02',
  },
  {
    name: 'Dragon Frontiers',
    ptcgoCode: 'DF',
    setCode: 'ex15',
    images: {
      symbol: 'https://images.pokemontcg.io/ex15/symbol.png',
      logo: 'https://images.pokemontcg.io/ex15/logo.png',
    },
    releaseDate: '2006/11/01',
  },
  {
    name: 'Crystal Guardians',
    ptcgoCode: 'CG',
    setCode: 'ex14',
    images: {
      symbol: 'https://images.pokemontcg.io/ex14/symbol.png',
      logo: 'https://images.pokemontcg.io/ex14/logo.png',
    },
    releaseDate: '2006/08/01',
  },
  {
    name: 'Holon Phantoms',
    ptcgoCode: 'HP',
    setCode: 'ex13',
    images: {
      symbol: 'https://images.pokemontcg.io/ex13/symbol.png',
      logo: 'https://images.pokemontcg.io/ex13/logo.png',
    },
    releaseDate: '2006/05/01',
  },
  {
    name: 'Legend Maker',
    ptcgoCode: 'LM',
    setCode: 'ex12',
    images: {
      symbol: 'https://images.pokemontcg.io/ex12/symbol.png',
      logo: 'https://images.pokemontcg.io/ex12/logo.png',
    },
    releaseDate: '2006/02/01',
  },
  {
    name: 'Delta Species',
    ptcgoCode: 'DS',
    setCode: 'ex11',
    images: {
      symbol: 'https://images.pokemontcg.io/ex11/symbol.png',
      logo: 'https://images.pokemontcg.io/ex11/logo.png',
    },
    releaseDate: '2005/10/31',
  },
  {
    name: 'Unseen Forces',
    ptcgoCode: 'UF',
    setCode: 'ex10',
    images: {
      symbol: 'https://images.pokemontcg.io/ex10/symbol.png',
      logo: 'https://images.pokemontcg.io/ex10/logo.png',
    },
    releaseDate: '2005/08/01',
  },
  {
    name: 'Emerald',
    ptcgoCode: 'EM',
    setCode: 'ex9',
    images: {
      symbol: 'https://images.pokemontcg.io/ex9/symbol.png',
      logo: 'https://images.pokemontcg.io/ex9/logo.png',
    },
    releaseDate: '2005/05/01',
  },
  {
    name: 'Deoxys',
    ptcgoCode: 'DX',
    setCode: 'ex8',
    images: {
      symbol: 'https://images.pokemontcg.io/ex8/symbol.png',
      logo: 'https://images.pokemontcg.io/ex8/logo.png',
    },
    releaseDate: '2005/02/01',
  },
  {
    name: 'Team Rocket Returns',
    ptcgoCode: 'TRR',
    setCode: 'ex7',
    images: {
      symbol: 'https://images.pokemontcg.io/ex7/symbol.png',
      logo: 'https://images.pokemontcg.io/ex7/logo.png',
    },
    releaseDate: '2004/11/01',
  },
  {
    name: 'FireRed & LeafGreen',
    ptcgoCode: 'RG',
    setCode: 'ex6',
    images: {
      symbol: 'https://images.pokemontcg.io/ex6/symbol.png',
      logo: 'https://images.pokemontcg.io/ex6/logo.png',
    },
    releaseDate: '2004/09/01',
  },
  {
    name: 'Hidden Legends',
    ptcgoCode: 'HL',
    setCode: 'ex5',
    images: {
      symbol: 'https://images.pokemontcg.io/ex5/symbol.png',
      logo: 'https://images.pokemontcg.io/ex5/logo.png',
    },
    releaseDate: '2004/06/01',
  },
  {
    name: 'Team Magma vs Team Aqua',
    ptcgoCode: 'MA',
    setCode: 'ex4',
    images: {
      symbol: 'https://images.pokemontcg.io/ex4/symbol.png',
      logo: 'https://images.pokemontcg.io/ex4/logo.png',
    },
    releaseDate: '2004/03/01',
  },
  {
    name: 'Dragon',
    ptcgoCode: 'DR',
    setCode: 'ex3',
    images: {
      symbol: 'https://images.pokemontcg.io/ex3/symbol.png',
      logo: 'https://images.pokemontcg.io/ex3/logo.png',
    },
    releaseDate: '2003/11/24',
  },
  {
    name: 'Nintendo Black Star Promos',
    ptcgoCode: 'PR-NP',
    setCode: 'np',
    images: {
      symbol: 'https://images.pokemontcg.io/np/symbol.png',
      logo: 'https://images.pokemontcg.io/np/logo.png',
    },
    releaseDate: '2003/10/01',
  },
  {
    name: 'Sandstorm',
    ptcgoCode: 'SS',
    setCode: 'ex2',
    images: {
      symbol: 'https://images.pokemontcg.io/ex2/symbol.png',
      logo: 'https://images.pokemontcg.io/ex2/logo.png',
    },
    releaseDate: '2003/09/18',
  },
  {
    name: 'Ruby & Sapphire',
    ptcgoCode: 'RS',
    setCode: 'ex1',
    images: {
      symbol: 'https://images.pokemontcg.io/ex1/symbol.png',
      logo: 'https://images.pokemontcg.io/ex1/logo.png',
    },
    releaseDate: '2003/07/01',
  },
  {
    name: 'Skyridge',
    ptcgoCode: 'SK',
    setCode: 'ecard3',
    images: {
      symbol: 'https://images.pokemontcg.io/ecard3/symbol.png',
      logo: 'https://images.pokemontcg.io/ecard3/logo.png',
    },
    releaseDate: '2003/05/12',
  },
  {
    name: 'Aquapolis',
    ptcgoCode: 'AQ',
    setCode: 'ecard2',
    images: {
      symbol: 'https://images.pokemontcg.io/ecard2/symbol.png',
      logo: 'https://images.pokemontcg.io/ecard2/logo.png',
    },
    releaseDate: '2003/01/15',
  },
  {
    name: 'Best of Game',
    ptcgoCode: 'BP',
    setCode: 'bp',
    images: {
      symbol: 'https://images.pokemontcg.io/bp/symbol.png',
      logo: 'https://images.pokemontcg.io/bp/logo.png',
    },
    releaseDate: '2002/12/01',
  },
  {
    name: 'Expedition Base Set',
    ptcgoCode: 'EX',
    setCode: 'ecard1',
    images: {
      symbol: 'https://images.pokemontcg.io/ecard1/symbol.png',
      logo: 'https://images.pokemontcg.io/ecard1/logo.png',
    },
    releaseDate: '2002/09/15',
  },
  {
    name: 'Legendary Collection',
    ptcgoCode: 'LC',
    setCode: 'base6',
    images: {
      symbol: 'https://images.pokemontcg.io/base6/symbol.png',
      logo: 'https://images.pokemontcg.io/base6/logo.png',
    },
    releaseDate: '2002/05/24',
  },
  {
    name: 'Neo Destiny',
    ptcgoCode: 'N4',
    setCode: 'neo4',
    images: {
      symbol: 'https://images.pokemontcg.io/neo4/symbol.png',
      logo: 'https://images.pokemontcg.io/neo4/logo.png',
    },
    releaseDate: '2002/02/28',
  },
  {
    name: 'Neo Revelation',
    ptcgoCode: 'N3',
    setCode: 'neo3',
    images: {
      symbol: 'https://images.pokemontcg.io/neo3/symbol.png',
      logo: 'https://images.pokemontcg.io/neo3/logo.png',
    },
    releaseDate: '2001/09/21',
  },
  {
    name: 'Neo Discovery',
    ptcgoCode: 'N2',
    setCode: 'neo2',
    images: {
      symbol: 'https://images.pokemontcg.io/neo2/symbol.png',
      logo: 'https://images.pokemontcg.io/neo2/logo.png',
    },
    releaseDate: '2001/06/01',
  },
  {
    name: 'Neo Genesis',
    ptcgoCode: 'N1',
    setCode: 'neo1',
    images: {
      symbol: 'https://images.pokemontcg.io/neo1/symbol.png',
      logo: 'https://images.pokemontcg.io/neo1/logo.png',
    },
    releaseDate: '2000/12/16',
  },
  {
    name: 'Gym Challenge',
    ptcgoCode: 'G2',
    setCode: 'gym2',
    images: {
      symbol: 'https://images.pokemontcg.io/gym2/symbol.png',
      logo: 'https://images.pokemontcg.io/gym2/logo.png',
    },
    releaseDate: '2000/10/16',
  },
  {
    name: 'Gym Heroes',
    ptcgoCode: 'G1',
    setCode: 'gym1',
    images: {
      symbol: 'https://images.pokemontcg.io/gym1/symbol.png',
      logo: 'https://images.pokemontcg.io/gym1/logo.png',
    },
    releaseDate: '2000/08/14',
  },
  {
    name: 'Team Rocket',
    ptcgoCode: 'TR',
    setCode: 'base5',
    images: {
      symbol: 'https://images.pokemontcg.io/base5/symbol.png',
      logo: 'https://images.pokemontcg.io/base5/logo.png',
    },
    releaseDate: '2000/04/24',
  },
  {
    name: 'Base Set 2',
    ptcgoCode: 'B2',
    setCode: 'base4',
    images: {
      symbol: 'https://images.pokemontcg.io/base4/symbol.png',
      logo: 'https://images.pokemontcg.io/base4/logo.png',
    },
    releaseDate: '2000/02/24',
  },
  {
    name: 'Fossil',
    ptcgoCode: 'FO',
    setCode: 'base3',
    images: {
      symbol: 'https://images.pokemontcg.io/base3/symbol.png',
      logo: 'https://images.pokemontcg.io/base3/logo.png',
    },
    releaseDate: '1999/10/10',
  },
  {
    name: 'Wizards Black Star Promos',
    ptcgoCode: 'PR',
    setCode: 'basep',
    images: {
      symbol: 'https://images.pokemontcg.io/basep/symbol.png',
      logo: 'https://images.pokemontcg.io/basep/logo.png',
    },
    releaseDate: '1999/07/01',
  },
  {
    name: 'Jungle',
    ptcgoCode: 'JU',
    setCode: 'base2',
    images: {
      symbol: 'https://images.pokemontcg.io/base2/symbol.png',
      logo: 'https://images.pokemontcg.io/base2/logo.png',
    },
    releaseDate: '1999/06/16',
  },
  {
    name: 'Base',
    ptcgoCode: 'BS',
    setCode: 'base1',
    images: {
      symbol: 'https://images.pokemontcg.io/base1/symbol.png',
      logo: 'https://images.pokemontcg.io/base1/logo.png',
    },
    releaseDate: '1999/01/09',
  },
];

type SetCodeMap = {
  [type in SetCodes]: string;
};

export const setMap: SetCodeMap = {
  SFA: 'sv6pt5',
  TWM: 'sv6',
  TEF: 'sv5',
  PAF: 'sv4pt5',
  PAR: 'sv4',
  MEW: 'sv3pt5',
  OBF: 'sv3',
  PAL: 'sv2',
  SVI: 'sv1',
  SVE: 'sve',
  CRZ: 'swsh12pt5',
  'PR-SV': 'svp',
  SIT: 'swsh12',
  LOR: 'swsh11',
  PGO: 'pgo',
  ASR: 'swsh10',
  BRS: 'swsh9',
  FST: 'swsh8',
  CEL: 'cel25',
  EVS: 'swsh7',
  CRE: 'swsh6',
  BST: 'swsh5',
  SHF: 'swsh45',
  VIV: 'swsh4',
  CPA: 'swsh35',
  FUT20: 'fut20',
  DAA: 'swsh3',
  RCL: 'swsh2',
  SSH: 'swsh1',
  'PR-SW': 'swshp',
  CEC: 'sm12',
  HIF: 'sm115',
  UNM: 'sm11',
  UNB: 'sm10',
  DET: 'det1',
  TEU: 'sm9',
  LOT: 'sm8',
  DRM: 'sm75',
  CES: 'sm7',
  FLI: 'sm6',
  UPR: 'sm5',
  CIN: 'sm4',
  SLG: 'sm35',
  BUS: 'sm3',
  GRI: 'sm2',
  'PR-SM': 'smp',
  SUM: 'sm1',
  EVO: 'xy12',
  STS: 'xy11',
  FCO: 'xy10',
  GEN: 'g1',
  BKP: 'xy9',
  BKT: 'xy8',
  AOR: 'xy7',
  ROS: 'xy6',
  DCR: 'dc1',
  PRC: 'xy5',
  PHF: 'xy4',
  FFI: 'xy3',
  FLF: 'xy2',
  XY: 'xy1',
  KSS: 'xy0',
  LTR: 'bw11',
  'PR-XY': 'xyp',
  PLB: 'bw10',
  PLF: 'bw9',
  PLS: 'bw8',
  BCR: 'bw7',
  DRV: 'dv1',
  DRX: 'bw6',
  DEX: 'bw5',
  NXD: 'bw4',
  NVI: 'bw3',
  EPO: 'bw2',
  BLW: 'bw1',
  'PR-BLW': 'bwp',
  CL: 'col1',
  TM: 'hgss4',
  UD: 'hgss3',
  UL: 'hgss2',
  HS: 'hgss1',
  'PR-HS': 'hsp',
  AR: 'pl4',
  SV: 'pl3',
  RR: 'pl2',
  PL: 'pl1',
  SF: 'dp7',
  LA: 'dp6',
  MD: 'dp5',
  GE: 'dp4',
  SW: 'dp3',
  MT: 'dp2',
  'PR-DPP': 'dpp',
  DP: 'dp1',
  PK: 'ex16',
  DF: 'ex15',
  CG: 'ex14',
  HP: 'ex13',
  LM: 'ex12',
  DS: 'ex11',
  UF: 'ex10',
  EM: 'ex9',
  DX: 'ex8',
  TRR: 'ex7',
  RG: 'ex6',
  HL: 'ex5',
  MA: 'ex4',
  DR: 'ex3',
  'PR-NP': 'np',
  SS: 'ex2',
  RS: 'ex1',
  SK: 'ecard3',
  AQ: 'ecard2',
  BP: 'bp',
  EX: 'ecard1',
  LC: 'base6',
  N4: 'neo4',
  N3: 'neo3',
  N2: 'neo2',
  N1: 'neo1',
  G2: 'gym2',
  G1: 'gym1',
  TR: 'base5',
  B2: 'base4',
  FO: 'base3',
  PR: 'basep',
  JU: 'base2',
  BS: 'base1',
};
