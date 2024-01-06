import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root'
})
export class ClipboardService {

    private renderer: Renderer2;

    constructor(rendererFactory: RendererFactory2, private languageService: LanguageService) {
        this.renderer = rendererFactory.createRenderer(null, null);
    }

    public copyToClipboard(inputId: string, buttonElement: HTMLButtonElement): void {
        const inputElement = document.getElementById(inputId) as HTMLInputElement;
        if (inputElement) {
            const inputValue = inputElement.value;
            navigator.clipboard.writeText(inputValue);
            this.renderer.addClass(inputElement, 'is-valid');
            this.renderer.addClass(buttonElement, 'clipboard-green');
            this.renderer.removeClass(buttonElement,'btn-dark');
            setTimeout(() => {
                this.renderer.removeClass(inputElement, 'is-valid');
                this.renderer.addClass(buttonElement,'btn-dark');
                this.renderer.removeClass(buttonElement, 'clipboard-green');
            }, 3000);
        }
    }

    public copyVisibleFieldsOfAddressToClipboard(addressData: Record<string, string>): void {
        const lines: string[] = [];
        for (const [key, value] of Object.entries(addressData)) {
            lines.push(`${this.languageService.getTranslateMessagesI18n(key)}: ${value ?? ''}`);
        }
        const textToClipboard: string = lines.join('\r\n');
        navigator.clipboard.writeText(textToClipboard);
    }
    
}
