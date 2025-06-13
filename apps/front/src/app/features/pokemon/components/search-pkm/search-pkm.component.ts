import {
  Component,
  effect,
  inject,
  input,
  model,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PokemonDataService } from '@features/pokemon/services/pokemon-data.service';
import { PokemonSearchResult } from '@features/pokemon/types/data';
import { InputComponent } from '@shared/components/input/input.component';
import { SearchPkmResultComponent } from '../search-pkm-result/search-pkm-result.component';
import { Router } from '@angular/router';

const langs = { french: 'french', english: 'english' };
const langArray = Object.values(langs);

@Component({
  selector: 'app-search-pkm',
  imports: [FormsModule, InputComponent, SearchPkmResultComponent],
  templateUrl: './search-pkm.component.html',
  styleUrl: './search-pkm.component.css',
})
export class SearchPkmComponent {
  router = inject(Router);
  pkmDataService = inject(PokemonDataService);
  inputModel = model('');
  results = signal<PokemonSearchResult[]>([]);

  inputRef = viewChild(InputComponent);

  isFocused = input(false);

  selectedLang = signal<number>(0);
  availableLangs = Object.keys(langs);

  changeLang(idx: number) {
    this.selectedLang.set(idx);
  }

  clearInput() {
    this.inputModel.set('');
  }

  constructor() {
    effect(() => {
      if (this.inputModel()) {
        const lang = langArray[this.selectedLang()];
        const res = this.pkmDataService.searchByName(this.inputModel(), lang);
        this.results.set(res.slice(0, 10));
      } else {
        this.results.set([]);
      }
    });

    effect(() => {
      if (this.isFocused()) {
        this.inputRef()?.focus();
      }
    });
  }

  onPressEnter() {
    const currentPkms = this.results();
    if (currentPkms.length > 0) {
      this.router.navigate(['/pokedex/', +currentPkms[0].id]);
      this.clearInput();
    }
  }
}
