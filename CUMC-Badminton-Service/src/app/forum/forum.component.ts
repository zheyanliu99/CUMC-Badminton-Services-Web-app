import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import { forumInput } from './forumInput';
import {MatIconModule} from '@angular/material/icon';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
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
    this.label = "All Posts"
    this.load_page()
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
  }

  load_page(): void{
    if (this.label == "All Posts") {
      this.get_allposts().subscribe(results => {
        if(results.success){
          console.log("update data")
          this.posts = results.data
          this.labels = results.labels
          console.log(this.posts)
        }
        else{
          alert("Results Not Found")
        }
      })
    }
    else{
      this.select_cat(this.label)
    }
}

  get_allposts():Observable<any>{
    console.log('renew')
    return this.http.get<any>(`${environment.ms3Url}/api/forum/user_id/${this.userId}`);
  }

  thumb_up(post_id:number): void {
    console.log('thumb_up status changed')
    this.change_thumb_post(post_id).subscribe(results => {
      if (!results.success) {
      //   alert(results.message)
      // } else {
        alert("thumb up failed")
        console.log(results)
      }
      this.load_page()
    })
  }

  change_thumb_post(post_id: number): Observable<any>{
    console.log('thumb update')
    return this.http.get<any>(`${environment.ms3Url}/api/forum/post/${post_id}/thumb/user_id/${this.userId}`);
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
    return this.http.get<any>(`${environment.ms3Url}/api/forum/cat/${cat}/user_id/${this.userId}`);
  }

  openDialog() {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      method: 'add'
    }

    let dialogRef = this.dialog.open(AddPostDialogComponent, dialogConfig)
    dialogRef.afterClosed().subscribe(results => {
      console.log(results)
      this.load_page()
    })
  }


}
