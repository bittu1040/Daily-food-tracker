import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FoodPreferencesService {

  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  constructor() { }

  getFoodPreferences(): Observable<any> {
    return this.http.get(`${this.apiUrl}/food-preferences/list`);
  }

  addFoodPreference(name: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/food-preferences/add`, { name });
  }

  deleteFoodPreference(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/food-preferences/delete/${id}`);
  }
}
