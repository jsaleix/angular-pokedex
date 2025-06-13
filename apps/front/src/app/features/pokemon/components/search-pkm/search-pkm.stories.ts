import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

import { SearchPkmComponent } from './search-pkm.component';
import { InputComponent } from '@shared/components/input/input.component';
import { FormsModule } from '@angular/forms';
import { SearchPkmResultComponent } from '../search-pkm-result/search-pkm-result.component';
import { PokemonDataService } from '@features/pokemon/services/pokemon-data.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { mockPokemon } from '@features/pokemon/pages/pokemon/mock-pkm';

class MockPokemonDataService {
  searchByName(_: string) {
    return [mockPokemon];
  }
}

const meta: Meta<SearchPkmComponent> = {
  title: 'Features/Pokemon/Components/Search-Pkm',
  component: SearchPkmComponent,
  decorators: [
    moduleMetadata({
      imports: [InputComponent, FormsModule, SearchPkmResultComponent],
      providers: [
        { provide: PokemonDataService, useClass: MockPokemonDataService },
      ],
    }),
  ],
  tags: [],
  args: {},
};

export default meta;
type Story = StoryObj<SearchPkmComponent>;

export const SearchPkm: Story = {
  args: {},
};
