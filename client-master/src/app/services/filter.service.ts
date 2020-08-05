import { Injectable } from "@angular/core";
import { CategoryService } from "./category.service";

@Injectable({
  providedIn: "root",
})
export class FilterService {
  private filterAcreages = [
    { dataFilter: [0, 25], dataLabel: "Từ 0 đến 25", isCheck: false },
    { dataFilter: [25, 50], dataLabel: "Từ 25 đến 50", isCheck: false },
    { dataFilter: [50, 75], dataLabel: "Từ 50 đến 75", isCheck: false },
    { dataFilter: [75, 100], dataLabel: "Từ 75 đến 100", isCheck: false },
    {
      dataFilter: [100, Number.MAX_SAFE_INTEGER],
      dataLabel: "Trên 100",
      isCheck: false,
    },
    {
      dataFilter: [0, Number.MAX_SAFE_INTEGER],
      dataLabel: "Khác",
      isCheck: false,
    },
  ];

  private filterPrices = [
    {
      dataFilter: [0, 1500000],
      dataLabel: "Từ 0 đến 1,500,000",
      isCheck: false,
    },
    {
      dataFilter: [1500000, 3000000],
      dataLabel: "Từ 1,500,000 đến 3,000,000",
      isCheck: false,
    },
    {
      dataFilter: [3000000, 5000000],
      dataLabel: "Từ 3,000,000 đến 5,000,000",
      isCheck: false,
    },
    {
      dataFilter: [5000000, 10000000],
      dataLabel: "Từ 5,000,000 đến 10,000,000",
      isCheck: false,
    },
    {
      dataFilter: [10000000, Number.MAX_SAFE_INTEGER],
      dataLabel: "Trên 10,000,000",
      isCheck: false,
    },
    {
      dataFilter: [-1, Number.MAX_SAFE_INTEGER],
      dataLabel: "Khác",
      isCheck: false,
    },
  ];

  constructor() {}

  getAcreageFilters() {
    return this.filterAcreages;
  }

  getPriceFilters() {
    return this.filterPrices;
  }
}
