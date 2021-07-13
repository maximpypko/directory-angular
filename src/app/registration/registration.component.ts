import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'form-field-overview-example',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  
  hide = true;
  loginForm = this.fb.group({
    login: '',
    password: '',
    confirmPassword:''
  });

  constructor(
    private fb: FormBuilder
  ) {}
  
  onSubmit() {
    //обработчик формы
    console.log(this.loginForm);
    this.loginForm.reset()
  }

  ngOnInit(): void {
  }
}
