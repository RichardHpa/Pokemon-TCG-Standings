import { Fragment } from 'react';
import { UserGroupIcon } from '@heroicons/react/24/solid';

import { Card } from 'components/Card';
import { IconButton } from 'components/Button/IconButton';

import { pokemonList } from 'constants/imageSprites';

import type { PokemonInfo } from 'constants/imageSprites';

const Forms = ({ pokemon, forms }: { pokemon: string; forms: PokemonInfo['forms'] }) => {
  if (!forms) return null;

  const formArray = Object.entries(forms).map(([key, value]) => {
    return { name: key, ...value };
  });

  return (
    <>
      {formArray.map(form => (
        <Card key={form.name}>
          <div className="flex flex-col justify-center">
            <img src={`/sprites/pokemon/${form.image}`} alt={pokemon} />
            <p className="text-center">
              {pokemon} - {form.name}
            </p>
          </div>
        </Card>
      ))}
    </>
  );
};

export const Images = () => {
  const imageArray = Object.entries(pokemonList).map(([key, value]) => {
    return { name: key, ...value };
  });

  return (
    <div>
      <IconButton icon={<UserGroupIcon />} alt="Pinned players" />
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
        {imageArray.map(pokemon => (
          <Fragment key={pokemon.name}>
            <Card>
              <div className="flex flex-col justify-center">
                <img src={`/sprites/pokemon/${pokemon.image}`} alt={pokemon.name} />
                <p className="text-center">{pokemon.name}</p>
              </div>
            </Card>
            {pokemon.forms && <Forms pokemon={pokemon.name} forms={pokemon.forms} />}
          </Fragment>
        ))}
      </div>
    </div>
  );
};
