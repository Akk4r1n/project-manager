import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true,
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit = 100): string {
    return value.length > limit ? value.substring(0, limit) + '...' : value;
  }
}
