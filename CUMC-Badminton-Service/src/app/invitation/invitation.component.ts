import {Component, OnInit, Inject} from '@angular/core';
import {max, Observable} from "rxjs";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from 'src/environments/environment';
import { invitation } from './invitation';
import {HttpClient} from "@angular/common/http";
import {MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef} from "@angular/material/legacy-dialog";

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.css']
})
export class sendinviteDialogComponent implements OnInit {

  invitation: Array<invitation>;
  userId: string;
  method: string;
  invitionForm: FormGroup;
  status: boolean;
  userid: number;
  userid_from: number;

  constructor(private http:HttpClient,
              private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<sendinviteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.userId = sessionStorage.getItem('userId')
    this.method = data.method
    if (this.method == "add"){
      this.userid_from = data.userid_from
      console.log('Start sending invitaion')

    }
  }

  ngOnInit(): void {
    if (this.method == "add"){
      // @ts-ignore
      // @ts-ignore
      this.invitionForm = this.formBuilder.group({
        userid_to: new FormControl(``, [Validators.required]),
        content: new FormControl(``, [Validators.required]),
      });
    }
  }

  postSubmit(): void{
    if(this.invitionForm.valid) {
      console.log('Start sending invitation')
      const input = this.invitionForm.value


        if (this.method == "add") {
          this.send_invitation(input).subscribe(results => {
            if (results.success) {
              console.log("invititon added")
              this.dialogRef.close(input)
            } else {
              alert("sending invitation failed,because he/she already had a partner")
              console.log(results)
            }
          })

        }else{
          alert('Unknown Method')
        }
      }
    else{
      alert("partner requirement not met")
    }
  }



  send_invitation(input: object): Observable<any> {
    console.log("adding with DB")
    // return Object({"success": true})
    console.log(input)
    return this.http.post<any>(`${environment.ms1Url}/api/user/${this.userId}/partner/send_invitation`, input)

  }

  close() {
    this.dialogRef.close();
  }



}



