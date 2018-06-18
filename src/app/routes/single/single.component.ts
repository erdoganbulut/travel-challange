import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import { SingleService } from '../../services/single.service';
import { CommentsService } from '../../services/comments.service';
import { UsersService } from '../../services/users.service';
import { Post } from '../../types/post.type';
import { Comment } from '../../types/comment.type';
import { User } from '../../types/user.type';


@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})
export class SingleComponent implements OnInit {

  id: number;

  post: Post;

  users: User[];

  comments: Comment[];

  postDetail = {};

  commentsDetail = [];

  routeSub: Subscription;

  postSubscription: Subscription;

  commentsSubscription: Subscription;

  usersSubscription: Subscription;

  constructor(private route: ActivatedRoute,
    private _singleService: SingleService,
    private _commentsService: CommentsService,
    private _usersService: UsersService) { }

  dedectId(id: number) {
    this.id = id;
    this._singleService.getPost(id);
  }

  fillDetails() {
    if (this.post.id !== null
    && this.users
    && this.comments
    && this.users.length > 0
    && this.comments.length > 0) {
      let findUser = _.find(this.users, { 'id': this.post.userId });
      let user = `${findUser.username} (${findUser.name})`;

      let findComments = _.filter(this.comments, { 'postId': this.post.id });
      let comments = [];
      findComments.forEach(element => {
        let comment = {
          title: `${element.name} <small>(${element.email})</small>`,
          body: element.body,
        };
        comments.push(comment);
      });

      this.postDetail = {
        title: this.post.title,
        subtitle: `@ ${user}`,
        body: this.post.body,
      };

      this.commentsDetail = comments;
    }
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params) => {
      this.dedectId(+params['id']); // '+' for string convert to number
    });

    this.postSubscription = this._singleService.post$.subscribe((post) => {
      this.post = post;
      this.fillDetails();
    });

    this._commentsService.getComments();
    this.commentsSubscription = this._commentsService.comments$.subscribe((comments) => {
      this.comments = comments;
      this.fillDetails();
    });

    this._usersService.getUsers();
    this.usersSubscription = this._usersService.users$.subscribe((users) => {
      this.users = users;
      this.fillDetails();
    });
  }

  ngOnDestroy() {
    this.postSubscription.unsubscribe();
    this.commentsSubscription.unsubscribe();
    this.usersSubscription.unsubscribe();
  }

}
