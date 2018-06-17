import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})
export class SingleComponent implements OnInit {

  id: number;
  private routeSub: any;

  constructor(private route: ActivatedRoute) { }

  dedectId(id: number) {
    console.log(id)
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params) => {
      this.dedectId(+params['id']); // '+' for string convert to number
    });
  }

}
