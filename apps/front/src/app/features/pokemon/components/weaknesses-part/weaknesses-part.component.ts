import { Component, computed, input } from '@angular/core';
import {
  calcWeaknesses,
  Effectiveness,
} from '@features/pokemon/utils/calc-types';
import { TypeItemComponent } from '../type-item/type-item.component';

@Component({
  selector: 'app-weaknesses-part',
  imports: [TypeItemComponent],
  templateUrl: './weaknesses-part.component.html',
  styleUrl: './weaknesses-part.component.css',
})
export class WeaknessesPartComponent {
  types = input<string[]>([]);

  weaknesses = computed<Effectiveness>(() => {
    const values = this.types();
    if (values.length === 0) return { x0: [], 'x0.5': [], x2: [], x4: [] };
    else return calcWeaknesses(values);
  });
  weaknessesToArray = computed(() =>
    Object.entries(this.weaknesses()).reverse(),
  );
  noWeaknesses = computed(() => {
    const weaknesses = this.weaknesses();
    const values = Object.values(weaknesses);
    return values.every((v) => v.length === 0);
  });
}
