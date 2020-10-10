import {Pipe, PipeTransform} from '@angular/core';
import {Post} from '../interfaces';

@Pipe({
  name: 'searchPosts'
})
export class SearchPipe implements PipeTransform {


  transform(value: Post[], filter: string = ''): Post[] {
    return value.filter(post => {
      if (!filter.trim()) {
        return value;
      }
      return post.title.toLowerCase().includes(filter) ||
        post.author.toLowerCase().includes(filter);
    });
  }


}
