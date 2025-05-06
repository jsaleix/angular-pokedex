import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-pokemon-shapes-animation',
  imports: [],
  templateUrl: './pokemon-shapes-animation.component.html',
  styleUrl: './pokemon-shapes-animation.component.css',
})
export class PokemonShapesAnimationComponent {
  private interval: NodeJS.Timeout | null = null;
  css = input<string>();
  current = signal(0);

  ngOnInit() {
    this.interval = setInterval(() => {
      this.current.update((c) => (c + 1) % 3);
    }, 200);
  }

  ngOnDestroy() {
    if (this.interval) clearInterval(this.interval);
  }
}
