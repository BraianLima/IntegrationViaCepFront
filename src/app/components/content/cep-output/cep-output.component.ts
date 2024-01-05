import { Component, Input } from '@angular/core';
import { responseGetCEP } from '../../../models/responseGetPostalCode';
import { ClipboardService } from '../../../services/clipboard.service';
import { responseSearchPostalCode } from '../../../models/responseSearchPostalCode';

@Component({
  selector: 'app-cep-output',
  templateUrl: './cep-output.component.html',
  styleUrl: './cep-output.component.css'
})
export class CepOutputComponent {
  @Input() address: responseGetCEP = new responseGetCEP;
  @Input() addressSearchCEP: responseSearchPostalCode = new responseSearchPostalCode; 
  
  constructor(private  clipboardService: ClipboardService) {}

  public copyToClipboardByService(inputId: string, event: Event): void {
    const buttonElement = event.currentTarget as HTMLButtonElement;
    this.clipboardService.copyToClipboard(inputId, buttonElement);
  }
}
