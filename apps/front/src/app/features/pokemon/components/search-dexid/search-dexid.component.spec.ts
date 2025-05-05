import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDexidComponent } from './search-dexid.component';

describe('SearchDexidComponent', () => {
  let component: SearchDexidComponent;
  let fixture: ComponentFixture<SearchDexidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchDexidComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchDexidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
