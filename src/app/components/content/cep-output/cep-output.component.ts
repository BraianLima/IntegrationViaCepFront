import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { responseGetCEP } from '../../../models/responseGetPostalCode';

@Component({
  selector: 'app-cep-output',
  templateUrl: './cep-output.component.html',
  styleUrl: './cep-output.component.css'
})
export class CepOutputComponent {
  @Input() address: responseGetCEP = new responseGetCEP;

  constructor(private renderer: Renderer2) {}

  public copyToClipboard(inputId: string): void {
    const inputElement = document.getElementById(inputId) as HTMLInputElement;
    if (inputElement) {
      const inputValue = inputElement.value;
      navigator.clipboard.writeText(inputValue);
      this.renderer.addClass(inputElement, 'is-valid');
      setTimeout(() => {
        this.renderer.removeClass(inputElement, 'is-valid');
      }, 2000);
    }
  }
}
