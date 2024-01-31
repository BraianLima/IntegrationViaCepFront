import { Component, Renderer2, ElementRef } from '@angular/core';
import { cepIsValid } from '../../validators/cep-validators';
import { IntegrationViaCepService } from '../../services/integrationviacep.service';
import { responseGetCEP } from '../../models/responseGetPostalCode';
import { HttpErrorResponse } from '@angular/common/http';
import { SweetAlertService } from '../../services/sweetalert.service';
import { requestSearchPostalCode } from '../../models/requestSearchPostalCode';
import { responseSearchPostalCode } from '../../models/responseSearchPostalCode';
import { postalCode } from '../../models/postalCode';
 
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent {
  
  public isBlockSearchPostalCode: boolean = false;
  public isBlockGetPostalCode: boolean = false;
  public showBorderCustomResult: boolean = false;
  public cepGetPostalCode: string = '';
  public isLoading: boolean = false;
  public address: responseGetCEP = new responseGetCEP; 
  public addressSearchCEP: responseSearchPostalCode = new responseSearchPostalCode; 
  public requestSearchCEP: requestSearchPostalCode = new requestSearchPostalCode;

  constructor(private renderer: Renderer2, private el: ElementRef,
    private integrationViaCepService: IntegrationViaCepService,
    private sweetalertService: SweetAlertService
  ) { }
  
  //toggle visibility of cards by options, search postal code or get postal code
  public toggleVisibility(action: string): void {
    this.showBorderCustomResult = true;
    this.isBlockSearchPostalCode = (action === 'search-postal-code');
    this.isBlockGetPostalCode = (action === 'get-postal-code');
    this.addVisibleClass(action); //set visible card chosen
  }

  private addVisibleClass(action: string): void {
    setTimeout(() => {
      const element = this.el.nativeElement.querySelector('.' + action);
      this.renderer.addClass(element, 'visible');
    }, 100); //set visible card chosen with timeout
  }

  public getAddressByCEP(cepGetPostalCode: string): void {
    if (!cepIsValid(cepGetPostalCode)) { //check if CEP is valid
      //set icon of alert and pass parameters to translate to message
      this.sweetalertService.getAlertByIcon('error', 'invalid_cep', 'please_enter_cep_valid');
      return;
    }
    
    this.setIsLoading(true);
    //request GetPostalCode in integration-viacep.com
    this.integrationViaCepService.getPostalCode(cepGetPostalCode).pipe().subscribe({
      next: (response: responseGetCEP) => {
        this.setIsLoading(false);
        if (!this.checkResponseGetCEPIsValid(response)) { //if CEP is invalid, show sweet alert
          this.sweetalertService.getAlertByIcon('error', 'cep_not_found_title', 'cep_not_found_text');
          return;
        }
        this.address = response;
      },
      error: (error: HttpErrorResponse) => {
        this.setIsLoading(false);
        //show alert in case of erro by request
        this.sweetalertService.getAlertByHttpErrorResponse(error, 'cep_not_found_title', 'cep_not_found_text');
      }
    });

  }

  //if response.data is not filled or data.isValid is false, return false
  private checkResponseGetCEPIsValid(response: responseGetCEP): boolean {
    if (!response.data) { 
      return false;
    }

    return response.data?.isValid;
  }

  public searchPostalCode(): void {
    this.setIsLoading(true);
    //request searchPostalCode in integration=viacep.com
    this.integrationViaCepService.searchPostalCode(this.requestSearchCEP).pipe().subscribe({
      next: (response: responseSearchPostalCode) => {
        //if success, getAddress by response
        this.setIsLoading(false);
        //get address and check if address is valid
        response.data = this.getAddressValidOnlyInSearchPostalCode(response);
        //check if response has address
        if (!this.checkResponseSearchPostalCodeIsValid(response)) {
          this.sweetalertService.getAlertByIcon('error', 'search_cep_not_found_title', 'search_cep_not_found_text');
          return;
        }
        this.addressSearchCEP = response;
      },
      error: (error: HttpErrorResponse) => {
        this.setIsLoading(false);
        //show error message
        this.sweetalertService.getAlertByHttpErrorResponse(error, 'search_cep_not_found_title', 'search_cep_not_found_text');
      }
    });
  }

  //if response.data is null, return undefined
  private getAddressValidOnlyInSearchPostalCode(response: responseSearchPostalCode): postalCode[] | undefined {
    if (response.data && Array.isArray(response.data)) {
      //return only valid address
      return response.data.filter((postalCode) => postalCode.isValid === true);
    }

    return undefined;
  }
  
  //return false in case don't have items in array on response.data
  private checkResponseSearchPostalCodeIsValid(response: responseSearchPostalCode): boolean {
    return (response.data === undefined ? false : response.data.length > 0);
  }

  //set icon loading on page
  private setIsLoading(value: boolean): void {
    this.isLoading = value;
  }

}
