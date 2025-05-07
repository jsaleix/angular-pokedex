import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPkmResultComponent } from './search-pkm-result.component';

describe('SearchPkmResultComponent', () => {
  let component: SearchPkmResultComponent;
  let fixture: ComponentFixture<SearchPkmResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchPkmResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchPkmResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
