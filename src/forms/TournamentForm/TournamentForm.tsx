import { TextField } from 'components/Forms/TextField';
import { Button } from 'components/Button';

import type { TournamentFormProps } from './types';
import type { FC } from 'react';

export const TournamentForm: FC<TournamentFormProps> = ({ values }) => {
  return (
    <form>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <TextField
            name="name"
            label="Tournament name"
            value={values.name}
            onChange={val => console.log(val)}
          />
        </div>

        <div>
          <TextField
            name="pokeDataId"
            label="PokeData ID"
            value={values.pokeDataId}
            onChange={val => console.log(val)}
            readonly
          />
        </div>

        <div>
          <TextField
            name="rk9link"
            label="RK9 link"
            value={values.rk9link}
            onChange={val => console.log(val)}
            readonly
          />
        </div>

        <div>
          <TextField
            name="tournamentStatus"
            label="Tournament status"
            value={values.tournamentStatus}
            onChange={val => console.log(val)}
          />
        </div>

        <div className="col-span-2">
          <Button>Submit</Button>
        </div>
      </div>
    </form>
  );
};
