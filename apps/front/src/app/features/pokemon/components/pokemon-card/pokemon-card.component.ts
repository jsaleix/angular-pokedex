import { UpperCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { PokemonDTO } from '@features/pokemon/models/pokemon.dto';
import { SpeciesDTO } from '@features/pokemon/models/species.dto';
import { PokemonI, PokemonSpeciesI } from '@features/pokemon/types/api';
import { SquareIconComponent } from '@shared/components/icons/square-icon/square-icon.component';
import { StarIconComponent } from '@shared/components/icons/star-icon/star-icon.component';
import { TriangleIconComponent } from '@shared/components/icons/triangle-icon/triangle-icon.component';
import { TypeItemComponent } from '../type-item/type-item.component';

@Component({
  selector: 'app-pokemon-card',
  imports: [
    TriangleIconComponent,
    StarIconComponent,
    SquareIconComponent,
    UpperCasePipe,
    TypeItemComponent
  ],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.css',
})
export class PokemonCardComponent {
  pokemon = input<PokemonDTO>();
  species = input<SpeciesDTO>();
}
