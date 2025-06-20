import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonBodyComponent } from './pokemon-body.component';
import { PokemonDataService } from '@features/pokemon/services/pokemon-data.service';
import { mapPokemonApiToDto } from '@features/pokemon/models/pokemon.dto';
import {
  mockPkmSpecies,
  mockPokemon,
} from '@features/pokemon/pages/pokemon/mock-pkm';
import { mapSpeciesApiToDto } from '@features/pokemon/models/species.dto';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { mapAbilityFromApi } from '@features/pokemon/models/abilities.dto';
import { mockAbilityData } from '@features/pokemon/services/data/abilities';

const pokemon = mapPokemonApiToDto(mockPokemon);
const species = mapSpeciesApiToDto(mockPkmSpecies);
const abilities = mapAbilityFromApi(mockAbilityData);

class ActivatedRouteMock {
  queryParams = new Observable((observer) => {
    const urlParams = {};

    observer.next(urlParams);
    observer.complete();
  });
}

describe('PokemonBodyComponent', () => {
  let component: PokemonBodyComponent;
  let fixture: ComponentFixture<PokemonBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonBodyComponent],
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteMock },
        provideHttpClient(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonBodyComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('pokemon', pokemon);
    fixture.componentRef.setInput('species', species);
    fixture.componentRef.setInput('abilities', [abilities]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
