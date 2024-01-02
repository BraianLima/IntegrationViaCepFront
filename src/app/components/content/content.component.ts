import { Component, Renderer2, ElementRef } from '@angular/core';
import { cepIsValid } from '../../validators/cep-validators';
import Swal from 'sweetalert2';
import { LanguageService } from '../../services/language.service';
 
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent {

  constructor(private renderer: Renderer2, private el: ElementRef, private languageService: LanguageService) {}

  public isBlockSearchPostalCode: boolean = false;
  public isBlockGetPostalCode: boolean = false;
  public showBorderCustomResult: boolean = false;
  public cepGetPostalCode: string = '';
  
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
      Swal.fire({
        icon: 'error',
        title: this.languageService.getTranslateMessagesI18n('invalid_cep'),
        text: this.languageService.getTranslateMessagesI18n('please_enter_cep_valid'),
      });
      return;
    }

    Swal.fire({
      icon: 'success',
      title: 'Teste',
      text: 'texto',
    });
  }
}
