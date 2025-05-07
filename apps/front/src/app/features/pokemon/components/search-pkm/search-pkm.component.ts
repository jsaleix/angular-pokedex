import { Component, effect, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputComponent } from '@shared/components/input/input.component';

const LANGS = { fr: 'fr', en: 'en' } as const;

@Component({
  selector: 'app-search-pkm',
  imports: [FormsModule, InputComponent],
  templateUrl: './search-pkm.component.html',
  styleUrl: './search-pkm.component.css',
})
export class SearchPkmComponent {
  inputModel = model('');
  results = signal<string[]>([]);
  availableLangs = [LANGS.en, LANGS.fr];
  selectedLang = signal<string>(LANGS.en);

  changeLang(idx: number) {
    if (idx > this.availableLangs.length || idx < 0) return;
    this.selectedLang.set(this.availableLangs[idx]);
  }

  constructor() {
    effect(() => {
      if (this.inputModel()) {
        this.results.set(['A', 'B', 'C']);
      } else {
        this.results.set([]);
      }
    });
  }
}
