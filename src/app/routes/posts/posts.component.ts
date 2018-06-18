import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostsService } from '../../services/posts.service';
import { CommentsService } from '../../services/comments.service';
import * as _ from 'lodash';
import { UsersService } from '../../services/users.service';
import { Post } from '../../types/post.type';
import { Comment } from '../../types/comment.type';
import { User } from '../../types/user.type';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  postsDetail = [];

  posts: Post[];
  postsSubscription: Subscription;

  comments: Comment[];
  commentsSubscription: Subscription;

  users: User[];
  usersSubscription: Subscription;

  constructor(private _postsService: PostsService,
    private _commentsService: CommentsService,
    private _usersService: UsersService) { }

  fillDetail() {
    let detail = [];
    this.posts.forEach(element => {
      let comments = _.filter(this.comments, { 'postId': element.id }).length;
      let findUser = _.find(this.users, { 'id': element.userId });
      let user = `${findUser.username} (${findUser.name})`;
      let post = {
        title: element.title,
        subtitle: `@ ${user} | ${comments} comments`,
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
    this.postsSubscription = this._postsService.posts$.subscribe((posts) => {
      this.posts = posts;
      this.fillDetail();
    });

    this._commentsService.getComments();
    this.commentsSubscription = this._commentsService.comments$.subscribe((comments) => {
      this.comments = comments;
      this.fillDetail();
    });

    this._usersService.getUsers();
    this.usersSubscription = this._usersService.users$.subscribe((users) => {
      this.users = users;
      this.fillDetail();
    })
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
    this.commentsSubscription.unsubscribe();
    this.usersSubscription.unsubscribe();
  }

}
