import {Component, OnInit, Inject} from '@angular/core';
import {max, Observable} from "rxjs";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from 'src/environments/environment';
import { profileEditInput } from './profileEditInput';
import {HttpClient} from "@angular/common/http";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class AddprofileDialogComponent implements OnInit {

  profile2: Array<profileEditInput>;
  userId: string;
  method: string;
  newprofileForm: FormGroup;

  constructor(private http:HttpClient,
              private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<AddprofileDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.userId = sessionStorage.getItem('userId')
    this.method = data.method
    if (this.method == "edit"){
      this.profile2 = data.old

    }
  }

  ngOnInit(): void {
    if (this.method == "edit"){
      // @ts-ignore
      // @ts-ignore
      this.newprofileForm = this.formBuilder.group({
        user_id: this.userId,
        username: new FormControl(this.profile2[0].username, [Validators.required, Validators.maxLength(30)]),
        birthday: new FormControl(this.profile2[0].birthday, [Validators.required, Validators.pattern('YYYY-MM-DD')]),
        sex: new FormControl(this.profile2[0].sex, [Validators.required]),
        preference: new FormControl(this.profile2[0].preference, [Validators.required]),
      });
    }
  }

  postSubmit(): void{
    if(this.newprofileForm.valid) {
      console.log('Start updating profile')
      const input = this.newprofileForm.value

      if (this.method == "edit"){
        this.edit_post(input).subscribe(results => {
          if (results.success) {
            console.log("profile edited")
            this.dialogRef.close(input)
          } else {
            alert("Editing profile failed")
            console.log(results)
          }
        })
      }
      else{
        alert('Unknown Method')
      }
    }
    else{
      alert("profile requirement not met")
    }
  }

  edit_post(input: object): Observable<any> {
    console.log("post editing with DB")
    // return Object({"success": true})
    console.log(input)
    return this.http.post<any>(`${environment.ms2Url}/api/userprofile/edit/${this.userId}`, input)

  }

  close() {
    this.dialogRef.close();
  }



}



