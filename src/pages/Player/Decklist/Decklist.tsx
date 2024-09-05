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
  const { list, formattedCards } = useGetDecklist(decklist);

  return (
    <div>
      <div className="grid gap-2 grid-cols-8">
        {formattedCards.map(card => (
          <div key={card.name}>
            <img src={card.image} alt={card.name} />
          </div>
        ))}
      </div>

      <pre>
        <code>{JSON.stringify(list, null, 2)}</code>
      </pre>
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

  return <DecklistInner decklist={player.decklist} />;
};
