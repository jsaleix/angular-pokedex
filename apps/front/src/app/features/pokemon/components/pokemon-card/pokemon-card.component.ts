import { UpperCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { PokemonI, PokemonSpeciesI } from '@features/pokemon/types/api';
import { SquareIconComponent } from '@shared/components/icons/square-icon/square-icon.component';
import { StarIconComponent } from '@shared/components/icons/star-icon/star-icon.component';
import { TriangleIconComponent } from '@shared/components/icons/triangle-icon/triangle-icon.component';

@Component({
  selector: 'app-pokemon-card',
  imports: [
    TriangleIconComponent,
    StarIconComponent,
    SquareIconComponent,
    UpperCasePipe,
  ],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.css',
})
export class PokemonCardComponent {
  pokemon = input<PokemonI>();
  species = input<PokemonSpeciesI>();
}
