import { Component, inject, signal } from '@angular/core';
import { Subscription } from 'rxjs';

import { PokemonService } from '@features/pokemon/services/pokemon.service';
import { PokemonListComponent } from '@features/pokemon/components/pokemon-list/pokemon-list.component';
import { PokemonInListI } from '@features/pokemon/types/api';
import { SearchDexidComponent } from '@features/pokemon/components/search-dexid/search-dexid.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pokedex',
  imports: [PokemonListComponent, SearchDexidComponent],
  templateUrl: './pokedex.component.html',
  styleUrl: './pokedex.component.css',
})
export class PokedexComponent {
  private pokemonService = inject(PokemonService);
  private router: Router = inject(Router);
  private activeRoute = inject(ActivatedRoute);
  private serviceSub: Subscription | null = null;

  offset = signal(0);
  pokemons = signal<PokemonInListI[]>([]);

  ngOnInit() {
    const offsetParam = this.activeRoute.snapshot.queryParamMap.get('offset');
    if (offsetParam && !isNaN(+offsetParam)) {
      this.offset.set(+offsetParam);
    }
    this.loadNext();
  }

  ngOnDestroy() {
    this.serviceSub?.unsubscribe();
  }

  handleOffsetChange(value: number) {
    this.router.navigate(['pokedex'], { queryParams: { offset: value } });
    this.offset.set(value);
    this.pokemons.set([]);
    this.loadNext();
  }

  loadNext() {
    if (this.serviceSub) this.serviceSub.unsubscribe();
    const limit = 30;

    this.serviceSub = this.pokemonService
      .getPokemons({ limit, offset: this.offset() })
      .subscribe((data) => {
        this.pokemons.update((current) => [...current, ...data.results]);
        this.offset.update((v) => v + limit);
      });
  }
}
