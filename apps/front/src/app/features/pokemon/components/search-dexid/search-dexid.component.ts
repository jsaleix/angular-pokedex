import { Component, input, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MagnifyingGlassIconComponent } from '@shared/components/icons/magnifying-glass-icon/magnifying-glass-icon.component';

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

  ngOnInit() {
    const initialValue = this.initialValue();
    if (initialValue) {
      this.startAtModel.set(initialValue);
    }
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') this.onIdChange.emit(this.startAtModel());
  }
}
