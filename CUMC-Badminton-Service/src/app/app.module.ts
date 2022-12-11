import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgxWebstorageModule} from 'ngx-webstorage';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from "@angular/material/dialog";
import {MatRadioModule} from '@angular/material/radio';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { IndexComponent } from './index/index.component';
import { SessionsComponent } from './sessions/sessions.component';
import { ForumComponent } from './forum/forum.component';
import {MatIconModule} from "@angular/material/icon";
import { PostDetailsComponent } from './post-details/post-details.component';
import { AddPostDialogComponent } from './add-post-dialog/add-post-dialog.component';
import { MyPostsComponent } from './my-posts/my-posts.component';
import {MatListModule} from "@angular/material/list";
import { SessionsEditComponent } from './sessions-edit/sessions-edit.component';
import { profileComponent } from "./profile/profile.component";
import { AddprofileDialogComponent } from './profile-edit/profile-edit.component';
import { partnerComponent } from './partner/partner.component';
import { AddpartnerDialogComponent } from './partner-add/partner-add.component';
import { chatComponent } from './chat/chat.component';
import { searchchatDialogComponent } from './chat-search-dialog/chat-search-dialog.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatSelectModule} from "@angular/material/select";
import { ArticleListComponent } from './shared/posts/article-list/article-list.component';
import { ArticlePreviewComponent } from './shared/posts/article-preview/article-preview.component';
import { ArticleMetaComponent } from './shared/posts/article-meta/article-meta.component';
import { sendinviteDialogComponent } from './invitation/invitation.component';
import {GoogleLoginProvider, SocialLoginModule} from 'angularx-social-login';
import {AuthGuardService} from './auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavBarComponent,
    IndexComponent,
    SessionsComponent,
    ForumComponent,
    PostDetailsComponent,
    AddPostDialogComponent,
    MyPostsComponent,
    SessionsEditComponent,
    profileComponent,
    AddprofileDialogComponent,
    partnerComponent,
    AddpartnerDialogComponent,
    chatComponent,
    searchchatDialogComponent,
    ArticleListComponent,
    ArticlePreviewComponent,
    ArticleMetaComponent,
    sendinviteDialogComponent
  ],
  entryComponents: [AddPostDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxWebstorageModule.forRoot(),
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatRadioModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    MatDialogModule,
    MatListModule,
    MatAutocompleteModule,
    MatSelectModule,
    SocialLoginModule
  ],
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: true,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('148517665605-jspahbqleats6lvlag9kasc2c11b5g7o.apps.googleusercontent.com')
        }
      ]
    }
  },
    AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
