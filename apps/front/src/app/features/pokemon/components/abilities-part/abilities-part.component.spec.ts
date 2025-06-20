import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbilitiesPartComponent } from './abilities-part.component';

describe('AbilitiesPartComponent', () => {
  let component: AbilitiesPartComponent;
  let fixture: ComponentFixture<AbilitiesPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbilitiesPartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbilitiesPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
