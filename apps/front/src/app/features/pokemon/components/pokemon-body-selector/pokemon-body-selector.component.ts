import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-pokemon-body-selector',
  imports: [],
  templateUrl: './pokemon-body-selector.component.html',
  styleUrl: './pokemon-body-selector.component.css',
})
export class PokemonBodySelectorComponent {
  pokemonId = input.required<number>();
  url = computed(() => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.pokemonId()}.png`;
  });
}
