import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { PokemonCardSkeletonComponent } from '@features/pokemon/components/pokemon-card-skeleton/pokemon-card-skeleton.component';
import { PokemonCardComponent } from '@features/pokemon/components/pokemon-card/pokemon-card.component';
import { PokemonService } from '@features/pokemon/services/pokemon.service';
import { PokemonI, PokemonSpeciesI } from '@features/pokemon/types/api';
import { of, Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-pokemon',
  imports: [PokemonCardComponent, PokemonCardSkeletonComponent],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.css',
})
export class PokemonComponent {
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private sub: Subscription | null = null;
  private pokemonService = inject(PokemonService);
  pokemon = signal<PokemonI | null>(null);
  species = signal<PokemonSpeciesI | null>(null);

  ngOnInit() {
    this.sub = this.route.params
      .pipe(
        switchMap((params) => {
          const id = params['id'];
          if (!id) return of(null);
          return this.pokemonService.getPokemonById(id);
        }),
        switchMap((pokemon) => {
          if (!pokemon) return of(null);
          this.pokemon.set(pokemon);
          return this.pokemonService.getPokemonSpeciesById(pokemon.id);
        }),
      )
      .subscribe((species) => {
        // SetTimeout here to let the skeleton be visible
        setTimeout(() => this.species.set(species), 1200);
      });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
