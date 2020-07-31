import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ToDoListComponent } from './todo/todo-list/todo-list.component';
import { ToDoCreateComponent } from './todo/todo-create/todo-create.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

const routes: Routes = [
  {path: "", component: ToDoListComponent},
  {path: "create", component: ToDoCreateComponent},
  {path: "edit/:postId",component:ToDoCreateComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
