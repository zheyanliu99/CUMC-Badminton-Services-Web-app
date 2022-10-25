import {Component, OnInit, Input , OnChanges, SimpleChanges} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from 'src/environments/environment';
import { profileInput } from './profileInput';
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class profileComponent implements OnInit {

  profile2: Array<profileInput>;
  userId: string;

  constructor(private http:HttpClient,
              public dialog: MatDialog) {
    this.userId = sessionStorage.getItem('userId')
  }

  ngOnInit(): void {
    console.log("init")
    this.get_allprofile().subscribe(results => {
      if(results.success){
        console.log("data showing")
        this.profile2 = results.data
        console.log(this.userId, this.profile2)
      }
      else{
        alert("Results Not Found")
      }
    })
  }

  get_allprofile():Observable<any>{
    // @ts-ignore
    return this.http.get<any>(`${environment.ms1Url}/api/userprofile/${this.userId}`);
  }


}
