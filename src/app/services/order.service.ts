import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Order {
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
    formData.append('order', JSON.stringify(order)); // Add order JSON
    formData.append('file', file); // Add file

    const headers = new HttpHeaders(); // No need to set Content-Type, Angular handles it for FormData

    return this.http.post(this.apiUrl+'/submit', formData, { headers, responseType: 'text' as 'json' });
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl+'/all');
  }

  updateOrder(order: any) {
    return this.http.put(`http://localhost:8080/api/orders/${order.id}`, order, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
}
