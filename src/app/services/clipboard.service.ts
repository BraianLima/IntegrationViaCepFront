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
        //set type of object of inputElement
        const inputElement = document.getElementById(inputId) as HTMLInputElement;
        if (inputElement) {
            const inputValue = inputElement.value as string; //get value of input text from button clicked
            navigator.clipboard.writeText(inputValue); //copy to clipboard
            //change input and button to color green to show for user realize that text was copy to clipboard
            this.setInputsAndButtonGreen(inputElement, buttonElement);
        }
    }

    //this method set inputs and buttons to green and after 3000 milliseconds come back to original color
    private setInputsAndButtonGreen(inputElement: HTMLInputElement, buttonElement: HTMLButtonElement): void {
        this.renderer.addClass(inputElement, 'is-valid');
        this.renderer.addClass(buttonElement, 'clipboard-green');
        this.renderer.removeClass(buttonElement,'btn-dark');
        setTimeout(() => {
            this.renderer.removeClass(inputElement, 'is-valid');
            this.renderer.addClass(buttonElement,'btn-dark');
            this.renderer.removeClass(buttonElement, 'clipboard-green');
        }, 3000);
    }

    public copyVisibleFieldsOfAddressToClipboard(addressData: Record<string, string>): void {
        const lines: string[] = [];
        for (const [key, value] of Object.entries(addressData)) {
            //get translate of key and after ':' set value
            lines.push(`${this.languageService.getTranslateMessagesI18n(key)}: ${value ?? ''}`);
        }
        const textToClipboard: string = lines.join('\r\n'); //set new line each line
        navigator.clipboard.writeText(textToClipboard); //copy text to clipboard
    }
    
}
