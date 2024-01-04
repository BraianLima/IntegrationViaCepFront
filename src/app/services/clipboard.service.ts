import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClipboardService {

    private renderer: Renderer2;

    constructor(rendererFactory: RendererFactory2) {
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
    
}
