import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { responseGetCEP } from '../../../models/responseGetPostalCode';
import { ClipboardService } from '../../../services/clipboard.service';
import { responseSearchPostalCode } from '../../../models/responseSearchPostalCode';
import { postalCode } from '../../../models/postalCode';

@Component({
  selector: 'app-cep-output',
  templateUrl: './cep-output.component.html',
  styleUrl: './cep-output.component.css'
})
export class CepOutputComponent implements OnInit, OnChanges  {
  @Input() address: responseGetCEP = new responseGetCEP;
  @Input() isBlockSearchPostalCode: boolean = false; 
  @Input() postalCode: postalCode = new postalCode;
  public postalCodeClipboard: postalCode = new postalCode;
  
  constructor(private  clipboardService: ClipboardService) {}

  ngOnInit(): void {
    this.initializePostalCodeClipboard();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['address']) {
      this.initializePostalCodeClipboard();
    }
  }
  
  private initializePostalCodeClipboard(): void {
    if (this.isBlockSearchPostalCode) {
      this.postalCodeClipboard = { ...this.postalCode };
      return;
    }
    
    if (!this.address.data) {
      this.address.data = new postalCode;
    }
    this.postalCodeClipboard = { ...this.address.data };
  }

  public copyToClipboardByService(inputId: string, event: Event): void {
    const buttonElement = event.currentTarget as HTMLButtonElement;
    this.clipboardService.copyToClipboard(inputId, buttonElement);
  }

  public copyAllAddressToClipboardByService(): void{
    console.log(this.postalCodeClipboard)
  }
}
