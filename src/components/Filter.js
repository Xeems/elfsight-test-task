import styled from 'styled-components';
import { Button, Input, Select } from './common';
import { useFilter, useSpecies } from '../hooks';
import { useCallback } from 'react';

const STATUS_OPTIONS = ['alive', 'dead', 'unknown'];
const GENDER_OPTIONS = ['female', 'male', 'genderless', 'unknown'];

export function Filter() {
  const { form, handleChange, apply, reset } = useFilter();
  const speciesOptions = useSpecies();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      console.log(123);
      apply();
    },
    [apply]
  );

  const handleFilterChange = useCallback(
    (name, value) => {
      console.log(name, value);
      handleChange(name, value);
    },
    [handleChange]
  );

  return (
    <FilterFormContainer onSubmit={handleSubmit}>
      <Select
        name={'status'}
        placeholder="Status"
        options={STATUS_OPTIONS}
        value={form.status}
        onChange={handleFilterChange}
      />

      <Select
        name={'gender'}
        placeholder="Gender"
        options={GENDER_OPTIONS}
        value={form.gender}
        onChange={handleFilterChange}
      />

      <Select
        name={'species'}
        placeholder="Species"
        options={speciesOptions}
        value={form.species}
        onChange={handleFilterChange}
      />

      <Input
        name={'name'}
        placeholder="Name"
        value={form.name}
        onChange={handleFilterChange}
      />

      <Input
        name={'type'}
        placeholder="Type"
        value={form.type}
        onChange={handleFilterChange}
      />

      <ButtonContainer>
        <Button type="submit">Apply</Button>
        <Button type="button" variant="destroy" onClick={reset}>
          Reset
        </Button>
      </ButtonContainer>
    </FilterFormContainer>
  );
}

const FilterFormContainer = styled.form`
  width: 100%;
  max-width: 560px;

  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-template-rows: repeat(2, 40px);

  gap: 10px;

  @media (max-width: 1520px) {
    max-width: 480px;
  }

  @media (max-width: 950px) {
    max-width: 240px;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: auto;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;

  @media (max-width: 950px) {
    flex-direction: column;
  }
`;
