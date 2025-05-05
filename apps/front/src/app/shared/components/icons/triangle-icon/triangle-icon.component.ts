import { Component, input } from '@angular/core';

@Component({
  selector: 'app-triangle-icon',
  imports: [],
  templateUrl: './triangle-icon.component.html',
  styleUrl: './triangle-icon.component.css',
})
export class TriangleIconComponent {
  css = input<string>();
}
