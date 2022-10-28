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
  label_dict: object;

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
    this.locations = ["1", "2", "3"]
    this.label_dict = {'Administrative': '1', 'Lost and Found': '2', 'Call for Partners': '3', 'Others': '4'}

    if (this.method == "edit"){
      console.log(this.label_dict[this.oldPost[0].Label])
      this.postForm = this.formBuilder.group({
        user_id: this.userId,
        title: new FormControl(this.oldPost[0].Title, [Validators.required, Validators.maxLength(30)]),
        label: new FormControl(this.label_dict[this.oldPost[0].Label], [Validators.required]),
        location: this.oldPost[0].Location_ID,
        content: new FormControl(this.oldPost[0].Content, [Validators.required, Validators.maxLength(300)]),
      });
    }
    else if (this.method == "add"){
      this.postForm = this.formBuilder.group({
        title: new FormControl(``, [Validators.required, Validators.maxLength(30)]),
        label: new FormControl(``, [Validators.required]),
        location: ``,
        content: new FormControl(``, [Validators.required, Validators.maxLength(300)]),
      });
    }
  }

  postSubmit(): void{
    if(this.postForm.valid) {
      console.log('Start updating post')
      const input = this.postForm.value

      if (this.method == "add") {
        this.add_new_post(input).subscribe(results => {
          if (results.success) {
            console.log("post added")
            this.dialogRef.close(results)
          } else {
            alert("Adding post failed")
            console.log(results)
          }
        })
      }
      else if (this.method == "edit"){
        this.edit_post(input).subscribe(results => {
          if (results.success) {
            console.log("post edited")
            this.dialogRef.close(input)
          } else {
            alert("Editing post failed")
            console.log(results)
          }
        })
      }
      else{
        alert('Unknown Method')
      }
    }
    else{
      alert("Post requirement not met")
    }
  }

  add_new_post(input: object): Observable<any> {
    console.log("post adding with DB")
    return this.http.post<any>(`${environment.ms3Url}/api/forum/newpost/user_id/${this.userId}`, input)
  }

  edit_post(input: object): Observable<any> {
    console.log("post editing with DB")
    // return Object({"success": true})
    return this.http.post<any>(`${environment.ms3Url}/api/forum/post/${this.oldPost[0].Post_ID}/edit/user_id/${this.userId}`, input)
  }

  close() {
    this.dialogRef.close();
  }



}
