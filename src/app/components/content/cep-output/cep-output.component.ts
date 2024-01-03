import { Component, Input } from '@angular/core';
import { responseGetCEP } from '../../../models/responseGetPostalCode';

@Component({
  selector: 'app-cep-output',
  templateUrl: './cep-output.component.html',
  styleUrl: './cep-output.component.css'
})
export class CepOutputComponent {
  @Input() address: responseGetCEP = new responseGetCEP;
}
