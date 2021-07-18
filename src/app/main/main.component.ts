import { Component, OnInit} from '@angular/core';
import{ UserService } from  '../service/userService'
import { UserDetails } from '../models/userDetails';
import { Router } from "@angular/router";
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
  
export class MainComponent implements OnInit {
  length!:number;
  pageSize!:number;
  pageIndex!: number;
  pageEvent!: PageEvent;
  users: any;
  userDetails!: UserDetails;
  hideSpinner: boolean = false;
  
  constructor(
    private userService: UserService,
    private router: Router
  ) { }
 
  ngOnInit() {
    this.getUsers();
  }

  onPageChanged(e: any) {
    this.pageIndex = e.pageIndex + 1;
    this.getUsers();
  }

  showForm() {
    this.router.navigateByUrl("home/add_new_user");
  }

  getUsers() {
    this.userService.getUsers(this.pageIndex).subscribe(response => {
      setTimeout(() => {
        this.users = response.data;
        this.length = response.total;
        this.pageIndex = response.total_pages;
        this.pageSize = response.per_page;
        this.hideSpinner = true;
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
