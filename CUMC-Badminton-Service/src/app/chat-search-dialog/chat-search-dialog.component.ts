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
  styleUrls: ['./chat-search-dialog-add.component.css']
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
      // @ts-ignore
      // @ts-ignore
      this.newchatForm = this.formBuilder.group({
        userid_to: new FormControl(``, [Validators.required]),
      });
    }
  }

  postSubmit(): void{
    if(this.newchatForm.valid) {
      console.log('Start show chat')
      const input = this.newchatForm.value

      if (this.method == "add"){
          this.get_allchat(input).subscribe(results => {
            if (results.success) {
              console.log('save chat result')
              this.chats = results.data
              console.log(this.chats, this.userId)
              this.dialogRef.close(input)

            } else {
              alert("adding chat-search-dialog failed")
            }
          })
      }
      else{
        alert('Unknown Method')
      }
    }
    else{
      alert("chat-search-dialog requirement not met")
    }
  }





  get_allchat(input: object): Observable<any> {
    console.log("search with DB")
    console.log(input)
    return this.http.post<any>(`${environment.ms1Url}/api/user/${this.userId}/chatting/history`, input)

  }

  close() {
    this.dialogRef.close();
  }



}



