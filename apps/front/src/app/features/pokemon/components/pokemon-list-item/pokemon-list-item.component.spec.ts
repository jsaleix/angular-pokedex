import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonListItemComponent } from './pokemon-list-item.component';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PokemonInListI } from '@features/pokemon/types/api';

class ActivatedRouteMock {
  queryParams = new Observable((observer) => {
    const urlParams = {};

    observer.next(urlParams);
    observer.complete();
  });
}

const MOCK_PKM = {
  name: 'Charizard',
  url: 'https://pokeapi.co/api/v2/pokemon/6/',
} satisfies PokemonInListI;

describe('PokemonListItemComponent', () => {
  let component: PokemonListItemComponent;
  let fixture: ComponentFixture<PokemonListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonListItemComponent],
      providers: [{ provide: ActivatedRoute, useClass: ActivatedRouteMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonListItemComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('pokemon', MOCK_PKM);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
