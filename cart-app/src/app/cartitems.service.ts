import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from './item';

@Injectable({
  providedIn: 'root',
})
export class CartitemsService {
  endpointUrl: string = 'http://localhost:3000/cart-items';

  constructor(private http: HttpClient) {}

  getAllItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.endpointUrl);
  }

  addItem(item: Item): Observable<any> {
    return this.http.post(this.endpointUrl, item);
  }

  deleteItem(id): Observable<any> {
    return this.http.delete(`${this.endpointUrl}/${id}`);
  }

  updateItem(item: Item): Observable<any> {
    return this.http.put<Item>(`${this.endpointUrl}/${item.id}`, item);
  }
}
