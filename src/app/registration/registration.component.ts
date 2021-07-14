import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,  Validators  } from '@angular/forms';

import { Login } from '../models/login';
import { LoginRequest } from '../requests/loginRequest';

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
    private loginRequest: LoginRequest
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
    
    if (!this.loginForm.invalid) {
     console.log(login, password, confirmPassword);
     
      const loginObject: Login = {
        email: login,
        password
      };
      
      this.loginRequest.login(loginObject).subscribe(response => {
        console.log(response);

      });
      this.loginForm.reset()
    } else {
      console.log('Passwords not coincidence');
    }
  }
}
