import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "searchBy",
})
export class SearchByPipe implements PipeTransform {
  transform(posts, searchKeyword): unknown {
    posts = posts?.filter((post) => {
      return (
        post.street.toUpperCase().includes(searchKeyword.toUpperCase()) ||
        post.ward.toUpperCase().includes(searchKeyword.toUpperCase()) ||
        post.district.toUpperCase().includes(searchKeyword.toUpperCase()) ||
        post.province.toUpperCase().includes(searchKeyword.toUpperCase())
      );
    });

    return posts;
  }
}
