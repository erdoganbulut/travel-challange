import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import { Post } from '../../types/post.type';
import { User } from '../../types/user.type';
import { Comment } from '../../types/comment.type';
import { PostsService } from '../../services/posts.service';
import { CommentsService } from '../../services/comments.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  commentsDetail = [];

  posts: Post[];
  postsSubscription: Subscription;

  comments: Comment[];
  commentsSubscription: Subscription;

  constructor(private _postsService: PostsService,
    private _commentsService: CommentsService,
    private _usersService: UsersService) { }

  fillDetail() {
    if (this.posts
    && this.comments
    && this.posts.length > 0
    && this.comments.length > 0) {
      let detail = [];
      this.comments.forEach(element => {
        let post = _.find(this.posts, { 'id': element.postId });
        let comment = {
          title: element.name,
          subtitle: `@ ${element.email}`,
          body: `${element.body} <br><br>for this post:`,
          url: `/posts/${post.id}`,
          urlText: `${post.title}`,
        };
        detail.push(comment);
      });
      this.commentsDetail = detail;
    }
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
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
    this.commentsSubscription.unsubscribe();
  }

}
