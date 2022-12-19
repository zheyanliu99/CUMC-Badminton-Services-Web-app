import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { Router, RoutesRecognized } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { currentUser } from './currentUser';
import { googleProfile } from './loginInput';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'CBS';
  auth2: any;
  google_profile: googleProfile;

  @ViewChild('loginRef', { static: true }) loginElement!: ElementRef;
  constructor(private http:HttpClient, private router: Router) { }
  ngOnInit() {

    this.googleAuthSDK();
  }

  callLogin() {

    this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
      (googleAuthUser: any) => {

        //Print profile details in the console logs

        let profile = googleAuthUser.getBasicProfile();
        console.log('Token || ' + googleAuthUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());


        // sessionStorage.setItem('userId', this.currentUser['userid']);
        // sessionStorage.setItem('currentUser', JSON.stringify(this.currentUser));

        this.google_profile = {'name':profile.getName(), 'email':profile.getEmail(), 'picture':profile.getImageUrl()};
        console.log(this.google_profile)
        this.process_login(this.google_profile).subscribe(results => {
          if (results.success) {
            console.log(results.message.split(",",2)[1])
            if(results.message.split(",",2)[1]== ' you have registered and logged in')
            {alert('Check your email to allow us sending emails')}
            alert(results.message)
            console.log(results.data)

          sessionStorage.setItem('userId', results.data['userid']);
          sessionStorage.setItem('currentUser', JSON.stringify(results.data));

          this.router.navigate(['']).then(() => {
          window.location.reload();
        })
          } else {
            alert(results.message)
            console.log(results)
          }
        })

      }, (error: any) => {
        alert(JSON.stringify(error, undefined, 2));
      });

  }

  googleAuthSDK() {

    (<any>window)['googleSDKLoaded'] = () => {
      (<any>window)['gapi'].load('auth2', () => {
        this.auth2 = (<any>window)['gapi'].auth2.init({
          client_id: '432898219349-ufa3r6877k4b3uo7bm8ciiu70vfeh0lb.apps.googleusercontent.com',
          plugin_name:'login',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });
        this.callLogin();
      });
    }

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement('script');
      js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs?.parentNode?.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));
  }

  process_login(google_profile): Observable<any> {
    console.log("post editing with DB")
    // return Object({"success": true})
    return this.http.post<any>(`${environment.ms2Url}/api/googlelogin`, google_profile)

  }






}
