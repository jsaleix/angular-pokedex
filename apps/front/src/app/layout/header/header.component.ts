import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchPkmModalComponent } from '@features/pokemon/components/search-modal/search-pkm-modal.component';
import { MagnifyingGlassIconComponent } from '@shared/components/icons/magnifying-glass-icon/magnifying-glass-icon.component';

@Component({
  selector: 'app-header',
  imports: [
    RouterModule,
    SearchPkmModalComponent,
    MagnifyingGlassIconComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  modalOpen = signal(false);
}
