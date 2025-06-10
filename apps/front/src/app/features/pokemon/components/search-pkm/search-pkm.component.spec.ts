import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPkmComponent } from './search-pkm.component';
import { HttpClient } from '@angular/common/http';
import { PokemonDataService } from '@features/pokemon/services/pokemon-data.service';
import { of } from 'rxjs';
import { PokemonData } from '@features/pokemon/types/data';

describe('SearchPkmComponent', () => {
  let component: SearchPkmComponent;
  let fixture: ComponentFixture<SearchPkmComponent>;
  let mockPkmDataService: jasmine.SpyObj<PokemonDataService>;

  beforeEach(async () => {
    mockPkmDataService = jasmine.createSpyObj('PkmDataService', [
      'searchByName',
    ]);
    mockPkmDataService.searchByName.and.returnValue([]);

    await TestBed.configureTestingModule({
      imports: [SearchPkmComponent],
      providers: [
        { provide: PokemonDataService, useValue: mockPkmDataService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchPkmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
