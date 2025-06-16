import { Component, input } from '@angular/core';
import { PokemonDTO } from '@features/pokemon/models/pokemon.dto';
import { SpeciesDTO } from '@features/pokemon/models/species.dto';
import { WeaknessesPartComponent } from '../weaknesses-part/weaknesses-part.component';

@Component({
  selector: 'app-pokemon-body',
  imports: [WeaknessesPartComponent],
  templateUrl: './pokemon-body.component.html',
  styleUrl: './pokemon-body.component.css',
})
export class PokemonBodyComponent {
  pokemon = input.required<PokemonDTO>();
  species = input.required<SpeciesDTO>();
}
