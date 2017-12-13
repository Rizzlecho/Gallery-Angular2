import {Component, OnInit} from '@angular/core';
import {RemoteService} from "../../services/remote/remote.service";
import {NgxPaginationModule} from "ngx-pagination/dist/ngx-pagination";


@Component({
  selector: 'bull-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public title: string;
  articles;
  image;

  constructor(private remoteService: RemoteService) {
  }

  ngOnInit() {
    this.remoteService.listAllPosts().subscribe(data => {
        console.log(data);
        this.articles = data;

        // for (let obj of this.articles) {
        //   this.image = obj.image;
        //   console.log(this.image);
        // }
      },
      err => {
        console.log(err.message);
      });


  }


  calcTime(dateIsoFormat) {
    let diff = new Date - (new Date(dateIsoFormat));
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
