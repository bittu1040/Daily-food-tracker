import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);
  
  constructor() { }

  addFood(food: { name: string; quantity: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/food/add`, food);
  }

  deleteFood(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/food/delete/${id}`);
  }

  listAllFood(): Observable<any> {
    return this.http.get(`${this.apiUrl}/food/list`);
  }
}
