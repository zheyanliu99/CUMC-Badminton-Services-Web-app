import {Component, OnInit, Input , OnChanges, SimpleChanges} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from 'src/environments/environment';
import { profileInput } from './profileInput';
import {HttpClient} from "@angular/common/http";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddprofileDialogComponent} from "../profile-edit/profile-edit.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class profileComponent implements OnInit {

  profile2: any;
  userId: string;

  constructor(private http:HttpClient,
              public dialog: MatDialog) {
    this.userId = sessionStorage.getItem('userId')
  }

  ngOnInit(): void {
    console.log("init")
    this.get_allprofile().subscribe(results => {
      console.log(results.data.user_info)
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
    return this.http.get<any>(`${environment.cs1Url}/api/composite/user_profile_all/${this.userId}`);
  }


  load_page() {
    this.get_allprofile().subscribe(results => {
      console.log(results)
      if (results.success) {
        console.log("update profile")
        this.profile2 = results.data
        console.log(this.profile2)
      } else {
        alert("profile Not Found")
      }
    })
  }



  editDialog() {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      method: 'edit',
      old: this.profile2
    }

    let dialogRef = this.dialog.open(AddprofileDialogComponent, dialogConfig)
    dialogRef.afterClosed().subscribe(results => {
      console.log(results)
      alert("Succeed!")
      this.load_page()
    })
  }


}
