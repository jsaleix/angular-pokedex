import { RouterModule } from '@angular/router';
import { Component, computed, input, output, signal } from '@angular/core';

import { DexIdPipe } from '@features/pokemon/pipes/dex-id.pipe';
import { PokemonInListI } from '@features/pokemon/types/api';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-pokemon-list-item',
  imports: [DexIdPipe, RouterModule],
  templateUrl: './pokemon-list-item.component.html',
  styleUrl: './pokemon-list-item.component.css',
})
export class PokemonListItemComponent {
  pokemon = input.required<PokemonInListI>();
  imgFailed = signal<boolean>(false);

  id = computed(() => {
    const id = this.pokemon().url.split('/pokemon/')[1].replace('/', '');
    return id;
  });

  pkmImage = computed(() => {
    const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.id()}.png`;
    return img;
  });

}
