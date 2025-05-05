import { Component, input } from '@angular/core';

@Component({
  selector: 'app-magnifying-glass-icon',
  imports: [],
  templateUrl: './magnifying-glass-icon.component.svg',
  styleUrl: './magnifying-glass-icon.component.css',
})
export class MagnifyingGlassIconComponent {
  css = input<string>();
}
