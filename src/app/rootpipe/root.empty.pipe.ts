import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rootEmptyPipe',
  standalone: true,
})
export class RootEmptyPipe implements PipeTransform {
  public transform(value: any, ...args: any[]): string {
    if (!value || value.length < 1) {
      if (args.length < 1) {
        return '-, rootEmptyPipe, shown as ---';
      } else {
        return args[0];
      }
    }
    return value;
  }
}
