import {Component, OnInit, Inject} from '@angular/core';
import {Observable} from "rxjs";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from 'src/environments/environment';
import { chatsearchdialogInput } from './chatsearchdialogInput';
import {HttpClient} from "@angular/common/http";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-chat-search-dialog',
  templateUrl: './chat-search-dialog.component.html',
  styleUrls: ['./chat-search-dialog.component.css']
})
export class searchchatDialogComponent implements OnInit {

  chats: Array<chatsearchdialogInput>;
  userId: string;
  method: string;
  newchatForm: FormGroup;
  userid: number;
  userid_from: number;
  userid_to: number;

  constructor(private http:HttpClient,
              private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<searchchatDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.userId = sessionStorage.getItem('userId')
    this.method = data.method
    if (this.method == "add"){
      this.userid_from = data.userid_from
      console.log('Start updating chat-search-dialog')

    }
  }


  ngOnInit(): void {
    if (this.method == "add"){
      this.newchatForm = this.formBuilder.group({
        userid_to: new FormControl(``, [Validators.required]),
        content: new FormControl(``, [Validators.required, Validators.maxLength(300)]),
      });
    }
  }

  postSubmit(): void{
    if(this.newchatForm.valid) {
      console.log('Start chat')
      const input = this.newchatForm.value
      console.log(input)

      if (this.method == "add"){
          this.sendchat(input).subscribe(results => {
            if (results.success) {
              console.log('send chat successfully')
              this.dialogRef.close(input)

            } else {
              alert("sending chat failed")
            }
          })
      }
      else{
        alert('Unknown Method')
      }
    }
    else{
      alert("chat requirement not met")
    }
  }





  sendchat(input: object): Observable<any> {
    console.log("search with DB")
    console.log(input)
    return this.http.post<any>(`${environment.ms1Url}/api/user/${this.userId}/chatting/sending`, input)
  }

  close() {
    this.dialogRef.close();
  }



}



