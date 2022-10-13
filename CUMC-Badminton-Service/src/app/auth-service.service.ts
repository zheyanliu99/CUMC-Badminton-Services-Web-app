import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { loginInput } from './login/loginInput';
import { registerInput } from './register/registerInput';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http:HttpClient) { }

  login(data: loginInput):Observable<any>{
    return this.http.post(`${environment.ms2Url}/api/user/login`, data);
  }

  register(data: registerInput):Observable<any>{
    return this.http.post(`${environment.ms2Url}/api/user/register`, data);
  }
}
