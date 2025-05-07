import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeaknessesPartComponent } from './weaknesses-part.component';

describe('WeaknessesPartComponent', () => {
  let component: WeaknessesPartComponent;
  let fixture: ComponentFixture<WeaknessesPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeaknessesPartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeaknessesPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
