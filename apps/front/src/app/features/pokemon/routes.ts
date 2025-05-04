import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@features/pokemon/pages/pokedex/pokedex.component').then(
        (m) => m.PokedexComponent,
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('@features/pokemon/pages/pokemon/pokemon.component').then(
        (m) => m.PokemonComponent,
      ),
  },
];
