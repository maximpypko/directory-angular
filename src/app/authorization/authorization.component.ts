import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { authorizationRequest } from '../requests/authorizationRequest';
import { Login } from '../models/login';
import { TokenService } from '../service/tokenService'
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from '../service/messageService';
import { DialogConfirmationComponent } from '../dialog-confirmation/dialog-confirmation.component';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {

  authorizationForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loginRequest: authorizationRequest,
    private router: Router,
    private tokenService: TokenService,
    public dialog: MatDialog,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.tokenService.clearToken();
    
    this.authorizationForm = this.formBuilder.group({
      login: '',
      password: ''
    });
  }

  onSubmit() {
    const {login, password} = this.authorizationForm.value;

    if (login && password) {

      const loginObject: Login = {
        email: login,
        password
      };
      
      this.loginRequest.login(loginObject).subscribe(response => {
        if (response) {
          
          this.tokenService.setToken(response.token);
          this.router.navigateByUrl("home");
        }
      });

    } else {
      this.messageService.message$ = "Enter your data correctly"
      this.dialog.open(DialogConfirmationComponent);
    }
  }
}