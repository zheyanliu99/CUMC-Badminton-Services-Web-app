import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import {Observable} from "rxjs";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {postInput} from "../post-details/postInput";
import * as SmartyStreetsSDK from 'smartystreets-javascript-sdk';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { UsStreetVerificationHelper } from './Util/UsStreetVerificationHelper';


@Component({
  selector: 'app-add-post-dialog',
  templateUrl: './add-post-dialog.component.html',
  styleUrls: ['./add-post-dialog.component.css']
})
export class AddPostDialogComponent implements OnInit {

  userId: string;
  locations: Array<string>;
  postForm: FormGroup;
  method: string;
  oldPost: Array<postInput>;
  label_dict: object;
  hasUnitNumber = false;
  addressOptions = <any>[];
  addressDict = {
    street: "",
    city: "",
    state: ""
  };

  @ViewChild(MatAutocompleteTrigger, {read: MatAutocompleteTrigger}) inputAutoComplete: MatAutocompleteTrigger;

  states = [
    {name: 'Alabama', abbreviation: 'AL'},
    {name: 'Alaska', abbreviation: 'AK'},
    {name: 'American Samoa', abbreviation: 'AS'},
    {name: 'Arizona', abbreviation: 'AZ'},
    {name: 'Arkansas', abbreviation: 'AR'},
    {name: 'California', abbreviation: 'CA'},
    {name: 'Colorado', abbreviation: 'CO'},
    {name: 'Connecticut', abbreviation: 'CT'},
    {name: 'Delaware', abbreviation: 'DE'},
    {name: 'District Of Columbia', abbreviation: 'DC'},
    {name: 'Federated States Of Micronesia', abbreviation: 'FM'},
    {name: 'Florida', abbreviation: 'FL'},
    {name: 'Georgia', abbreviation: 'GA'},
    {name: 'Guam', abbreviation: 'GU'},
    {name: 'Hawaii', abbreviation: 'HI'},
    {name: 'Idaho', abbreviation: 'ID'},
    {name: 'Illinois', abbreviation: 'IL'},
    {name: 'Indiana', abbreviation: 'IN'},
    {name: 'Iowa', abbreviation: 'IA'},
    {name: 'Kansas', abbreviation: 'KS'},
    {name: 'Kentucky', abbreviation: 'KY'},
    {name: 'Louisiana', abbreviation: 'LA'},
    {name: 'Maine', abbreviation: 'ME'},
    {name: 'Marshall Islands', abbreviation: 'MH'},
    {name: 'Maryland', abbreviation: 'MD'},
    {name: 'Massachusetts', abbreviation: 'MA'},
    {name: 'Michigan', abbreviation: 'MI'},
    {name: 'Minnesota', abbreviation: 'MN'},
    {name: 'Mississippi', abbreviation: 'MS'},
    {name: 'Missouri', abbreviation: 'MO'},
    {name: 'Montana', abbreviation: 'MT'},
    {name: 'Nebraska', abbreviation: 'NE'},
    {name: 'Nevada', abbreviation: 'NV'},
    {name: 'New Hampshire', abbreviation: 'NH'},
    {name: 'New Jersey', abbreviation: 'NJ'},
    {name: 'New Mexico', abbreviation: 'NM'},
    {name: 'New York', abbreviation: 'NY'},
    {name: 'North Carolina', abbreviation: 'NC'},
    {name: 'North Dakota', abbreviation: 'ND'},
    {name: 'Northern Mariana Islands', abbreviation: 'MP'},
    {name: 'Ohio', abbreviation: 'OH'},
    {name: 'Oklahoma', abbreviation: 'OK'},
    {name: 'Oregon', abbreviation: 'OR'},
    {name: 'Palau', abbreviation: 'PW'},
    {name: 'Pennsylvania', abbreviation: 'PA'},
    {name: 'Puerto Rico', abbreviation: 'PR'},
    {name: 'Rhode Island', abbreviation: 'RI'},
    {name: 'South Carolina', abbreviation: 'SC'},
    {name: 'South Dakota', abbreviation: 'SD'},
    {name: 'Tennessee', abbreviation: 'TN'},
    {name: 'Texas', abbreviation: 'TX'},
    {name: 'Utah', abbreviation: 'UT'},
    {name: 'Vermont', abbreviation: 'VT'},
    {name: 'Virgin Islands', abbreviation: 'VI'},
    {name: 'Virginia', abbreviation: 'VA'},
    {name: 'Washington', abbreviation: 'WA'},
    {name: 'West Virginia', abbreviation: 'WV'},
    {name: 'Wisconsin', abbreviation: 'WI'},
    {name: 'Wyoming', abbreviation: 'WY'}
  ];

  constructor(private http:HttpClient,
              private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<AddPostDialogComponent>,
              // private usVerify:UsStreetVerificationHelper,
              @Inject(MAT_DIALOG_DATA) data) {
    this.userId = sessionStorage.getItem('userId')
    this.method = data.method
    if (this.method == "edit"){
      this.oldPost = data.old

    }
  }

  ngOnInit(): void {
    this.label_dict = {'Administrative': '1', 'Lost and Found': '2', 'Call for Partners': '3', 'Others': '4'}

    if (this.method == "edit"){
      console.log(this.label_dict[this.oldPost[0].Label])
      this.postForm = this.formBuilder.group({
        user_id: this.userId,
        title: new FormControl(this.oldPost[0].Title, [Validators.required, Validators.maxLength(30)]),
        label: new FormControl(this.label_dict[this.oldPost[0].Label], [Validators.required]),
        location: this.oldPost[0].Location_ID,
        content: new FormControl(this.oldPost[0].Content, [Validators.required, Validators.maxLength(300)]),
      });
    }
    else if (this.method == "add"){
      this.postForm = this.formBuilder.group({
        title: new FormControl(``, [Validators.required, Validators.maxLength(30)]),
        label: new FormControl(``, [Validators.required]),
        location: ``,
        content: new FormControl(``, [Validators.required, Validators.maxLength(300)]),
      });
    }

  }

