import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { responseGetCEP } from '../models/responseGetPostalCode';
import { responseSearchPostalCode } from '../models/responseSearchPostalCode';
import { requestSearchPostalCode } from '../models/requestSearchPostalCode';

@Injectable({
  providedIn: 'root'
})
export class IntegrationViaCepService {
  private baseUrl: string = 'https://integration-viacep.com';

  constructor(private http: HttpClient) {}

  //request to getPostalCode by integration-via-cep
  public getPostalCode(cepCode: string): Observable<responseGetCEP> {
    const url = `${this.baseUrl}/PostalCode/GetPostalCode?cepCode=${cepCode}`;
    return this.http.get<responseGetCEP>(url);
  }

  //request to PostSearchPostalCode by integration-via-cep
  public searchPostalCode(requestSearchCEP: requestSearchPostalCode): Observable<responseSearchPostalCode> {
    const url = `${this.baseUrl}/PostalCode/PostSearchPostalCode`;
    return this.http.post<responseSearchPostalCode>(url, requestSearchCEP);
  }
    
}
