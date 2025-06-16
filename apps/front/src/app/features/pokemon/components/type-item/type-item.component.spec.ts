import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeItemComponent } from './type-item.component';

describe('TypeItemComponent', () => {
  let component: TypeItemComponent;
  let fixture: ComponentFixture<TypeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TypeItemComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('pkmType', 'Fire');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
