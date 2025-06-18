import {
  componentWrapperDecorator,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import {
  HttpClient,
  HttpClientModule,
  provideHttpClient,
} from '@angular/common/http';

import { mockPokemonData } from '@features/pokemon/services/data/pokemon';
import { MockPokemonSpecies } from '@features/pokemon/services/data/species';
import { mapPokemonApiToDto } from '@features/pokemon/models/pokemon.dto';
import { mapSpeciesApiToDto } from '@features/pokemon/models/species.dto';
import { PokemonDataService } from '@features/pokemon/services/pokemon-data.service';
import { PokemonBodySelectorComponent } from './pokemon-body-selector.component';
import { PokemonService } from '@features/pokemon/services/pokemon.service';
import { mockPkmSpecies } from '@features/pokemon/pages/pokemon/mock-pkm';
import { of } from 'rxjs';

const pokemonData = { ...mapPokemonApiToDto(mockPokemonData), id: 2 };
const pokemonSpeciesData = mapSpeciesApiToDto(MockPokemonSpecies);

class MockPokemonDataService {
  getById(id: number) {
    switch (id) {
      case 809:
        return { id, name: { french: 'Melmetal', english: 'Melmetal' } };
      case 810:
        return { id, name: { french: 'grookey', english: 'grookey' } };
      default:
        return { id, name: { french: '?', english: '?' } };
    }
  }
}

class MockPokemonService {
  getPokemonSpeciesById(_: number) {
    return of(mockPkmSpecies);
  }
}

const meta: Meta<PokemonBodySelectorComponent> = {
  title: 'Features/Pokemon/Components/Pokemon-Body-Selector',
  component: PokemonBodySelectorComponent,
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
type Story = StoryObj<PokemonBodySelectorComponent>;

export const PokemonBodySelector: Story = {
  args: { pokemonId: 810 },
};
