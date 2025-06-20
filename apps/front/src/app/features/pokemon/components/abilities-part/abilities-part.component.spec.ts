import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbilitiesPartComponent } from './abilities-part.component';
import { mapAbilityFromApi } from '@features/pokemon/models/abilities.dto';
import { mockAbilityData } from '@features/pokemon/services/data/abilities';

const abilities = mapAbilityFromApi(mockAbilityData);

describe('AbilitiesPartComponent', () => {
  let component: AbilitiesPartComponent;
  let fixture: ComponentFixture<AbilitiesPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbilitiesPartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AbilitiesPartComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('abilities', [abilities]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
