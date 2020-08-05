import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-post-sort',
  templateUrl: './post-sort.component.html',
  styleUrls: ['./post-sort.component.scss']
})
export class PostSortComponent implements OnInit {
  @Output() sortChange = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onChange($event) {
    this.sortChange.emit($event);
  }

}
