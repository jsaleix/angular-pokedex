import { Component, input } from '@angular/core';

@Component({
  selector: 'app-star-icon',
  imports: [],
  templateUrl: './star-icon.component.html',
  styleUrl: './star-icon.component.css',
})
export class StarIconComponent {
  css = input<string>();
}
