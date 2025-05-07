import { Component, computed, input } from '@angular/core';
import {
  calcWeaknesses,
  Effectiveness,
} from '@features/pokemon/utils/calc-types';

@Component({
  selector: 'app-weaknesses-part',
  imports: [],
  templateUrl: './weaknesses-part.component.html',
  styleUrl: './weaknesses-part.component.css',
})
export class WeaknessesPartComponent {
  types = input<string[]>([]);
  weaknesses = computed<Effectiveness>(() => {
    const values = this.types();
    if (values.length === 0) return { x0: [], 'x0.5': [], x2: [] };
    else return calcWeaknesses(values);
  });
  weaknessesToArray = computed(() => Object.entries(this.weaknesses()));
  noWeaknesses = computed(() => {
    const weaknesses = this.weaknesses();
    const values = Object.values(weaknesses);
    return values.every((v) => v.length === 0);
  });
}
