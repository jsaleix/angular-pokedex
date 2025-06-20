import { Component, input } from '@angular/core';
import { PokemonAbility } from '@features/pokemon/models/abilities.dto';

@Component({
  selector: 'app-abilities-part',
  imports: [],
  templateUrl: './abilities-part.component.html',
  styleUrl: './abilities-part.component.css',
})
export class AbilitiesPartComponent {
  abilities = input.required<PokemonAbility[]>();
}
