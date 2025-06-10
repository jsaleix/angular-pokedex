import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { PokedexComponent } from './pokedex.component';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '@features/pokemon/services/pokemon.service';

describe('PokedexComponent', () => {
  let component: PokedexComponent;
  let fixture: ComponentFixture<PokedexComponent>;
  let mockPokemonService: jasmine.SpyObj<PokemonService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockPokemonService = jasmine.createSpyObj('PokemonService', [
      'getPokemons',
    ]);
    mockPokemonService.getPokemons.and.returnValue(
      of({ count: 0, next: null, previous: null, results: [] }),
    );

    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [PokedexComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParamMap: {
                get: (key: string) => {
                  if (key === 'offset') return '0';
                  return null;
                },
              },
            },
          },
        },
        { provide: PokemonService, useValue: mockPokemonService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PokedexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
