import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchPkmResultComponent } from './search-pkm-result.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('SearchPkmResultComponent', () => {
  let component: SearchPkmResultComponent;
  let fixture: ComponentFixture<SearchPkmResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchPkmResultComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => null,
              },
            },
            params: of({}),
            queryParams: of({}),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchPkmResultComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('data', { id: 1, name: 'Bulbasaur' });
    fixture.componentRef.setInput('selectedLang', { id: 1, name: 'FR' });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
