import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostsService } from '../../services/posts.service';
import { CommentsService } from '../../services/comments.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit, OnDestroy {

  posts: any[];
  postsSubscription: Subscription;
  detailPosts = {};

  comments: any[];
  commentsSubscription: Subscription;
  detailComments = {};

  users: any[];
  usersSubscription: Subscription;
  detailUsers = {};

  constructor(private _postsService: PostsService,
    private _commentsService: CommentsService,
    private _usersService: UsersService) { }

  fillPosts(value) {
    this.posts = value;
    this.detailPosts = {
      title: `${this.posts.length} POSTS`,
      url: '/posts',
      urlText: 'See All'
    };
  }

  fillComments(value) {
    this.comments = value;
    this.detailComments = {
      title: `${this.comments.length} COMMENTS`,
      url: '/comments',
      urlText: 'See All'
    };
  }

  fillUsers(value) {
    this.users = value;
    this.detailUsers = {
      title: `${this.users.length} USERS`,
      url: '/users',
      urlText: 'See All'
    };
  }

  ngOnInit() {
    this._postsService.getPosts();
    this.postsSubscription = this._postsService.posts$.subscribe((value) => {
      this.fillPosts(value);
    });

    this._commentsService.getComments();
    this.commentsSubscription = this._commentsService.comments$.subscribe((value) => {
      this.fillComments(value);
    });

    this._usersService.getUsers();
    this.usersSubscription = this._usersService.users$.subscribe((value) => {
      this.fillUsers(value);
    });
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
    this.commentsSubscription.unsubscribe();
    this.usersSubscription.unsubscribe();
  }

}
