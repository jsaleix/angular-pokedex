import { Routes } from '@angular/router';
import { HomeComponent } from './features/general/home/home.component';
import { PageNotFoundComponent } from '@features/general/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'about',
    loadComponent: () =>
      import('@features/general/about/about.component').then(
        (m) => m.AboutComponent,
      ),
  },
  {
    path: 'pokedex',
    loadChildren: () =>
      import('@features/pokemon/routes').then((m) => m.routes),
  },
  { path: '**', component: PageNotFoundComponent },
];
