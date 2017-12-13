import {Component, OnInit} from '@angular/core';
import {Router, RouterModule, RouterLink} from '@angular/router';
import {RemoteService} from "../../services/remote/remote.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {RegisterModel} from "../../services/models/register.model";

@Component({
  selector: 'bull-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public username: string;
  public avatar: string;
  public editProfile: FormGroup;
  public model;

  constructor(public remoteService: RemoteService, private router: Router, private fb: FormBuilder,) {
    this.username = localStorage.getItem('username');
    this.model = new RegisterModel('', '', 'user', 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png')
  }


  ngOnInit() {
    this.remoteService.userDetais().subscribe(data => {
        console.log(data);
        this.avatar = data[0]['avatar'];
      },
      err => {
        console.log(err.message);
      });

    this.editProfile = this.fb.group({
      avatar: ['']
    })
  }

  update(e){
    console.log(e.value.avatar);


    this.remoteService.editProfile(this.model).subscribe(data =>{
        console.log(data);
        this.router.navigate(['/profile']);
      },
      err => {
        console.log(err.message);
      })

  }

  updated(e){
    console.log(e.value.avatar);


    this.remoteService.editProfile(this.model).subscribe(data =>{
        console.log(data);
        this.router.navigate(['/profile']);
      },
      err => {
        console.log(err.message);
      })

  }




}
