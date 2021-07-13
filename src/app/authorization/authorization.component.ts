import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {

  hide = true;
  authorizationForm = this.fb.group({
    login: '',
    password: ''
  });

  constructor(
    private fb: FormBuilder
  ) {}
  
  onSubmit() {
    //обработчик формы
    console.log(this.authorizationForm);
    this.authorizationForm.reset()
  }

  ngOnInit(): void {
  }

}
