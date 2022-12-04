import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from 'src/environments/environment';
import { partnerInput } from './partnerInput';
import { invitationInput } from './invitationInput';
import {HttpClient} from "@angular/common/http";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddpartnerDialogComponent} from "../partner-add/partner-add.component";
import {sendinviteDialogComponent} from "../invitation/invitation.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {otherprofileInput} from "./otherprofileInput";

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.css']
})
export class partnerComponent implements OnInit {

  userId: string;
  partner: Array<partnerInput>;
  invitation: Array<invitationInput>;
  status: boolean;
  message: string;
  userid_from: number;
  profilesearchform: FormGroup;
  email: string;
  number: number;
  otherprofile: Array<otherprofileInput>;

  constructor(private http:HttpClient,
              public dialog: MatDialog) {
    this.userId = sessionStorage.getItem('userId')
  }

  ngOnInit(): void {
    console.log("init")
    this.get_invitation().subscribe(results => {
      if(results.success){
        console.log("show invitation")
        this.invitation = results.data
        console.log(this.invitation)
        }
      else{
        alert("Results Not Found")
      }
    })
    this.get_allpartner().subscribe(results => {
      if(results.data){
        console.log(results)
        console.log("data showing")
        this.partner = results.data
        console.log(this.partner)
        }
      else{
        alert("Results Not Found")
      }
    })
    this.profilesearchform = new FormGroup({
      email: new FormControl(),
      number: new FormControl(),
    });
  }

  get_allpartner():Observable<any>{
    // @ts-ignore
    return this.http.get<any>(`${environment.ms1Url}/api/user/${this.userId}/partner`)
  }

  get_invitation():Observable<any>{
    // @ts-ignore
    return this.http.get<any>(`${environment.ms1Url}/api/user/${this.userId}/partner/invitation`)
  }

  load_page() {
    this.get_allpartner().subscribe(results => {
      if(results.success){
        console.log("data showing")
        this.partner = results.data
        this.status = results.success
        console.log(this.userId, this.partner)
        }
      else {
        alert("Results Not Found")
      }
    })
  }


  AddpartnerDialog() {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      method: 'add',
      old: this.partner,
      addpartnerstatus: this.status,
      userid_from: this.userId
    }

    let dialogRef = this.dialog.open(AddpartnerDialogComponent, dialogConfig)
    dialogRef.afterClosed().subscribe(results => {
      console.log(results)
      alert("Succeed!")
      this.load_page()
    })
  }

  Addpartner(input) {
    if (input){
      this.add_partner(input).subscribe(results => {
        if (results.success) {
          console.log("partner added")
          this.load_page()
        } else {
          alert("Adding partner failed, she/He already had a partner")
          console.log(results)
        }
      })
    }
  }

  add_partner(input: object): Observable<any> {
    console.log("adding with DB")
    // return Object({"success": true})
    console.log(input)
    return this.http.post<any>(`${environment.ms1Url}/api/user/${this.userId}/add_partner`, input)

  }

  sendinviteDialog() {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      method: 'add',
    }

    let dialogRef = this.dialog.open(sendinviteDialogComponent, dialogConfig)
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
      location.reload()
    })
  }

  delete_partner(userid_to:number):Observable<any>{
    console.log("start deleting")
    // @ts-ignore
    return this.http.get<any>(`${environment.ms1Url}/api/user/${this.userId}/delete_partner/${userid_to}`)
  }

  onDelete1(userid_from:number): void{
    console.log('delete response activated')
    this.delete_partner1(userid_from).subscribe(results => {
      if (!results.success) {
        alert("delete response failed")
        console.log(results)
      }
      location.reload()
    })
  }

  delete_partner1(userid_from:number):Observable<any>{
    console.log("start deleting")
    // @ts-ignore
    return this.http.get<any>(`${environment.ms1Url}/api/user/${this.userId}/delete_partner/${userid_from}`)
  }

  profilesearchSubmit(): void{
    if(this.profilesearchform.valid) {
      console.log('Start search profile')
      const input = this.profilesearchform.value
      console.log(input)
      if (input) {
        this.searchprofile(input).subscribe(results => {
          if (results.success) {
            console.log('save profile result')
            this.otherprofile = results.data
            console.log(this.otherprofile)

          } else {
            alert("no chat")
          }
        })

      }else{
        alert('Unknown Method')
      }
    }
    else{
      alert("chat-search-dialog requirement not met")
    }
  }

  searchprofile(input: object):Observable<any>{
    // @ts-ignore
    return this.http.post<any>(`${environment.ms1Url}/api/user/${this.userId}/search_pro`, input)
  }
}
