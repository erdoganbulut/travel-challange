import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mini-post',
  templateUrl: './mini-post.component.html',
  styleUrls: ['./mini-post.component.scss']
})
export class MiniPostComponent implements OnInit {

  @Input() detail: {};

  constructor() { }

  ngOnInit() {
  }

}
