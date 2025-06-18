import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonBodySelectorComponent } from './pokemon-body-selector.component';
import { PokemonDataService } from '@features/pokemon/services/pokemon-data.service';
import { PokemonService } from '@features/pokemon/services/pokemon.service';

class MockPokemonDataService {}

class MockPokemonService {}

describe('PokemonBodySelectorComponent', () => {
  let component: PokemonBodySelectorComponent;
  let fixture: ComponentFixture<PokemonBodySelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonBodySelectorComponent],
      providers: [
        {
          provide: PokemonDataService,
          useValue: MockPokemonDataService,
        },
        {
          provide: PokemonService,
          useValue: MockPokemonService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonBodySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
