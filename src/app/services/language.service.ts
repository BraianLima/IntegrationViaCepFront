import { Inject, Injectable, PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT, isPlatformBrowser  } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private browserLanguage: string = navigator.language;

  constructor (private translateService: TranslateService, private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document,  @Inject(PLATFORM_ID) private platformId: any){ }

  public setUseLanguage() {
    const userLang = navigator.language || "en";
    this.browserLanguage = userLang.split('-')[0];
    this.translateService.setDefaultLang(this.browserLanguage);
    this.translateService.use(this.browserLanguage);
    this.setBrowserLanguage(this.browserLanguage);
    if (isPlatformBrowser(this.platformId)) {
      this.setHtmlLangAttribute();
    }
  }
  
  private setBrowserLanguage(browserLanguage: string) {
    this.browserLanguage = browserLanguage;
  }
  
  private getBrowserLanguage(): string {
    return this.browserLanguage;
  }

  private setHtmlLangAttribute() {
    const renderer = this.rendererFactory.createRenderer(null, null);
    const htmlElement = this.document.documentElement;
    renderer.setAttribute(htmlElement, 'lang', this.browserLanguage);
  }

}
  