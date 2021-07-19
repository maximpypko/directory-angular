import { Component, OnInit } from '@angular/core';
import { registeredUser } from '../models/registeredUser';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from '../service/userService';
import { Router } from '@angular/router';

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
    private router: Router)
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
          console.log(response);
          
          this.userRegister = response;
          this.router.navigateByUrl("home");
        }
      });

    } else {
      alert("Enter correct name or title")
    }
  }
}
