import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonSpriteItemComponent } from './pokemon-sprite-item.component';
import { PokemonDataService } from '@features/pokemon/services/pokemon-data.service';
import { PokemonService } from '@features/pokemon/services/pokemon.service';

class MockPokemonDataService {}

class MockPokemonService {}

describe('PokemonBodySelectorComponent', () => {
  let component: PokemonSpriteItemComponent;
  let fixture: ComponentFixture<PokemonSpriteItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonSpriteItemComponent],
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

    fixture = TestBed.createComponent(PokemonSpriteItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
