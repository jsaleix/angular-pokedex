import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPkmComponent } from './search-pkm.component';
import { PokemonDataService } from '@features/pokemon/services/pokemon-data.service';
import { first, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

const searchAResults = [
  { id: 1, name: { french: 'Torterra', english: 'Torterra' } },
  { id: 2, name: { french: 'Tortank', english: 'Blastoise' } },
];
const searchBResults = [
  { id: 1, name: { french: 'Simiabraz', english: 'Infernape' } },
  { id: 1, name: { french: 'Simularbre', english: 'Sudowoodo' } },
];

describe('SearchPkmComponent', () => {
  let component: SearchPkmComponent;
  let fixture: ComponentFixture<SearchPkmComponent>;
  let mockPkmDataService: jasmine.SpyObj<PokemonDataService>;
  let mockActivatedRoute: jasmine.SpyObj<ActivatedRoute>;

  beforeEach(async () => {
    //ActivatedRoute
    mockActivatedRoute = jasmine.createSpyObj('ActivatedRoute', ['queryParam']);
    mockActivatedRoute.queryParams = new Observable((observer) => {
      const urlParams = {};

      observer.next(urlParams);
      observer.complete();
    });

    // PkmDataService
    mockPkmDataService = jasmine.createSpyObj('PkmDataService', [
      'searchByName',
    ]);
    mockPkmDataService.searchByName.and.callFake((searchTerm) => {
      if (searchTerm === 'T') return searchAResults;
      if (searchTerm === 'S') return searchBResults;
      if (searchTerm === 'Torterra') return [searchAResults[0]];
      if (searchTerm === 'Simiabraz') return [searchBResults[0]];
      return [];
    });
    await TestBed.configureTestingModule({
      imports: [SearchPkmComponent],
      providers: [
        { provide: PokemonDataService, useValue: mockPkmDataService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchPkmComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('isFocused', true);
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Make the title visible', () => {
    const h2 = fixture.nativeElement.querySelector('h2');
    expect(h2.textContent).toEqual('Search by name');
  });

  it('Autofocus the input', () => {
    const focusedElement = document.activeElement;
    expect(focusedElement?.id).toBe('search_pkm_input');
  });

  it('Allow user to type in', async () => {
    const input = fixture.nativeElement.querySelector('input');

    input.value = 'Simia';
    input.dispatchEvent(new Event('input'));

    await fixture.whenStable();
    expect(input.value).toBe('Simia');
  });

  it('Update results on each keyboard input', async () => {
    const input = fixture.nativeElement.querySelector('input');

    // Typing S to get two results
    input.value = 'S';
    input.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    await fixture.whenStable();

    let results = fixture.nativeElement.querySelector('#search_pkm_results');
    let elementList = results.querySelectorAll('app-search-pkm-result');
    let resultsText = results.textContent;

    expect(resultsText).toContain('Simiabraz');
    expect(resultsText).toContain('Simularbre');

    // Typing Simiabraz to get two results
    input.value = 'Simiabraz';
    input.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    await fixture.whenStable();

    elementList = results.querySelectorAll('app-search-pkm-result');
    resultsText = results.textContent;
    expect(resultsText).toContain('Simiabraz');
    expect(resultsText).not.toContain('Simularbre');

    // Typing something else
    input.value = 'Simiabrazzzzzz';
    input.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    await fixture.whenStable();

    results = fixture.nativeElement.querySelector('#search_pkm_results');
    resultsText = results.textContent;
    elementList = results.querySelectorAll('app-search-pkm-result');

    expect(resultsText).not.toContain('Simiabraz');
    expect(resultsText).not.toContain('Simularbre');
    expect(elementList.length).toBe(0);
  });

  it('Display results based on what was typed', () => {});

  it('Display FR and EN language buttons', () => {});

  it('Allow user to change which language is selected', () => {});

  it('Display the results according to the selected language', () => {});

  it('If there are results, pressing "Enter" navigates to the first result', () => {});

  it('Clear the input if the component is not focused', () => {});
});
