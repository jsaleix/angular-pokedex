import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dexId',
})
export class DexIdPipe implements PipeTransform {
  transform(val: string): string {
    return val.padStart(3, '0');
  }
}
