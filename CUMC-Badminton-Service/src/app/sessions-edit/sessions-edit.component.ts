import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { sessionInput } from './sessionEditInput';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sessions-edit',
  templateUrl: './sessions-edit.component.html',
  styleUrls: ['./sessions-edit.component.css']
})
export class SessionsEditComponent implements OnInit {

  sessions: Array<sessionInput>;
  userId: string;

  constructor(private http:HttpClient) {
    this.userId = sessionStorage.getItem('userId')
  }

  ngOnInit(): void {
    this.get_sessions_by_user().subscribe(results => {
      console.log(results.data)
      if(results.success){
        console.log("update data")
        this.sessions = results.data
        console.log(this.sessions)
        }
      else{
        alert("Results Not Found")
      }
    })
  }

  quit(sessionid:number): void{
    console.log('quit')
    this.delete_from_waitlist(sessionid).subscribe(results => {
      if(results.success){
        alert(results.message)}
      else{
        alert(results.message)
      }
    this.get_sessions_by_user().subscribe(results => {
      console.log(results.data)
      if(results.success){
        console.log("update data")
        this.sessions = results.data
        console.log(this.sessions)
        }
      else{
        alert("Results Not Found")
      }
    })
    })
  }

  get_sessions_by_user():Observable<any>{
    console.log('renew')
    return this.http.get<any>(`${environment.ms2Url}/api/session/user/${this.userId}`);
  }

  delete_from_waitlist(sessionid:number):Observable<any>{
    return this.http.get<any>(`${environment.ms2Url}/api/session/${sessionid}/quit/${this.userId}`)
  }

}
