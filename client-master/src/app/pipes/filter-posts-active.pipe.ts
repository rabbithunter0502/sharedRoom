import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filterPostsActive",
})
export class FilterPostsActivePipe implements PipeTransform {
  transform(posts): unknown {
    return posts.filter((post) => {
      // console.log(post.isActive, )
      return post.isActive && new Date(post.dateExpiration) > new Date();
    });
  }
}
