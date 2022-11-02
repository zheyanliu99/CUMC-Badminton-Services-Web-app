import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from 'src/environments/environment';
import { partnerInput } from './partnerInput';
import {HttpClient} from "@angular/common/http";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddpartnerDialogComponent} from "../partner-add/partner-add.component";


@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.css']
})
export class partnerComponent implements OnInit {

  userId: string;
  partner: Array<partnerInput>;
  status: boolean;
  message: string;

  constructor(private http:HttpClient,
              public dialog: MatDialog) {
    this.userId = sessionStorage.getItem('userId')
  }

  ngOnInit(): void {
    console.log("init")
    this.get_allpartner().subscribe(results => {
      if(results.success){
        console.log("data showing")
        this.partner = results.data
        this.status = results.success
        console.log(this.userId, this.partner)
      }
      else{
        alert("Results Not Found")
      }
    })
  }

  get_allpartner():Observable<any>{
    // @ts-ignore
    console.log("results")
    return this.http.get<any>(`${environment.ms1Url}/api/user/${this.userId}/partner`)
  }

  load_page() {
    this.get_allpartner().subscribe(results => {
      console.log("results")
      if(results.success){
        console.log("data showing")
        this.partner = results.data
        this.status = results.success
        console.log(this.userId, this.partner)
      }
      else{
        alert("Results Not Found")
      }
    })
  }

  AddpartnerDialog() {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      method: 'add',
      old: this.partner,
      addpartnerstatus: this.status
    }

    let dialogRef = this.dialog.open(AddpartnerDialogComponent, dialogConfig)
    dialogRef.afterClosed().subscribe(results => {
      console.log(results)
      alert("Succeed!")
      this.load_page()
    })
  }

  onDelete(userid_to:number): void{
    console.log('delete response activated')
    this.delete_partner(userid_to).subscribe(results => {
      if (!results.success) {
        alert("delete response failed")
        console.log(results)
      }
      this.load_page()
    })
  }

  delete_partner(userid_to:number):Observable<any>{
    console.log("start deleting")
    // @ts-ignore
    return this.http.get<any>(`${environment.ms1Url}/api/user/${this.userId}/delete_partner/${userid_to}`)
  }




}
