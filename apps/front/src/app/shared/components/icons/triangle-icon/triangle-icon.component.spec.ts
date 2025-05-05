import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriangleIconComponent } from './triangle-icon.component';

describe('TriangleIconComponent', () => {
  let component: TriangleIconComponent;
  let fixture: ComponentFixture<TriangleIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TriangleIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TriangleIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
