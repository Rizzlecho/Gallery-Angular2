import {Component, OnInit} from '@angular/core';
import {RemoteService} from "../../services/remote/remote.service";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {Location} from "@angular/common"

@Component({
  selector: 'bull-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  public title: string;
  article;
  image;
  counter = 0;
  username;
  constructor(private remoteService: RemoteService, private route: ActivatedRoute, private location: Location) {
    this.username = localStorage.getItem('username')
  }


  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);

    this.remoteService.postDetails(id).subscribe(data => {
        // console.log(data);
        this.article = data;
        console.log(this.article.creator);

      },
      err => {
        console.log(err.message);
      });

  }

  countClicks(e){
    this.counter++;
    console.log('Counter = ' + this.counter);
  }


  calcTime(dateIsoFormat) {

    let diff = +new Date - (+new Date(dateIsoFormat));
    diff = Math.floor(diff / 60000);
    if (diff < 1) return 'less than a minute';
    if (diff < 60) return diff + ' minute' + pluralize(diff);
    diff = Math.floor(diff / 60);
    if (diff < 24) return diff + ' hour' + pluralize(diff);
    diff = Math.floor(diff / 24);
    if (diff < 30) return diff + ' day' + pluralize(diff);
    diff = Math.floor(diff / 30);
    if (diff < 12) return diff + ' month' + pluralize(diff);
    diff = Math.floor(diff / 12);
    return diff + ' year' + pluralize(diff);

    function pluralize(value) {
      if (value !== 1) return 's';
      else return '';
    }
  }


}
