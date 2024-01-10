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
      Swal.fire({
        icon: (error.status === 400) ? 'warning' : 'error',
        title: this.getTranslateMessages(alertTitle),
        text: this.getTranslateMessages(alertText),
      });
    }

    public getAlertByIcon(icon: string, alertTitle: string, alertText: string): void {
      Swal.fire({
          icon: icon as SweetAlertIcon,
          title: this.getTranslateMessages(alertTitle),
          text: this.getTranslateMessages(alertText),
      });
    }

    private getTranslateMessages(message: string): string {
      return this.languageService.getTranslateMessagesI18n(message);
    }
}
  