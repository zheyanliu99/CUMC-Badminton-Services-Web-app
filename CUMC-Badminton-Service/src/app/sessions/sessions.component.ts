import { Component, OnInit, Input , OnChanges, SimpleChanges} from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
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

  formGroup!: FormGroup; 
  sessions: Array<sessionInput>;
  userId: string;
  register_type: number;
  if_admin: boolean;

  constructor(private http:HttpClient) {
    this.userId = sessionStorage.getItem('userId');
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      register_type: new FormControl()
   }); 

    if(JSON.parse(sessionStorage.getItem('currentUser')).role == 'Admin'){
      this.if_admin = true;
    }else{
      this.if_admin = false;
    }

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
    this.register_type = this.formGroup.value['register_type'] ?  this.formGroup.value['register_type'] : 0
    console.log(this.register_type)
    this.add_to_waitlist(sessionid).subscribe(results => {
      if(results.success){
        alert(results.message)}
      else{
        alert(results.message)
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

  approve(sessionid:number): void{
    this.approve_to_session(sessionid).subscribe(results => {
      if(results.success){
        alert(results.message)}
      else{
        alert(results.message)
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
    return this.http.post<any>(`${environment.ms2Url}/api/session/${sessionid}/enroll/${this.userId}`, this.register_type)
  }

  approve_to_session(sessionid:number):Observable<any>{
    return this.http.post<any>(`${environment.ms2Url}/api/admin/session/approve/${sessionid}`, this.userId)
  }


}
