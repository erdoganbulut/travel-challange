import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import { SingleService } from '../../services/single.service';
import { CommentsService } from '../../services/comments.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})
export class SingleComponent implements OnInit {

  id: number;
  private routeSub: any;

  post: { id, comments, user, userId };
  postSubscription: Subscription;

  comments: any[];
  commentsSubscription: Subscription;

  users: any[];
  usersSubscription: Subscription;

  constructor(private route: ActivatedRoute,
    private _singleService: SingleService,
    private _commentsService: CommentsService,
    private _usersService: UsersService) { }

  dedectId(id: number) {
    this.id = id;
    this._singleService.getPost(id);
    this.fillPost();
  }

  fillPost() {
    if (this.post && this.users && this.comments) {
      let user = _.find(this.users, { 'id': this.post.userId });
      if (user) {
        this.post.user = `${user.username} (${user.name})`;
        this.post.comments = _.filter(this.comments, { 'postId': this.post.id });
      }
    }
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params) => {
      this.dedectId(+params['id']); // '+' for string convert to number
    });

    this.postSubscription = this._singleService.post$.subscribe((post) => {
      this.post = post;
      this.fillPost();
    });

    this._commentsService.getComments();
    this.commentsSubscription = this._commentsService.comments$.subscribe((value) => {
      this.comments = value;
      this.fillPost();
    });

    this._usersService.getUsers();
    this.usersSubscription = this._usersService.users$.subscribe((value) => {
      this.users = value;
      this.fillPost();
    });
  }

}
