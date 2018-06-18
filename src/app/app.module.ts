import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StartComponent } from './routes/start/start.component';
import { PostsService } from './services/posts.service';
import { CommentsService } from './services/comments.service';
import { PostsComponent } from './routes/posts/posts.component';
import { UsersService } from './services/users.service';
import { SingleComponent } from './routes/single/single.component';
import { SingleService } from './services/single.service';
import { ReplacePipe } from './pipes/replace.pipe';
import { UiCardComponent } from './components/ui-card/ui-card.component';
import { CommentsComponent } from './routes/comments/comments.component';
import { UsersComponent } from './routes/users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    StartComponent,
    PostsComponent,
    SingleComponent,
    ReplacePipe,
    UiCardComponent,
    CommentsComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [PostsService, CommentsService, UsersService, SingleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
