import { TestBed } from '@angular/core/testing';

import { PokemonDataService } from './pokemon-data.service';
import { HttpClient } from '@angular/common/http';

describe('PokemonDataService', () => {
  let service: PokemonDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClient]
    });
    service = TestBed.inject(PokemonDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
