import { Component, OnInit } from '@angular/core';
import { MessageService } from '../service/messageService';

@Component({
  selector: 'app-dialog-confirmation',
  templateUrl: './dialog-confirmation.component.html',
  styleUrls: ['./dialog-confirmation.component.css']
})

export class DialogConfirmationComponent implements OnInit {
  message='';

  constructor(private messageService:MessageService) { }

  ngOnInit(): void {
    this.message = this.messageService.message$;
  }
}
