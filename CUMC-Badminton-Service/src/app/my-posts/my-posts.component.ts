import {Component, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import { MatListModule} from "@angular/material/list";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddPostDialogComponent} from "../add-post-dialog/add-post-dialog.component";
import {forumInput} from "../forum/forumInput";

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})

export class MyPostsComponent {
  label: string = "My Posts";
}

// export class MyPostsComponent implements OnInit {
//   label: string = "My Posts";
//
//   posts: Array<forumInput>;
//   userId: string;
//
//   constructor(private http:HttpClient,
//               public dialog: MatDialog) {
//     this.userId = sessionStorage.getItem('userId')
//   }
//
//   ngOnInit(): void {
//     this.load_page()
//   }
//
//   ngOnChanges(changes: SimpleChanges) {
//     console.log(changes)
//   }
//
//   load_page(): void{
//       this.get_myposts().subscribe(results => {
//         if(results.post.success){
//           console.log("update data")
//           this.posts = results.post.data
//           console.log(this.posts)
//         }
//         else{
//           console.log(results)
//           this.posts = undefined
//           // alert("Results Not Found")
//         }
//       })
//     }
//
//   get_myposts():Observable<any>{
//     console.log('renew')
//     return this.http.get<any>(`${environment.ms3Url}/api/forum/myposts/user_id/${this.userId}`);
//   }
//
//   thumb_up(post_id:number): void {
//     console.log('thumb_up status changed')
//     this.change_thumb_post(post_id).subscribe(results => {
//       if (!results.success) {
//         //   alert(results.message)
//         // } else {
//         alert("thumb up failed")
//         console.log(results)
//       }
//       this.load_page()
//     })
//   }
//
//   change_thumb_post(post_id: number): Observable<any>{
//     console.log('thumb update')
//     return this.http.get<any>(`${environment.ms3Url}/api/forum/post/${post_id}/thumb/user_id/${this.userId}`);
//   }
//
//   openDialog() {
//     let dialogConfig = new MatDialogConfig();
//     // dialogConfig.panelClass = 'my-dialog'
//     dialogConfig.width = "600px";
//     dialogConfig.height = "480px";
//     dialogConfig.data = {
//       method: 'add'
//     }
//
//     let dialogRef = this.dialog.open(AddPostDialogComponent, dialogConfig)
//     dialogRef.afterClosed().subscribe(results => {
//       console.log(results)
//       if (results) {
//         alert("post added successfully")
//       }
//       this.load_page()
//     })
//   }
//
//   onDelete(post_id: number): void{
//     console.log('delete activated')
//     this.delete_post(post_id).subscribe(results => {
//       if (results.success) {
//         alert("Post deleted successfully")
//         this.load_page()
//       }
//       else {
//         alert("Delete failed")
//         console.log(results)
//       }
//     })
//   }
//
//   delete_post(post_id: number): Observable<any>{
//     console.log('delete interact with DB')
//     return this.http.get<any>(`${environment.ms3Url}/api/forum/post/delete/${post_id}/`);
//   }
//
//
// }
