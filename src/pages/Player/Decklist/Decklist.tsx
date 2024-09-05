import { useParams } from 'react-router-dom';
import { useGetPlayerInfo } from 'hooks/useGetPlayer';

import { setMap } from 'constants/sets';

import type { Division } from 'types/tournament';
import type { DeckList, PokemonCard } from 'types/standing';

const getImageUrl = (card: PokemonCard) => {
  let setCode = setMap[card.set] || card.set.toLowerCase();
  let number = card.number;

  // Special case for Crown Zenith Galarian Gallery cards
  if (setCode === setMap['CRZ'] && card.number.includes('GG')) {
    setCode += 'gg';
  }

  if (setCode === setMap['PR-SW']) {
    number = `SWSH${number}`;
  }

  return `https://images.pokemontcg.io/${setCode}/${number}.png`;
};

// TODO: move to helpers
const getCountryCodeFromName = (name: string) => {
  const countryCode = name.match(/\[(\w+)\]$/);
  return countryCode ? countryCode[1] : '';
};

const useGetDecklist = (deckList: DeckList) => {
  const pokemon = deckList.pokemon;
  const formattedPokemon = pokemon.map(card => {
    return {
      ...card,
      image: getImageUrl(card),
    };
  });

  const formattedTrainers = deckList.trainer.map(card => {
    return {
      ...card,
      image: getImageUrl(card),
    };
  });

  const formattedEnergy = deckList.energy.map(card => {
    return {
      ...card,
      image: getImageUrl(card),
    };
  });

  const formattedCards = [...formattedPokemon, ...formattedTrainers, ...formattedEnergy];
  return { list: deckList, formattedCards };
};

const DecklistInner = ({ decklist }: { decklist: DeckList }) => {
  const { formattedCards } = useGetDecklist(decklist);

  return (
    <div>
      <div className="grid gap-2 grid-cols-8">
        {formattedCards.map(card => (
          <div key={card.name} className="relative">
            <img src={card.image} alt={card.name} />

            <div className="absolute bottom-0 right-0 inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 m-2">
              <span className="font-medium text-gray-600 dark:text-gray-300">{card.count}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Decklist = () => {
  const { playerName, tournamentId, division } = useParams() as {
    playerName: string;
    tournamentId: string;
    division: Division;
  };

  const { data: playerInfo, isLoading } = useGetPlayerInfo({ tournamentId, playerName, division });
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!playerInfo) {
    return <p>Player not found</p>;
  }

  const player = playerInfo[0];

  return (
    <>
      {getCountryCodeFromName(player.name) === 'JP' && (
        <p className="italic text-gray-500 dark:text-gray-400">
          Some cards may be wrong as we have converted the set list from the Japanese sets, if there
          is something wrong, please raise an issue with us on{' '}
          <a
            href="https://github.com/RichardHpa/Pokemon-TCG-Standings/issues"
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 dark:text-blue-400 underline"
          >
            github
          </a>{' '}
          and we will fix it.
        </p>
      )}
      <DecklistInner decklist={player.decklist} />
    </>
  );
};
