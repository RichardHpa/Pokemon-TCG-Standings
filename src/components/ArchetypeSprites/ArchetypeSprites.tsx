import { useMemo } from 'react';
import clsx from 'clsx';

import { getArchetypes } from 'helpers/getArchetypes/getArchetypes';

import type { FC } from 'react';
import type { DeckList } from 'types/standing';

interface ImageProp {
  pokemon: string;
  image?: string;
}

const PokemonImage = ({ image, size }: { image: ImageProp; size: 'small' | 'large' }) => {
  if (!image) return null;
  return (
    <img
      className={clsx({
        'w-8 h-full': size === 'small',
        'w-12 h-full': size === 'large',
      })}
      src={`/sprites/pokemon/${image.image}`}
      alt={image.pokemon}
    />
  );
};

interface ArchetypeSpritesProps {
  decklist: DeckList;
  size?: 'small' | 'large';
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const ArchetypeSprites: FC<ArchetypeSpritesProps> = ({
  decklist,
  size = 'large',
  onClick = () => {},
}) => {
  const archetypes = useMemo(() => {
    return getArchetypes(decklist);
  }, [decklist]);

  if (!decklist) return null;

  if (archetypes.length === 0) {
    return null;
  }

  return (
    <div className="flex gap-1" onClick={onClick}>
      {archetypes.map((archetype, index) => (
        <PokemonImage key={index} image={archetype} size={size} />
      ))}
    </div>
  );
};
