import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';

import {Router, RouterModule, RouterLink} from '@angular/router';
import {RemoteService} from "../../../services/remote/remote.service";

@Component({
  selector: 'bull-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public username: string;
  public isLogged;
  public avatar: string;
  public users;


  constructor(public remoteService: RemoteService, private router: Router) {
    this.username = localStorage.getItem('username');
    // this.avatar2 = registerModel.avatar;

  }


  ngOnInit() {
    this.dropdown();

    this.remoteService.userDetais().subscribe(data => {
        this.users = data;
        console.log(this.users);

        // for (let obj of this.users) {
        //   this.avatar = obj.avatar;
        //   console.log(this.avatar);
        // }
      },
      err => {
        console.log(err.message);
      });
  }

  private dropdown() {
    console.log('in dropdown');

    $('.dropdown').click(function (e) {
      e.preventDefault();
      $(this).next('.dropdown-content').slideToggle('fast');
    });

    $('.dropdown2').click(function (e) {
      console.log('in 2');
      e.preventDefault();
      $(this).next('.dropdown-content').slideToggle('fast');
    });


    $('#nav-icon4').click(function () {
      $(this).toggleClass('open');
      $('.mobile-menu').slideToggle();
    });
  }


  loggedIn() {
    if (localStorage.getItem('authtoken')) {
      return true;
    } else return false;
  }

  logout() {
    this.remoteService.logout().subscribe(data => {
      localStorage.clear();
      this.router.navigate(['/']);
      // window.location.reload();
    });

  }
}
