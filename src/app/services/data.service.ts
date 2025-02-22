import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  
  constructor() { }

  getProfile(){
    return this.http.get(`${this.apiUrl}/auth/profile`);
  }
}
