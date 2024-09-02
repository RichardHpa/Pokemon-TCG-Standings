import { useParams } from 'react-router-dom';
import { useGetPlayerInfo } from 'hooks/useGetPlayer';

import { setMap } from 'constants/sets';

import type { Division } from 'types/tournament';
import type { DeckList } from 'types/standing';

const useGetDecklist = (deckList: DeckList) => {
  const pokemon = deckList.pokemon;
  const formattedPokemon = pokemon.map(card => {
    const setCode = setMap[card.set] || card.set.toLowerCase();
    return {
      ...card,
      image: `https://images.pokemontcg.io/${setCode}/${card.number}.png`,
    };
  });

  const formattedTrainers = deckList.trainer.map(card => {
    const setCode = setMap[card.set] || card.set.toLowerCase();
    return {
      ...card,
      image: `https://images.pokemontcg.io/${setCode}/${card.number}.png`,
    };
  });

  const formattedEnergy = deckList.energy.map(card => {
    const setCode = setMap[card.set] || card.set.toLowerCase();
    return {
      ...card,
      image: `https://images.pokemontcg.io/${setCode}/${card.number}.png`,
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
          <div key={card.number}>
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
