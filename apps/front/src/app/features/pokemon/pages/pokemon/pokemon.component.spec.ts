import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { PokemonComponent } from './pokemon.component';
import { PokemonService } from '@features/pokemon/services/pokemon.service';
import { PokemonI, PokemonSpeciesI } from '@features/pokemon/types/api';
import { mockPokemon } from './mock-pkm';
import { MockPokemonSpecies } from '@features/pokemon/services/data/species';

// Mocks simples des objets retournés

describe('PokemonComponent', () => {
  let component: PokemonComponent;
  let fixture: ComponentFixture<PokemonComponent>;
  let mockPokemonService: jasmine.SpyObj<PokemonService>;
  let routeParams$: Subject<any>;

  beforeEach(async () => {
    // Spies sur les méthodes du service
    mockPokemonService = jasmine.createSpyObj('PokemonService', [
      'getPokemonById',
      'getPokemonSpeciesById',
    ]);

    mockPokemonService.getPokemonById.and.returnValue(of(mockPokemon));
    mockPokemonService.getPokemonSpeciesById.and.returnValue(
      of(MockPokemonSpecies),
    );

    // Simulation dynamique des params
    routeParams$ = new Subject();

    await TestBed.configureTestingModule({
      imports: [PokemonComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: routeParams$,
          },
        },
        { provide: PokemonService, useValue: mockPokemonService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load pokemon and species data on init', () => {
    routeParams$.next({ id: 1 });

    expect(mockPokemonService.getPokemonById).toHaveBeenCalledWith(1);
    expect(mockPokemonService.getPokemonSpeciesById).toHaveBeenCalledWith(1);
  });
});
