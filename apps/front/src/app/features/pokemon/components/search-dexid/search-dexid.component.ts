import { Component, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-dexid',
  imports: [FormsModule],
  templateUrl: './search-dexid.component.html',
  styleUrl: './search-dexid.component.css',
})
export class SearchDexidComponent {
  startAtModel = model(0);
  onClick = output<number>();

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') this.onClick.emit(this.startAtModel());
  }
}
