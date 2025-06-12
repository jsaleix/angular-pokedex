import {
  componentWrapperDecorator,
  type Meta,
  type StoryObj,
} from '@storybook/angular';

import { PokemonCardComponent } from './pokemon-card.component';
import { mockPokemonData } from '@features/pokemon/services/data/pokemon';
import { MockPokemonSpecies } from '@features/pokemon/services/data/species';
import { mapPokemonApiToDto } from '@features/pokemon/models/pokemon.dto';
import { mapSpeciesApiToDto } from '@features/pokemon/models/species.dto';

const pokemonData = mapPokemonApiToDto(mockPokemonData);
const pokemonSpeciesData = mapSpeciesApiToDto(MockPokemonSpecies);

const meta: Meta<PokemonCardComponent> = {
  title: 'Features/Pokemon/Components/Pokemon-Card',
  component: PokemonCardComponent,
  decorators: [
    componentWrapperDecorator(
      (story) => `<div style="max-height: 80vh; width: 80vw;">${story}</div>`,
    ),
  ],
  tags: [],
  args: {},
};

export default meta;
type Story = StoryObj<PokemonCardComponent>;

export const PokemonCard: Story = {
  args: { pokemon: pokemonData, species: pokemonSpeciesData },
};
