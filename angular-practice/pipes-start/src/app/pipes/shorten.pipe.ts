import { Pipe, PipeTransform } from "@angular/core";

// PipeTransform interface is required to create a pipe and a @Pipe decorator
@Pipe({
  name: 'shorten',
})
export class ShortenPipe implements PipeTransform {
  transform(value: any, limit: number = 10) {
    if (value.length > limit) {
      return value.substr(0, limit)
    }
    return value
  }
}
