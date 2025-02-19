import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Order {
  id: number;
  orderDetails: string;
  phoneNumber: string;
  status: string;
  priority: string;
  orderDate: string;
  estimatedDays: number;
  totalAmount: number;
  advance: number;
  remainingBalance: number;
  orderPhoto: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8080/api/orders'; // Update with your backend URL

  constructor(private http: HttpClient) {}

  submitOrder(order: any, file: File): Observable<any> {
    const formData: FormData = new FormData();
    
    // Convert order object to Blob
    const orderBlob = new Blob([JSON.stringify(order)], { type: 'application/json' });
    
    formData.append('order', orderBlob); // Attach order as Blob
    formData.append('file', file); // Attach file

    return this.http.post(this.apiUrl + '/submit', formData, { responseType: 'text' as 'json' });
}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl+'/all');
  }

  updateOrder(order: any) {
    return this.http.put(`http://localhost:8080/api/orders/${order.id}`, order, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  deleteMultipleOrders(orderIds: number[]): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/delete-multiple`, { orderIds });
  }
  
  
}
