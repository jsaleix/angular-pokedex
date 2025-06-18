import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import {
  HttpClient,
  HttpClientModule,
  provideHttpClient,
} from '@angular/common/http';

import { PokemonBodyComponent } from './pokemon-body.component';
import { mockPokemonData } from '@features/pokemon/services/data/pokemon';
import { MockPokemonSpecies } from '@features/pokemon/services/data/species';
import { mapPokemonApiToDto } from '@features/pokemon/models/pokemon.dto';
import { mapSpeciesApiToDto } from '@features/pokemon/models/species.dto';
import { PokemonDataService } from '@features/pokemon/services/pokemon-data.service';
import { mockPkmSpecies } from '@features/pokemon/pages/pokemon/mock-pkm';
import { of } from 'rxjs';
import { PokemonService } from '@features/pokemon/services/pokemon.service';

const pokemonData = { ...mapPokemonApiToDto(mockPokemonData), id: 2 };
const pokemonSpeciesData = mapSpeciesApiToDto(MockPokemonSpecies);

class MockPokemonDataService {
  getById(id: number) {
    switch (id) {
      case 1:
        return { id, name: { french: 'Bulbizarre', english: 'Bulbasaur' } };
      case 3:
        return { id, name: { french: 'Florizarre', english: 'Venusaur' } };
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

const meta: Meta<PokemonBodyComponent> = {
  title: 'Features/Pokemon/Components/Pokemon-Body',
  component: PokemonBodyComponent,
  decorators: [
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
type Story = StoryObj<PokemonBodyComponent>;

export const PokemonBody: Story = {
  args: { pokemon: pokemonData, species: pokemonSpeciesData },
};
