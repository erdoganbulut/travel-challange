import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostsService } from '../../services/posts.service';
import { CommentsService } from '../../services/comments.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts: any[];
  postsSubscription: Subscription;

  comments: any[];
  commentsSubscription: Subscription;

  constructor(private _postsService: PostsService,
    private _commentsService: CommentsService) { }

  fillPosts() {
    let val = _.cloneDeep(this.posts);
    val.forEach(element => {
      element.comments = _.filter(this.comments, { 'postId': element.id }).length
    });
    this.posts = val;
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
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
    this.commentsSubscription.unsubscribe();
  }

}
