import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displayString',
})
export class DisplayStringPipe implements PipeTransform {
  transform(value: any): string {
    // Format the number with trailing zeros
    // return value.toFixed(2);
    return '' + value;
  }
}
