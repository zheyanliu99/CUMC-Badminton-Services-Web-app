import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RoutesRecognized } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formGroup!: FormGroup; 
  userId = sessionStorage.getItem('userId');
  constructor(private authService:AuthServiceService, private router: Router) { }

  initForm(){
    this.formGroup = new FormGroup({
      email: new FormControl(``, [Validators.required]),
      username: new FormControl(``, [Validators.required]),
      password: new FormControl(``, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  registerProcess(){
    console.log(this.formGroup.value)
    if(this.formGroup.valid){
      this.authService.register(this.formGroup.value).subscribe(result=>{
        if(result.success) {
          console.log(result);
          alert(result.message);
          this.router.navigate(['/login'])
        } else {
          alert(result.message);
        }
      })
    }
  }

}
