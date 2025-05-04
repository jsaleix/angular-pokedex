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
  offset = signal(0);
  pokemons = signal<PokemonInListI[]>([]);

  ngOnInit() {
    this.loadNext();
  }

  loadNext() {
    if (this.sub) this.sub.unsubscribe();
    const limit = 30;

    this.sub = this.pokemonService
      .getPokemons({ limit, offset: this.offset() })
      .subscribe((data) => {
        this.pokemons.update((current) => [...current, ...data.results]);
        this.offset.update((v) => v + limit);
      });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
