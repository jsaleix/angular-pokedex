import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from '@storybook/test';

import { PokemonListComponent } from './pokemon-list.component';
import { MockPokemonList } from '@features/pokemon/services/data/pokemons';

const data = MockPokemonList;

const meta: Meta<PokemonListComponent> = {
  title: 'Features/Pokemon/Components/Pokemon-List',
  component: PokemonListComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
  tags: [],
  args: { onScrollEnd: fn() },
};

export default meta;
type Story = StoryObj<PokemonListComponent>;

export const WithItems: Story = {
  args: { pokemons: data.results },
};

export const Empty: Story = {
  args: { pokemons: [] },
};
