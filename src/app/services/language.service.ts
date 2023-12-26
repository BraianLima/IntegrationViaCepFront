import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private browserLanguage: string = navigator.language;

  constructor (private translateService: TranslateService){ }

  public setUseLanguage() {
    const userLang = navigator.language || "en";
    const languageCode = userLang.split('-')[0];
    this.translateService.setDefaultLang(languageCode);
    this.translateService.use(languageCode);
    this.setBrowserLanguage(languageCode);
  }
  
  private setBrowserLanguage(languageCode: string) {
    this.browserLanguage = languageCode;
  }
  
  private getBrowserLanguage(): string {
    return this.browserLanguage;
  }

}
  