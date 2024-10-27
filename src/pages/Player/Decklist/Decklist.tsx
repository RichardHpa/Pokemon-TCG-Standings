import { useState, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { setMap } from 'constants/sets';
import { createPlayerName } from 'utils/createPlayerName';
import { getCountryCode } from 'utils/getCountryCode';
import { CardImage } from 'components/CardImage';
import { Button } from 'components/Button';

import { useGetTournament } from 'queries/useGetTournament';

import type { Division, TournamentApiResponse } from 'types/tournament';
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
    const formattedPokemon = pokemon.map((card) => {
        return {
            ...card,
            image: getImageUrl(card),
        };
    });

    const formattedTrainers = deckList.trainer.map((card) => {
        return {
            ...card,
            image: getImageUrl(card),
        };
    });

    const formattedEnergy = deckList.energy.map((card) => {
        return {
            ...card,
            image: getImageUrl(card),
        };
    });

    const formattedCards = [
        ...formattedPokemon,
        ...formattedTrainers,
        ...formattedEnergy,
    ];

    const listAsString = useMemo(() => {
        let string = '';
        const pokemonCount = formattedPokemon.reduce(
            (acc, card) => acc + card.count,
            0
        );
        const trainerCount = formattedTrainers.reduce(
            (acc, card) => acc + card.count,
            0
        );
        const energyCount = formattedEnergy.reduce(
            (acc, card) => acc + card.count,
            0
        );
        string += `Pokémon: ${pokemonCount}\n`;
        formattedPokemon.map((card) => {
            string += `${card.count} ${card.name} ${card.set} ${card.number}\n`;
        });

        string += `\nTrainers: ${trainerCount}\n`;
        formattedTrainers.map((card) => {
            string += `${card.count} ${card.name} ${card.set} ${card.number}\n`;
        });

        string += `\nEnergy: ${energyCount}\n`;
        formattedEnergy.map((card) => {
            string += `${card.count} ${card.name} ${card.set} ${card.number}\n`;
        });
        return string;
    }, [formattedEnergy, formattedPokemon, formattedTrainers]);

    return { list: deckList, formattedCards, listAsString };
};

const DecklistInner = ({ decklist }: { decklist: DeckList }) => {
    const [copied, setCopied] = useState(false);
    const { formattedCards, listAsString } = useGetDecklist(decklist);

    const handleOnCopy = useCallback(() => {
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    }, []);

    return (
        <div className="flex flex-col gap-4">
            <div>
                <CopyToClipboard text={listAsString} onCopy={handleOnCopy}>
                    <Button>{copied ? 'Copied!' : 'Copy Decklist'}</Button>
                </CopyToClipboard>
            </div>
            <div className="grid gap-2 grid-cols-2 sm:grid-cols-4 md:grid-cols-8">
                {formattedCards.map((card) => (
                    <div key={card.name} className="relative">
                        <CardImage src={card.image} alt={card.name} />

                        <div className="absolute bottom-0 right-0 inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 m-2">
                            <span className="font-medium text-gray-600 dark:text-gray-300">
                                {card.count}
                            </span>
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

    const { data, isPending } = useGetTournament({
        tournamentId,
        select: useCallback(
            (data: TournamentApiResponse) => {
                const divisions = data.tournament_data;
                const divisionToReturn = divisions.find(
                    (returnedDivision) => returnedDivision.division === division
                )!;

                const name = createPlayerName(playerName);

                const players = divisionToReturn.data.filter(
                    (player) => player.name === name
                );
                if (players.length === 0) {
                    throw new Error('Player not found');
                }

                return { players };
            },
            [division, playerName]
        ),
    });

    if (isPending) {
        return <p>Loading...</p>;
    }

    if (!data || !data.players || data.players.length === 0) {
        return <p>Player not found</p>;
    }

    const player = data.players[0];

    return (
        <>
            {getCountryCode(player.name) === 'JP' && (
                <p className="italic text-gray-500 dark:text-gray-400 mb-2">
                    Some cards may be wrong as we have converted the set list
                    from the Japanese sets, if there is something wrong, please
                    raise an issue with us on{' '}
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
