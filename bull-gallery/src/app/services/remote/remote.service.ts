import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

// Models
import {RegisterModel} from '../models/register.model';
import {LoginModel} from '../models/login.model';
import {UploadModel} from "../models/upload.model";


const appKey = "kid_ByvP9HaWG"; // APP KEY HERE;
const appSecret = "14baeedc0c084857bedcbe3ec8bbbf8d"; // APP SECRET HERE;
const registerUrl = `https://baas.kinvey.com/user/${appKey}`;
const loginUrl = `https://baas.kinvey.com/user/${appKey}/login`;
const logoutUrl = `https://baas.kinvey.com/user/${appKey}/_logout`;
const postsUrl = `https://baas.kinvey.com/appdata/${appKey}/posts`;
const listAllPostUrl = `https://baas.kinvey.com/appdata/${appKey}/posts?query={}&sort={"_kmd.ect": -1}`;

const userDetails = `https://baas.kinvey.com/user/${appKey}/?query="avatar"`;

@Injectable()
export class RemoteService {
  private currentAuthtoken: string;

  constructor(private http: HttpClient) {
  }

  login(loginModel: LoginModel) {
    console.log('in requester');
    console.log(loginModel);
    return this.http.post(
      loginUrl,
      JSON.stringify(loginModel),
      {
        headers: this.createAuthHeaders('Basic')
      }
    )
  }

  register(registerModel: RegisterModel): Observable<Object> {
    return this.http.post(
      registerUrl,
      JSON.stringify(registerModel),
      {
        headers: this.createAuthHeaders('Basic')
      }
    )
  }

  upload(uploadModel: UploadModel) {
    return this.http.post(
      postsUrl,
      JSON.stringify(uploadModel),
      {
        headers: this.createAuthHeaders('Kinvey')
      }
    )
  }


  listAllPosts(){
    return this.http.get(
      listAllPostUrl,
      {
        headers: this.createAuthHeaders('Kinvey')
      }
    )
  }

  userDetais(){
    return this.http.get(
      userDetails,
      {
        headers: this.createAuthHeaders('Kinvey')
      }
    )
  }

  logout() {
    return this.http.post(
      logoutUrl,
      {},
      {
        headers: this.createAuthHeaders('Kinvey')
      }
    )
  }

  isLoggedIn() {
    let authtoken: string = localStorage.getItem('authtoken');
    return authtoken === this.currentAuthtoken;
  }

  get authtoken() {
    return this.currentAuthtoken;
  }

  set authtoken(value: string) {
    this.currentAuthtoken = value;
  }

  private createAuthHeaders(type: string): HttpHeaders {
    if (type === 'Basic') {
      return new HttpHeaders({
        'Authorization': `Basic ${btoa(`${appKey}:${appSecret}`)}`,
        'Content-Type': 'application/json'
      })
    }
    else {
      return new HttpHeaders({
        'Authorization': `Kinvey ${localStorage.getItem('authtoken')}`,
        'Content-Type': 'application/json'
      })
    }
  }
}

