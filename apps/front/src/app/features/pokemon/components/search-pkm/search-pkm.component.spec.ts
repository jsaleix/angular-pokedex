import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPkmComponent } from './search-pkm.component';

describe('SearchPkmComponent', () => {
  let component: SearchPkmComponent;
  let fixture: ComponentFixture<SearchPkmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchPkmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchPkmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
