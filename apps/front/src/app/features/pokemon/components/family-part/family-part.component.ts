import { Component, input } from '@angular/core';
import { PokemonBodySelectorComponent } from '../pokemon-body-selector/pokemon-body-selector.component';

@Component({
  selector: 'app-family-part',
  imports: [PokemonBodySelectorComponent],
  templateUrl: './family-part.component.html',
  styleUrl: './family-part.component.css',
})
export class FamilyPartComponent {
  speciesIds = input.required<number[]>();
}
