import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup; 
  userId = sessionStorage.getItem('userId');
  constructor(private authService:AuthServiceService) { }

  initForm(){
    this.formGroup = new FormGroup({
      email: new FormControl(``, [Validators.required, Validators.maxLength(30), Validators.email]),
      password: new FormControl(``, [Validators.required, Validators.minLength(5), Validators.maxLength(30)])
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  loginProcess(){
    console.log(this.formGroup.value)
    if(this.formGroup.valid){
      this.authService.login(this.formGroup.value).subscribe(result=>{
        if(result.success) {
          console.log(result);
          alert(result.message);
          sessionStorage.setItem('userId', result.userId);
        } else {
          alert(result.message);
        }
      })
    }
  }


}
