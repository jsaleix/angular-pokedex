import { type Meta, type StoryObj } from '@storybook/angular';

import { PokemonBodyComponent } from './pokemon-body.component';
import { mockPokemonData } from '@features/pokemon/services/data/pokemon';
import { MockPokemonSpecies } from '@features/pokemon/services/data/species';
import { mapPokemonApiToDto } from '@features/pokemon/models/pokemon.dto';
import { mapSpeciesApiToDto } from '@features/pokemon/models/species.dto';

const pokemonData = mapPokemonApiToDto(mockPokemonData);
const pokemonSpeciesData = mapSpeciesApiToDto(MockPokemonSpecies);

const meta: Meta<PokemonBodyComponent> = {
  title: 'Features/Pokemon/Components/Pokemon-Body',
  component: PokemonBodyComponent,
  tags: [],
  args: {},
};

export default meta;
type Story = StoryObj<PokemonBodyComponent>;

export const PokemonBody: Story = {
  args: { pokemon: pokemonData, species: pokemonSpeciesData },
};
