import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { FamilyPartComponent } from './family-part.component';
import { PokemonDataService } from '@features/pokemon/services/pokemon-data.service';
import { PokemonService } from '@features/pokemon/services/pokemon.service';
import { mockPkmSpecies } from '@features/pokemon/pages/pokemon/mock-pkm';
import { of } from 'rxjs';

class MockPokemonDataService {
  getById(id: number) {
    switch (id) {
      case 1:
        return { id, name: { french: 'Bulbizarre', english: 'Bulbasaur' } };
      case 2:
        return { id, name: { french: 'Herbizarre', english: 'Ivysaur' } };
      default:
        return { id, name: { french: 'Florizarre', english: 'Venusaur' } };
    }
  }
}

class MockPokemonService {
  getPokemonSpeciesById(_: number) {
    return of(mockPkmSpecies);
  }
}

const meta: Meta<FamilyPartComponent> = {
  title: 'Features/Pokemon/Components/FamilyPart',
  component: FamilyPartComponent,
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
type Story = StoryObj<FamilyPartComponent>;

export const FamilyPart: Story = {
  args: { speciesIds: [1, 2, 3] },
};
