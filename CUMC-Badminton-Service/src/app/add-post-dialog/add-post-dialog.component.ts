import { Component, OnInit, Inject } from '@angular/core';
import {Observable} from "rxjs";
import {FormBuilder, FormGroup} from '@angular/forms';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-post-dialog',
  templateUrl: './add-post-dialog.component.html',
  styleUrls: ['./add-post-dialog.component.css']
})
export class AddPostDialogComponent implements OnInit {

  userId: string;
  locations: Array<string>;
  postForm: FormGroup;

  constructor(private http:HttpClient,
              private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<AddPostDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.userId = sessionStorage.getItem('userId')
  }

  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      user_id: this.userId,
      title: '',
      label: '',
      location: '',
      content: ''
    });
    this.locations = ["loc1", "loc2", "loc3"]
  }

  postSubmit(): Observable<any> {
    console.log('comment added')
    const input = this.postForm.value
    this.dialogRef.close(input);
    return null
    // return this.http.post<any>(`${environment.ms3Url}/api/forum/newpost/user_id/${this.userId}`, input)
  }

  close() {
    this.dialogRef.close();
  }



}
