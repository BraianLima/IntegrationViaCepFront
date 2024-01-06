import { Inject, Injectable, RendererFactory2, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT, isPlatformBrowser  } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { isNullOrEmpty } from '../utils/string-utils';

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

  public setUseLanguage(language: string): void {
    this.browserLanguage = this.getLanguage(language);
    this.translateService.setDefaultLang(this.browserLanguage);
    this.translateService.use(this.browserLanguage);
    this.setHtmlLangAttribute();
    if (!this.existsLanguageCookie()){
      this.setCookieLanguage(this.browserLanguage);
    }
  }
  
  public getLanguage(language: string): string {
    if (isNullOrEmpty(language)) {
      return this.getBrowserLanguage();
    }

    this.deleteCookie(this.cookieName);
    return language;
  }

  private getBrowserLanguage(): string {
    const storedLanguage = this.cookieService.get(this.cookieName);
    if (!isNullOrEmpty(storedLanguage)){
      return storedLanguage;
    }

    const userLang = (isPlatformBrowser(this.platformId) ? navigator.language : 'en');
    const browserLanguage = userLang.split('-')[0]
    return browserLanguage;
  }

  private deleteCookie(cookieName: string): void {
    this.cookieService.delete(cookieName, '/');
  }

  private setHtmlLangAttribute(): void {
    const renderer = this.rendererFactory.createRenderer(null, null);
    const htmlElement = this.document.documentElement;
    renderer.setAttribute(htmlElement, 'lang', this.browserLanguage);
  }

  private existsLanguageCookie(): boolean {
    const storedLanguage = this.cookieService.get(this.cookieName);
    return !isNullOrEmpty(storedLanguage);
  }

  private setCookieLanguage(browserLanguage: string): void {
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + this.cookieExpirationHours * 60 * 60 * 1000);
    this.cookieService.set(this.cookieName, browserLanguage, expirationDate, '/');
  }

  public getTranslateMessagesI18n(propToTranslate: string): string {
    const propToReturn: string = String(this.translateService.instant(propToTranslate));
    return propToReturn;
  }

}
  