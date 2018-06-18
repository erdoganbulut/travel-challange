import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostsService } from '../../services/posts.service';
import { CommentsService } from '../../services/comments.service';
import * as _ from 'lodash';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts: any[];
  postsSubscription: Subscription;
  postsDetail = [];

  comments: any[];
  commentsSubscription: Subscription;

  users: any[];
  usersSubscription: Subscription;

  constructor(private _postsService: PostsService,
    private _commentsService: CommentsService,
    private _usersService: UsersService) { }

  fillPosts() {
    let val = _.cloneDeep(this.posts);
    val.forEach(element => {
      element.comments = _.filter(this.comments, { 'postId': element.id }).length;
      let user = _.find(this.users, { 'id': element.userId });
      element.user = `${user.username} (${user.name})`;
    });
    this.posts = val;
    this.fillDetail();
  }

  fillDetail() {
    let detail = [];
    this.posts.forEach(element => {
      let post = {
        title: element.title,
        subtitle: `@ ${element.user} | ${element.comments} comments`,
        body: element.body,
        url: `/posts/${element.id}`,
        urlText: 'read more',
      };
      detail.push(post);
    });
    this.postsDetail = detail;
  }

  ngOnInit() {
    this._postsService.getPosts();
    this.postsSubscription = this._postsService.posts$.subscribe((value) => {
      this.posts = value;
      this.fillPosts();
    });

    this._commentsService.getComments();
    this.commentsSubscription = this._commentsService.comments$.subscribe((value) => {
      this.comments = value;
      this.fillPosts();
    });

    this._usersService.getUsers();
    this.usersSubscription = this._usersService.users$.subscribe((value) => {
      this.users = value;
      this.fillPosts();
    })
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
    this.commentsSubscription.unsubscribe();
  }

}
