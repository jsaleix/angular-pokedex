import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { getRandomDexId } from '@features/pokemon/utils';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  router = inject(Router);

  constructor() {
    const dexId = getRandomDexId();
    this.router.navigate(['/pokedex', dexId]);
  }
}
