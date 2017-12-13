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
  public avatar: string;
  public logged = false;

  constructor(public remoteService: RemoteService, private router: Router) {
    this.username = localStorage.getItem('username');

  }


  ngOnInit() {
    this.dropdown();

    this.remoteService.userDetais().subscribe(data => {
        this.avatar = data[0]['avatar'];
      },
      err => {
        console.log(err.message);
      });
  }

  private dropdown() {
    // console.log('in dropdown');

    $('.dropdown').click(function (e) {
      e.preventDefault();
      $(this).next('.dropdown-content').slideToggle('fast');
    });


    $('#nav-icon4').click(function () {
      $(this).toggleClass('open');
      $('.mobile-menu').slideToggle();
    });
  }

  dropdown2() {
    $('.dropdown2').click(function (e) {
      console.log('in 2');
      e.preventDefault();
      if ($('.dropdown2').hasClass('up')) {
        $(this).next('.dropdown-content2').removeClass('up').addClass('down').slideDown('fast');
      }
    });

    $('.dropdown2').click(function (e) {
      console.log('in 2');
      e.preventDefault();
      if ($('.dropdown2').hasClass('down')) {
        $(this).next('.dropdown-content2').removeClass('down').addClass('up').slideUp('fast');
      }
    });

  }

  func() {
    console.log(this.logged);
  }

  loggedIn() {
    return !!localStorage.getItem('authtoken');
  }

  logout() {
    this.remoteService.logout().subscribe(data => {
      localStorage.clear();
      this.router.navigate(['/']);
      // window.location.reload();
    });

  }
}
