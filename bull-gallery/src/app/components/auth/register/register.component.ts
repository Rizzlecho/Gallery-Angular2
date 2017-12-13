import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Form} from '@angular/forms/src/directives/form_interface'
import {RemoteService} from '../../../services/remote/remote.service'
import {RegisterModel} from "../../../services/models/register.model";
import {Router} from "@angular/router";

@Component({
  selector: 'bull-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  register: FormGroup;
  model: RegisterModel;
  registerFail: boolean;

  constructor(private router: Router, private fb: FormBuilder, private remoteService: RemoteService) {
    this.model = new RegisterModel('', '', 'user', 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png')
  }

  ngOnInit() {
    this.register = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]],
      auth: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(25)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(25)]],
      })
    })
  }

  submit() {

    this.model.username = this.register.value['username'];
    this.model.password = this.register.value.auth['password'];

    this.remoteService.register(this.model).subscribe(data =>{
          console.log(data);
           this.router.navigate(['/login']);
          },
          err => {
            console.log(err.message);
            this.registerFail = true;
          })
    }

  }
