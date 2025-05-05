import { Component, input } from '@angular/core';

@Component({
  selector: 'app-square-icon',
  imports: [],
  templateUrl: './square-icon.component.html',
  styleUrl: './square-icon.component.css',
})
export class SquareIconComponent {
  css = input<string>();
}
