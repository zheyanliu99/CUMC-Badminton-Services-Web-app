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

  newpartner: Array<partnerAddInput>;
  userId: string;
  method: string;
  newpartnerForm: FormGroup;
  status: boolean;
  userid: number;
  userid_from: number;

  constructor(private http:HttpClient,
              private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<AddpartnerDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.userId = sessionStorage.getItem('userId')
    this.method = data.method
    if (this.method == "add"){
      this.newpartner = data.old
      this.status = data.addpartnerstatus
      this.userid_from = data.userid_from
      console.log('Start updating partner')

    }
  }

  ngOnInit(): void {
    if (this.method == "add"){
      // @ts-ignore
      // @ts-ignore
      this.newpartnerForm = this.formBuilder.group({
        userid_to: new FormControl(``, [Validators.required]),
      });
    }
  }

  postSubmit(): void{
    if(this.newpartnerForm.valid) {
      console.log('Start updating partner')
      const input = this.newpartnerForm.value

      if(this.status == true){
        alert('already had a partner, Can not add partner')
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
    console.log("adding with DB")
    // return Object({"success": true})
    console.log(input)
    console.log(`${environment.ms1Url}api/user/${this.userId}/add_partner`)
    return this.http.post<any>(`${environment.ms1Url}/api/user/${this.userId}/add_partner`, input)

  }

  delete_partner(userid_to:number):Observable<any>{
    console.log("start deleting")
    // @ts-ignore
    return this.http.get<any>(`${environment.ms1Url}/api/user/${this.userId}/delete_partner/${userid_to}`)
    console.log("delete with DB")
  }

  close() {
    this.dialogRef.close();
  }



}



