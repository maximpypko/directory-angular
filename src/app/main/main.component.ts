import { Component, OnInit} from '@angular/core';
import{ UserService } from  '../service/userService'
import { UserDetails } from '../models/userDetails';
import { Router } from "@angular/router";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
  
export class MainComponent implements OnInit {

  users: any;
  userDetails!:UserDetails
  hideProgressBar:boolean = false
  
  constructor(
    private userService: UserService,
    private router: Router
  ) { }
 
  ngOnInit() {
    this.getUsers();
  }

  showForm() {
    this.router.navigateByUrl("home/add_new_user");
  }

  getUsers(){
    this.userService.getUsers().subscribe(response => {
      setTimeout(() => {
        this.users = response.data
        this.hideProgressBar = true
      }, 1000)
      
    })
  }

  showUser(id:string){
    this.userService.getUserById(id).subscribe(response => {
      this.userDetails = response.data;
      this.router.navigateByUrl(`home/user/${response.data.id}`)
    })
  }
}
