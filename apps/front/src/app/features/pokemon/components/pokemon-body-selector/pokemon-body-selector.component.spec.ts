import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonBodySelectorComponent } from './pokemon-body-selector.component';

describe('PokemonBodySelectorComponent', () => {
  let component: PokemonBodySelectorComponent;
  let fixture: ComponentFixture<PokemonBodySelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonBodySelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonBodySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
