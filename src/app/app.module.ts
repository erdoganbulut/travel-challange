import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StartComponent } from './routes/start/start.component';
import { MiniPostComponent } from './components/mini-post/mini-post.component';
import { PostsService } from './service/posts.service';
import { CommentsService } from './service/comments.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    StartComponent,
    MiniPostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [PostsService, CommentsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
