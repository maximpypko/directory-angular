import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { registeredUser } from '../models/registeredUser';
import { UserService } from '../service/userService';

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
    private activatedRoute: ActivatedRoute)
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
          alert("User edited");
        }
      });

    } else {
      alert("Enter correct name or title")
    }
  }

  openDialog(){}
}