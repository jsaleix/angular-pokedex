import {
  Component,
  effect,
  ElementRef,
  input,
  OnInit,
  output,
  viewChild,
} from '@angular/core';

import { PokemonInListI } from '@features/pokemon/types/api';
import { PokemonListItemComponent } from '../pokemon-list-item/pokemon-list-item.component';

@Component({
  selector: 'app-pokemon-list',
  imports: [PokemonListItemComponent],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css',
})
export class PokemonListComponent {
  private intersectionObserver: IntersectionObserver | null = null;
  private watcherRef = viewChild<ElementRef<HTMLElement>>('watcher');
  pokemons = input.required<PokemonInListI[]>();
  onScrollEnd = output();

  constructor() {
    effect(() => {
      if (this.pokemons().length > 0) this.setupObserver();
      else this.intersectionObserver?.disconnect();
    });
  }

  private setupObserver() {
    const watcher = this.watcherRef();
    if (!watcher) return;
    const isIntersecting = (entry: IntersectionObserverEntry) => {
      return entry.isIntersecting || entry.intersectionRatio > 0;
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (isIntersecting(entry)) {
          this.onScrollEnd.emit();
        }
      });
    };

    this.intersectionObserver = new IntersectionObserver(handleIntersect);
    this.intersectionObserver.observe(watcher.nativeElement);
  }

  ngOnDestroy() {
    this.intersectionObserver?.disconnect();
  }
}
