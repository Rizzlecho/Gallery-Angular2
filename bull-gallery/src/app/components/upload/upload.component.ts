import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {RemoteService} from '../../services/remote/remote.service'
import {UploadModel} from "../../services/models/upload.model";
import {Router} from "@angular/router";

@Component({
  selector: 'bull-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  upload: FormGroup;
  model: UploadModel;
  uploadFail: boolean;
  titleFail: boolean;
  imageFail: boolean;
  categoryFail: boolean;
  descriptionFail: boolean;

  constructor(private router: Router, private fb: FormBuilder, private remoteService: RemoteService) {
    this.model = new UploadModel('', '', '', '', [{}])
  }

  ngOnInit() {
    this.upload = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(22)]],
      image: ['', [Validators.required]],
      category: ['', [Validators.required]],
      description: ['', [Validators.required]],
    })
  }

  submit() {

    this.model.title = this.upload.value['title'];
    this.model.image = this.upload.value['image'];
    this.model.category = this.upload.value['category'];
    this.model.description = this.upload.value['description'];


    //NOTIFICATIONS
    if(this.model.title === ''){
      this.titleFail = true;
      return
    }
    else if(this.model.image === ''){
      this.titleFail = false;
      this.imageFail = true;
      return
    }
    // else if(this.model.category === ''){
    //   this.categoryFail = true;
    //   return
    // }
    else if(this.model.description === ''){
      this.imageFail = false;
      this.descriptionFail = true;
      return
    }



    this.remoteService.upload(this.model).subscribe(data =>{
        console.log(data);
        this.successfulUpload();
      },
      err => {
        console.log(err.message);
        this.uploadFail = true;
      })
  }

  successfulUpload(): void {
    this.uploadFail = false;
    this.router.navigate(['/']);
  }
}
