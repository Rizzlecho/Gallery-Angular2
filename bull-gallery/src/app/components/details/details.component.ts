import {Component, OnInit} from '@angular/core';
import {RemoteService} from "../../services/remote/remote.service";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {Location} from "@angular/common"
import {CommentModel} from "../../services/models/comment.model";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'bull-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  public title: string;
  public model: CommentModel;
  public article;
  public image;
  public counter = 0;
  public username;
  public comment;
  public role;
  public postId;
  public commentsArr;
  public textValue;
  public commentFail: boolean;

  constructor(private remoteService: RemoteService, private route: ActivatedRoute, private router: Router) {
    this.username = localStorage.getItem('username');
    this.model = new CommentModel(localStorage.getItem('username'), '', '')
  }


  ngOnInit() {
    let arr = [];

    this.postId = this.route.snapshot.paramMap.get('id');


    this.remoteService.postDetails(this.postId).subscribe(data => {
        this.article = data;
      },
      err => {
        console.log(err.message);
      });

    this.remoteService.userDetails().subscribe(data => {
        this.role = data[0]['role'];
      },
      err => {
        console.log(err.message);
      });

    this.remoteService.getAllComments(this.postId).subscribe(data => {
        this.comment = data[0]['comment'];

        for (let obj in data) {
          arr.push(data[obj]);
        }

      },

      err => {
        console.log(err.message);
      });

    this.commentsArr = arr;

  }


  submit() {
    this.model.username = this.username;
    this.model.postId = this.postId;
    this.model.comment = this.textValue;

    // if (this.textValue !== null) {
    //   this.commentFail = true;
    //   return
    // }


    this.remoteService.createComment(this.model).subscribe(data => {
        this.successfulComment();
      },
      err => {
        console.log(err.message);
      })
  }

  successfulComment(): void {
    this.router.navigate([`/details/${this.postId}`]);
    window.location.reload();
  }

  deleteComment(id){
    this.remoteService.deleteComment(id).subscribe(data => {
        this.router.navigate([`/details/${this.postId}`]);
        window.location.reload();
      },
      err => {
        console.log(err.message);
      });
  }

  deletePost() {
    const id = this.route.snapshot.paramMap.get('id');

    this.remoteService.deletePost(id).subscribe(data => {
        this.article = data;
        this.router.navigate(['/'])
      },
      err => {
        console.log(err.message);
      });
  }

  editPostNavigate() {
    this.router.navigate(['/edit/' + this.route.snapshot.paramMap.get('id')])
  }

  isAdmin() {
    if (this.role === 'admin') {
      return true
    }
    return false
  }

  countClicks(e) {
    this.counter++;
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
