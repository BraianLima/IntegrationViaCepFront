import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { responseGetCEP } from '../../../models/responseGetPostalCode';
import { ClipboardService } from '../../../services/clipboard.service';
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

  public copyAllAddressToClipboardByService(): void {
    const addressData: Record<string, string> = {
      CEP: (this.postalCodeClipboard.cepCode ?? ''),
      publicPlace: (this.postalCodeClipboard.publicPlace ?? ''),
      complement: (this.postalCodeClipboard.complement ?? ''),
      district: (this.postalCodeClipboard.district ?? ''),
      county: (this.postalCodeClipboard.county ?? ''),
      state: (this.postalCodeClipboard.state ?? ''),
      ibge: (this.postalCodeClipboard.ibge ?? ''),
      gia: (this.postalCodeClipboard.gia ?? ''),
      ddd: (this.postalCodeClipboard.ddd ?? ''),
      siafi: (this.postalCodeClipboard.siafi ?? '')
    };

    this.clipboardService.copyVisibleFieldsOfAddressToClipboard(addressData);
  }
}
