import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDetails } from '../models/userDetails';
import { UserService } from '../service/userService';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  
  visibleEditForm: boolean = false;
  hideSpinner: boolean = false;
  userDetails!: UserDetails;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }
 
  ngOnInit(): void {
    
    const id: any = this.activatedRoute.snapshot.params.id;

    this.userService.getUserById(id).subscribe(response => {
        this.userDetails = response.data;
        this.hideSpinner = true;
    })
  }
  
  showEditForm() {
    this.router.navigateByUrl(`home/edit_user/${this.userDetails.id}`);
  }
  
  deleteUser() {
    this.userService.deleteUserById(this.userDetails.id).subscribe(response => alert("User deleted"));
    this.router.navigateByUrl("home")
  }
}