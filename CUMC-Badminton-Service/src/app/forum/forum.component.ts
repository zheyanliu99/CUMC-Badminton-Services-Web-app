import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import { forumInput } from './forumInput';
import {MatIconModule} from '@angular/material/icon';
import {MatDialog} from "@angular/material/dialog";
import {AddPostDialogComponent} from "../add-post-dialog/add-post-dialog.component";

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit, OnChanges {
  posts: Array<forumInput>;
  userId: string;
  labels: Array<string>;
  label: string;

  constructor(private http:HttpClient,
              public dialog: MatDialog) {
    this.userId = sessionStorage.getItem('userId')
  }

  ngOnInit(): void {
    console.log("init")
    this.get_allposts().subscribe(results => {
      if(results.success){
        console.log("update data")
        this.posts = results.data
        this.labels = results.labels
        this.label = "All Posts"
        console.log(this.posts)
      }
      else{
        alert("Results Not Found")
      }
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
  }

  get_allposts():Observable<any>{
    console.log('renew')
    return this.http.get<any>(`${environment.ms3Url}/api/forum/user_id/${this.userId}`);
  }

  thumb_up(post_id:number): void {
    console.log('thumb_up status changed')
    this.change_thumb_post(post_id).subscribe(results => {
      if (results.success) {
        alert(results.message)
      } else {
        alert("thumb up failed")
      }
      this.get_allposts().subscribe(results => {
        if (results.success) {
          this.posts = results.data
        } else {
          alert("Results Not Found")
        }
      });
    })
  }

  change_thumb_post(post_id: number): Observable<any>{
    console.log('thumb update')
    return this.http.get<any>(`${environment.ms3Url}/api/forum/click_thumb/post/${post_id}/user_id/${this.userId}`);
  }

  select_cat(cat: string): void{
    console.log('category require send')
    this.get_post_cat(cat).subscribe(results => {
      if (results.post.success) {
        this.posts = results.post.data
        this.label = cat
        console.log(this.posts)
      } else {
        alert("Category selecting failed")
        console.log(results)
      }
    })
  }

  get_post_cat(cat: string): Observable<any>{
    console.log('cat interact with db')
    return this.http.get<any>(`${environment.ms3Url}/api/forum/${cat}/user_id/${this.userId}`);
  }

  openDialog() {
    let dialogRef = this.dialog.open(AddPostDialogComponent)
    dialogRef.afterClosed().subscribe(results => {
      console.log(results)
    })
  }


}
