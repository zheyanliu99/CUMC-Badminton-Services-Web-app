import {Component, OnInit, SimpleChanges} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import { chatInput } from './chatInput';
import {MatIconModule} from '@angular/material/icon';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {searchchatDialogComponent} from "../chat-search-dialog/chat-search-dialog.component";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class chatComponent implements OnInit {
  chats: Array<chatInput>;
  userId: string;

  constructor(private http:HttpClient,
              public dialog: MatDialog) {
    this.userId = sessionStorage.getItem('userId')
  }

  ngOnInit(): void {
    console.log("init")
    this.load_page()
  }

  load_page() {
    this.get_allchat().subscribe(results => {
      console.log(results)
      if (results.success) {
        console.log("update chat")
        this.chats = results.data
        console.log(this.chats)
      } else {
        alert("chats Not Found")
      }
    })
  }


  get_allchat():Observable<any>{
    console.log('get all chat')
    return this.http.get<any>(`${environment.ms1Url}/api/user/${this.userId}/chatting/history`);
  }

  searchchatDialog() {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      method: "add",
      userid_from: this.userId,
    }

    let dialogRef = this.dialog.open(searchchatDialogComponent, dialogConfig)
    dialogRef.afterClosed().subscribe(results => {
      console.log(results)
    })
  }

}
