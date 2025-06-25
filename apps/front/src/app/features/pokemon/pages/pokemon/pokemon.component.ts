import { Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom, of, Subscription, switchMap } from 'rxjs';

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
import { AppPokemonSpeciesI } from '@features/pokemon/types/data';
import {
  extractIdFromAbilityUrl,
  extractSpeciesFromChainResult,
} from '@features/pokemon/utils/api';
import { FamilyPartComponent } from '@features/pokemon/components/family-part/family-part.component';
import { PokemonBodyComponent } from '@features/pokemon/components/pokemon-body/pokemon-body.component';
import { PokemonCardSkeletonComponent } from '@features/pokemon/components/pokemon-card-skeleton/pokemon-card-skeleton.component';
import { PokemonCardComponent } from '@features/pokemon/components/pokemon-card/pokemon-card.component';
import { needsLoading, disableLoading } from '@features/pokemon/stores/loading';

@Component({
  selector: 'app-pokemon',
  imports: [
    PokemonCardComponent,
    PokemonCardSkeletonComponent,
    PokemonBodyComponent,
    FamilyPartComponent,
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
  family = signal<AppPokemonSpeciesI[]>([]);

  familyIds = computed(() => {
    return this.family().map((species) => species.id);
  });

  constructor() {
    // Fetching abilities
    effect(async () => {
      const pkm = this.pokemon();
      if (!pkm) return;
      const rawAbilities = pkm.abilities
        .map((a) => extractIdFromAbilityUrl(a.url))
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
    });

    effect(async () => {
      const species = this.species();
      if (!species || !species.evolutionChainId) {
        this.family.set([]);
        return;
      }
      const rawChain = await firstValueFrom(
        this.pokemonService.getEvolutionChain(species.evolutionChainId),
      );
      const familyRes = extractSpeciesFromChainResult(rawChain.chain);
      this.family.set(familyRes);
    });
  }

  ngOnInit() {
    this.sub = this.route.params
      .pipe(
        switchMap((params) => {
          this.pokemon.set(null);
          this.species.set(null);
          this.abilities.set([]);
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
      .subscribe((speciesResponse) => {
        // SetTimeout here to let the skeleton be visible at least once
        if (speciesResponse) {
          const data = mapSpeciesApiToDto(speciesResponse);
          if (needsLoading()) {
            setTimeout(() => this.species.set(data), 1200);
            disableLoading();
          } else {
            this.species.set(data);
          }
        }
      });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
