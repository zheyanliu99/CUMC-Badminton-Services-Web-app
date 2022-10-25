import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { IndexComponent } from './index/index.component';
import { SessionsComponent } from './sessions/sessions.component';
import { SessionsEditComponent } from './sessions-edit/sessions-edit.component';
import { ForumComponent } from './forum/forum.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { MyPostsComponent } from './my-posts/my-posts.component';

const routes: Routes = [
  {path:'', component:IndexComponent},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'sessions', component:SessionsComponent},
  {path:'sessions/edit', component:SessionsEditComponent},
  {path:'forum', component:ForumComponent},
  {path:'post/:post_id', component:PostDetailsComponent},
  {path:'my-posts', component:MyPostsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
