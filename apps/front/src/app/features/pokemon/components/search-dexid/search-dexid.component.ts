import { Component, input, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MagnifyingGlassIconComponent } from '@shared/components/icons/magnifying-glass-icon/magnifying-glass-icon.component';

const genOffsets = {
  1: 0,
  2: 151,
  3: 251,
  4: 386,
  5: 493,
  6: 649,
  7: 721,
  8: 809,
  9: 905
};

@Component({
  selector: 'app-search-dexid',
  imports: [FormsModule, MagnifyingGlassIconComponent],
  templateUrl: './search-dexid.component.html',
  styleUrl: './search-dexid.component.css',
})
export class SearchDexidComponent {
  initialValue = input<number>();
  startAtModel = model(0);
  onIdChange = output<number>();
  offsets = Object.entries(genOffsets);

  ngOnInit() {
    const initialValue = this.initialValue();
    if (initialValue) {
      this.startAtModel.set(initialValue);
    }
  }

  changeOffset(value: number) {
    this.startAtModel.set(value);
    this.onIdChange.emit(value);
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') this.onIdChange.emit(this.startAtModel());
  }
}