  postSubmit(): void{
    // this.addressValidation().subscribe(result => {
    //   if (result == false) {
    //     alert("invalid location, please select one address from the suggestion box")
    //     this.inputAutoComplete.openPanel();
    //     return null
    //   }
    // })

    if(this.postForm.valid) {
      console.log('Start updating post')
      const input = Object.assign(this.postForm.value, this.addressDict)
      console.log(input)

      if (this.method == "add") {
        this.add_new_post(input).subscribe(results => {
          if (results.success) {
            console.log("post added")
            this.dialogRef.close(results)
          } else {
            alert("Adding post failed")
            console.log(results)
          }
        })
      }
      else if (this.method == "edit"){
        this.edit_post(input).subscribe(results => {
          if (results.success) {
            console.log("post edited")
            this.dialogRef.close(input)
          } else {
            alert("Editing post failed")
            console.log(results)
          }
        })
      }
      else{
        alert('Unknown Method')
      }
    }
    else{
      alert("Post requirement not met")
    }
  }

  add_new_post(input: object): Observable<any> {
    console.log("post adding with DB")
    return this.http.post<any>(`${environment.ms3Url}/api/forum/newpost/user_id/${this.userId}`, input)
  }

  edit_post(input: object): Observable<any> {
    console.log("post editing with DB")
    // return Object({"success": true})
    return this.http.post<any>(`${environment.ms3Url}/api/forum/post/${this.oldPost[0].Post_ID}/edit/user_id/${this.userId}`, input)
  }

  close() {
    this.dialogRef.close();
  }

  onKeyUp(evt){
    if((this.postForm.get('location').value as string).length > 5){
      this.AutocompleteAddress(this.postForm.get('location').value).then(data => {
        this.addressOptions = data.result as any[];
      }).catch();
      evt.stopPropagation();
      this.inputAutoComplete.openPanel();
    }
    else{
      this.addressOptions = [];
    }
  }

  //sdk call for address lookup
  AutocompleteAddress(term: string): any {
    const SmartyStreetsCore = SmartyStreetsSDK.core;
    const websiteKey = environment.SMARTY_WEBSITE_KEY; // Your Website Key
    const Lookup = SmartyStreetsSDK.usAutocomplete.Lookup;
    const credentials = new SmartyStreetsCore.SharedCredentials(websiteKey);
    const clientBuilder = new SmartyStreetsCore.ClientBuilder(credentials);
    const client = clientBuilder.buildUsAutocompleteClient();
    const lookup = new Lookup(term);
    lookup.GeolocateType = "null";
    lookup.MaxCandidates = 10;
    return client.send(lookup);
  }

  onAddressTextChange():void{
    if(this.postForm.get('location').value == ''){
      this.addressOptions = [];
    }
  }

  //lookup address and populate state and city
  getAddressSelected(selectedVal: string):void{
    let selectedAddress = selectedVal;
    this.addressOptions.forEach(element => {
      if(element.text == selectedVal){
        this.postForm.get('location').setValue(element.text)
        // this.addressForm.get('address').setValue(element.streetLine);
        this.addressDict.street = element.streetLine
        this.addressDict.city =  element.city
        this.addressDict.state = element.state
        console.log('result',element);
        console.log('dict',this.addressDict)
      }
    });
  }

  // addressValidation(): any {
  //   this.addressOptions = [];
  //   const Lookup = SmartyStreetsSDK.usStreet.Lookup;
  //   const lookup1 = new Lookup();
  //   lookup1.inputId = "24601";  // Optional ID from your system
  //   // lookup1.addressee = "Yiru";
  //   lookup1.street = this.addressDict.street;
  //   // lookup1.street2 = this.addressForm.controls['address2'].value;
  //   // lookup1.secondary = this.addressForm.controls['address'].value;
  //   // lookup1.urbanization = "";  // Only applies to Puerto Rico addresses
  //   lookup1.city = this.addressDict.city;
  //   lookup1.state = this.addressDict.state;
  //   // lookup1.zipCode =  this.addressForm.controls['postalCode'].value;
  //   lookup1.maxCandidates = 3;
  //   lookup1.match = "strict"; // "invalid" is the most permissive match,
  //   // this will always return at least one result even if the address is invalid.
  //   // Refer to the documentation for additional MatchStrategy options.
  //   this.usVerify.getAddress(lookup1).subscribe(data => {
  //     console.log("data", data);
  //     if (data == []) {
  //       return false
  //     } else {
  //       data.lookups.map(lookup => lookup.result.forEach(element => {
  //         var obj = {text:element.deliveryLine1 + ' ' + element.lastLine
  //           ,streetLine: element.deliveryLine1
  //           ,city:element.components.cityName
  //           ,state:element.components.state
  //           ,zipCode :element.components.zipCode
  //           ,postalCodeExt: element.components.plus4Code
  //           ,countyName  :element.metadata.countyName
  //         };
  //         this.addressOptions.push(obj);
  //         console.log(this.addressOptions,'1');
  //         console.log(element,'2');
  //       }))
  //       return true
  //     }
  //
  //   })
  //   // console.log( this.addressOptions.deliveryLine1 + ' '  + this.addressOptions.lastLine);
  //   // this.inputAutoComplete.openPanel();
  // }


}
