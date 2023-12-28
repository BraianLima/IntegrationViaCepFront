import { Component, OnInit } from '@angular/core';
import { Flags } from '../../models/flags';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  
  public flags: Flags[] = [];

  constructor (private languageService: LanguageService){
  }
  
  ngOnInit() {
    this.flags.push({
      flagIco: 'brazil.ico',
      flagTranslateName: 'brazil',
      flagLanguageCode: 'pt'
    });
    this.flags.push({
      flagIco: 'spain.ico',
      flagTranslateName: 'spain',
      flagLanguageCode: 'es'
    });
    this.flags.push({
      flagIco: 'united-states.ico',
      flagTranslateName: 'united_states',
      flagLanguageCode: 'en'
    });
  }

  public changeLanguage(event: Event, language: string): void {
    event.preventDefault();
    this.languageService.setUseLanguage(language);
    location.reload();
  }

}
