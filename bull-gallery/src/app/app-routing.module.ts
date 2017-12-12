import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from "./components/home/home.component";
import {CategoryComponent} from "./components/category/category.component";
import {UploadComponent} from "./components/upload/upload.component";
import {LoginComponent} from "./components/auth/login/login.component";
import {RegisterComponent} from "./components/auth/register/register.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {AuthGuard} from "./services/guards/auth.guard";
import {AdminComponent} from "./components/admin/admin.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', component:HomeComponent},
  {path: 'category', component: CategoryComponent},
  {path: 'upload', canActivate:[AuthGuard], component: UploadComponent},
  {path: 'admin', canActivate:[AuthGuard], component: AdminComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', canActivate:[AuthGuard], component: ProfileComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }