import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogConfirmationComponent } from '../dialog-confirmation/dialog-confirmation.component';
import { MessageService } from '../service/messageService';
import { UserService } from '../service/userService';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  
  visibleEditForm: boolean = false;
  hideSpinner: boolean = false;
 

  userDetails ={
    id:'',
    last_name:'',
    first_name:'',
    email:'',
    avatar:''
  }
  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private messageService:MessageService
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
    this.userService.deleteUserById(this.userDetails.id).subscribe(response => {
      if (response) {
        this.messageService.message$ = "User deleted"
        this.dialog.open(DialogConfirmationComponent);
        this.router.navigateByUrl("home")
      } else {
        this.messageService.message$ = "something went wrong, please try again"
        this.dialog.open(DialogConfirmationComponent);
      }
    });
  }
}
