import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { PokemonService } from '@features/pokemon/services/pokemon.service';
import { BasePokemonI } from '@features/pokemon/types/api';
import { map, of, Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-pokemon',
  imports: [],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.css',
})
export class PokemonComponent {
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private sub: Subscription | null = null;
  private pokemonService = inject(PokemonService);
  pokemon = signal<BasePokemonI | null>(null);

  ngOnInit() {
    this.sub = this.route.params
      .pipe(
        switchMap((params) => {
          const id = params['id'];
          if (!id) return of(null);
          return this.pokemonService.getPokemonById(id);
        }),
      )
      .subscribe((pokemon) => this.pokemon.set(pokemon));
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
