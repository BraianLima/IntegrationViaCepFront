import { Component, Renderer2, ElementRef } from '@angular/core';
import { cepIsValid } from '../../validators/cep-validators';
import { IntegrationViaCepService } from '../../services/integrationviacep.service';
import { responseGetCEP } from '../../models/responseGetPostalCode';
import { HttpErrorResponse } from '@angular/common/http';
import { SweetAlertService } from '../../services/sweetalert.service';
 
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

  constructor(private renderer: Renderer2, private el: ElementRef,
    private integrationViaCepService: IntegrationViaCepService,
    private sweetalertService: SweetAlertService
  ) { }
  
  
  public toggleVisibility(action: string) {
    this.showBorderCustomResult = true;
    this.isBlockSearchPostalCode = action === 'search-postal-code';
    this.isBlockGetPostalCode = action === 'get-postal-code';
    this.addVisibleClass(action);
  }

  private addVisibleClass(action: string): void {
    setTimeout(() => {
      const element = this.el.nativeElement.querySelector('.' + action);
      this.renderer.addClass(element, 'visible');
    }, 100);
  }

  public getAddressByCEP(cepGetPostalCode: string){
    if (!cepIsValid(cepGetPostalCode)) {
      this.sweetalertService.getAlertByIcon('error', 'invalid_cep', 'please_enter_cep_valid');
      return;
    }
    
    this.isLoading = true;
    this.integrationViaCepService.getPostalCode(cepGetPostalCode).pipe().subscribe({
      next: (data: responseGetCEP) => {
        this.isLoading = false;
        this.address = data;
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.sweetalertService.getAlertByHttpErrorResponse(error, 'cep_not_found_title', 'cep_not_found_text');
      }
    });

  }
  
}
