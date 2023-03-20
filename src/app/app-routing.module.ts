import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PostComponent } from './post/post.component';
const routes: Routes = [
  {path: 'Home', component: HomepageComponent},
  {path: 'Post', component: PostComponent},
  { path:'Login', component: LoginComponent},
  { path: 'Signup', component: SignupComponent},
  { path: '',redirectTo:'Login', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponent = [HomepageComponent,LoginComponent,SignupComponent]