import { Component, inject, signal } from '@angular/core';
import { Subscription } from 'rxjs';

import { PokemonService } from '@features/pokemon/services/pokemon.service';
import { PokemonListComponent } from '@features/pokemon/components/pokemon-list/pokemon-list.component';
import { PokemonInListI } from '@features/pokemon/types/api';

@Component({
  selector: 'app-pokedex',
  imports: [PokemonListComponent],
  templateUrl: './pokedex.component.html',
  styleUrl: './pokedex.component.css',
})
export class PokedexComponent {
  private pokemonService = inject(PokemonService);
  private sub: Subscription | null = null;
  pokemons = signal<PokemonInListI[]>([]);

  ngOnInit() {
    this.sub = this.pokemonService
      .getPokemons({ limit: 30 })
      .subscribe((data) => {
        this.pokemons.set(data.results);
      });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
