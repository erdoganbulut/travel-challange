import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replace'
})
export class ReplacePipe implements PipeTransform {

  transform(value: string, args?: any): string {
    if (value) {
      let conv = value.replace(/(?:\r\n|\r|\n)/g, '<br />');
      return conv;
    }
  }

}
