import { Component, input } from '@angular/core';
import { PokemonSpriteItemComponent } from '../pokemon-sprite-item/pokemon-sprite-item.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-family-part',
  imports: [PokemonSpriteItemComponent, RouterModule],
  templateUrl: './family-part.component.html',
  styleUrl: './family-part.component.css',
})
export class FamilyPartComponent {
  speciesIds = input.required<number[]>();
}
