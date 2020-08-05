import { Pipe, PipeTransform } from "@angular/core";
import { Post } from "../models/Post";

@Pipe({
  name: "filterBy",
})
export class FilterByPipe implements PipeTransform {
  transform(posts, filters): unknown {
    let filterKeys = Object.keys(filters);

    return posts?.filter((post) => {
      return filterKeys.every((key) => {
        if (!filters[key].length) return true;

        if (key === "categoryId") {
          return filters[key].includes(post[key]);
        }

        if (key === "acreage" || key === "price") {
          return filters[key].every((keyEle) => {
            return post[key] >= keyEle[0] && post[key] <= keyEle[1];
          });
        }
      });
    });
  }
}
