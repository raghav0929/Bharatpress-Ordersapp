import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Table } from 'primeng/table';

interface Order {
  orderDetails: string;
  phoneNumber: string;
  status: string;
  priority: string;
  orderDate: string;
  estimatedDays: number;
  orderPhoto: string;
}

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
  standalone:false
})
export class OrderListComponent implements AfterViewInit {
  @ViewChild('dt') dt: Table | undefined;  // Define ViewChild for p-table

  orders: Order[] = [
    { orderDetails: 'Order 1', phoneNumber: '1234567890', status: 'Pending', priority: 'High', orderDate: '2025-01-01', estimatedDays: 5, orderPhoto: 'https://www.google.com/imgres?q=image&imgurl=https%3A%2F%2Fletsenhance.io%2Fstatic%2F8f5e523ee6b2479e26ecc91b9c25261e%2F1015f%2FMainAfter.jpg&imgrefurl=https%3A%2F%2Fletsenhance.io%2F&docid=-t22bY2ix3gHaM&tbnid=tYmxDgFq4MrkJM&vet=12ahUKEwjovc6Mn4SLAxWZyzgGHT3sObUQM3oECBYQAA..i&w=1280&h=720&hcb=2&itg=1&ved=2ahUKEwjovc6Mn4SLAxWZyzgGHT3sObUQM3oECBYQAA' },
    { orderDetails: 'Order 2', phoneNumber: '9876543210', status: 'Completed', priority: 'Medium', orderDate: '2025-01-02', estimatedDays: 3, orderPhoto: 'https://via.placeholder.com/50' },
    { orderDetails: 'Order 3', phoneNumber: '1231231230', status: 'Pending', priority: 'Low', orderDate: '2025-01-03', estimatedDays: 7, orderPhoto: 'https://via.placeholder.com/50' },
    { orderDetails: 'Order 4', phoneNumber: '9879879870', status: 'Completed', priority: 'High', orderDate: '2025-01-04', estimatedDays: 2, orderPhoto: 'https://via.placeholder.com/50' },
    { orderDetails: 'Order 5', phoneNumber: '6546546540', status: 'Pending', priority: 'Medium', orderDate: '2025-01-05', estimatedDays: 6, orderPhoto: 'https://via.placeholder.com/50' },
    { orderDetails: 'Order 6', phoneNumber: '3213213210', status: 'Completed', priority: 'Low', orderDate: '2025-01-06', estimatedDays: 4, orderPhoto: 'https://via.placeholder.com/50' },
    { orderDetails: 'Order 7', phoneNumber: '5675675670', status: 'Pending', priority: 'High', orderDate: '2025-01-07', estimatedDays: 3, orderPhoto: 'https://via.placeholder.com/50' },
    { orderDetails: 'Order 8', phoneNumber: '7897897890', status: 'Completed', priority: 'Medium', orderDate: '2025-01-08', estimatedDays: 5, orderPhoto: 'https://via.placeholder.com/50' },
    { orderDetails: 'Order 9', phoneNumber: '1112223333', status: 'Pending', priority: 'Low', orderDate: '2025-01-09', estimatedDays: 2, orderPhoto: 'https://via.placeholder.com/50' },
    { orderDetails: 'Order 10', phoneNumber: '4445556666', status: 'Completed', priority: 'High', orderDate: '2025-01-10', estimatedDays: 7, orderPhoto: 'https://via.placeholder.com/50' },
    { orderDetails: 'Order 11', phoneNumber: '7778889999', status: 'Pending', priority: 'Medium', orderDate: '2025-01-11', estimatedDays: 6, orderPhoto: 'https://via.placeholder.com/50' },
    { orderDetails: 'Order 12', phoneNumber: '2223334444', status: 'Completed', priority: 'Low', orderDate: '2025-01-12', estimatedDays: 4, orderPhoto: 'https://via.placeholder.com/50' },
    { orderDetails: 'Order 13', phoneNumber: '3334445555', status: 'Pending', priority: 'High', orderDate: '2025-01-13', estimatedDays: 1, orderPhoto: 'https://via.placeholder.com/50' },
    { orderDetails: 'Order 14', phoneNumber: '5556667777', status: 'Completed', priority: 'Medium', orderDate: '2025-01-14', estimatedDays: 8, orderPhoto: 'https://via.placeholder.com/50' },
    { orderDetails: 'Order 15', phoneNumber: '8889990000', status: 'Pending', priority: 'Low', orderDate: '2025-01-15', estimatedDays: 3, orderPhoto: 'https://via.placeholder.com/50' },
  ];

  // This lifecycle hook is called after the component view is initialized
  ngAfterViewInit() {
    // Ensure the table reference is available
    if (this.dt) {
      console.log('Table is available:', this.dt);
    }
  }

  // Filter method to be used for custom filtering
  filterGlobal(event: any, field: string) {
    if (this.dt) {
      const filterValue = event.target.value.trim();
      this.dt.filter(filterValue, field, 'contains');
    }
  }
}
