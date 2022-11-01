import {Component, OnInit, Inject} from '@angular/core';
import {max, Observable} from "rxjs";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from 'src/environments/environment';
import { partnerAddInput } from './partnerAddInput';
import {HttpClient} from "@angular/common/http";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-partner-add',
  templateUrl: './partner-add.component.html',
  styleUrls: ['./partner-add.component.css']
})
export class AddpartnerDialogComponent implements OnInit {

  partner: Array<partnerAddInput>;
  userId: string;
  method: string;
  newpartnerForm: FormGroup;
  status: boolean;

  constructor(private http:HttpClient,
              private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<AddpartnerDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.userId = sessionStorage.getItem('userId')
    this.method = data.method
    if (this.method == "add"){
      this.partner = data.old
      this.status = data.old

    }
  }

  ngOnInit(): void {
    if (this.method == "add"){
      // @ts-ignore
      // @ts-ignore
      this.newpartnerForm = this.formBuilder.group({
        user_id: this.userId,
        userid_to: new FormControl(this.partner[0].userid_to, [Validators.required]),
      });
    }
  }

  postSubmit(): void{
    if(this.newpartnerForm.valid) {
      console.log('Start updating partner')
      const input = this.newpartnerForm.value

      if(this.status == true){
        alert('Can not add partner')
        console.log("partner can not added")
      }
      else{
        if (this.method == "add"){
          this.add_partner(input).subscribe(results => {
            if (results.success) {
              console.log("partner added")
              this.dialogRef.close(input)
            } else {
              alert("adding partner failed")
              console.log(results)
            }
          })
        }
        else{
          alert('Unknown Method')
        }
      }

      }
    else{
      alert("partner requirement not met")
    }
  }

  add_partner(input: object): Observable<any> {
    console.log("post adding with DB")
    // return Object({"success": true})
    console.log(input)
    return this.http.post<any>(`${environment.ms1Url}api/user/${this.userId}/add_partner`, input)

  }

  close() {
    this.dialogRef.close();
  }



}



