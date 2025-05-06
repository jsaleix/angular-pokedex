import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonShapesAnimationComponent } from './pokemon-shapes-animation.component';

describe('PokemonShapesAnimationComponent', () => {
  let component: PokemonShapesAnimationComponent;
  let fixture: ComponentFixture<PokemonShapesAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonShapesAnimationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonShapesAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
