import { Component, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent {

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  public isBlockSearchPostalCode: boolean = false;
  public isBlockGetPostalCode: boolean = false;
  public showBorderCustomResult: boolean = false;
  
  toggleVisibility(action: string) {
    this.showBorderCustomResult = true;
    this.isBlockSearchPostalCode = action === 'search-postal-code';
    this.isBlockGetPostalCode = action === 'get-postal-code';
    this.addVisibleClass(action);
  }

  addVisibleClass(action: string): void {
    setTimeout(() => {
      const element = this.el.nativeElement.querySelector('.' + action);
      this.renderer.addClass(element, 'visible');
    }, 100);
  }
}
