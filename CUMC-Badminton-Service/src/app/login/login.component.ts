import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { Router, RoutesRecognized } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { currentUser } from './currentUser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup; 
  userId = sessionStorage.getItem('userId');
  request_uri: string;
  currentUser: Array<currentUser>;
  
  constructor(private authService:AuthServiceService, private router: Router, private http:HttpClient) { }

  initForm(){
    this.formGroup = new FormGroup({
      email: new FormControl(``, [Validators.required, Validators.maxLength(30), Validators.email]),
      password: new FormControl(``, [Validators.required, Validators.minLength(5), Validators.maxLength(30)])
    });
  }

  ngOnInit(): void {
    this.initForm();
  }
  
  loginWithGoogle(){
    console.log('begin login with Google');
    this.login().subscribe(results => {
      this.request_uri = results.request_uri;
      window.location.href=this.request_uri;
    })

    console.log('find most recent')
    this.most_recent_login().subscribe(results => {
      this.currentUser = results
    })
    console.log(this.currentUser)
    console.log(this.request_uri)
    // window.location.href=this.request_uri;
  }

  login():Observable<any>{
    return this.http.get<string>(`${environment.ms2Url}/api/login`);
  }

  most_recent_login():Observable<any>{
    return this.http.get<any>(`${environment.ms2Url}/api/login/mostrecent`);
  }




}
