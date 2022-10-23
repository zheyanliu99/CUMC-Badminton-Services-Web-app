import { Component, OnInit, Input , OnChanges, SimpleChanges} from '@angular/core';
import { environment } from 'src/environments/environment';
import { sessionInput } from './sessionInput';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.css']
})
export class SessionsComponent implements OnInit, OnChanges {

  sessions: Array<sessionInput>;
  userId: string;

  constructor(private http:HttpClient) {
    this.userId = sessionStorage.getItem('userId')
  }

  ngOnInit(): void {
    this.get_available_sessions().subscribe(results => {
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

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
  }


  get_available_sessions():Observable<any>{
    console.log('renew')
    return this.http.post<any>(`${environment.ms2Url}/api/session`, this.userId);
  }

  register(sessionid:number): void{
    console.log('add')
    this.add_to_waitlist(sessionid).subscribe(results => {
      if(results.success){
        alert(results.message)}
      else{
        alert("Register failed")
      }
    this.get_available_sessions().subscribe(results => {
      if(results.success){
        this.sessions = results.data}
      else{
        alert("Results Not Found")
      }
    });
    })

  }

  add_to_waitlist(sessionid:number):Observable<any>{
    return this.http.get<any>(`${environment.ms2Url}/api/session/${sessionid}/enroll/${this.userId}`)
  }

}
