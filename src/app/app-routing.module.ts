import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ToDoListComponent } from './todo/todo-list/todo-list.component';
import { ToDoCreateComponent } from './todo/todo-create/todo-create.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ToDoEditComponent } from './todo/todo-edit/todo-edit.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {path: "", component: ToDoListComponent, canActivate: [AuthGuard]},
  {path: 'create', component: ToDoCreateComponent,canActivate: [AuthGuard] },
  {path: "edit/:taskId",component:ToDoEditComponent,canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
