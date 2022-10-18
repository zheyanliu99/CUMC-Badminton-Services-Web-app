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
export class SessionsComponent implements OnInit {

  @Input() sessions: Array<sessionInput>;
  userId = sessionStorage.getItem('userId');

  constructor(private http:HttpClient) {     
  }

  ngOnInit(): void {
    this.get_available_sessions().subscribe(results => {
      if(results.success){
        this.sessions = results.data}
      else{
        alert("Results Not Found")
      }
    });
    console.log(this.sessions)
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
    })
    location.reload();

  }

  add_to_waitlist(sessionid:number):Observable<any>{
    return this.http.get<any>(`${environment.ms2Url}/api/session/${sessionid}/enroll/${this.userId}`)
  }

}
