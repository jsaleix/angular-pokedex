import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PokemonSearchResult } from '@features/pokemon/types/data';

@Component({
  selector: 'app-search-pkm-result',
  imports: [RouterModule],
  templateUrl: './search-pkm-result.component.html',
  styleUrl: './search-pkm-result.component.css',
})
export class SearchPkmResultComponent {
  data = input.required<PokemonSearchResult>();
  selectedLang = input.required<string>();
}
