import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyPartComponent } from './family-part.component';

describe('FamilyPartComponent', () => {
  let component: FamilyPartComponent;
  let fixture: ComponentFixture<FamilyPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FamilyPartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FamilyPartComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('species', []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
