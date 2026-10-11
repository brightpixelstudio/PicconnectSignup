// src/app/services/api.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root', // Makes the service a global singleton
})
export class ApiServiceUser {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl + '/user'; // Uses the API URL from environment

  // Accept the raw data value as an argument
  submitSignUpForm(formData: any): Observable<any> {
    return this.http.post(this.apiUrl + '/addSignup', formData);
  }
}
