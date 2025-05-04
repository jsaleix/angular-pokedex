import { Component, inject, signal } from '@angular/core';
import { Subscription } from 'rxjs';

import { PokemonService } from '@features/pokemon/services/pokemon.service';
import { PokemonListComponent } from '@features/pokemon/components/pokemon-list/pokemon-list.component';
import { PokemonInListI } from '@features/pokemon/types/api';

const LIMIT = 30;

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

    this.sub = this.pokemonService
      .getPokemons({ limit: 30, offset: this.offset() })
      .subscribe((data) => {
        this.pokemons.update((current) => [...current, ...data.results]);
        this.offset.update((v) => v + LIMIT);
      });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
