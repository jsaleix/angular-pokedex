import { Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { PokemonBodyComponent } from '@features/pokemon/components/pokemon-body/pokemon-body.component';
import { PokemonCardSkeletonComponent } from '@features/pokemon/components/pokemon-card-skeleton/pokemon-card-skeleton.component';
import { PokemonCardComponent } from '@features/pokemon/components/pokemon-card/pokemon-card.component';
import { WeaknessesPartComponent } from '@features/pokemon/components/weaknesses-part/weaknesses-part.component';
import {
  mapAbilityFromApi,
  PokemonAbility,
} from '@features/pokemon/models/abilities.dto';
import {
  mapPokemonApiToDto,
  PokemonDTO,
} from '@features/pokemon/models/pokemon.dto';
import {
  mapSpeciesApiToDto,
  SpeciesDTO,
} from '@features/pokemon/models/species.dto';
import { PokemonService } from '@features/pokemon/services/pokemon.service';
import { PokemonAbilityResponse } from '@features/pokemon/types/api';
import { extractIdFromUrl } from '@features/pokemon/utils/extract';
import { firstValueFrom, of, Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-pokemon',
  imports: [
    PokemonCardComponent,
    PokemonCardSkeletonComponent,
    PokemonBodyComponent,
  ],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.css',
})
export class PokemonComponent {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private sub: Subscription | null = null;
  private pokemonService = inject(PokemonService);
  pokemon = signal<PokemonDTO | null>(null);
  species = signal<SpeciesDTO | null>(null);
  abilities = signal<PokemonAbility[]>([]);

  constructor() {
    effect(async () => {
      const pkm = this.pokemon();
      if (!pkm) return [];
      const rawAbilities = pkm.abilities
        .map((a) => extractIdFromUrl(a.url))
        .filter(Boolean) as number[];
      const resolved = await Promise.all(
        rawAbilities.map(
          async (abilityId) =>
            await firstValueFrom(this.pokemonService.getAbilityById(abilityId)),
        ),
      );
      const res = resolved.map((res: PokemonAbilityResponse) =>
        mapAbilityFromApi(res),
      );
      this.abilities.set(res);

      return () => {};
    });
  }

  ngOnInit() {
    this.sub = this.route.params
      .pipe(
        switchMap((params) => {
          this.pokemon.set(null);
          this.species.set(null);
          const id = params['id'];
          if (!id) return of(null);
          return this.pokemonService.getPokemonById(id);
        }),
        switchMap((pokemon) => {
          if (!pokemon) return of(null);
          this.pokemon.set(mapPokemonApiToDto(pokemon));
          return this.pokemonService.getPokemonSpeciesById(pokemon.id);
        }),
      )
      .subscribe((species) => {
        // SetTimeout here to let the skeleton be visible
        if (species)
          setTimeout(() => this.species.set(mapSpeciesApiToDto(species)), 1200);
      });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
