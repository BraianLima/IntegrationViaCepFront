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
  public fieldCopied: boolean = false;
  
  constructor(private  clipboardService: ClipboardService) {}

  ngOnInit(): void {
    this.initializePostalCodeClipboard();
  }

  //if changes address on page, initialize page again
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['address']) {
      this.initializePostalCodeClipboard();
    }
  }
  
  //initialize block component of output cep
  private initializePostalCodeClipboard(): void {
    if (this.isBlockSearchPostalCode) {
      this.postalCodeClipboard = this.postalCode;
      return;
    }
    
    if (!this.address.data) {
      this.address.data = new postalCode;
    }
    this.postalCodeClipboard = this.address.data;
  }

  //pass input id to change color to green and pass element, to get text do copy to clipboard
  public copyToClipboardByService(inputId: string, event: Event): void {
    const buttonElement = event.currentTarget as HTMLButtonElement;
    //copy to clipboard
    this.clipboardService.copyToClipboard(inputId, buttonElement);
  }

  public copyAllAddressToClipboardByService(): void {
    //get all fields when click on Copy to Clipboard button
    const addressData: Record<string, string> = {
      cep: (this.postalCodeClipboard.cepCode ?? ''),
      public_place: (this.postalCodeClipboard.publicPlace ?? ''),
      complement: (this.postalCodeClipboard.complement ?? ''),
      district: (this.postalCodeClipboard.district ?? ''),
      county: (this.postalCodeClipboard.county ?? ''),
      state: (this.postalCodeClipboard.state ?? ''),
      ibge: (this.postalCodeClipboard.ibge ?? ''),
      gia: (this.postalCodeClipboard.gia ?? ''),
      ddd: (this.postalCodeClipboard.ddd ?? ''),
      siafi: (this.postalCodeClipboard.siafi ?? '')
    };

    //pass all field to coyp to clipboard
    this.clipboardService.copyVisibleFieldsOfAddressToClipboard(addressData);
    this.setFieldCopied(); //set timeout to field back to original color
  }

  private setFieldCopied(): void {
    this.fieldCopied = true;
    setTimeout(() => {
      this.fieldCopied = false;
    }, 3000);
  }

}
