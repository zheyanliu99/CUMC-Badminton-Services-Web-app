import {Component, OnInit, Input , OnChanges, SimpleChanges} from '@angular/core';
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
        console.log(this.userId, this.partner)
      }
      else{
        alert("Results Not Found")
      }
    })
    this.get_allpartner().subscribe(results => {
      if(results.success){
        console.log("partner showing")
        this.partner = results.data
        this.status = results.success
        console.log(this.partner, this.status)
      }
      else{
        alert("Results Not Found")
      }
    })

  }

  get_allpartner():Observable<any>{
    // @ts-ignore
    return this.http.get<any>(`${environment.ms1Url}/api/user/${this.userId}/partner`);
  }

  load_page() {
    this.get_allpartner().subscribe(results => {
      console.log(results)
      if (results.success) {
        console.log("update partner")
        this.partner = results.data
        console.log(this.partner)
      } else {
        alert("partner Not Found")
      }
    })
  }

  addpartnerDialog() {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      method: 'add',
      old: this.partner

    }

    let dialogRef = this.dialog.open(AddpartnerDialogComponent, dialogConfig)
    dialogRef.afterClosed().subscribe(results => {
      console.log(results)
      alert("Succeed!")
      this.load_page()
    })
  }




}
