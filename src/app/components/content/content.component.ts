import { Component, Renderer2, ElementRef } from '@angular/core';
import { cepIsValid } from '../../validators/cep-validators';
import { LanguageService } from '../../services/language.service';
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

  constructor(private renderer: Renderer2, private el: ElementRef, private languageService: LanguageService,
    private integrationViaCepService: IntegrationViaCepService,
    private sweetalertService: SweetAlertService
  ) {}

  public isBlockSearchPostalCode: boolean = false;
  public isBlockGetPostalCode: boolean = false;
  public showBorderCustomResult: boolean = false;
  public cepGetPostalCode: string = '';
  public isLoading: boolean = false;
  
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
        console.log(data);
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.sweetalertService.getAlertByHttpErrorResponse(error, 'cep_not_found_title', 'cep_not_found_text');
      }
    });

  }
  
}
