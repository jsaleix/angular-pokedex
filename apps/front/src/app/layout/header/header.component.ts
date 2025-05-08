import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MagnifyingGlassIconComponent } from '@shared/components/icons/magnifying-glass-icon/magnifying-glass-icon.component';
import { SearchModalService } from '@shared/services/search-modal.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule, MagnifyingGlassIconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  searchModalService = inject(SearchModalService);
}
