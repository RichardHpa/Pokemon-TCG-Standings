// NOTE: Lille TCG Regional Championship 2022 is the first event to have decklists

import type { DeckList } from 'types/standing';

import { pokemonList } from 'constants/imageSprites';

export const getArchetypes = (decklist: DeckList) => {
    if (!decklist) return [];
    const pokemon = decklist.pokemon;
    if (!pokemon) return [];

    const pokemonNames = Object.values(pokemon).map((p) => p.name);
    const foundArchetype = [];

    if (
        pokemonNames.includes('Terapagos ex') &&
        pokemonNames.includes('Origin Forme Palkia VSTAR')
    ) {
        foundArchetype.push({
            pokemon: 'Terapagos ex',
            image: pokemonList['terapagos'].forms?.terastal.image,
        });
        foundArchetype.push({
            pokemon: 'Origin Forme Palkia VSTAR',
            image: pokemonList['palkia'].forms?.origin.image,
        });
        return foundArchetype;
    }

    if (pokemonNames.includes('Snorlax')) {
        foundArchetype.push({
            pokemon: 'Snorlax',
            image: pokemonList['snorlax'].image,
        });
        if (pokemonNames.includes('Rotom V')) {
            foundArchetype.push({
                pokemon: 'Rotom V',
                image: pokemonList['rotom'].image,
            });
        }
        return foundArchetype;
    }

    if (
        pokemonNames.includes('Terapagos ex') &&
        pokemonNames.includes('Dusknoir')
    ) {
        foundArchetype.push({
            pokemon: 'Terapagos ex',
            image: pokemonList['terapagos'].forms?.terastal.image,
        });
        foundArchetype.push({
            pokemon: 'Dusknoir',
            image: pokemonList['dusknoir'].image,
        });
        return foundArchetype;
    }

    if (pokemonNames.includes('Gouging Fire ex')) {
        foundArchetype.push({
            pokemon: 'Gouging Fire ex',
            image: pokemonList['gouging-fire'].image,
        });
        return foundArchetype;
    }

    if (
        pokemonNames.includes('Cornerstone Mask Ogerpon ex') &&
        pokemonNames.includes('Noivern ex')
    ) {
        foundArchetype.push({
            pokemon: 'Cornerstone Mask Ogerpon ex',
            image: pokemonList['ogerpon'].forms?.['cornerstone-mask'].image,
        });
        foundArchetype.push({
            pokemon: 'Noivern ex',
            image: pokemonList['noivern'].image,
        });
        return foundArchetype;
    }

    if (
        pokemonNames.includes('Cornerstone Mask Ogerpon ex') &&
        pokemonNames.includes('Mimikyu')
    ) {
        foundArchetype.push({
            pokemon: 'Cornerstone Mask Ogerpon ex',
            image: pokemonList['ogerpon'].forms?.['cornerstone-mask'].image,
        });
        foundArchetype.push({
            pokemon: 'Mimikyu',
            image: pokemonList['mimikyu'].image,
        });
        return foundArchetype;
    }

    if (
        pokemonNames.includes('Origin Forme Palkia VSTAR') &&
        pokemonNames.includes('Dusknoir')
    ) {
        foundArchetype.push({
            pokemon: 'Origin Forme Palkia VSTAR',
            image: pokemonList['palkia'].forms?.origin.image,
        });
        foundArchetype.push({
            pokemon: 'Dusknoir',
            image: pokemonList['dusknoir'].image,
        });
        return foundArchetype;
    }

    if (pokemonNames.includes('Arceus VSTAR')) {
        foundArchetype.push({
            pokemon: 'Arceus VSTAR',
            image: pokemonList['arceus'].image,
        });
        if (pokemonNames.includes('Armarouge')) {
            foundArchetype.push({
                pokemon: 'Armarouge',
                image: pokemonList['armarouge'].image,
            });
        } else if (pokemonNames.includes('Giratina VSTAR')) {
            foundArchetype.push({
                pokemon: 'Giratina VSTAR',
                image: pokemonList['giratina'].forms?.origin.image,
            });
        } else if (pokemonNames.includes('Gyarados V')) {
            foundArchetype.push({
                pokemon: 'Gyarados V',
                image: pokemonList['gyarados'].image,
            });
        } else if (pokemonNames.includes('Inteleon')) {
            foundArchetype.push({
                pokemon: 'Inteleon',
                image: pokemonList['inteleon'].image,
            });
        } else if (pokemonNames.includes('Duraludon VMAX')) {
            foundArchetype.push({
                pokemon: 'Duraludon VMAX',
                image: pokemonList['duraludon'].forms?.gmax.image,
            });
        } else if (pokemonNames.includes('Malamar VMAX')) {
            foundArchetype.push({
                pokemon: 'Malamar VMAX',
                image: pokemonList['malamar'].image,
            });
        }
        return foundArchetype;
    }

    if (pokemonNames.includes('Rapid Strike Urshifu VMAX')) {
        foundArchetype.push({
            pokemon: 'Rapid Strike Urshifu VMAX',
            image: pokemonList['urshifu'].forms?.['rapid-gmax'].image,
        });
        if (pokemonNames.includes('Inteleon')) {
            foundArchetype.push({
                pokemon: 'Inteleon',
                image: pokemonList['inteleon'].image,
            });
        }
        return foundArchetype;
    }

    if (pokemonNames.includes('Ice Rider Calyrex VMAX')) {
        foundArchetype.push({
            pokemon: 'Ice Rider Calyrex VMAX',
            image: pokemonList['calyrex'].forms?.ice.image,
        });
        if (pokemonNames.includes('Inteleon')) {
            foundArchetype.push({
                pokemon: 'Inteleon',
                image: pokemonList['inteleon'].image,
            });
        }
        return foundArchetype;
    }

    if (pokemonNames.includes('Inteleon')) {
        foundArchetype.push({
            pokemon: 'Inteleon',
            image: pokemonList['inteleon'].image,
        });
        if (pokemonNames.includes('Galarian Moltres')) {
            foundArchetype.push({
                pokemon: 'Galarian Moltres',
                image: pokemonList['moltres'].forms?.galarian.image,
            });
        }
        return foundArchetype;
    }

    if (pokemonNames.includes('Shadow Rider Calyrex VMAX')) {
        foundArchetype.push({
            pokemon: 'Shadow Rider Calyrex VMAX',
            image: pokemonList['calyrex'].forms?.shadow.image,
        });
        return foundArchetype;
    }

    if (pokemonNames.includes('Mew VMAX')) {
        foundArchetype.push({
            pokemon: 'Mew VMAX',
            image: pokemonList['mew'].image,
        });
        if (pokemonNames.includes('Genesect V')) {
            foundArchetype.push({
                pokemon: 'Genesect V',
                image: pokemonList['genesect'].image,
            });
        }
        if (pokemonNames.includes('Meloetta')) {
            foundArchetype.push({
                pokemon: 'Meloetta',
                image: pokemonList['meloetta'].image,
            });
        }
        return foundArchetype;
    }

    if (pokemonNames.includes('Comfey')) {
        foundArchetype.push({
            pokemon: 'Comfey',
            image: pokemonList['comfey'].image,
        });
        if (pokemonNames.includes('Sableye')) {
            foundArchetype.push({
                pokemon: 'Sableye',
                image: pokemonList['sableye'].image,
            });
        }
        return foundArchetype;
    }

    if (pokemonNames.includes('Regidrago VSTAR')) {
        foundArchetype.push({
            pokemon: 'Regidrago VSTAR',
            image: pokemonList['regidrago'].image,
        });
        return foundArchetype;
    }

    if (pokemonNames.includes('Dragapult ex')) {
        foundArchetype.push({
            pokemon: 'Dragapult ex',
            image: pokemonList['dragapult'].image,
        });
        if (pokemonNames.includes('Pidgeot ex')) {
            foundArchetype.push({
                pokemon: 'Pidgeot ex',
                image: pokemonList['pidgeot'].image,
            });
        } else if (pokemonNames.includes('Bibarel')) {
            foundArchetype.push({
                pokemon: 'Bibarel',
                image: pokemonList['bibarel'].image,
            });
        }
        return foundArchetype;
    }

    if (pokemonNames.includes('Charizard ex')) {
        foundArchetype.push({
            pokemon: 'Charizard ex',
            image: pokemonList['charizard'].image,
        });
        if (pokemonNames.includes('Pidgeot ex')) {
            foundArchetype.push({
                pokemon: 'Pidgeot ex',
                image: pokemonList['pidgeot'].image,
            });
        } else if (pokemonNames.includes('Bibarel')) {
            foundArchetype.push({
                pokemon: 'Bibarel',
                image: pokemonList['bibarel'].image,
            });
        }
        return foundArchetype;
    }

    if (pokemonNames.includes('Pidgeot ex')) {
        foundArchetype.push({
            pokemon: 'Pidgeot ex',
            image: pokemonList['pidgeot'].image,
        });
        return foundArchetype;
    }

    if (pokemonNames.includes('Lugia V')) {
        foundArchetype.push({
            pokemon: 'Lugia',
            image: pokemonList['lugia'].image,
        });
        if (pokemonNames.includes('Archeops')) {
            foundArchetype.push({
                pokemon: 'Archeops',
                image: pokemonList['archeops'].image,
            });
        }
        return foundArchetype;
    }

    if (pokemonNames.includes('Chien-Pao ex')) {
        foundArchetype.push({
            pokemon: 'Chien-Pao ex',
            image: pokemonList['chien-pao'].image,
        });
        if (pokemonNames.includes('Baxcalibur')) {
            foundArchetype.push({
                pokemon: 'Baxcalibur',
                image: pokemonList['baxcalibur'].image,
            });
        }
        return foundArchetype;
    }

    if (pokemonNames.includes('Miraidon ex')) {
        foundArchetype.push({
            pokemon: 'Miraidon ex',
            image: pokemonList['miraidon'].image,
        });
        if (pokemonNames.includes('Flaaffy')) {
            foundArchetype.push({
                pokemon: 'Flaaffy',
                image: pokemonList['flaaffy'].image,
            });
        } else if (pokemonNames.includes('Iron Hands ex')) {
            foundArchetype.push({
                pokemon: 'Iron Hands ex',
                image: pokemonList['iron-hands'].image,
            });
        }
        return foundArchetype;
    }

    // Quad Thorns
    if (pokemonNames.includes('Iron Thorns ex')) {
        foundArchetype.push({
            pokemon: 'Iron Thorns ex',
            image: pokemonList['iron-thorns'].image,
        });
        return foundArchetype;
    }

    if (pokemonNames.includes('Iron Hands ex')) {
        foundArchetype.push({
            pokemon: 'Iron Hands ex',
            image: pokemonList['iron-hands'].image,
        });
        if (pokemonNames.includes('Iron Crown ex')) {
            foundArchetype.push({
                pokemon: 'Icon Crown ex',
                image: pokemonList['iron-crown'].image,
            });
        }
        return foundArchetype;
    }

    if (pokemonNames.includes('Gardevoir ex')) {
        foundArchetype.push({
            pokemon: 'Gardevoir ex',
            image: pokemonList['gardevoir'].image,
        });
        if (pokemonNames.includes('Banette ex')) {
            foundArchetype.push({
                pokemon: 'Banette ex',
                image: pokemonList['banette'].image,
            });
        }
        return foundArchetype;
    }

    if (pokemonNames.includes('Banette ex')) {
        foundArchetype.push({
            pokemon: 'Banette ex',
            image: pokemonList['banette'].image,
        });
        return foundArchetype;
    }

    if (pokemonNames.includes('Iron Valiant ex')) {
        foundArchetype.push({
            pokemon: 'Iron Valiant ex',
            image: pokemonList['iron-valiant'].image,
        });
        return foundArchetype;
    }

    if (pokemonNames.includes('Origin Forme Dialga VSTAR')) {
        foundArchetype.push({
            pokemon: 'Origin Forme Dialga VSTAR',
            image: pokemonList['dialga'].forms?.origin.image,
        });
        if (pokemonNames.includes('Metang')) {
            foundArchetype.push({
                pokemon: 'Metang',
                image: pokemonList['metang'].image,
            });
        }
        return foundArchetype;
    }

    if (pokemonNames.includes('Roaring Moon ex')) {
        foundArchetype.push({
            pokemon: 'Roaring Moon',
            image: pokemonList['roaring-moon'].image,
        });
        return foundArchetype;
    }

    if (pokemonNames.includes('Roaring Moon')) {
        foundArchetype.push({
            pokemon: 'Roaring Moon',
            image: pokemonList['roaring-moon'].image,
        });
        if (pokemonNames.includes('Dudunsparce')) {
            foundArchetype.push({
                pokemon: 'Dudunsparce',
                image: pokemonList['dudunsparce'].image,
            });
        }
        return foundArchetype;
    }

    if (pokemonNames.includes('Raging Bolt ex')) {
        foundArchetype.push({
            pokemon: 'Raging Bolt ex',
            image: pokemonList['raging-bolt'].image,
        });
        if (pokemonNames.includes('Sandy Shocks ex')) {
            foundArchetype.push({
                pokemon: 'Sandy Shocks ex',
                image: pokemonList['sandy-shocks'].image,
            });
        }
        return foundArchetype;
    }

    if (pokemonNames.includes('Gholdengo ex')) {
        foundArchetype.push({
            pokemon: 'Gholdengo ex',
            image: pokemonList['gholdengo'].image,
        });
        return foundArchetype;
    }

    if (pokemonNames.includes('Tinkaton')) {
        foundArchetype.push({
            pokemon: 'Tinkaton',
            image: pokemonList['tinkaton'].image,
        });
        return foundArchetype;
    }

    if (pokemonNames.includes('Espathra ex')) {
        foundArchetype.push({
            pokemon: 'Espathra ex',
            image: pokemonList['espathra'].image,
        });
        if (pokemonNames.includes('Xatu')) {
            foundArchetype.push({
                pokemon: 'Xatu',
                image: pokemonList['xatu'].image,
            });
        }
        return foundArchetype;
    }

    if (pokemonNames.includes('Klawf')) {
        foundArchetype.push({
            pokemon: 'Klawf',
            image: pokemonList['klawf'].image,
        });
        if (pokemonNames.includes('Brute Bonnet')) {
            foundArchetype.push({
                pokemon: 'Brute Bonnet',
                image: pokemonList['brute-bonnet'].image,
            });
        }
        return foundArchetype;
    }

    if (pokemonNames.includes('Whimsicott VSTAR')) {
        foundArchetype.push({
            pokemon: 'Whimsicott VSTAR',
            image: pokemonList['whimsicott'].image,
        });
        return foundArchetype;
    }

    if (pokemonNames.includes('Garchomp ex')) {
        foundArchetype.push({
            pokemon: 'Garchomp ex',
            image: pokemonList['garchomp'].image,
        });
        return foundArchetype;
    }

    foundArchetype.push({
        pokemon: 'Unknown',
        image: 'substitute.png',
    });

    return foundArchetype;
};
