import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { registeredUser } from '../models/registeredUser';
import { UserService } from '../service/userService';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmationComponent } from '../dialog-confirmation/dialog-confirmation.component';
import { MessageService } from '../service/messageService';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  editUserForm!: FormGroup;
  userRegister!: registeredUser;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private messageService:MessageService
  )
  { }
   
  ngOnInit(): void {
    this.editUserForm = this.formBuilder.group({ 
      name: ["", [Validators.required, Validators.minLength(2)]],
      job: ["", [Validators.required, Validators.minLength(2)]]
    })
  }

  editUser(){

    if (this.editUserForm.valid) {

      const { name, job } = this.editUserForm.value;
      const userData: registeredUser = {
        name,
        job
      };
      const id: any = this.activatedRoute.snapshot.params.id;
      this.userService.editUserById(userData, id).subscribe(response => {

        if (response) {
          this.userRegister = response;
          this.router.navigateByUrl(`home`);
          this.editUserForm.reset();
          this.openDialog("User data has been changed");
        }
      });
    } else {
      this.openDialog("Enter correct 'name' or 'title'");
    }
  }

  openDialog(message: string) {
    this.messageService.message$ = message;
    this.dialog.open(DialogConfirmationComponent);
  }
}