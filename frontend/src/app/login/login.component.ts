import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  onSignIn:boolean = true;
  onSignUp:boolean = false;

  signup(){
    this.onSignUp=true
    this.onSignIn=false
  }

  signin(){
    this.onSignIn=true
    this.onSignUp=false
  }

}
