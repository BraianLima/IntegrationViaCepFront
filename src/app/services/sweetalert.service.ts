import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor(private languageService: LanguageService) {}

  //show sweetalert2, translate message to user, set icon by error
  public getAlertByHttpErrorResponse(error: HttpErrorResponse, alertTitle: string, alertText: string): void {
    Swal.fire({
      icon: (error.status === 400) ? 'warning' : 'error',
      title: this.getTranslateMessages(alertTitle),
      text: this.getTranslateMessages(alertText),
    });
  }

  //show sweet alert, translate message to user and set icon by icon parameter
  public getAlertByIcon(icon: string, alertTitle: string, alertText: string): void {
    Swal.fire({
      icon: icon as SweetAlertIcon,
      title: this.getTranslateMessages(alertTitle),
      text: this.getTranslateMessages(alertText),
    });
  }

  //get translate message by i18n
  private getTranslateMessages(message: string): string {
    return this.languageService.getTranslateMessagesI18n(message);
  }
}
  