import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from "@angular/router";
import { Login } from '../models/login';
import { LoginRequest } from '../requests/loginRequest';
import { TokenService } from '../service/tokenService'

@Component({
  selector: 'form-field-overview-example',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {

  hide = true;
  loginForm!: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private loginRequest: LoginRequest,
    private router: Router,
    private tokenService: TokenService
  ) { }
  
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      login: '',
      password: '',
      confirmPassword: ''
  });
  }

  onSubmit() {
    const { login, password, confirmPassword } = this.loginForm.value;
    
    if (login && password && password === confirmPassword) {
      const loginObject: Login = {
        email: login,
        password
      };
      
      this.loginRequest.login(loginObject).subscribe(response => {
        
        if (response) {
          this.tokenService.setToken(response.token);
          this.router.navigateByUrl("home")
        }
      });
      
    } else {
      alert('Passwords not coincidence');
    }

    this.loginForm.reset()
  }
}
