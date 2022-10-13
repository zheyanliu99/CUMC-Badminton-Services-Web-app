import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { loginInput } from './login/loginInput';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http:HttpClient) { }

  login(data: loginInput):Observable<any>{
    return this.http.post(`http://127.0.0.1:5011/api/user/login`, data);
  }
}
