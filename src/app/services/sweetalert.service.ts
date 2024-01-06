import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor(private languageService: LanguageService) {}

    public getAlertByHttpErrorResponse(error: HttpErrorResponse, alertTitle: string, alertText: string): void {
      if (error.status === 400){
        Swal.fire({
          icon: 'warning',
          title: this.getTranslateMessages(alertTitle),
          text: this.getTranslateMessages(alertText),
        });
        return;
      }
  
      Swal.fire({
        icon: 'error',
        title: this.getTranslateMessages(alertTitle),
        text: this.getTranslateMessages(alertText),
      });
    }

    public getAlertByIcon(icon: string, alertTitle: string, alertText: string): void {
      const iconSweetAlert: SweetAlertIcon = icon as SweetAlertIcon;
      Swal.fire({
          icon: iconSweetAlert,
          title: this.getTranslateMessages(alertTitle),
          text: this.getTranslateMessages(alertText),
      });
    }

    private getTranslateMessages(message: string): string {
      return this.languageService.getTranslateMessagesI18n(message);
    }
}
  