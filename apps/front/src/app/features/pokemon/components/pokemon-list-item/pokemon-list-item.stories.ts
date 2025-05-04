import {
  componentWrapperDecorator,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { PokemonListItemComponent } from './pokemon-list-item.component';
import { MockPokemonList } from '@features/pokemon/services/data/pokemons';

const data = MockPokemonList;

const meta: Meta<PokemonListItemComponent> = {
  title: 'Features/Pokemon/Components/Pokemon-List-Item',
  component: PokemonListItemComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
    componentWrapperDecorator(
      (story) => `<div class="w-96 h-96">${story}</div>`,
    ),
  ],
  tags: [],
  args: {},
};

export default meta;
type Story = StoryObj<PokemonListItemComponent>;

export const Regular: Story = {
  args: { pokemon: data.results[0] },
};

const invalidData = {
  ...data.results[1],
  url: 'https://pokeapi.co/api/v2/pokemon/???/',
};
export const WrongImage: Story = {
  args: { pokemon: invalidData },
};
