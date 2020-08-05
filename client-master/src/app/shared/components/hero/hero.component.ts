import { Component, OnInit } from "@angular/core";

declare var $: any;

@Component({
  selector: "app-hero",
  templateUrl: "./hero.component.html",
  styleUrls: ["./hero.component.scss"],
})
export class HeroComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    $(".slider").slick({
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false,
      fade: true,
      autoplaySpeed: 10000,
    });
  }
}
