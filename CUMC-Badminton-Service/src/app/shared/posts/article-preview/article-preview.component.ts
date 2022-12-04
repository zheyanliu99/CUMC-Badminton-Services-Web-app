import { Component, Input } from '@angular/core';

import { forumInput } from '../../../forum/forumInput';
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-article-preview',
  templateUrl: './article-preview.component.html'
})
export class ArticlePreviewComponent {
  userId: string;

  constructor(private http:HttpClient,
              public dialog: MatDialog) {
    this.userId = sessionStorage.getItem('userId')
  }

  @Input() post: forumInput;

  thumb_up(post_id:number): void {
    console.log('thumb_up status changed')
    this.change_thumb_post(post_id).subscribe(results => {
      if (!results.success) {
        //   alert(results.message)
        // } else {
        alert("thumb up failed")
        console.log(results)
      } else {
        if (this.post.is_Thumbed == 1) {
          this.post.is_Thumbed = 0
          this.post.Thumbs--
        } else {
          this.post.is_Thumbed = 1
          this.post.Thumbs++
        }
      }
    })
  }

  change_thumb_post(post_id: number): Observable<any>{
    console.log('thumb update')
    return this.http.get<any>(`${environment.ms3Url}/api/forum/post/${post_id}/thumb/user_id/${this.userId}`);
  }

}
