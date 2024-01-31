import { Inject, Injectable, RendererFactory2, PLATFORM_ID, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT, isPlatformBrowser  } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { isNullOrEmptyOrUndefined } from '../validators/string-utils';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  
  constructor (private translateService: TranslateService, private rendererFactory: RendererFactory2,
    private cookieService: CookieService,
    @Inject(DOCUMENT) private document: Document, @Inject(PLATFORM_ID) private platformId: Object){ }

  private browserLanguage: string = (isPlatformBrowser(this.platformId) ? navigator.language : 'en');
  private cookieName = 'language';
  private cookieExpirationHours: number = 1; 

  //set language of pages in realtime
  public setUseLanguage(language: string): void {
    this.browserLanguage = this.getLanguage(language);
    this.translateService.setDefaultLang(this.browserLanguage); 
    this.translateService.use(this.browserLanguage);
    this.setHtmlLangAttribute(); //set language in HTML tag 
    if (!this.existsLanguageCookie()) {
      this.setCookieLanguage(this.browserLanguage); //set currently language to cookie
    }
  }
  
  public getLanguage(language: string): string {
    //if language is null, empty or undefined, get browser language
    if (isNullOrEmptyOrUndefined(language)) {
      return this.getBrowserLanguage();
    }

    //delete cookie of currently language and use language of parameter
    this.deleteCookie(this.cookieName);
    return language;
  }

  private getBrowserLanguage(): string {
    const storedLanguage = this.cookieService.get(this.cookieName);
    if (!isNullOrEmptyOrUndefined(storedLanguage)) { //if exists cookie language, use this
      return storedLanguage;
    }

    //if doesn't return true of platformId, use 'en'
    const userLang = (isPlatformBrowser(this.platformId) ? navigator.language : 'en');
    const browserLanguage = userLang.split('-')[0]; //example: en-US to en
    return browserLanguage;
  }

  //delete cookie by parameter
  private deleteCookie(cookieName: string): void {
    this.cookieService.delete(cookieName, '/'); 
  }

  private setHtmlLangAttribute(): void {
    const renderer = this.rendererFactory.createRenderer(null, null) as Renderer2;
    const htmlElement = this.document.documentElement as HTMLElement;
    renderer.setAttribute(htmlElement, 'lang', this.browserLanguage); //set language in HTML tag
  }

  //check if language cookie exists 
  private existsLanguageCookie(): boolean { 
    const storedLanguage = this.cookieService.get(this.cookieName);
    return !isNullOrEmptyOrUndefined(storedLanguage);
  }

  private setCookieLanguage(browserLanguage: string): void {
    const expirationDate = new Date();
    //set +1 hour to expiration of cookie
    expirationDate.setTime(expirationDate.getTime() + this.cookieExpirationHours * 60 * 60 * 1000);
    this.cookieService.set(this.cookieName, browserLanguage, expirationDate, '/');
  }

  //get translate messages by i18n
  public getTranslateMessagesI18n(propToTranslate: string): string {
    const propToReturn: string = String(this.translateService.instant(propToTranslate));
    return propToReturn;
  }

}
  