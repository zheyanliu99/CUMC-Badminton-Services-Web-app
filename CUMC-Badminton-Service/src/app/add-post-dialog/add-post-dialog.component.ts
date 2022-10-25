import { Component, OnInit, Inject } from '@angular/core';
import {Observable} from "rxjs";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {postInput} from "../post-details/postInput";

@Component({
  selector: 'app-add-post-dialog',
  templateUrl: './add-post-dialog.component.html',
  styleUrls: ['./add-post-dialog.component.css']
})
export class AddPostDialogComponent implements OnInit {

  userId: string;
  locations: Array<string>;
  postForm: FormGroup;
  method: string;
  oldPost: Array<postInput>;

  constructor(private http:HttpClient,
              private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<AddPostDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.userId = sessionStorage.getItem('userId')
    this.method = data.method
    if (this.method == "edit"){
      this.oldPost = data.old
    }
  }

  ngOnInit(): void {
    if (this.method == "edit"){
      this.postForm = this.formBuilder.group({
        user_id: this.userId,
        title: new FormControl(this.oldPost[0].Title, [Validators.required, Validators.maxLength(30)]),
        label: new FormControl(this.oldPost[0].Label, [Validators.required]),
        location: this.oldPost[0].Location,
        content: new FormControl(this.oldPost[0].Content, [Validators.required, Validators.maxLength(300)]),
      });
    }
    else if (this.method == "add"){
      this.postForm = this.formBuilder.group({
        user_id: this.userId,
        title: new FormControl(``, [Validators.required, Validators.maxLength(30)]),
        label: new FormControl(``, [Validators.required]),
        location: ``,
        content: new FormControl(``, [Validators.required, Validators.maxLength(300)]),
      });
    }
    this.locations = ["loc1", "loc2", "loc3"]
  }

  postSubmit(): Observable<any> {
    if(this.postForm.valid){
      if (this.method == "add"){
        console.log('post added')
        const input = this.postForm.value
        this.dialogRef.close(input)
        // return this.http.post<any>(`${environment.ms3Url}/api/forum/newpost/user_id/${this.userId}`, input)
      }
      else if (this.method == "edit"){
        console.log('post edited')
        const input = this.postForm.value
        this.dialogRef.close(input)
        // return this.http.post<any>(`${environment.ms3Url}/api/forum/post/edit/user_id/${this.userId}`, input)
      }
      else{
        alert('Unknown Method')
      }
    }
    else{
      alert("Post requirement not met")
    }
    return null
  }

  close() {
    this.dialogRef.close();
  }



}
