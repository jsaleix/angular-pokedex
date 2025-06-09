import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { MagnifyingGlassIconComponent } from '@shared/components/icons/magnifying-glass-icon/magnifying-glass-icon.component';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';

class ActivatedRouteMock {
  queryParams = new Observable((observer) => {
    const urlParams = {};

    observer.next(urlParams);
    observer.complete();
  });
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    const paramMap = new Map<string, string>();
    paramMap.set('page', '/');
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, MagnifyingGlassIconComponent],
      providers: [{ provide: ActivatedRoute, useClass: ActivatedRouteMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
