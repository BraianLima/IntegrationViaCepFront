import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { responseGetCEP } from '../models/responseGetPostalCode';

@Injectable({
  providedIn: 'root'
})
export class IntegrationViaCepService {
    private baseUrl: string = 'https://integration-viacep.com';

    constructor(private http: HttpClient) {}

    public getPostalCode(cepCode: string): Observable<responseGetCEP> {
      const url = `${this.baseUrl}/PostalCode/GetPostalCode?cepCode=${cepCode}`;
      return this.http.get<responseGetCEP>(url);
    }
    
}
