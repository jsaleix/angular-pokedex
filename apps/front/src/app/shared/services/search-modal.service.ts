import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchModalService {
  isOpen = signal(false);
  private listener = this.onKeyDown.bind(this);

  constructor() {
    window.addEventListener('keydown', this.listener);
  }

  ngOnDestroy() {
    document.removeEventListener('keydown', this.listener);
  }

  onKeyDown(event: KeyboardEvent) {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      this.toggle();
    }
  }

  toggle = () => this.isOpen.update((value) => !value);
  open = () => this.isOpen.set(true);
  close = () => this.isOpen.set(false);
}
