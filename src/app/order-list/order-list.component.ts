import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Table } from 'primeng/table';
import { OrderService } from '../services/order.service';

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

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
  standalone:false
})
export class OrderListComponent implements AfterViewInit {

  orderlist: Order[] = [];
  isModalOpen = false; // Track modal state
  modalImage: string | null = null; // Track the image to display in the modal
  editDialogVisible = false; // Track dialog visibility
  selectedOrder: any = null; // Currently selected order for editing
 // Dropdown options
 statusOptions = [
  { label: 'Pending', value: 'Pending' },
  { label: 'Completed', value: 'Completed' },
];
priorityOptions = [
  { label: 'High', value: 'High' },
  { label: 'Medium', value: 'Medium' },
  { label: 'Low', value: 'Low' },
];

  constructor(private orderService: OrderService) {}


  @ViewChild('dt') dt: Table | undefined;  // Define ViewChild for p-table

  ngOnInit(): void {
    this.fetchOrders();
  }

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

  fetchOrders(): void {
    this.orderService.getOrders().subscribe(
      (data) => {
        this.orderlist = data;
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  

  openModal(imageUrl: string, event: Event): void {
    event.stopPropagation();
    this.modalImage = imageUrl;
    this.isModalOpen = true;
  }

  // Close the modal
  closeModal(): void {
    this.isModalOpen = false;
    this.modalImage = null;
  }

    // Open the edit dialog when a row is clicked
    openEditDialog(event: any): void {
      this.selectedOrder = { ...event.data }; // Clone the selected row data
      this.editDialogVisible = true; // Show the dialog
    }
  
    // Save the edited order
    saveOrderChanges(): void {
      const index = this.orderlist.findIndex(
        (o) => o.orderDetails === this.selectedOrder.orderDetails
      );
      if (index !== -1) {
        this.orderlist[index] = { ...this.selectedOrder }; // Update the order in the list
      }
      this.editDialogVisible = false; // Close the dialog
    }
}
