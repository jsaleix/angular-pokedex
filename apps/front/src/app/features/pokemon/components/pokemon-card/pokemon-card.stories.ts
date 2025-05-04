import {
  componentWrapperDecorator,
  type Meta,
  type StoryObj,
} from '@storybook/angular';

import { PokemonCardComponent } from './pokemon-card.component';
import { mockPokemonData } from '@features/pokemon/services/data/pokemon';
import { MockPokemonSpecies } from '@features/pokemon/services/data/species';

const pokemonData = mockPokemonData;
const pokemonSpeciesData = MockPokemonSpecies;

const meta: Meta<PokemonCardComponent> = {
  title: 'Features/Pokemon/Components/Pokemon-Card',
  component: PokemonCardComponent,
  decorators: [
    componentWrapperDecorator(
      (story) => `<div style="height: 70vh; width: 80vw;">${story}</div>`,
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
