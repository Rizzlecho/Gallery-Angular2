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

  constructor(public remoteService: RemoteService, private router: Router, public service: RemoteService) {
    this.username = localStorage.getItem('username');
  }


  ngOnInit() {
    this.dropdown();
  }


  private dropdown() {
    console.log('in dropdown');

    $('.dropdown').click(function (e) {
      e.preventDefault();
      $(this).next('.dropdown-content').slideToggle('fast');
    });

    $('.dropdown2').click(function (e) {
      e.preventDefault();
      $(this).next('.dropdown-content').slideToggle('fast');
    });


    $('#nav-icon4').click(function () {
      $(this).toggleClass('open');
      $('.mobile-menu').slideToggle();
    });
  }


  loggedIn(){
    if(localStorage.getItem('authtoken')){
        return true;
    } else return false;
  }

  

  logout() {
    this.remoteService.logout().subscribe(data => {
      localStorage.clear();
      this.router.navigate(['/']);
      // window.location.reload();
    })

  }
}
