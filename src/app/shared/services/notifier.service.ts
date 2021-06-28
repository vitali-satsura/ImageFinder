import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotifierComponent } from '../components/notifier/notifier.component';

@Injectable()
export class NotifierService {
  constructor(private shackBar: MatSnackBar) {}

  showNotification(displayMessage: string, buttonText: string, messageType: 'error' | 'inactive') {
    this.shackBar.openFromComponent(NotifierComponent, {
      data: {
        message: displayMessage,
        buttonText: buttonText,
        type: messageType,
      },
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: messageType,
    });
  }

  showNotificationWithoutButton(displayMessage: string, messageType: 'delete' | 'success') {
    this.shackBar.openFromComponent(NotifierComponent, {
      data: {
        message: displayMessage,
        type: messageType,
      },
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: messageType,
    });
  }
}
