import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CUMC-Badminton-Service';
  save(){
    sessionStorage.setItem('userid', '7');
  }
  get(){
    return sessionStorage.getItem('userid');
  }
  remove(){
    sessionStorage.removeItem('userid')
  }
  clearAll(){
    sessionStorage.clear()
  }
}
