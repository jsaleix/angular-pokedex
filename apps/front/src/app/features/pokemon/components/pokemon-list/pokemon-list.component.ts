import { Component, input } from '@angular/core';

import { PokemonInListI } from '@features/pokemon/types/api';
import { PokemonListItemComponent } from '../pokemon-list-item/pokemon-list-item.component';

@Component({
  selector: 'app-pokemon-list',
  imports: [PokemonListItemComponent],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css',
})
export class PokemonListComponent {
  pokemons = input.required<PokemonInListI[]>();
}
