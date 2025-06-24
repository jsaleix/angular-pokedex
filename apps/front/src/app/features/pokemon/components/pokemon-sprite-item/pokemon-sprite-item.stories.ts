import {
  componentWrapperDecorator,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from "@storybook/angular";
import { of } from "rxjs";

import { PokemonDataService } from "@features/pokemon/services/pokemon-data.service";
import { PokemonService } from "@features/pokemon/services/pokemon.service";
import { PokemonSpriteItemComponent } from "./pokemon-sprite-item.component";
import { mockPkmSpecies } from "@features/pokemon/pages/pokemon/mock-pkm";

class MockPokemonDataService {
  getById(id: number) {
    switch (id) {
      case 809:
        return { id, name: { french: "Melmetal", english: "Melmetal" } };
      case 810:
        return { id, name: { french: "grookey", english: "grookey" } };
      default:
        return { id, name: { french: "?", english: "?" } };
    }
  }
}

class MockPokemonService {
  getPokemonSpeciesById(_: number) {
    return of(mockPkmSpecies);
  }
}

const meta: Meta<PokemonSpriteItemComponent> = {
  title: "Features/Pokemon/Components/Pokemon-Sprite-Item",
  component: PokemonSpriteItemComponent,
  decorators: [
    componentWrapperDecorator(
      (story) =>
        `<div style="padding: 10px 50px; max-height: 80vh; width: 80vw; background-color: black">${story}</div>`,
    ),
    moduleMetadata({
      imports: [],
      providers: [
        { provide: PokemonDataService, useClass: MockPokemonDataService },
        { provide: PokemonService, useClass: MockPokemonService },
      ],
    }),
  ],
  tags: [],
  args: {},
};

export default meta;
type Story = StoryObj<PokemonSpriteItemComponent>;

export const PokemonSpriteItem: Story = {
  args: { pokemonId: 809, lightMode: false },
};
