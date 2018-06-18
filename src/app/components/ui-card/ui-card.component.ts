import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ui-card',
  templateUrl: './ui-card.component.html',
  styleUrls: ['./ui-card.component.scss']
})
export class UiCardComponent implements OnInit {

  @Input() detail: {};

  constructor() { }

  ngOnInit() {
  }

}
