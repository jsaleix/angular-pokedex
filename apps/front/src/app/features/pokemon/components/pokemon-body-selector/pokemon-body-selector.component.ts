import { Component, computed, inject, input, signal } from '@angular/core';
import { PokemonDataService } from '@features/pokemon/services/pokemon-data.service';
import { PokemonData } from '@features/pokemon/types/data';

type DataType = {
  name: string;
  url: string;
};
@Component({
  selector: 'app-pokemon-body-selector',
  imports: [],
  templateUrl: './pokemon-body-selector.component.html',
  styleUrl: './pokemon-body-selector.component.css',
})
export class PokemonBodySelectorComponent {
  pokemonId = input.required<number>();
  data = signal<DataType | null>(null);
  pokemonDataService = inject(PokemonDataService);

  async ngOnInit() {
    let res = this.pokemonDataService.getById(this.pokemonId());
    if (res === null) {
      this.data.set(null);
    } else {
      const name = res.name['english'];
      const url = `https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen7x/regular/${name.toLowerCase()}.png`;
      this.data.set({
        name,
        url,
      });
    }
  }
}
