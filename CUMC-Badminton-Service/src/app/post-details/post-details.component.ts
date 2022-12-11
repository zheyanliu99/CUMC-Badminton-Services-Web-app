import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Router, ActivatedRoute } from '@angular/router';
import {postInput} from "../post-details/postInput";
import {responseInput} from "../post-details/responseInput";
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {AddPostDialogComponent} from "../add-post-dialog/add-post-dialog.component";
import {MatLegacyDialog as MatDialog, MatLegacyDialogConfig as MatDialogConfig} from "@angular/material/legacy-dialog";

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit, OnChanges {

  post: Array<postInput>;
  response: Array<responseInput>;
  userId: string;
  post_id: number;
  edit_id: number;
  content: string;
  canModify: boolean;
  isSubmitting = false;

  constructor(private http:HttpClient,
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              public dialog: MatDialog) {
    this.userId = sessionStorage.getItem('userId')

    const routeParams = this.route.snapshot.paramMap;
    this.post_id = Number(routeParams.get('post_id'));
  }

  ngOnInit(): void {
    this.load_page()
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
  }

  load_page() {
    this.get_post_details().subscribe(results => {
      console.log(results)
      if (results.post.success) {
        console.log("update post")
        this.post = results.post.post_data
        this.canModify = this.post[0].User_ID == this.userId
        console.log(this.post)

        if (results.response.success) {
          console.log("update response")
          this.response = results.response.resp_data
          console.log(this.response)
        } else {
          console.log("No response")
          this.response = null
        }
      } else {
        alert("Post Not Found")
      }
    })
  }

  get_post_details(): Observable<any>{
    console.log('renew')
    return this.http.get<any>(`${environment.ms3Url}/api/forum/post/${this.post_id}/user_id/${this.userId}`);
  }

  thumb_up_post(): void {
    console.log('thumb_up status changed')
    this.change_thumb_post().subscribe(results => {
      if (results.success) {
        //alert(results.message)
      } else {
        alert("thumb up failed")
      }
      this.load_page()
    })
  }

  change_thumb_post(): Observable<any>{
    console.log('thumb update')
    return this.http.get<any>(`${environment.ms3Url}/api/forum/post/${this.post_id}/thumb/user_id/${this.userId}`);
  }

  thumb_up_resp(response_id:number): void {
    console.log('thumb_up status changed')
    this.change_thumb_response(response_id).subscribe(results => {
      if (results.success) {
        //alert(results.message)
      } else {
        alert("thumb up failed")
      }
      this.load_page()
    })
  }

  change_thumb_response(response_id: number): Observable<any>{
    console.log('thumb update')
    return this.http.get<any>(`${environment.ms3Url}/api/forum/resp/${response_id}/thumb/user_id/${this.userId}`);
  }

  commentForm = this.formBuilder.group({
    content: new FormControl(``, [Validators.required, Validators.maxLength(300)])
  });


  cmtSubmit(): void {
    if(this.commentForm.valid){
      console.log('comment submitted')
      const input = {"content": this.commentForm.value.content}
      this.isSubmitting = true;

      this.add_comment(input).subscribe(results => {
        this.isSubmitting = false;
        if (results.success) {
          console.log("comment added")
          this.commentForm.reset();
          this.load_page()
        } else {
          alert("Adding post failed")
          console.log(results)
        }
      })
    }
    else{
      alert('Empty content cannot be submitted')
    }
  }

  add_comment(input: object): Observable<any>{
    console.log("adding comment with DB")
    return this.http.post<any>(`${environment.ms3Url}/api/forum/post/${this.post_id}/newresponse/user_id/${this.userId}`, input)
  }

  editDialog() {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = "600px";
    dialogConfig.height = "480px";
    dialogConfig.data = {
      method: 'edit',
      old: this.post
    }

    let dialogRef = this.dialog.open(AddPostDialogComponent, dialogConfig)
    dialogRef.afterClosed().subscribe(results => {
      console.log(results)
      if (results != undefined){
        alert("Succeed!")
      }
      this.load_page()
    })
  }

  onDeleteResp(resp_id: number): void{
    console.log('delete response activated')
    this.delete_resp(resp_id).subscribe(results => {
      if (!results.success) {
        alert("delete response failed")
        console.log(results)
      }
      this.load_page()
    })
  }

  delete_resp(resp_id: number): Observable<any>{
    console.log('delete response interact with DB')
    return this.http.get<any>(`${environment.ms3Url}/api/forum/resp/delete/${resp_id}/`);
  }

  showEdit(resp_id: number, content: string): void{
    this.edit_id = resp_id
    this.content = content
    this.editForm["content"] = content
  }

  cancelEdit(): void{
    this.edit_id = undefined
    this.content = undefined
  }

  editForm = this.formBuilder.group({
    content: new FormControl(``, [Validators.required, Validators.maxLength(300)])
  });

  cmtEdit(resp_id: number): void {
    if(this.editForm.valid){
      this.isSubmitting = true;
      console.log('comment submitted')
      const input = {"content": this.editForm.value.content}
      console.log(input)
      this.edit_comment(input, resp_id).subscribe(results => {
        this.isSubmitting = false;
        if (results.success) {
          console.log("comment edited")
          this.edit_id = undefined
          this.content = undefined
          this.load_page()
        } else {
          alert("Editing comment failed")
          console.log(results)
        }
      })
    }
    else{
      alert('Empty content cannot be submitted')
    }
  }

  edit_comment(input: object, resp_id: number): Observable<any>{
    console.log("editing comment with DB")
    return this.http.post<any>(`${environment.ms3Url}/api/forum/resp/${resp_id}/edit/user_id/${this.userId}`, input)
  }

  onDeletePost(post_id: number): void{
    console.log('delete activated')
    this.delete_post(post_id).subscribe(results => {
      if (results.success) {
        alert("Post deleted successfully")
        this.router.navigateByUrl('/my-posts');
      }
      else {
        alert("Delete failed")
        console.log(results)
      }
    })
  }

  delete_post(post_id: number): Observable<any>{
    console.log('delete interact with DB')
    return this.http.get<any>(`${environment.ms3Url}/api/forum/post/delete/${post_id}/`);
  }

}
