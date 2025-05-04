import { Component, input } from '@angular/core';
import { PokemonI, PokemonSpeciesI } from '@features/pokemon/types/api';

@Component({
  selector: 'app-pokemon-card',
  imports: [],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.css',
})
export class PokemonCardComponent {
  pokemon = input<PokemonI>();
  species = input<PokemonSpeciesI>();
}
