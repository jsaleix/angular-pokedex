import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Observable } from 'rxjs';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SearchPkmModalComponent } from '@features/pokemon/components/search-modal/search-pkm-modal.component';
import {
  HttpClient,
  HttpClientModule,
  provideHttpClient,
} from '@angular/common/http';

class ActivatedRouteMock {
  queryParams = new Observable((observer) => {
    const urlParams = {};

    observer.next(urlParams);
    observer.complete();
  });
}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterOutlet,
        HeaderComponent,
        FooterComponent,
        SearchPkmModalComponent,
      ],
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteMock },
        provideHttpClient(),
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'pokedexo' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('pokedexo');
  });
});
