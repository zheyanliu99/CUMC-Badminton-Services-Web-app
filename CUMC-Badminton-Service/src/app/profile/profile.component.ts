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

  quit(userId:string): void{
    console.log('quit')
    this.delete_from_profile(userId).subscribe(results => {
      if(results.success){
        alert(results.data)}
      else{
        alert(results.data)
      }
      this.get_allprofile().subscribe(results => {
        console.log(results.data)
        if(results.success){
          console.log("update data")
          this.profile2 = results.data
          console.log(this.profile2)
        }
        else{
          alert("Results Not Found")
        }
      })
    })
  }
  delete_from_profile(userId:string):Observable<any>{
    return this.http.get<any>(`${environment.ms2Url}/api/userprofile/${userId}/quit/${this.userId}`)
  }

  openDialog() {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      method: 'edit'
    }

    let dialogRef = this.dialog.open(AddprofileDialogComponent, dialogConfig)
    dialogRef.afterClosed().subscribe(results => {
      console.log(results)
    })
  }


}
