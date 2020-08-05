import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '../models/Post';

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {

  transform(posts, sortByField): unknown {
    switch (sortByField) {
      case 'postDayASC':
        posts = posts?.sort((post1, post2) => {
          let dateSubmitted1 = new Date(post1.dateSubmitted);
          let dateSubmitted2 = new Date(post2.dateSubmitted);
          if (dateSubmitted1 < dateSubmitted2) return 1;
          return -1;
        });
        break;
      case 'postDayDESC':
        posts = posts.sort((post1, post2) => {
          let dateSubmitted1 = new Date(post1.dateSubmitted);
          let dateSubmitted2 = new Date(post2.dateSubmitted);
          if (dateSubmitted1 > dateSubmitted2) return 1;
          return -1;
        });
        break;
      case 'priceASC':
        posts = posts.sort((post1, post2) => post1.price - post2.price);
        break;
      case 'priceDESC':
        posts = posts.sort((post1, post2) => post2.price - post1.price);
        break;
    }

    return posts;
  }

}
