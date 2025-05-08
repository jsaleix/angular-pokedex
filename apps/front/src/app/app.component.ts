import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SearchPkmModalComponent } from '@features/pokemon/components/search-modal/search-pkm-modal.component';
import { SearchModalService } from '@shared/services/search-modal.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    SearchPkmModalComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  searchModalService = inject(SearchModalService);
  title = 'pokedexo';
}
