import { Formik } from 'formik';

import { TextField } from 'components/Forms/TextField';
import { DatePicker } from 'components/Forms/DatePicker';
import { Select } from 'components/Forms/Select';
import { Button } from 'components/Button';

import { FINISHED, RUNNING } from 'constants/tournament';

import type { TournamentFormProps } from './types';
import type { FC } from 'react';

const tournamentTypeOptions = [
  { value: 'Worlds', label: 'Worlds' },
  { value: 'International', label: 'International' },
  { value: 'Regional', label: 'Regional' },
  { value: 'SpecialEvent', label: 'Special Event' },
  { value: 'Cup', label: 'Cup' },
];

const tournamentStatusOptions = [
  { value: RUNNING, label: 'Running' },
  { value: FINISHED, label: 'Finished' },
];

const regionOptions = [
  { value: 'UsaCanada', label: 'Usa & Canada' },
  { value: 'Europe', label: 'Europe' },
  { value: 'LatinAmerica', label: 'Latin America' },
  { value: 'Oceania', label: 'Oceania' },
  { value: 'Asia', label: 'Asia' },
  { value: 'MiddleEastSouthAfrica', label: 'Middle East & South Africa' },
  { value: 'Russia', label: 'Russia' },
  { value: 'Worlds', label: 'Worlds' },
  { value: 'Unknown', label: 'Unknown' },
];

export const TournamentForm: FC<TournamentFormProps> = ({ tournamentValues, onSubmit }) => {
  return (
    <Formik
      initialValues={tournamentValues}
      validate={values => {
        const errors: any = {};
        if (!values.name) {
          errors.name = 'Required';
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        const res = await onSubmit(values);
        if (res) {
          setSubmitting(false);
        }
      }}
    >
      {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <TextField
                label="Tournament name"
                onChange={handleChange}
                name="name"
                value={values.name}
                error={errors.name && touched.name && errors.name}
                disabled={isSubmitting}
              />
            </div>

            <div>
              <TextField
                name="pokeDataId"
                label="PokeData ID"
                value={values.pokeDataId}
                onChange={handleChange}
                readonly
                error={errors.pokeDataId && touched.pokeDataId && errors.pokeDataId}
                disabled={isSubmitting}
              />
            </div>

            <div>
              <TextField
                name="rk9link"
                label="RK9 link"
                value={values.rk9link}
                onChange={handleChange}
                readonly
                error={errors.rk9link && touched.rk9link && errors.rk9link}
                disabled={isSubmitting}
              />
            </div>

            <div>
              <Select
                label="Tournament status"
                name="tournamentStatus"
                options={tournamentStatusOptions}
                value={values.tournamentStatus}
                onChange={handleChange}
                disabled={isSubmitting}
                // error={errors.tournamentStatus && touched.tournamentStatus && errors.tournamentStatus}
              />
            </div>

            <div>
              <Select
                label="Tournament type"
                name="type"
                options={tournamentTypeOptions}
                value={values.type}
                onChange={handleChange}
                disabled={isSubmitting}
                // error={errors.type && touched.tournamentType && errors.type}
              />
            </div>

            <div>
              <Select
                label="Region"
                name="region"
                options={regionOptions}
                value={values.region}
                onChange={handleChange}
                disabled={isSubmitting}
                // error={errors.region && touched.tournamentType && errors.region}
              />
            </div>

            <div />

            <DatePicker
              name="startDate"
              label="Start Date"
              value={values.startDate}
              onChange={handleChange}
              maxDate={values.endDate}
              disabled={isSubmitting}
            />

            <DatePicker
              name="endDate"
              label="End Date"
              value={values.endDate}
              onChange={handleChange}
              minDate={values.startDate}
              disabled={isSubmitting}
            />

            <div className="col-span-2">
              <Button type="submit" disabled={isSubmitting}>
                {tournamentValues ? 'Update' : 'Submit'}
              </Button>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};
