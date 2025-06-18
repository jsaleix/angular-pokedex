import { moduleMetadata, type Meta, type StoryObj } from "@storybook/angular";
import {
  HttpClient,
  HttpClientModule,
  provideHttpClient,
} from "@angular/common/http";

import { mockPokemonData } from "@features/pokemon/services/data/pokemon";
import { MockPokemonSpecies } from "@features/pokemon/services/data/species";
import { mapPokemonApiToDto } from "@features/pokemon/models/pokemon.dto";
import { mapSpeciesApiToDto } from "@features/pokemon/models/species.dto";
import { PokemonDataService } from "@features/pokemon/services/pokemon-data.service";
import { PokemonBodySelectorComponent } from "./pokemon-body-selector.component";

const pokemonData = { ...mapPokemonApiToDto(mockPokemonData), id: 2 };
const pokemonSpeciesData = mapSpeciesApiToDto(MockPokemonSpecies);

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

const meta: Meta<PokemonBodySelectorComponent> = {
  title: "Features/Pokemon/Components/Pokemon-Body-Selector",
  component: PokemonBodySelectorComponent,
  decorators: [
    moduleMetadata({
      imports: [],
      providers: [
        { provide: PokemonDataService, useClass: MockPokemonDataService },
      ],
    }),
  ],
  tags: [],
  args: {},
};

export default meta;
type Story = StoryObj<PokemonBodySelectorComponent>;

export const PokemonBodySelector: Story = {
  args: { pokemonId: 810 },
};
