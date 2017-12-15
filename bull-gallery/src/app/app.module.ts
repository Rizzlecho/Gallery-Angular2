import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {NgxPaginationModule} from 'ngx-pagination';
import {CommonModule} from "@angular/common";

import {AppComponent} from './app.component';
import {HeaderComponent} from './components/common/header/header.component';
import {FooterComponent} from './components/common/footer/footer.component';
import {HomeComponent} from './components/home/home.component';
import {CategoryComponent} from './components/category/category.component';
import {UploadComponent} from './components/upload/upload.component';
import {LoginComponent} from './components/auth/login/login.component';
import {RegisterComponent} from './components/auth/register/register.component';
import {ProfileComponent} from './components/profile/profile.component';
import {AdminComponent} from './components/admin/admin.component';
import { DetailsComponent } from './components/details/details.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';


import {AuthGuard} from "./services/guards/auth.guard";
import {AdminGuard} from "./services/guards/admin.guard";
import {RemoteService} from "./services/remote/remote.service";
// import { CommentsComponent } from './components/comments/comments.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CategoryComponent,
    UploadComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    AdminComponent,
    DetailsComponent,
    EditPostComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    CommonModule
  ],
  providers: [AuthGuard, RemoteService, AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
