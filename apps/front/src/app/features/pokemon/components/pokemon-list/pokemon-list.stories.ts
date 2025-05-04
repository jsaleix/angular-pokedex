import {
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
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
    // componentWrapperDecorator(
    //   (story) => `<div class="w-96 h-96">${story}</div>`,
    // ),
  ],
  tags: [],
  args: {},
};

export default meta;
type Story = StoryObj<PokemonListComponent>;

export const WithItems: Story = {
  args: { pokemons: data.results },
};

export const Empty: Story = {
  args: { pokemons: [] },
};
