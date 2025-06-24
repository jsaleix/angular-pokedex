import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyPartComponent } from './family-part.component';
import { mockPkmSpecies } from '@features/pokemon/pages/pokemon/mock-pkm';
import { of } from 'rxjs';
import { PokemonDataService } from '@features/pokemon/services/pokemon-data.service';
import { PokemonService } from '@features/pokemon/services/pokemon.service';

class MockPokemonDataService {
  getById(id: number) {
    switch (id) {
      case 1:
        return { id, name: { french: 'Bulbizarre', english: 'Bulbasaur' } };
      case 2:
        return { id, name: { french: 'Herbizarre', english: 'Ivysaur' } };
      default:
        return { id, name: { french: 'Florizarre', english: 'Venusaur' } };
    }
  }
}

class MockPokemonService {
  getPokemonSpeciesById(_: number) {
    return of(mockPkmSpecies);
  }
}

describe('FamilyPartComponent', () => {
  let component: FamilyPartComponent;
  let fixture: ComponentFixture<FamilyPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FamilyPartComponent],
      providers: [
        { provide: PokemonDataService, useClass: MockPokemonDataService },
        { provide: PokemonService, useClass: MockPokemonService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FamilyPartComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('speciesIds', [1, 2, 3]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
