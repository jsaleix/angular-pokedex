import { Component, computed, inject, input, signal } from '@angular/core';
import { mapSpeciesApiToDto } from '@features/pokemon/models/species.dto';
import { PokemonDataService } from '@features/pokemon/services/pokemon-data.service';
import { PokemonService } from '@features/pokemon/services/pokemon.service';
import { PokemonData } from '@features/pokemon/types/data';
import { firstValueFrom } from 'rxjs';

type DataType = {
  name: string;
  url: string;
};
@Component({
  selector: 'app-pokemon-sprite-item',
  imports: [],
  templateUrl: './pokemon-sprite-item.component.html',
  styleUrl: './pokemon-sprite-item.component.css',
})
export class PokemonSpriteItemComponent {
  pokemonId = input.required<number>();
  data = signal<DataType | null>(null);
  pokemonDataService = inject(PokemonDataService);
  pokemonService = inject(PokemonService);

  async getPre8thGenUrl(id: number) {
    let res = this.pokemonDataService.getById(id);
    if (res === null) {
      this.data.set(null);
      return null;
    }
    const name = res.name['english'];
    const url = `https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen7x/regular/${name.toLowerCase()}.png`;
    return { name, url };
  }

  async getPost8thGenUrl(id: number) {
    try {
      const rawSpecies = await firstValueFrom(
        this.pokemonService.getPokemonSpeciesById(id),
      );
      const species = mapSpeciesApiToDto(rawSpecies);
      const { name } = species;
      const url = `https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/${name.toLowerCase()}.png`;
      return { name, url };
    } catch (e) {
      return null;
    }
  }

  async ngOnInit() {
    const id = this.pokemonId();
    let res =
      id < 810
        ? await this.getPre8thGenUrl(id)
        : await this.getPost8thGenUrl(id);

    if (!res) {
      this.data.set({
        name: '?',
        url: 'https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen7x/unknown-gen5.png',
      });
    } else {
      this.data.set(res);
    }
  }
}
