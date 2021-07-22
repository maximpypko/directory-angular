import { Component, OnInit } from '@angular/core';
import { registeredUser } from '../models/registeredUser';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from '../service/userService';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmationComponent } from '../dialog-confirmation/dialog-confirmation.component';
import { MessageService } from '../service/messageService';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent implements OnInit {
  addUserForm!: FormGroup;
  userRegister!: registeredUser;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    public dialog: MatDialog,
    private messageService:MessageService
  )
  { }
   
  ngOnInit(): void {
    this.addUserForm = this.formBuilder.group({ 
      name: ["", [Validators.required, Validators.minLength(2)]],
      job: ["", [Validators.required, Validators.minLength(2)]]
    })
  }

  onSubmit(){

    if (this.addUserForm.valid) {
      
      const { name, job } = this.addUserForm.value;
      const userData: registeredUser = {
        name,
        job
      };

      this.userService.registerUser(userData).subscribe(response => {
        if(response){
          this.userRegister = response;
          this.router.navigateByUrl("home");
          this.openDialog("User has been added");
        }
      });

    } else {
      this.openDialog("Enter correct 'name' or 'job'");
    }
  }

  openDialog(message:string) {
    this.messageService.message$ = message;
    this.dialog.open(DialogConfirmationComponent);
  }
}
