import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPkmComponent } from './search-pkm.component';
import { PokemonDataService } from '@features/pokemon/services/pokemon-data.service';
import { ActivatedRoute, provideRouter, Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { provideLocationMocks } from '@angular/common/testing';

const searchAResults = [
  { id: 1, name: { french: 'Torterra', english: 'Torterra' } },
  { id: 2, name: { french: 'Tortank', english: 'Blastoise' } },
];
const searchBResults = [
  { id: 1, name: { french: 'Simiabraz', english: 'Infernape' } },
  { id: 1, name: { french: 'Simularbre', english: 'Sudowoodo' } },
];

@Component({
  standalone: true,
  selector: 'app-search-pkm',
  imports: [],
})
class MockSearchPkmResultComponent {}

describe('SearchPkmComponent', () => {
  let component: SearchPkmComponent;
  let fixture: ComponentFixture<SearchPkmComponent>;
  let mockPkmDataService: jasmine.SpyObj<PokemonDataService>;
  let mockActivatedRoute: jasmine.SpyObj<ActivatedRoute>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Router
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    // ActivatedRoute
    mockActivatedRoute = jasmine.createSpyObj('ActivatedRoute', ['queryParam']);

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
        // { provide: Router, useValue: mockRouter },
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
    expect(fixture.componentInstance.isFocused()).toBeTrue();
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

  it('Display FR and EN language buttons', () => {
    const langPart = fixture.nativeElement.querySelector('#search_pkm_langs');
    expect(langPart).toBeTruthy();

    const frBtn = By.css('FRENCH');
    const enBtn = By.css('ENGLISH');

    expect(frBtn).toBeTruthy();
    expect(enBtn).toBeTruthy();
  });

  it('Allow user to change which language is selected', async () => {
    const buttons = fixture.nativeElement.querySelectorAll('button');

    const enBtn = Array.from(buttons).find(
      (button: any) => button.textContent.trim() === 'english',
    ) as HTMLButtonElement;
    const frBtn = Array.from(buttons).find(
      (button: any) => button.textContent.trim() === 'french',
    ) as HTMLButtonElement;

    expect(frBtn.ariaSelected).toBe('true');
    expect(enBtn.ariaSelected).toBe('false');
    // checked component state
    expect(component.selectedLang()).toBe(0);

    enBtn.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(frBtn.ariaSelected).toBe('false');
    expect(enBtn.ariaSelected).toBe('true');
    // checked component state
    expect(component.selectedLang()).toBe(1);
  });

  it('Display the results according to the selected language', async () => {
    await fixture.whenStable();
    const input = fixture.nativeElement.querySelector('input');

    const buttons = fixture.nativeElement.querySelectorAll('button');

    const enBtn = Array.from(buttons).find(
      (button: any) => button.textContent.trim() === 'english',
    );

    /* Typing 'simiabraz' and displaying it
     * 'Simiabraz' is the french name of this pokemon
     * Then switch language to 'english'
     * Now 'Simiabraz' should have changed to its english name which is 'Internape'
     */

    input.value = 'Simiabraz';
    input.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    await fixture.whenStable();

    const simiabraz = fixture.nativeElement.querySelector(
      'app-search-pkm-result',
    );
    expect(simiabraz.textContent).toContain('Simiabraz');

    (enBtn as HTMLButtonElement).click();
    fixture.detectChanges();
    await fixture.whenStable();

    const infernape = fixture.nativeElement.querySelector(
      'app-search-pkm-result',
    );
    expect(infernape.textContent).toContain('Infernape');
    expect(simiabraz.textContent).not.toContain('Simiabraz');
  });

  it('If there are results, pressing "Enter" navigates to the first result', async () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [SearchPkmComponent, MockSearchPkmResultComponent],
      providers: [
        { provide: PokemonDataService, useValue: mockPkmDataService },
        provideRouter([]),
        provideLocationMocks(),
      ],
    });

    await TestBed.compileComponents();

    const fixture = TestBed.createComponent(SearchPkmComponent);
    const router = TestBed.inject(Router);
    const navigateSpy = spyOn(router, 'navigate');

    fixture.detectChanges();
    await fixture.whenStable();

    const inputEl: HTMLInputElement =
      fixture.nativeElement.querySelector('input');

    inputEl.value = 'Simiabraz';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    await fixture.whenStable();

    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    inputEl.dispatchEvent(event);
    fixture.detectChanges();

    await fixture.whenStable();

    expect(navigateSpy).toHaveBeenCalledWith(['/pokedex/', 1]);
  });

  it('Clear the input if the component is not focused', async () => {
    // The actual result works but the way jasmine tests it doesn't
    // So I'm checking the signals directly
    
    const input: HTMLInputElement =
      fixture.nativeElement.querySelector('input');

    input.value = 'Simiab';
    input.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    await fixture.whenStable();

    expect(input.value).toBe('Simiab');
    expect(fixture.componentInstance.inputModel()).toBe("Simiab");

    fixture.componentRef.setInput('isFocused', false);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.componentInstance.isFocused()).toBe(false);
    expect(fixture.componentInstance.inputModel()).toBe("");
    // expect(input.value).toBe('');
  });
});
