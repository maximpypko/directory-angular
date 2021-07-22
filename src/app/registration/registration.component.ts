import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from "@angular/router";
import { DialogConfirmationComponent } from '../dialog-confirmation/dialog-confirmation.component';
import { Login } from '../models/login';
import { LoginRequest } from '../requests/loginRequest';
import { MessageService } from '../service/messageService';
import { TokenService } from '../service/tokenService'

@Component({
  selector: 'form-field-overview-example',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {


  loginForm!: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private loginRequest: LoginRequest,
    private router: Router,
    private tokenService: TokenService,
    public dialog: MatDialog,
    private messageService:MessageService
  ) { }
  
  ngOnInit(): void {
    this.tokenService.clearToken();

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
          console.log(response);
          
          this.tokenService.setToken(response.token);
          this.router.navigateByUrl("authorization");
        }
      });
      
    } else {
      this.messageService.message$ = "Enter your data correctly"
      this.dialog.open(DialogConfirmationComponent);
    }

    this.loginForm.reset();
  }
}
