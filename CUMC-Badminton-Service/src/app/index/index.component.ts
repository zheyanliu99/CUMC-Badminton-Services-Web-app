import { Component, OnInit } from '@angular/core';
import { currentUser } from './currentUser';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  userId = sessionStorage.getItem('userId');
  currentUser: Array<currentUser>;

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    // this.most_recent_login().subscribe(results => {
    //   this.currentUser = results;
    //   sessionStorage.setItem('userId', this.currentUser['userid']);
    //   sessionStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    // })

    // remember del
    // sessionStorage.setItem('userId', "8");
    console.log(sessionStorage.getItem('userId'));
    console.log(sessionStorage.getItem('currentUser'));
  }

  most_recent_login():Observable<any>{
    return this.http.get<any>(`${environment.ms2Url}/api/login/mostrecent`);
  }

}

