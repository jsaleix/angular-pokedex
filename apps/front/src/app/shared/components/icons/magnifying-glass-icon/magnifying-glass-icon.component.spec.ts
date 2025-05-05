import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagnifyingGlassIconComponent } from './magnifying-glass-icon.component';

describe('MagnifyingGlassIconComponent', () => {
  let component: MagnifyingGlassIconComponent;
  let fixture: ComponentFixture<MagnifyingGlassIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagnifyingGlassIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MagnifyingGlassIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
