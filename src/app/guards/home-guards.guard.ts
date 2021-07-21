import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { DialogConfirmationComponent } from '../dialog-confirmation/dialog-confirmation.component';
import { MessageService } from '../service/messageService';
import { TokenService } from '../service/tokenService';

@Injectable({
  providedIn: 'root'
})
  
export class HomeGuardsGuard implements CanActivate{

  constructor(
    private tokenService: TokenService,
    private messageService: MessageService,
    public dialog: MatDialog,
    private router: Router
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
      const token = this.tokenService.getToken();
      if (token) {
        return of(true)
      } else {
        this.openDialog("Please log in");
        this.router.navigateByUrl(`authorization`);
        return of(false)
      };
  }

  openDialog(message: string) {
    this.messageService.message$ = message;
    this.dialog.open(DialogConfirmationComponent);
  }
}
