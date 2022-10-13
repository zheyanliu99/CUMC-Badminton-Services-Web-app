import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { Router, RoutesRecognized } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit {
  isLoggedIn: boolean;

  constructor(private authService:AuthServiceService, private router: Router) { }

  ngOnInit(): void {
    console.log(sessionStorage.getItem('userId'))
    if(sessionStorage.getItem('userId')){
      this.isLoggedIn = true;
    }else{
      this.isLoggedIn = false;
    }
  }

  onClick(){
    this.authService.logout();
    this.router.navigate(['']);
    location.reload();
  }

}
