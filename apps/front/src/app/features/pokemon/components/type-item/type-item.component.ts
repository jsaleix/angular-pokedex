import { Component, input } from '@angular/core';

@Component({
  selector: 'app-type-item',
  imports: [],
  templateUrl: './type-item.component.html',
  styleUrl: './type-item.component.css',
})
export class TypeItemComponent {
  pkmType = input.required<string>();
}
